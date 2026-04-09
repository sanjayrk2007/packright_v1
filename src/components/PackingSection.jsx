import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const WEATHER_CATS = ["For the Heat", "Cold Weather", "Rain Gear", "Beach Gear", "Adventure Gear"];

export default function PackingSection({ list, tripId }) {
  const [checked, setChecked] = useState(() => {
    if (!tripId) return {};
    const saved = localStorage.getItem(`packright_checked_${tripId}`);
    return saved ? JSON.parse(saved) : {};
  });
  const [customItems, setCustomItems] = useState(() => {
    if (!tripId) return [];
    const saved = localStorage.getItem(`packright_custom_${tripId}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [newItem, setNewItem] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [collapsed, setCollapsed] = useState({});

  function toggleCat(cat) { setCollapsed(prev => ({ ...prev, [cat]: !prev[cat] })); }
  function clearAll() { setChecked({}); }
  function deleteCustomItem(idxToRemove) {
    setCustomItems(prev => prev.filter((_, i) => i !== idxToRemove));
  }

  useEffect(() => {
    if (!tripId) return;
    localStorage.setItem(`packright_checked_${tripId}`, JSON.stringify(checked));
  }, [checked, tripId]);

  useEffect(() => {
    if (!tripId) return;
    localStorage.setItem(`packright_custom_${tripId}`, JSON.stringify(customItems));
  }, [customItems, tripId]);

  const extendedList = customItems.length > 0
    ? { ...list, "Custom Items": customItems }
    : list;

  const allItems = Object.entries(extendedList).flatMap(([cat, items]) =>
    items.map((item, idx) => ({ cat, item, idx }))
  );
  const total = allItems.length;
  // Accurately count only items that currently exist in the list by checking their specific category/item/local-idx key
  const packedN = allItems.filter(desc => checked[`${desc.cat}::${desc.item}::${desc.idx}`]).length;
  const pct = total > 0 ? Math.round((packedN / total) * 100) : 0;

  useEffect(() => {
    if (total > 0 && packedN === total) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [packedN, total]);

  function toggle(key) { setChecked(prev => ({ ...prev, [key]: !prev[key] })); }

  function addCustomItem(e) {
    e.preventDefault();
    if (!newItem.trim()) return;
    setCustomItems(prev => [...prev, newItem.trim()]);
    setNewItem("");
  }

  return (
    <div>
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} style={{ zIndex: 99999, position: 'fixed', top: 0, left: 0 }} />}
      <div className="sec-head">
        <div className="sec-title">Packing List</div>
        <div style={{ display: "flex", gap: "12px", alignItems: "baseline" }}>
          <button className="reset-btn no-print" style={{ margin: 0, padding: "4px 8px" }} onClick={clearAll}>Clear All</button>
          <div className="sec-meta">{packedN}/{total} packed</div>
        </div>
      </div>
      <div className="progress-wrap">
        <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
        <div className="progress-label">{pct}%</div>
      </div>

      {Object.entries(extendedList).map(([cat, items]) => {
        const isCollapsed = !!collapsed[cat];
        return (
          <div key={cat} className="category-block">
            <div className="cat-name toggle-cat" onClick={() => toggleCat(cat)}>
              {cat} <span className="cat-chevron">{isCollapsed ? "▼" : "▲"}</span>
            </div>
            {!isCollapsed && (
              <ul className="item-list">
                {items.map((item, idx) => {
                  const key = `${cat}::${item}::${idx}`;
                  const isChecked = !!checked[key];
                  const isWeatherAdded = WEATHER_CATS.includes(cat);
                  const isMust = cat === "Essentials" || cat === "Documents";
                  return (
                    <li key={key} className="item-row" onClick={() => toggle(key)}>
                      <div className={`check-box${isChecked ? " on" : ""}`}>
                        {isChecked && <svg viewBox="0 0 10 8" fill="none" style={{ width: "10px", height: "8px" }}><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </div>
                      <span className={`item-text${isChecked ? " done" : ""}`}>{item}</span>
                      {isWeatherAdded && <span className="tag tag-weather">weather</span>}
                      {isMust && !isWeatherAdded && <span className="tag tag-must">must</span>}
                      {cat === "Custom Items" && (
                        <button
                          className="delete-item-btn no-print"
                          onClick={(e) => { e.stopPropagation(); deleteCustomItem(idx); }}
                          title="Delete item"
                        >×</button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}

      <div className="custom-item-form no-print" style={{ marginTop: "1.5rem" }}>
        <form onSubmit={addCustomItem} style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="Add a custom item..."
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn" style={{ padding: "0.5rem 1rem", fontSize: "14px", width: "auto", marginTop: 0 }}>Add</button>
        </form>
      </div>
    </div>
  );
}
