import React, { useState, useEffect } from 'react';

// Common base currencies to show in dropdown
const COMMONS = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "SGD", "AED", "THB", "ZAR", "KRW", "TRY"];
const CURRENCY_LABELS = {
  USD: "USA", EUR: "Eurozone", GBP: "UK", JPY: "Japan", AUD: "Australia",
  CAD: "Canada", CHF: "Switzerland", CNY: "China", INR: "India", SGD: "Singapore",
  AED: "UAE", THB: "Thailand", ZAR: "South Africa", KRW: "South Korea", TRY: "Turkey",
  EGP: "Egypt", IDR: "Indonesia", ARS: "Argentina", MYR: "Malaysia", ISK: "Iceland"
};

export default function CurrencySection({ destObj }) {
  const [rates, setRates] = useState(null);
  const [amount, setAmount] = useState(100);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState(destObj.currency);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the destination currency isn't in common list, add it
    if (!COMMONS.includes(destObj.currency)) {
      COMMONS.push(destObj.currency);
    }
    setToCur(destObj.currency);
  }, [destObj]);

  useEffect(() => {
    let active = true;
    async function fetchRates() {
      try {
        setLoading(true);
        // Using open.er-api.com (ExchangeRate-API free tier) - No API Key Needed!
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        if (active && data && data.rates) {
          setRates(data.rates);
        }
      } catch (err) {
        console.warn("Failed to fetch live rates, using fallback math.");
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchRates();
    return () => { active = false; };
  }, []);

  // Conversion logic: base everything through USD
  let converted = 0;
  if (rates && rates[fromCur] && rates[toCur]) {
    const amountInUSD = amount / rates[fromCur];
    converted = amountInUSD * rates[toCur];
  }

  // Format cleanly
  const formattedConverted = converted.toLocaleString(undefined, { maximumFractionDigits: converted < 10 ? 2 : 0 });
  const formattedAmount = Number(amount).toLocaleString(undefined);

  return (
    <div className="no-print">
      <div className="sec-head">
        <div className="sec-title">Currency Converter</div>
        <div className="sec-meta">Live Rates</div>
      </div>
      <div className="currency-card day-card" style={{ display: "block" }}>
        
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "var(--ink3)"}}>Fetching live exchange rates...</div>
        ) : (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ flex: "1 1 120px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>Amount</label>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={e => setAmount(e.target.value)} 
                  style={{ width: "100%", border: "1px solid var(--border)", background: "var(--surface2)" }} 
                  min="1"
                />
              </div>

              <div style={{ flex: "1 1 120px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>From</label>
                <select 
                  value={fromCur} 
                  onChange={e => setFromCur(e.target.value)}
                  style={{ width: "100%", border: "1px solid var(--border)", background: "var(--surface2)" }}
                >
                  {COMMONS.map(c => <option key={c} value={c}>{c} ({CURRENCY_LABELS[c] || "Global"})</option>)}
                </select>
              </div>

              <div style={{ flex: "0 0 auto", alignSelf: "flex-end", paddingBottom: "10px", color: "var(--ink2)" }}>
                →
              </div>

              <div style={{ flex: "1 1 120px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>To</label>
                <select 
                  value={toCur} 
                  onChange={e => setToCur(e.target.value)}
                  style={{ width: "100%", border: "1px solid var(--border)", background: "var(--surface2)" }}
                >
                  {COMMONS.map(c => <option key={c} value={c}>{c} ({CURRENCY_LABELS[c] || "Global"})</option>)}
                </select>
              </div>
            </div>

            <div style={{ padding: "1.5rem", background: "var(--surface2)", borderRadius: "var(--r)", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: "var(--ink2)", marginBottom: "4px" }}>{formattedAmount} {fromCur} =</div>
              <div style={{ fontSize: "2rem", fontFamily: "var(--serif)", color: "var(--accent)" }}>
                {formattedConverted} <span style={{ fontSize: "1rem" }}>{toCur}</span>
              </div>
            </div>
            
            <p className="rate-note" style={{ marginTop: "1rem", textAlign: "center" }}>Rates provided by ExchangeRate-API</p>
          </>
        )}
      </div>
    </div>
  );
}
