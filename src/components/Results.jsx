import WeatherSection from './WeatherSection.jsx';
import PackingSection from './PackingSection.jsx';
import CurrencySection from './CurrencySection.jsx';
import ItinerarySection from './ItinerarySection.jsx';
import CultureSection from './CultureSection.jsx';

export default function Results({data, onReset}){
  return(
    <div className="page">
      <button 
        className="theme-toggle no-print" 
        onClick={() => data.setTheme(prev => prev === "light" ? "dark" : "light")}
        title="Toggle Theme"
      >
        {data.theme === "light" ? "🌙" : "☀️"}
      </button>
      <div className="results">
        <div className="no-print" style={{paddingTop:"2.5rem",marginBottom:"1.5rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
          <div>
            <div className="eyebrow" style={{marginBottom:".25rem"}}>{data.destObj.flag} {data.destObj.name}</div>
            <div style={{fontSize:"13px",color:"var(--ink2)"}}>{data.days} day{data.days!==1?"s":""} · {data.tripType} trip</div>
          </div>
          <button className="reset-btn" onClick={onReset}>← Plan another trip</button>
        </div>
        
        {data.destObj.imageUrl && (
          <img className="destination-banner no-print" src={data.destObj.imageUrl} alt={data.destObj.name} />
        )}
        
        <div className="no-print">
          <WeatherSection weather={data.weather} destObj={data.destObj} days={data.days} />
        </div>
        <div className="divider no-print" />
        <PackingSection list={data.packingList} tripId={`${data.destObj.name}-${data.days}-${data.tripType}`} />
        
        <div className="divider" style={{ breakBefore: "page" }} />
        <ItinerarySection itinerary={data.itinerary} destObj={data.destObj} />
        
        <div className="no-print">
          <div className="divider" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <CultureSection destObj={data.destObj} />
            <CurrencySection destObj={data.destObj} />
          </div>
          <div className="divider" />
          <div className="why-section">
          <div className="why-title">Why PackRight?</div>
          <p className="why-text">Most travel apps show you generic checklists. PackRight reads real-time weather for your destination and builds a packing list that actually reflects what you'll face — not what someone in a Mumbai office imagines you'll need.</p>
        </div>
        </div>
        <div style={{height:"2rem"}}></div>
      </div>
    </div>
  );
}
