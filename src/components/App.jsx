import { useState, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinations.js';
import { buildPackingList } from '../utils/packingList.js';
import { buildItinerary } from '../utils/itinerary.js';
import { weatherInfo } from '../utils/weather.js';
import Results from './Results.jsx';
import LandingPage from './LandingPage.jsx';

const LOAD_STEPS = ["Fetching live weather…","Building packing list…","Generating itinerary…","Putting it all together…"];

async function fetchWeather(lat, lon){
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`;
  console.log("FETCH URL:", url);
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Weather fetch failed: ${text}`);
  }
  return res.json();
}

export default function App(){
  const [theme, setTheme] = useState(() => localStorage.getItem("pr_theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pr_theme", theme);
  }, [theme]);
  const [dest,setDest] = useState(() => localStorage.getItem("pr_dest") || "");
  const [days,setDays] = useState(() => Number(localStorage.getItem("pr_days")) || 5);
  const [persons,setPersons] = useState(() => Number(localStorage.getItem("pr_persons")) || 1);
  const [tripType,setTripType] = useState(() => localStorage.getItem("pr_tripType") || "casual");
  const [budget,setBudget] = useState(() => Number(localStorage.getItem("pr_budget")) || 50000);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    localStorage.setItem("pr_dest", dest);
    localStorage.setItem("pr_days", days);
    localStorage.setItem("pr_persons", persons);
    localStorage.setItem("pr_tripType", tripType);
    localStorage.setItem("pr_budget", budget);
  }, [dest, days, persons, tripType, budget]);
  const [generating,setGenerating] = useState(false);
  const [loadStep,setLoadStep] = useState(0);
  const [result,setResult]   = useState(null);
  const [error,setError]     = useState("");

  async function handleGenerate(){
    if(!dest){setError("Please select a destination.");return;}
    if(!days||days<1){setError("Enter at least 1 day.");return;}
    setError("");setResult(null);setGenerating(true);setLoadStep(0);
    const destObj=DESTINATIONS.find(d=>d.name===dest);
    if(!destObj){setError("Destination not found.");setGenerating(false);return;}
    try{
      setLoadStep(0);
      const weatherData=await fetchWeather(destObj.lat,destObj.lon);
      setLoadStep(1);
      const{list,weatherTags,avgMax,avgMin,avgRain}=buildPackingList(destObj,days,tripType,weatherData,persons);
      setLoadStep(2);
      const itinerary=buildItinerary(destObj,days,tripType==="adventure"||tripType==="business"?"packed":"relaxed");
      setLoadStep(3);
      await new Promise(r=>setTimeout(r,350));
      const current=weatherData.current;
      const wInfo=weatherInfo(current.weather_code);
      setResult({
        destObj,days,tripType,budget,persons,
        weather:{temp:Math.round(current.temperature_2m),humidity:Math.round(current.relative_humidity_2m),wind:Math.round(current.wind_speed_10m),rainProb:Math.round(current.precipitation_probability_max??0),icon:wInfo.icon,desc:wInfo.desc,avgMax,avgMin,avgRain,weatherTags},
        packingList:list,itinerary,
        theme, setTheme
      });
    }catch(e){
      setError("Could not fetch weather data. Make sure you're running via a dev server and your internet is connected.");
    }finally{setGenerating(false);}
  }

  if(result) return <Results data={result} onReset={()=>{setResult(null); setShowApp(false);}} />;

  return(
    <div className="page">
      <button 
        className="theme-toggle no-print" 
        onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
        title="Toggle Theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      
      {!showApp ? (
        <LandingPage onStart={() => setShowApp(true)} />
      ) : (
        <div className="hero">
          <div className="eyebrow">Your trip planner</div>
          <h1>Never forget your<br /><em>charger</em> again.</h1>
          <p className="hero-sub" style={{lineHeight: 1.8}}>
            Enter your trip details below. We'll fetch live weather data, generate curated packing lists, and build a beautiful itinerary featuring <strong>aesthetic photo spots</strong>!
          </p>
          <div className="form-card ticket-card">
            <div className="form-group" style={{marginBottom:"12px"}}>
              <label>Destination</label>
              <select value={dest} onChange={e=>{setDest(e.target.value);setError("");}}>
                <option value="">Select a destination…</option>
                {[...DESTINATIONS].sort((a,b)=>a.name.localeCompare(b.name)).map(d=>(
                  <option key={d.name} value={d.name}>{d.flag}  {d.name}</option>
                ))}
              </select>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Duration (days)</label>
                <input type="number" min="1" max="30" value={days} onChange={e=>setDays(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Persons</label>
                <input type="number" min="1" max="20" value={persons} onChange={e=>setPersons(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label>Budget (INR)</label>
                <div className="budget-row">
                  <span className="inr-tag">₹</span>
                  <input type="number" min="1000" step="1000" value={budget} onChange={e=>setBudget(Number(e.target.value))} style={{flex:1}} />
                </div>
              </div>
            </div>
            <div className="form-group" style={{marginBottom:"16px", marginTop:"4px"}}>
              <label>Trip Vibe</label>
              <div className="chip-row">
                {[
                  {v:"casual",l:"🧳 Casual"},
                  {v:"business",l:"💼 Business"},
                  {v:"beach",l:"🏖️ Beach"},
                  {v:"adventure",l:"🏔️ Adventure"},
                  {v:"romance",l:"💖 Romantic"},
                  {v:"luxury",l:"✨ Luxury"}
                ].map(({v,l})=>(
                  <button key={v} className={`chip${tripType===v?" active":""}`} onClick={()=>setTripType(v)}>{l}</button>
                ))}
              </div>
            </div>
            {error&&<div className="error-note">{error}</div>}
            <button className="btn generate-btn" onClick={handleGenerate} disabled={generating}>
              {generating?LOAD_STEPS[loadStep]:"Generate Curated Trip →"}
            </button>
            <button className="reset-btn" onClick={() => setShowApp(false)} style={{width: "100%", marginTop: "1rem"}}>← Back to Home</button>
            {generating&&(
              <div style={{marginTop:"14px",textAlign:"center"}}>
                <div className="spinner"></div>
                <div style={{fontSize:"11px",color:"var(--ink3)",marginTop:"8px"}}>{loadStep+1}/{LOAD_STEPS.length} steps complete</div>
              </div>
            )}
          </div>
          <div style={{marginTop:"1.5rem",textAlign:"center",fontSize:"12px",color:"var(--ink3)"}}>
            Live weather via Open-Meteo · {DESTINATIONS.length} destinations · No account needed
          </div>
        </div>
      )}
    </div>
  );
}
