export default function WeatherSection({weather, destObj, days}){
  const alerts=[];
  if(weather.weatherTags.includes("hot"))   alerts.push("High heat expected — cooling essentials added to your list.");
  if(weather.weatherTags.includes("cold"))  alerts.push("Cold temperatures ahead — thermal layers added to your list.");
  if(weather.weatherTags.includes("rainy")) alerts.push("Rain likely on most days — rain gear automatically added.");
  return(
    <div>
      <div className="sec-head">
        <div className="sec-title">Live Weather</div>
        <div className="sec-meta">Current · {destObj.name.split(",")[0]}</div>
      </div>
      <div className="weather-card">
        <div>
          <div className="weather-main">
            <div className="weather-icon">{weather.icon}</div>
            <div>
              <div className="weather-temp">{weather.temp}<span className="weather-unit">°C</span></div>
              <div className="weather-desc">{weather.desc}</div>
            </div>
          </div>
          <div className="weather-meta-grid">
            <div className="weather-pill"><div className="weather-pill-label">Humidity</div><div className="weather-pill-val">{weather.humidity}%</div></div>
            <div className="weather-pill"><div className="weather-pill-label">Wind</div><div className="weather-pill-val">{weather.wind} km/h</div></div>
            {weather.avgMax!==null&&<div className="weather-pill"><div className="weather-pill-label">{days}-day high</div><div className="weather-pill-val">{weather.avgMax}°C</div></div>}
            {weather.avgMin!==null&&<div className="weather-pill"><div className="weather-pill-label">{days}-day low</div><div className="weather-pill-val">{weather.avgMin}°C</div></div>}
            {weather.avgRain>0&&<div className="weather-pill" style={{gridColumn:"1/-1"}}><div className="weather-pill-label">Avg. rain probability</div><div className="weather-pill-val">{weather.avgRain}%</div></div>}
          </div>
        </div>
        <div><div className="weather-badge">{destObj.climate.split("–")[0].trim()}</div></div>
      </div>
      {alerts.map((a,i)=><div key={i} className="weather-alert">⚠ {a}</div>)}
      <div style={{fontSize:"12px",color:"var(--ink3)",marginTop:".5rem",fontStyle:"italic"}}>{destObj.climate}</div>
    </div>
  );
}
