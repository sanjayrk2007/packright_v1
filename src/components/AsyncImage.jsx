import React, { useState, useEffect } from 'react';

const CACHE = {};

export default function AsyncImage({ query, fallbackSrc, className, style, alt }) {
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      // 1. Check if we already have it in local JS cache
      if (CACHE[query]) {
        if (isMounted) {
          setSrc(CACHE[query]);
          setLoading(false);
        }
        return;
      }

      // 2. Safely attempt to fetch from Unsplash
      try {
        const apiKey = import.meta.env.VITE_UNSPLASH_KEY;
        if (!apiKey || apiKey === "YOUR_UNSPLASH_ACCESS_KEY_HERE") {
          throw new Error("Missing Unsplash API Key");
        }

        const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1`, {
          headers: {
            Authorization: `Client-ID ${apiKey}`
          }
        });
        
        if (!res.ok) throw new Error("Unsplash rate limit or bad request.");
        
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
          // Grab the raw image, compress it with parameters
          const imgUrl = `${data.results[0].urls.raw}&auto=format&fit=crop&w=600&q=80`;
          CACHE[query] = imgUrl; // store in cache
          if (isMounted) setSrc(imgUrl);
        } else {
          throw new Error("No results found on Unsplash");
        }
      } catch (e) {
        console.warn(`Fallback triggered for: ${query}. Reason: ${e.message}`);
        // If API fails (no key, rate limit, no result), use the fallback
        if (isMounted) setSrc(fallbackSrc);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchImage();

    return () => { isMounted = false; };
  }, [query, fallbackSrc]);

  if (loading) {
    return (
      <div 
        className={`${className} skeleton-loader`} 
        style={{ ...style, background: "var(--surface2)", animation: "pulse 1.5s infinite" }} 
      />
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style} 
      onError={(e) => { e.target.onerror = null; e.target.src = fallbackSrc; }}
    />
  );
}
