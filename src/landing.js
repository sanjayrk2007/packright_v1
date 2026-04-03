// Vanilla JS for the landing page (destination strip + scroll-triggered animations)
// Mirrors the inline <script> from the original packright.html exactly

const DEST_NAMES = [
  ["🇯🇵","Tokyo"],["🇫🇷","Paris"],["🇺🇸","New York"],["🇹🇭","Bangkok"],
  ["🇦🇪","Dubai"],["🇬🇧","London"],["🇸🇬","Singapore"],["🇦🇺","Sydney"],
  ["🇮🇹","Rome"],["🇮🇩","Bali"],["🇪🇬","Cairo"],["🇨🇦","Toronto"],
  ["🇹🇷","Istanbul"],["🇳🇱","Amsterdam"],["🇰🇷","Seoul"],["🇿🇦","Cape Town"],
  ["🇮🇳","New Delhi"],["🇲🇾","Kuala Lumpur"],["🇮🇸","Reykjavik"],["🇦🇷","Buenos Aires"]
];

export function initLanding(){
  // Destination strip
  const track = document.getElementById('destTrack');
  if(track){
    const doubled = [...DEST_NAMES, ...DEST_NAMES];
    doubled.forEach(([flag, name]) => {
      const pill = document.createElement('div');
      pill.className = 'dest-pill';
      pill.innerHTML = `<span>${flag}</span><span>${name}</span>`;
      track.appendChild(pill);
    });
  }

  // Scroll-triggered fade-in for feature cards & steps
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.feat-card, .step').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .4s ease ${i * 0.1}s, transform .4s ease ${i * 0.1}s`;
    observer.observe(el);
  });
}
