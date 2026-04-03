import React from 'react';
import AsyncImage from './AsyncImage';

const AESTHETIC_KEYWORDS = ["cityscape cityscape", "architecture", "street level", "landmark", "nightlife", "sunset views", "local food scene", "traditional culture", "local life", "nature scenery", "scenery landscape", "historical vibes", "aesthetic vibe", "city panorama", "explore local"];

export default function ItinerarySection({itinerary, destObj}){
  return(
    <div className="itin-section">
      <div className="sec-head"><div className="sec-title">Itinerary</div><div className="sec-meta">{itinerary.length} days in {destObj.name.split(",")[0]}</div></div>
      <div className="itin-grid">
        {itinerary.map((day, ix)=>{
          // Extract specific spot name for search query if available
          let searchQuery = destObj.name;
          const spotAct = day.activities.find(a => a.startsWith("Instagram Spot: 📸"));
          if (spotAct) {
            searchQuery = spotAct.replace("Instagram Spot: 📸", "").trim() + ", " + destObj.name;
          } else {
            searchQuery = destObj.name + " " + AESTHETIC_KEYWORDS[ix % AESTHETIC_KEYWORDS.length];
          }

          return (
            <div key={day.day} className="day-card" style={{display:"flex", flexDirection:"column", gap:"0"}}>
              <div style={{position: "relative"}}>
                <AsyncImage 
                  query={searchQuery}
                  alt="Spot" 
                  fallbackSrc={`https://loremflickr.com/600/400/${encodeURIComponent(destObj.name.split(",")[0])},landmark/all?lock=${day.day}`}
                  className="itin-thumbnail no-print" 
                  style={{width: "100%", height: "160px", objectFit: "cover", objectPosition: "center 25%", borderRadius: "8px", marginBottom: "1rem", border: "1px solid var(--border)"}}
                />
              </div>
              <div style={{display:"grid", gridTemplateColumns:"auto 1fr", gap:"1rem"}}>
                <div className="day-num">{String(day.day).padStart(2,"0")}</div>
                <div style={{width: "100%"}}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px"}}>
                    <div className="day-title">{day.title}</div>
                    <div style={{fontSize: "11px", fontWeight: "600", padding: "4px 8px", background: "var(--surface2)", borderRadius: "6px", color: "var(--ink2)", whiteSpace: "nowrap"}}>💰 {day.budgetStr}</div>
                  </div>
                  <div className="day-body">
                    {day.activities.map((a,i)=>(
                      <div key={i} style={{paddingLeft:"12px",borderLeft:"2px solid var(--accent-light)",marginBottom:"6px"}}>{a}</div>
                    ))}
                  </div>
                  <div className="day-tags">{day.tags.map((t,i)=><span key={i} className="day-tag">{t}</span>)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
