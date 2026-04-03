import React from 'react';
import AsyncImage from './AsyncImage';

export default function CultureSection({ destObj }) {
  if (!destObj.culture) return null;

  return (
    <div className="culture-section no-print" style={{ marginBottom: "2rem" }}>
      <div className="sec-head">
        <div className="sec-title">Local Insights</div>
        <div className="sec-meta">Culture & Etiquette</div>
      </div>
      <div className="day-card" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ position: "relative" }}>
          <AsyncImage
            query={destObj.culture.query}
            alt="Culture"
            fallbackSrc={`https://loremflickr.com/600/400/${encodeURIComponent(destObj.name.split(",")[0])},culture/all`}
            className="itin-thumbnail"
            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "1.5rem", border: "1px solid var(--border)" }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
          
          <div style={{ paddingLeft: "12px", borderLeft: "2px solid var(--accent-light)" }}>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink3)", marginBottom: "4px" }}>Must-Try Food</div>
            <div style={{ fontSize: "14px", color: "var(--ink)" }}>{destObj.culture.food}</div>
          </div>

          <div style={{ paddingLeft: "12px", borderLeft: "2px solid var(--gold-light)" }}>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink3)", marginBottom: "4px" }}>Interesting Fact</div>
            <div style={{ fontSize: "14px", color: "var(--ink)" }}>{destObj.culture.fact}</div>
          </div>

          <div style={{ paddingLeft: "12px", borderLeft: "2px solid var(--blue-light)" }}>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink3)", marginBottom: "4px" }}>Local Etiquette</div>
            <div style={{ fontSize: "14px", color: "var(--ink)" }}>{destObj.culture.tip}</div>
          </div>

        </div>
      </div>
    </div>
  );
}
