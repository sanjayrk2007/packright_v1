import React from 'react';

export default function LandingPage({ onStart }) {
  return (
    <div className="landing-page" style={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "2rem",
        textAlign: "center"
      }}>
      
      <div className="landing-hero" style={{ maxWidth: "800px", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontFamily: "var(--serif)", marginBottom: "1.5rem", lineHeight: "1.1", color: "var(--ink)" }}>
          PackRight. <br/>
          <span style={{ color: "var(--accent)" }}>Travel Effortless.</span>
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--ink2)", marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
          The ultimate companion for generating intelligent itineraries, dynamic packing lists, and local currency conversions in seconds. No guessing, just exploring.
        </p>
        <button 
          onClick={onStart}
          style={{
            background: "var(--accent)", color: "var(--surface)", 
            padding: "1.25rem 3rem", fontSize: "1.25rem", fontWeight: "600",
            borderRadius: "99px", border: "none", cursor: "pointer",
            boxShadow: "0 8px 25px rgba(26,71,42,0.3)", transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onMouseOver={(e)=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 30px rgba(26,71,42,0.4)" }}
          onMouseOut={(e)=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 25px rgba(26,71,42,0.3)" }}
        >
          Start Planning →
        </button>
      </div>

      <div className="landing-features" style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "2rem", width: "100%", maxWidth: "1000px"
      }}>
        {[
          { icon: "🎒", title: "Smart Packing", desc: "Categorized lists tailored to destination weather & trip length." },
          { icon: "📍", title: "Curated Itineraries", desc: "Day-by-day routing with photo spots and daily budgets." }
        ].map((feat, idx) => (
          <div key={idx} style={{
            background: "var(--surface)", padding: "2rem", borderRadius: "var(--r-lg)", 
            border: "1px solid var(--border)", boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{feat.icon}</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.5rem", color: "var(--ink)" }}>{feat.title}</h3>
            <p style={{ fontSize: "14px", color: "var(--ink2)", lineHeight: "1.6" }}>{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
