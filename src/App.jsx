import { useState, useEffect, useRef, useMemo } from "react";

const getParam = (k) => { try { return new URLSearchParams(window.location.search).get(k); } catch { return null; } };
const FAMILY_NAME = getParam("familia") || "Familia Invitada";
const MAX_GUESTS  = Math.max(1, parseInt(getParam("invitados") || "2"));

// 👇 PEGA AQUÍ la URL de tu Google Apps Script (ver instrucciones abajo)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby-a5de575ygIjzE7FnYAna2qmS7UYCpWsC-e6HT6wPSjgdpWKd8G5JgLx9_1TFiEmc/exec";

const C = {
  bg: "#013a4a", navy: "#015265", navyMid: "#016a82", navyLight: "#0188a4",
  gold: "#c9a84c", goldLight: "#e8c86d", goldPale: "#f5dfa0",
  white: "#f4f0e8", dim: "rgba(244,240,232,0.72)",
};

const useCountdown = (target) => {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = new Date(target) - Date.now();
      if (diff <= 0) return;
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    calc(); const id = setInterval(calc, 1000); return () => clearInterval(id);
  }, [target]);
  return t;
};

/* ── Ornamento de esquina con flores cónicas tipo lirio/tulipán ── */
const CornerFloral = ({ size = 160, flip = false, flipY = false }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none"
    style={{ display:"block", transform:`${flip?"scaleX(-1)":""} ${flipY?"scaleY(-1)":""}`.trim() }}>

    {/* ── Marco en L ── */}
    <path d="M6 6 L6 62" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M6 6 L62 6" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="6"  cy="62" r="2.2" fill="#c9a84c"/>
    <circle cx="62" cy="6"  r="2.2" fill="#c9a84c"/>
    <rect x="3.5" y="3.5" width="5" height="5" fill="#c9a84c" transform="rotate(45 6 6)"/>

    {/* ── Tallo principal diagonal ── */}
    <path d="M6 6 Q 48 48 130 145" stroke="#c9a84c" strokeWidth=".9" strokeLinecap="round" opacity=".35"/>

    {/* ── Tallo brazo horizontal ── */}
    <path d="M6 6 Q 40 20 88 18" stroke="#c9a84c" strokeWidth=".85" strokeLinecap="round" opacity=".45"/>

    {/* ── Tallo brazo vertical ── */}
    <path d="M6 6 Q 20 40 18 88" stroke="#c9a84c" strokeWidth=".85" strokeLinecap="round" opacity=".45"/>

    {/* ════════════════════════════════
        LIRIO GRANDE — esquina central
    ════════════════════════════════ */}
    <g transform="translate(42,42) rotate(-45)">
      {/* Sépalos base (verde dorado) */}
      <path d="M-3 8 C-5 4,-5 0,-3 -4 L0 -2 L3 -4 C5 0,5 4,3 8 Z"
            fill="#8a6f2e" opacity=".6" stroke="#c9a84c" strokeWidth=".5"/>
      {/* Pétalo izquierdo exterior */}
      <path d="M-3 4 C-8 -4,-14 -16,-10 -30 C-8 -20,-4 -10,-3 4 Z"
            fill="#0f2247" stroke="#c9a84c" strokeWidth=".9"/>
      {/* Línea central pétalo izq */}
      <path d="M-3 4 C-7 -8,-10 -20,-10 -30" stroke="#c9a84c" strokeWidth=".4" opacity=".5"/>
      {/* Pétalo izquierdo interior */}
      <path d="M-1 3 C-4 -6,-6 -18,-3 -30 C-1 -18,0 -8,-1 3 Z"
            fill="#1a3360" stroke="#c9a84c" strokeWidth=".8"/>
      {/* Pétalo centro */}
      <path d="M0 4 C-2 -8,-2 -22,0 -34 C2 -22,2 -8,0 4 Z"
            fill="#1a3360" stroke="#c9a84c" strokeWidth=".9"/>
      {/* Línea central pétalo centro */}
      <path d="M0 4 Q0 -15 0 -34" stroke="#c9a84c" strokeWidth=".4" opacity=".55"/>
      {/* Pétalo derecho interior */}
      <path d="M1 3 C4 -6,6 -18,3 -30 C1 -18,0 -8,1 3 Z"
            fill="#1a3360" stroke="#c9a84c" strokeWidth=".8"/>
      {/* Pétalo derecho exterior */}
      <path d="M3 4 C8 -4,14 -16,10 -30 C8 -20,4 -10,3 4 Z"
            fill="#0f2247" stroke="#c9a84c" strokeWidth=".9"/>
      {/* Línea central pétalo der */}
      <path d="M3 4 C7 -8,10 -20,10 -30" stroke="#c9a84c" strokeWidth=".4" opacity=".5"/>
      {/* Estambre */}
      <path d="M0 0 Q0 -28 0 -36" stroke="#c9a84c" strokeWidth=".5" opacity=".5"/>
      <circle cx="0" cy="-36" r="2" fill="#c9a84c" opacity=".8"/>
      <path d="M-1 0 Q-3 -24 -5 -32" stroke="#c9a84c" strokeWidth=".4" opacity=".4"/>
      <circle cx="-5" cy="-32" r="1.4" fill="#c9a84c" opacity=".6"/>
      <path d="M1 0 Q3 -24 5 -32" stroke="#c9a84c" strokeWidth=".4" opacity=".4"/>
      <circle cx="5" cy="-32" r="1.4" fill="#c9a84c" opacity=".6"/>
    </g>

    {/* ════════════════════════════════
        LIRIO PEQUEÑO — brazo horizontal
    ════════════════════════════════ */}
    <g transform="translate(82,16) rotate(80)">
      <path d="M-2 6 C-4 3,-4 0,-2 -3 L0 -1 L2 -3 C4 0,4 3,2 6 Z"
            fill="#8a6f2e" opacity=".55" stroke="#c9a84c" strokeWidth=".4"/>
      <path d="M-2 3 C-5 -3,-9 -12,-6 -22 C-5 -14,-3 -7,-2 3 Z"
            fill="#0f2247" stroke="#c9a84c" strokeWidth=".8"/>
      <path d="M0 3 C-1 -6,-1 -16,0 -25 C1 -16,1 -6,0 3 Z"
            fill="#1a3360" stroke="#c9a84c" strokeWidth=".85"/>
      <path d="M0 3 Q0 -11 0 -25" stroke="#c9a84c" strokeWidth=".35" opacity=".5"/>
      <path d="M2 3 C5 -3,9 -12,6 -22 C5 -14,3 -7,2 3 Z"
            fill="#0f2247" stroke="#c9a84c" strokeWidth=".8"/>
      <path d="M0 0 Q0 -22 0 -28" stroke="#c9a84c" strokeWidth=".4" opacity=".45"/>
      <circle cx="0" cy="-28" r="1.6" fill="#c9a84c" opacity=".75"/>
    </g>

    {/* ════════════════════════════════
        LIRIO PEQUEÑO — brazo vertical
    ════════════════════════════════ */}
    <g transform="translate(16,82) rotate(-10)">
      <path d="M-2 6 C-4 3,-4 0,-2 -3 L0 -1 L2 -3 C4 0,4 3,2 6 Z"
            fill="#8a6f2e" opacity=".55" stroke="#c9a84c" strokeWidth=".4"/>
      <path d="M-2 3 C-5 -3,-9 -12,-6 -22 C-5 -14,-3 -7,-2 3 Z"
            fill="#0f2247" stroke="#c9a84c" strokeWidth=".8"/>
      <path d="M0 3 C-1 -6,-1 -16,0 -25 C1 -16,1 -6,0 3 Z"
            fill="#1a3360" stroke="#c9a84c" strokeWidth=".85"/>
      <path d="M0 3 Q0 -11 0 -25" stroke="#c9a84c" strokeWidth=".35" opacity=".5"/>
      <path d="M2 3 C5 -3,9 -12,6 -22 C5 -14,3 -7,2 3 Z"
            fill="#0f2247" stroke="#c9a84c" strokeWidth=".8"/>
      <path d="M0 0 Q0 -22 0 -28" stroke="#c9a84c" strokeWidth=".4" opacity=".45"/>
      <circle cx="0" cy="-28" r="1.6" fill="#c9a84c" opacity=".75"/>
    </g>

    {/* ════════════════════════════════
        CAPULLOS pequeños
    ════════════════════════════════ */}
    {/* Capullo horizontal */}
    <g transform="translate(62,10) rotate(75)">
      <path d="M0 5 C-3 0,-4 -6,-2 -14 C0 -8,0 0,0 5 Z" fill="#0f2247" stroke="#c9a84c" strokeWidth=".7"/>
      <path d="M0 5 C3 0,4 -6,2 -14 C0 -8,0 0,0 5 Z" fill="#1a3360" stroke="#c9a84c" strokeWidth=".7"/>
      <line x1="0" y1="5" x2="0" y2="14" stroke="#c9a84c" strokeWidth=".7" strokeLinecap="round"/>
      <path d="M0 10 C-4 8,-5 5,-3 5" stroke="#c9a84c" strokeWidth=".6" fill="none" opacity=".6"/>
    </g>
    {/* Capullo vertical */}
    <g transform="translate(10,62) rotate(-5)">
      <path d="M0 5 C-3 0,-4 -6,-2 -14 C0 -8,0 0,0 5 Z" fill="#0f2247" stroke="#c9a84c" strokeWidth=".7"/>
      <path d="M0 5 C3 0,4 -6,2 -14 C0 -8,0 0,0 5 Z" fill="#1a3360" stroke="#c9a84c" strokeWidth=".7"/>
      <line x1="0" y1="5" x2="0" y2="14" stroke="#c9a84c" strokeWidth=".7" strokeLinecap="round"/>
      <path d="M0 10 C4 8,5 5,3 5" stroke="#c9a84c" strokeWidth=".6" fill="none" opacity=".6"/>
    </g>

    {/* ── Hojas largas y elegantes ── */}
    {/* Hoja 1 — del tallo horizontal */}
    <path d="M28 10 C34 2,46 4,44 14 C40 8,32 8,28 10 Z"
          fill="#1a3a1a" stroke="#c9a84c" strokeWidth=".75" opacity=".75"/>
    <path d="M28 10 Q36 8 44 14" stroke="#c9a84c" strokeWidth=".35" opacity=".5"/>
    {/* Hoja 2 — del tallo vertical */}
    <path d="M10 28 C2 34,4 46,14 44 C8 40,8 32,10 28 Z"
          fill="#1a3a1a" stroke="#c9a84c" strokeWidth=".75" opacity=".75"/>
    <path d="M10 28 Q8 36 14 44" stroke="#c9a84c" strokeWidth=".35" opacity=".5"/>
    {/* Hoja 3 — diagonal */}
    <path d="M68 60 C78 52,90 58,86 70 C80 62,72 62,68 60 Z"
          fill="#1a3a1a" stroke="#c9a84c" strokeWidth=".7" opacity=".65"/>
    {/* Hoja 4 — diagonal */}
    <path d="M60 68 C52 78,58 90,70 86 C62 80,62 72,60 68 Z"
          fill="#1a3a1a" stroke="#c9a84c" strokeWidth=".7" opacity=".65"/>

    {/* ── Puntos decorativos ── */}
    {[[22,6],[6,22],[50,10],[10,50],[74,70],[70,74]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="1.2" fill="#c9a84c" opacity=".5"/>
    ))}
  </svg>
);

/* ── Las 4 esquinas florales de una vez ── */
const Corners = ({ size = 160 }) => (
  <>
    <div style={{ position:"absolute", top:0, left:0, pointerEvents:"none" }}><CornerFloral size={size}/></div>
    <div style={{ position:"absolute", top:0, right:0, pointerEvents:"none" }}><CornerFloral size={size} flip/></div>
    <div style={{ position:"absolute", bottom:0, left:0, pointerEvents:"none" }}><CornerFloral size={size} flipY/></div>
    <div style={{ position:"absolute", bottom:0, right:0, pointerEvents:"none" }}><CornerFloral size={size} flip flipY/></div>
  </>
);

const Sparkles = () => {
  const pts = useMemo(() => Array.from({ length: 26 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1.5, delay: Math.random() * 5, dur: Math.random() * 3 + 2,
  })), []);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {pts.map(p => (
        <div key={p.id} style={{ position: "absolute", left: p.left, top: p.top, width: p.size, height: p.size, borderRadius: "50%", background: `radial-gradient(circle, ${C.goldPale}, ${C.gold})`, opacity: 0, animation: `sparkle ${p.dur}s ${p.delay}s infinite ease-in-out` }} />
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   CARRUSEL — swipe en móvil, flechas en desktop, auto-gira
   👇 Pon aquí las rutas de tus 6 fotos en /public
══════════════════════════════════════════════════════════ */
const FOTOS = [
  "/foto1.jpg",
  "/foto2.jpg",
  "/foto3.jpg",
  "/foto4.jpg",
  "/foto5.jpg",
  "/foto6.jpg",
];

const Carousel = () => {
  const [cur,  setCur]  = useState(0);
  const [dir,  setDir]  = useState(1);   // 1=siguiente, -1=anterior
  const [anim, setAnim] = useState(false);
  const touchX  = useRef(null);
  const autoRef = useRef(null);
  const total   = FOTOS.length;

  const goTo = (next, direction = 1) => {
    if (anim) return;
    setDir(direction);
    setAnim(true);
    setTimeout(() => {
      setCur((next + total) % total);
      setAnim(false);
    }, 420);
  };

  const next = () => goTo(cur + 1, 1);
  const prev = () => goTo(cur - 1, -1);

  // Auto-rotate cada 4 s
  useEffect(() => {
    autoRef.current = setInterval(next, 4000);
    return () => clearInterval(autoRef.current);
  }, [cur]);

  // Swipe táctil
  const onTouchStart = e => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = e => {
    if (touchX.current === null) return;
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
    touchX.current = null;
  };

  const slide = (idx) => {
    const isActive = idx === cur;
    const entering = anim && idx === (cur + dir * 1 + total) % total;
    const leaving  = anim && idx === cur;
    return {
      position:  idx === cur || (anim && idx === (cur - dir + total) % total) ? "absolute" : "absolute",
      inset: 0,
      opacity:   isActive ? (anim ? 0 : 1) : (entering ? (anim ? 1 : 0) : 0),
      transform: isActive
        ? `translateX(${anim ? dir * -6 + "%" : "0"})` 
        : `translateX(${anim && entering ? "0" : dir * 6 + "%"})`,
      transition: "opacity .42s ease, transform .42s cubic-bezier(.4,0,.2,1)",
      zIndex: isActive ? 2 : 1,
    };
  };

  return (
    <div data-noscroll="true" style={{ width: "100%", userSelect: "none" }}>

      {/* Marco del carrusel */}
      <div
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        style={{ position: "relative", width: "100%", maxWidth: 420, margin: "0 auto",
          aspectRatio: "3/4", borderRadius: 20, overflow: "hidden",
          boxShadow: `0 24px 60px rgba(0,0,0,.55), 0 0 0 1px rgba(201,168,76,.3)`,
          background: C.navy, cursor: "grab",
        }}>

        {/* Fotos */}
        {FOTOS.map((src, idx) => (
          <div key={idx} style={{ ...slide(idx), position: "absolute", inset: 0 }}>
            <img src={src} alt={`Foto ${idx + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={e => { e.target.style.display = "none"; }}
            />
            {/* Overlay degradado inferior */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
              background: "linear-gradient(transparent, rgba(1,40,58,.85))" }}/>
          </div>
        ))}

        {/* Contador */}
        <div style={{ position: "absolute", top: 14, right: 16, zIndex: 10,
          background: "rgba(0,0,0,.45)", backdropFilter: "blur(6px)",
          borderRadius: 20, padding: "4px 12px", border: `1px solid rgba(201,168,76,.3)` }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: 10, color: C.gold, letterSpacing: ".12em" }}>
            {cur + 1} / {total}
          </p>
        </div>

        {/* Etiqueta foto */}
        <div style={{ position: "absolute", bottom: 18, left: 0, right: 0, zIndex: 10, textAlign: "center" }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".3em", color: C.goldPale, opacity: .8 }}>
            FOTO {cur + 1}
          </p>
        </div>

        {/* Flecha izquierda */}
        <button onClick={prev} data-noscroll="true" style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 10,
          width: 38, height: 38, borderRadius: "50%", border: `1px solid rgba(201,168,76,.5)`,
          background: "rgba(0,0,0,.4)", backdropFilter: "blur(6px)",
          color: C.gold, fontSize: 18, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all .2s",
        }}>‹</button>

        {/* Flecha derecha */}
        <button onClick={next} data-noscroll="true" style={{
          position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", zIndex: 10,
          width: 38, height: 38, borderRadius: "50%", border: `1px solid rgba(201,168,76,.5)`,
          background: "rgba(0,0,0,.4)", backdropFilter: "blur(6px)",
          color: C.gold, fontSize: 18, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all .2s",
        }}>›</button>
      </div>

      {/* Puntos de navegación */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 18 }}>
        {FOTOS.map((_, idx) => (
          <button key={idx} onClick={() => goTo(idx, idx > cur ? 1 : -1)} data-noscroll="true"
            style={{
              width: idx === cur ? 24 : 8, height: 8,
              borderRadius: 4, border: "none", cursor: "pointer",
              background: idx === cur ? C.gold : `rgba(201,168,76,.3)`,
              transition: "all .35s ease", padding: 0,
            }}
          />
        ))}
      </div>

      {/* Miniaturas */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 14, padding: "0 24px", overflowX: "auto" }}>
        {FOTOS.map((src, idx) => (
          <button key={idx} onClick={() => goTo(idx, idx > cur ? 1 : -1)} data-noscroll="true"
            style={{
              width: 48, height: 64, flexShrink: 0, borderRadius: 8, overflow: "hidden",
              border: `2px solid ${idx === cur ? C.gold : "rgba(201,168,76,.2)"}`,
              cursor: "pointer", padding: 0, transition: "all .3s",
              opacity: idx === cur ? 1 : .55,
              transform: idx === cur ? "scale(1.08)" : "scale(1)",
            }}>
            <img src={src} alt={`Foto ${idx + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={e => { e.target.parentElement.style.background = C.navy; e.target.style.display = "none"; }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default function QuinceInvitation() {
  const [active, setActive]         = useState(0);
  const [envelope, setEnvelope]     = useState("closed"); // closed | opening | open
  const [attending, setAttending]   = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [guestName, setGuestName]   = useState(FAMILY_NAME);
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [allRsvps, setAllRsvps]     = useState([]);
  const [loadingRsvps, setLoadingRsvps] = useState(false);
  const [showAdmin, setShowAdmin]   = useState(false);
  const [adminTaps, setAdminTaps]   = useState(0);
  const [photos, setPhotos]         = useState(Array(6).fill(null));
  const [musicOn, setMusicOn]       = useState(false);
  const [visible, setVisible]       = useState({});
  const [txClass, setTxClass]       = useState("");
  const [txColor, setTxColor]       = useState(C.gold);
  const [showMusicHint, setShowMusicHint] = useState(true); // hint "toca para música"
  const hasStartedRef = useRef(false); // evita que se dispare 2 veces
  const prevActive    = useRef(0);
  const audioRef  = useRef(null);
  const secRefs   = useRef([]);
  const countdown = useCountdown("2026-06-13T19:30:00");

  // ── Autoplay en el primer toque del usuario (funciona en móvil) ──
  useEffect(() => {
    const startAudio = () => {
      if (hasStartedRef.current || !audioRef.current) return;
      hasStartedRef.current = true;
      audioRef.current.play()
        .then(() => { setMusicOn(true); setShowMusicHint(false); })
        .catch(() => { setShowMusicHint(false); });
    };
    // Escucha cualquier interacción del usuario
    window.addEventListener("touchstart", startAudio, { once: true });
    window.addEventListener("click",      startAudio, { once: true });
    window.addEventListener("scroll",     startAudio, { once: true, passive: true });
    return () => {
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("click",      startAudio);
      window.removeEventListener("scroll",     startAudio);
    };
  }, []);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Great+Vibes&family=Cinzel:wght@400;600;700&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-track{background:#013a4a;} ::-webkit-scrollbar-thumb{background:#c9a84c;}
      @keyframes sparkle{0%,100%{opacity:0;transform:scale(0) rotate(0deg);}50%{opacity:.8;transform:scale(1) rotate(180deg);}}
      @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(38px);}to{opacity:1;transform:translateY(0);}}
      @keyframes shimmer{0%{background-position:200% center;}100%{background-position:-200% center;}}
      @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,.55);}65%{box-shadow:0 0 0 12px rgba(201,168,76,0);}}
      @keyframes glow{0%,100%{border-color:rgba(201,168,76,.25);}50%{border-color:rgba(201,168,76,.7);}}

      /* ══ SOBRE ANIMADO ══ */
      @keyframes envFloat{0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-14px) rotate(1deg);}}
      @keyframes flapOpen{0%{transform:rotateX(0deg);}100%{transform:rotateX(-180deg);}}
      @keyframes letterRise{0%{transform:translateY(0);opacity:0;}100%{transform:translateY(-90px);opacity:1;}}
      @keyframes screenFadeOut{0%{opacity:1;transform:scale(1);}100%{opacity:0;transform:scale(1.06);}}
      @keyframes sealPulse{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,.6);}50%{box-shadow:0 0 0 14px rgba(201,168,76,0);}}
      @keyframes confettiDrop{0%{opacity:1;transform:translateY(-20px) rotate(0deg);}100%{opacity:0;transform:translateY(120px) rotate(720deg);}}
      @keyframes shimmerSeal{0%{background-position:200% center;}100%{background-position:-200% center;}}

      .env-float{animation:envFloat 3s ease-in-out infinite;}
      .env-float-stop{animation:none;}
      .flap-open{animation:flapOpen .7s cubic-bezier(.4,0,.2,1) forwards;transform-origin:top center;}
      .letter-rise{animation:letterRise .6s cubic-bezier(.16,1,.3,1) .4s forwards;opacity:0;}
      .screen-out{animation:screenFadeOut .7s cubic-bezier(.4,0,.2,1) forwards;}
      .seal-pulse{animation:sealPulse 1.8s ease-in-out infinite;}
      @keyframes confettiDrop{0%{opacity:1;transform:translateY(-10px) rotate(0deg) scale(1);}100%{opacity:0;transform:translateY(200px) rotate(540deg) scale(.5);}}
      /* ══ TRANSICIONES ELEGANTES — solo opacity + transform (GPU puro) ══ */

      /* 1. Velo dorado — fade suave con bloom */
      @keyframes veilIn {
        0%   { opacity:0; transform:scale(1.04); filter:blur(12px); }
        100% { opacity:1; transform:scale(1);    filter:blur(0px);  }
      }
      @keyframes veilOut {
        0%   { opacity:1; transform:scale(1);    filter:blur(0px);  }
        100% { opacity:0; transform:scale(.97);  filter:blur(8px);  }
      }

      /* 2. Barrido de luz — línea de brillo que cruza de izq a der */
      @keyframes sweepLine {
        0%   { transform:translateX(-110%); }
        100% { transform:translateX(110%);  }
      }

      /* 3. Partículas doradas que suben */
      @keyframes riseGold {
        0%   { opacity:0; transform:translateY(18px) scale(.95); filter:blur(6px);  }
        60%  { opacity:1; filter:blur(0);  }
        100% { opacity:1; transform:translateY(0)    scale(1);   filter:blur(0);    }
      }

      /* Clases de transición */
      .tx-wrap {
        position:fixed; inset:0; z-index:5000; pointer-events:none;
        will-change:opacity,transform,filter;
      }
      .tx-veil-in  { animation: veilIn  .55s cubic-bezier(.4,0,.2,1) both; }
      .tx-veil-out { animation: veilOut .45s cubic-bezier(.4,0,.2,1) both; }

      /* Línea de barrido (hija del overlay) */
      .tx-sweep {
        position:absolute; inset:0; overflow:hidden;
      }
      .tx-sweep::after {
        content:'';
        position:absolute; top:0; bottom:0; width:35%;
        background: linear-gradient(90deg,
          transparent 0%,
          rgba(245,223,160,.18) 40%,
          rgba(245,223,160,.55) 50%,
          rgba(245,223,160,.18) 60%,
          transparent 100%);
        animation: sweepLine .65s cubic-bezier(.4,0,.2,1) .05s both;
        will-change:transform;
      }

      .gt{background:linear-gradient(90deg,#c9a84c,#f5dfa0,#e8c86d,#f5dfa0,#c9a84c);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite;}
      .fu{animation:fadeUp .85s cubic-bezier(.16,1,.3,1) forwards;}
      .fl{animation:float 3.5s ease-in-out infinite;}
      .hov{transition:transform .3s,box-shadow .3s;} .hov:hover{transform:translateY(-5px);box-shadow:0 18px 45px rgba(0,0,0,.55)!important;}
      .bg{transition:all .3s;cursor:pointer;} .bg:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(201,168,76,.45)!important;}
      .gh:hover{background:rgba(201,168,76,.1)!important;border-color:#c9a84c!important;}
      .sl{transition:all .3s;animation:glow 3s ease-in-out infinite;} .sl:hover{transform:scale(1.025);border-color:#c9a84c!important;}
      .loc-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,168,76,.4)!important;filter:brightness(1.1);}
      button:active{transform:scale(.97)!important;} input{outline:none!important;}
      input:focus{border-color:#c9a84c!important;box-shadow:0 0 0 2px rgba(201,168,76,.15)!important;}
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  // ── Transición elegante: velo dorado con barrido de luz ──
  const fireTransition = (idx) => {
    setTxClass("tx-veil-in");
    setTimeout(() => setTxClass("tx-veil-out"), 480);
    setTimeout(() => setTxClass(""), 960);
  };

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const i = parseInt(e.target.dataset.i || "0");
        if (e.isIntersecting) {
          if (prevActive.current !== i) { fireTransition(i); prevActive.current = i; }
          setActive(i);
          setVisible(v => ({ ...v, [i]: true }));
        }
      });
    }, { threshold: 0.5 });
    secRefs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    loadRsvps();
  }, []);

  const submitRsvp = async () => {
    setSubmitting(true);
    try {
      const params = new URLSearchParams({
        action:    "save",
        familia:   guestName || FAMILY_NAME,
        asistencia: attending ? "Sí asiste" : "No asiste",
        personas:  attending ? guestCount : 0,
        fecha:     new Date().toLocaleDateString("es-MX"),
        hora:      new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
        attending: attending ? "true" : "false",
      });

      await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`);
      setSubmitted(true);
      setTimeout(() => loadRsvps(), 2000);

    } catch (err) {
      console.error("Error al enviar:", err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const loadRsvps = async () => {
    if (GOOGLE_SCRIPT_URL === "https://script.google.com/macros/s/AKfycby-a5de575ygIjzE7FnYAna2qmS7UYCpWsC-e6HT6wPSjgdpWKd8G5JgLx9_1TFiEmc/exec") return;
    setLoadingRsvps(true);
    try {
      const url = `${GOOGLE_SCRIPT_URL}?action=get&t=${Date.now()}`;
      const res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        credentials: "omit",
      });
      const text = await res.text();
      const json = JSON.parse(text);
      if (Array.isArray(json)) setAllRsvps(json);
    } catch (e) {
      console.error("Error cargando RSVPs:", e);
    } finally {
      setLoadingRsvps(false);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicOn) { audioRef.current.pause(); setMusicOn(false); }
    else { audioRef.current.play().then(() => setMusicOn(true)).catch(() => {}); }
  };

  const handlePhoto = (idx, e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const fr = new FileReader();
    fr.onload = ev => setPhotos(p => { const n = [...p]; n[idx] = ev.target.result; return n; });
    fr.readAsDataURL(file);
  };

  const scrollTo = i => secRefs.current[i]?.scrollIntoView({ behavior: "smooth" });

  // ── Abrir sobre ──
  const openEnvelope = () => {
    if (envelope !== "closed") return;
    setEnvelope("opening");
    setTimeout(() => setEnvelope("open"), 1500);
  };

  const confettiPieces = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${15 + Math.random() * 70}%`,
    color: [C.gold, C.goldLight, C.goldPale, "#fff", "#c8f0ff"][i % 5],
    size: Math.random() * 9 + 5,
    delay: Math.random() * 0.5,
    dur:   Math.random() * 0.7 + 0.7,
  })), []);

  // ── Toca la pantalla → siguiente sección ──
  const handleScreenTap = (e) => {
    const tag = e.target.tagName.toLowerCase();
    const interactive = ["button","input","label","a","select","textarea","svg","path","circle","ellipse","rect","line"];
    if (interactive.includes(tag)) return;
    if (e.target.closest("button,input,label,a,select,textarea,[data-noscroll]")) return;
    const next = active < 5 ? active + 1 : 0;
    scrollTo(next);
  };
  const footerTap = () => setAdminTaps(t => { if (t + 1 >= 5) { setShowAdmin(true); loadRsvps(); return 0; } return t + 1; });
  const rv = i => visible[i] ? "fu" : "";

  const totalGuests   = allRsvps.filter(r => r.attending).reduce((s, r) => s + (Number(r.personas) || 0), 0);
  const totalFamilies = allRsvps.filter(r => r.attending).length;

  const sec = (i, extra = {}) => ({
    ref: el => { secRefs.current[i] = el; }, "data-i": i,
    style: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 64px", position: "relative", overflow: "hidden", ...extra }
  });

  const Divider = () => <div style={{ width: 100, height: 1, background: `linear-gradient(90deg,transparent,${C.gold},transparent)`, margin: "0 auto" }} />;

  return (
    <div onClick={handleScreenTap} style={{ background: C.bg, color: C.white, fontFamily: "'Cormorant Garamond',serif", minHeight: "100vh", overflowX: "hidden", cursor: "default" }}>

      {/* ══════════════════════════════════════════════════════
          PANTALLA DE SOBRE — aparece antes de la invitación
      ══════════════════════════════════════════════════════ */}
      {envelope !== "open" && (
        <div className={envelope === "opening" ? "screen-out" : ""}
          onClick={openEnvelope}
          style={{
            position: "fixed", inset: 0, zIndex: 9000,
            background: `radial-gradient(ellipse at 50% 40%, #0a2a38, #011820)`,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            cursor: "pointer", userSelect: "none",
          }}>

          {/* Partículas de fondo */}
          <Sparkles />

          {/* Confeti al abrir */}
          {envelope === "opening" && confettiPieces.map(p => (
            <div key={p.id} style={{
              position: "absolute", top: "40%", left: p.left,
              width: p.size, height: p.size,
              background: p.color, borderRadius: p.size > 10 ? "50%" : 2,
              animation: `confettiDrop ${p.dur}s ${p.delay}s ease-in forwards`,
              zIndex: 10,
            }}/>
          ))}

          {/* Texto superior */}
          <p style={{
            fontFamily: "'Cinzel',serif", fontSize: "clamp(9px,1.8vw,11px)",
            letterSpacing: ".45em", color: C.gold, marginBottom: 40,
            opacity: envelope === "opening" ? 0 : 1, transition: "opacity .3s",
          }}>TIENES UNA INVITACIÓN</p>

          {/* ── SOBRE SVG ── */}
          <div className={envelope === "closed" ? "env-float" : "env-float-stop"}
            style={{ position: "relative", width: "clamp(240px,65vw,320px)", cursor: "pointer" }}>

            {/* Sombra del sobre */}
            <div style={{
              position: "absolute", bottom: -18, left: "10%", right: "10%", height: 20,
              background: "rgba(0,0,0,.4)", borderRadius: "50%", filter: "blur(12px)",
            }}/>

            {/* Cuerpo del sobre */}
            <svg viewBox="0 0 320 220" width="100%" style={{ display: "block", filter: `drop-shadow(0 12px 40px rgba(0,0,0,.6))` }}>
              {/* Cuerpo */}
              <rect x="0" y="30" width="320" height="190" rx="8" fill="#0d3244" stroke="#c9a84c" strokeWidth="1.5"/>
              {/* Pliegues diagonales del fondo */}
              <line x1="0" y1="220" x2="160" y2="120" stroke="#c9a84c" strokeWidth=".8" opacity=".35"/>
              <line x1="320" y1="220" x2="160" y2="120" stroke="#c9a84c" strokeWidth=".8" opacity=".35"/>
              {/* Triángulo inferior */}
              <polygon points="0,220 160,120 320,220" fill="#0a2a38" stroke="#c9a84c" strokeWidth=".8" opacity=".6"/>
              {/* Línea separadora superior del cuerpo */}
              <line x1="0" y1="30" x2="320" y2="30" stroke="#c9a84c" strokeWidth=".8" opacity=".4"/>

              {/* SOLAPA — se dobla hacia atrás al abrir */}
              <g style={{ transformOrigin: "160px 30px", transformBox: "fill-box" }}
                className={envelope === "opening" ? "flap-open" : ""}>
                <polygon points="0,30 160,130 320,30" fill="#0f3a52" stroke="#c9a84c" strokeWidth="1.2"/>
                {/* Textura de la solapa */}
                <line x1="60" y1="42" x2="160" y2="105" stroke="#c9a84c" strokeWidth=".4" opacity=".2"/>
                <line x1="260" y1="42" x2="160" y2="105" stroke="#c9a84c" strokeWidth=".4" opacity=".2"/>
              </g>

              {/* Borde dorado decorativo del sobre */}
              <rect x="6" y="36" width="308" height="178" rx="5" fill="none" stroke="#c9a84c" strokeWidth=".5" opacity=".3" strokeDasharray="4 4"/>
            </svg>

            {/* ── SELLO DE CERA ── */}
            <div className="seal-pulse" style={{
              position: "absolute",
              top: "38%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "clamp(64px,18vw,84px)",
              height: "clamp(64px,18vw,84px)",
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, #e8c86d, #9a6e1a, #5a3d08)`,
              border: "3px solid #c9a84c",
              boxShadow: `0 4px 20px rgba(0,0,0,.5), inset 0 2px 4px rgba(245,223,160,.3)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 5,
            }}>
              {/* Letra A en el sello */}
              <p style={{
                fontFamily: "'Great Vibes',cursive",
                fontSize: "clamp(30px,8vw,42px)",
                color: "#f5dfa0",
                textShadow: "0 1px 3px rgba(0,0,0,.5)",
                lineHeight: 1,
              }}>A</p>
              {/* Círculo del borde del sello */}
              <div style={{
                position: "absolute", inset: 4, borderRadius: "50%",
                border: "1.5px solid rgba(245,223,160,.5)",
              }}/>
              {/* Estrellas decorativas en el sello */}
              {[0,72,144,216,288].map(deg => (
                <div key={deg} style={{
                  position: "absolute", width: 3, height: 3, borderRadius: "50%",
                  background: "#f5dfa0", opacity: .7,
                  top: `calc(50% + ${Math.sin(deg*Math.PI/180)*26}px)`,
                  left: `calc(50% + ${Math.cos(deg*Math.PI/180)*26}px)`,
                  transform: "translate(-50%,-50%)",
                }}/>
              ))}
            </div>

            {/* Carta que asoma al abrir */}
            {envelope === "opening" && (
              <div className="letter-rise" style={{
                position: "absolute", top: 0, left: "15%", right: "15%",
                background: `linear-gradient(160deg, #f5dfa0, #e8c86d)`,
                borderRadius: 4, padding: "14px 18px", zIndex: 3,
                boxShadow: "0 -8px 30px rgba(201,168,76,.4)",
                textAlign: "center",
              }}>
                <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(18px,5vw,26px)", color: "#0d3244" }}>
                  Con cariño para ti...
                </p>
              </div>
            )}
          </div>

          {/* Texto inferior — instrucción */}
          <div style={{
            marginTop: 44, textAlign: "center",
            opacity: envelope === "opening" ? 0 : 1,
            transition: "opacity .3s",
          }}>
            <p style={{
              fontFamily: "'Great Vibes',cursive",
              fontSize: "clamp(22px,5vw,30px)",
              color: C.goldLight,
              marginBottom: 10,
            }}>
              {FAMILY_NAME !== "Familia Invitada" ? FAMILY_NAME : "Tu invitación te espera"}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", opacity: .55 }}>
              <div style={{ width: 30, height: 1, background: C.gold }}/>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".3em", color: C.gold }}>
                TOCA PARA ABRIR
              </p>
              <div style={{ width: 30, height: 1, background: C.gold }}/>
            </div>
          </div>

          {/* Esquinas del sobre */}
          <Corners size={130}/>
        </div>
      )}

      {/* 🎵 CANCIÓN DE FONDO
           Opciones para agregar "Best Day of My Life" de American Authors
           (o cualquier canción de Taylor Swift):

           OPCIÓN A — Sube tu MP3 al proyecto:
           1. Copia tu archivo .mp3 a la carpeta /public de tu proyecto Vite
           2. Cambia src por: src="/nombre-de-tu-cancion.mp3"

           OPCIÓN B — Usa un link directo de internet (si tienes uno legal)
           Cambia src por la URL directa del MP3
      */}
      <audio ref={audioRef} loop preload="none"
        src="/best-day-of-my-life.mp3"
      />

      <Sparkles />

      {/* ── Velo de transición elegante ── */}
      {txClass && (
        <div className={`tx-wrap ${txClass}`} style={{
          background: `linear-gradient(160deg,
            rgba(1,58,74,.92) 0%,
            rgba(201,168,76,.18) 45%,
            rgba(1,82,101,.92) 100%)`,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}>
          {/* Línea de luz que barre */}
          <div className="tx-sweep" />
          {/* Símbolo central sutil */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: "'Great Vibes',cursive",
            fontSize: "clamp(60px,15vw,100px)",
            color: "rgba(201,168,76,.25)",
            letterSpacing: ".1em",
            userSelect: "none",
          }}>Abby</div>
        </div>
      )}


      {/* ── Hint "toca para música" — solo aparece al inicio en móvil ── */}
      {showMusicHint && (
        <div style={{
          position: "fixed", bottom: 92, right: 16, zIndex: 1001,
          background: `rgba(1,58,74,.92)`, border: `1px solid rgba(201,168,76,.4)`,
          borderRadius: 24, padding: "8px 14px",
          display: "flex", alignItems: "center", gap: 7,
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          animation: "fadeUp .6s ease forwards",
          boxShadow: "0 4px 20px rgba(0,0,0,.3)",
        }}>
          <span style={{ fontSize: 16 }}>🎵</span>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".15em", color: C.gold, whiteSpace: "nowrap" }}>
            TOCA PARA ESCUCHAR
          </p>
        </div>
      )}

      {/* Botón música */}
      <button onClick={toggleMusic} className="bg" title={musicOn ? "Pausar música" : "Reproducir música"} style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 1000,
        width: 54, height: 54, borderRadius: "50%", border: "none",
        background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
        fontSize: 22, color: C.navy,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 4px 22px rgba(201,168,76,.5)`,
        animation: musicOn ? "pulse 1.8s infinite" : "none",
      }}>{musicOn ? "♪" : "♫"}</button>

      {/* ── Indicador "toca para avanzar" — esquina inferior izquierda ── */}
      {active < 5 && (
        <div data-noscroll="true" style={{ position: "fixed", bottom: 28, left: 28, zIndex: 998, display: "flex", flexDirection: "column", alignItems: "center", gap: 5, opacity: .45, pointerEvents: "none", animation: "fadeUp .6s ease forwards" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: C.gold, animation: "pulse 2.2s infinite" }}>↓</div>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: 7, letterSpacing: ".2em", color: C.gold, writingMode: "vertical-rl", transform: "rotate(180deg)" }}>TOCA</p>
        </div>
      )}

      {/* Nav dots */}
      <nav style={{ position: "fixed", right: 14, top: "50%", transform: "translateY(-50%)", zIndex: 999, display: "flex", flexDirection: "column", gap: 10 }}>
        {["Inicio","Invitación","Detalles","Ubicación","Galería","Confirmar"].map((lbl, i) => (
          <button key={i} onClick={() => scrollTo(i)} title={lbl} style={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${C.gold}`, background: active === i ? C.gold : "transparent", cursor: "pointer", padding: 0, transition: "all .3s", transform: active === i ? "scale(1.4)" : "scale(1)" }} />
        ))}
      </nav>

      {/* ═══ S1 PORTADA ═══════════════════════════════════════ */}
      <section {...sec(0, { background: `radial-gradient(ellipse at 50% 38%, ${C.navyLight}, ${C.bg})`, textAlign: "center", gap: 0 })}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
        <Corners size={160}/>

        <div className="fl" style={{ fontSize: 54, color: C.gold, textShadow: `0 0 40px ${C.gold}55`, marginBottom: 6 }}>♛</div>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(11px,2.2vw,14px)", letterSpacing: ".55em", color: C.gold, marginBottom: 2 }}>MIS</p>
        <h1 className={`gt ${rv(0)}`} style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(96px,23vw,155px)", fontWeight: 700, lineHeight: .82, letterSpacing: "-.02em" }}>XV</h1>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(11px,2.2vw,14px)", letterSpacing: ".55em", color: C.gold, marginBottom: 26 }}>— AÑOS —</p>
        <Divider />
        <div style={{ height: 20 }} />
        <h2 className={rv(0)} style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(66px,16vw,112px)", color: C.goldLight, textShadow: `0 4px 30px rgba(201,168,76,.3)`, lineHeight: 1.08, marginBottom: 18 }}>Abby</h2>

        {FAMILY_NAME !== "Familia Invitada" && (
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(10px,1.9vw,12px)", letterSpacing: ".25em", color: C.gold, marginBottom: 4 }}>
            Para: <em style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.25em", color: C.goldLight }}>{FAMILY_NAME}</em>
          </p>
        )}

        <button onClick={() => scrollTo(1)} className="gh" style={{ marginTop: 42, background: "transparent", border: `1px solid rgba(201,168,76,.4)`, color: C.gold, fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: ".28em", padding: "13px 38px", cursor: "pointer", borderRadius: 2, transition: "all .3s" }}>VER INVITACIÓN ↓</button>
        <div style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", opacity: .3 }}>
          <div style={{ width: 1, height: 36, background: C.gold, animation: "pulse 2s infinite", margin: "0 auto" }} />
        </div>
      </section>

      {/* ═══ S2 INVITACIÓN ════════════════════════════════════ */}
      <section {...sec(1, { background: `linear-gradient(180deg, ${C.bg}, ${C.navyMid}, ${C.bg})`, textAlign: "center" })}>
        <Corners size={160}/>
        <div className={rv(1)} style={{ maxWidth: 560, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
          <div style={{ color: C.gold, fontSize: 26, opacity: .5 }}>✦</div>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(9px,1.7vw,11px)", letterSpacing: ".42em", color: C.gold }}>CON LA BENDICIÓN DE DIOS</p>
          <p style={{ fontSize: "clamp(16px,3.2vw,21px)", color: C.dim, lineHeight: 2.1, fontStyle: "italic", fontWeight: 300 }}>
            Y el amor de mis padres,<br />tengo el honor de invitarte<br />a celebrar conmigo<br />
            <strong style={{ color: C.white, fontStyle: "normal", fontWeight: 400 }}>este día tan especial.</strong>
          </p>
          <Divider />
          <div className="hov" style={{ border: `1px solid rgba(201,168,76,.26)`, borderRadius: 14, padding: "32px 36px", background: `rgba(201,168,76,.04)`, boxShadow: "0 6px 28px rgba(0,0,0,.3)", width: "100%" }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(8px,1.6vw,10px)", letterSpacing: ".32em", color: C.gold, marginBottom: 20 }}>CON LA PRESENCIA DE MIS PADRES</p>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(30px,7vw,44px)", color: C.goldLight, lineHeight: 1.5 }}>María José Hernández</p>
            <p style={{ color: C.gold, margin: "4px 0", fontSize: 24 }}>&</p>
            <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(30px,7vw,44px)", color: C.goldLight, lineHeight: 1.5 }}>Carlos Alberto Martínez</p>
          </div>
          <div style={{ color: C.gold, fontSize: 22, opacity: .42 }}>✦</div>
        </div>
      </section>

      {/* ═══ S3 DETALLES + COUNTDOWN ══════════════════════════ */}
      <section {...sec(2, { background: `radial-gradient(ellipse at 30% 50%, ${C.navyLight}, ${C.bg} 70%)`, gap: 0, paddingTop: 70 })}>
        <Corners size={160}/>
        <div className={rv(2)} style={{ maxWidth: 680, width: "100%", textAlign: "center" }}>

          {/* Encabezado */}
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(9px,1.7vw,11px)", letterSpacing: ".42em", color: C.gold, marginBottom: 8 }}>— DETALLES DEL EVENTO —</p>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(48px,11vw,68px)", color: C.goldLight, marginBottom: 32, textShadow: `0 4px 24px rgba(201,168,76,.3)` }}>Una noche inolvidable</h2>

          {/* ── Timeline del programa ── */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 0, marginBottom: 32 }}>
            {/* Línea vertical */}
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: `linear-gradient(180deg, transparent, ${C.gold}, ${C.gold}, transparent)`, transform: "translateX(-50%)", opacity: .4 }}/>

            {[
              { time: "4:00 PM", icon: "church", title: "Ceremonia Religiosa", desc: "Parroquia de San José Esposo de la Virgen María", side: "left" },
              { time: "7:30 PM", icon: "hall",   title: "Recepción & Fiesta",  desc: "Salón La Galería Eventos", side: "right" },
            ].map((ev, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: i === 0 ? 24 : 0 }}>
                {/* Lado izquierdo */}
                <div style={{ flex: 1, textAlign: "right", padding: "0 20px 0 0", opacity: ev.side === "left" ? 1 : .35 }}>
                  {ev.side === "left" && <>
                    <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(18px,4vw,24px)", color: C.gold, fontWeight: 700 }}>{ev.time}</p>
                    <p style={{ fontSize: "clamp(13px,2.5vw,16px)", color: C.white, fontWeight: 600, marginTop: 2 }}>{ev.title}</p>
                    <p style={{ fontSize: 11, color: C.goldLight, opacity: .65, marginTop: 2 }}>{ev.desc}</p>
                  </>}
                </div>
                {/* Nodo central */}
                <div style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${C.gold}`, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 0 22px rgba(201,168,76,.4)`, zIndex: 1 }}>
                  {ev.icon === "church" ? (
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      {/* Cruz */}
                      <line x1="14" y1="1" x2="14" y2="7"/>
                      <line x1="11" y1="4" x2="17" y2="4"/>
                      {/* Torre central */}
                      <rect x="11" y="7" width="6" height="7" fill="none"/>
                      {/* Nave principal */}
                      <rect x="5" y="14" width="18" height="12" fill="none"/>
                      {/* Puerta */}
                      <path d="M12 26 L12 21 Q14 19 16 21 L16 26"/>
                      {/* Ventana redonda */}
                      <circle cx="14" cy="17" r="2" fill="none"/>
                      {/* Escalones */}
                      <line x1="3" y1="26" x2="25" y2="26"/>
                    </svg>
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      {/* Techo del salón */}
                      <polyline points="2,11 14,3 26,11"/>
                      {/* Cuerpo */}
                      <rect x="4" y="11" width="20" height="15" fill="none"/>
                      {/* Puerta doble */}
                      <rect x="10" y="18" width="3.5" height="8" fill="none"/>
                      <rect x="14.5" y="18" width="3.5" height="8" fill="none"/>
                      {/* Ventanas */}
                      <rect x="5.5" y="14" width="4" height="4" fill="none"/>
                      <rect x="18.5" y="14" width="4" height="4" fill="none"/>
                      {/* Banderines de fiesta */}
                      <path d="M4 3 Q7 5 10 3 Q13 1 14 3" strokeWidth="1"/>
                      <path d="M14 3 Q15 1 18 3 Q21 5 24 3" strokeWidth="1"/>
                      {/* Destellos decorativos */}
                      <circle cx="22" cy="8" r=".8" fill="#c9a84c" stroke="none"/>
                      <circle cx="6"  cy="8" r=".8" fill="#c9a84c" stroke="none"/>
                    </svg>
                  )}
                </div>
                {/* Lado derecho */}
                <div style={{ flex: 1, textAlign: "left", padding: "0 0 0 20px", opacity: ev.side === "right" ? 1 : .35 }}>
                  {ev.side === "right" && <>
                    <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(18px,4vw,24px)", color: C.gold, fontWeight: 700 }}>{ev.time}</p>
                    <p style={{ fontSize: "clamp(13px,2.5vw,16px)", color: C.white, fontWeight: 600, marginTop: 2 }}>{ev.title}</p>
                    <p style={{ fontSize: 11, color: C.goldLight, opacity: .65, marginTop: 2 }}>{ev.desc}</p>
                  </>}
                </div>
              </div>
            ))}
          </div>

          {/* ── Info extra: fecha y vestimenta ── */}
          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            {[
              { icon: "📅", label: "FECHA", val: "13 de Junio 2026" },
              { icon: "👗", label: "VESTIMENTA", val: "Formal Elegante" },
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: `rgba(201,168,76,.07)`, border: `1px solid rgba(201,168,76,.25)`, borderRadius: 40, padding: "10px 22px" }}>
                <span style={{ fontSize: 18 }}>{d.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: 7, letterSpacing: ".22em", color: C.gold, marginBottom: 2 }}>{d.label}</p>
                  <p style={{ fontSize: "clamp(13px,2.5vw,15px)", color: C.white }}>{d.val}</p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".28em", color: C.gold, opacity: .7 }}>✦ TU PRESENCIA ES EL MEJOR REGALO ✦</p>
        </div>
      </section>

      {/* ═══ S4 CUENTA REGRESIVA + UBICACIONES ═══════════════ */}
      <section {...sec(3, { background: `radial-gradient(ellipse at 60% 40%, ${C.navyLight}, ${C.bg} 70%)`, gap: 28 })}>
        <Corners size={160}/>
        <div className={rv(3)} style={{ maxWidth: 680, width: "100%", textAlign: "center" }}>

          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(9px,1.7vw,11px)", letterSpacing: ".42em", color: C.gold, marginBottom: 8 }}>— FALTAN —</p>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(44px,10vw,62px)", color: C.goldLight, marginBottom: 28, textShadow: `0 4px 24px rgba(201,168,76,.3)` }}>¡Ya casi es el gran día!</h2>

          {/* ── Countdown grande ── */}
          <div style={{ border: `1px solid rgba(201,168,76,.35)`, borderRadius: 20, padding: "28px 20px 32px", background: `linear-gradient(135deg, rgba(201,168,76,.07), rgba(1,136,164,.1))`, marginBottom: 36, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 260, height: 80, background: `radial-gradient(ellipse, rgba(201,168,76,.18), transparent)`, pointerEvents: "none" }}/>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".35em", color: C.gold, marginBottom: 24 }}>✦ CUENTA REGRESIVA ✦</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "clamp(10px,3vw,24px)" }}>
              {[["DÍAS","d"],["HORAS","h"],["MIN","m"],["SEG","s"]].map(([lbl,k]) => (
                <div key={k} style={{ textAlign: "center" }}>
                  <div style={{ background: `linear-gradient(180deg, ${C.navyLight}, ${C.navy})`, border: `1px solid rgba(201,168,76,.4)`, borderRadius: 14, padding: "14px 16px", minWidth: "clamp(60px,14vw,80px)", marginBottom: 10, boxShadow: `0 6px 20px rgba(0,0,0,.35), inset 0 1px 0 rgba(201,168,76,.15)`, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(201,168,76,.5), transparent)` }}/>
                    <p className="gt" style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(32px,8vw,52px)", fontWeight: 700, lineHeight: 1 }}>
                      {String(countdown[k] ?? 0).padStart(2, "0")}
                    </p>
                  </div>
                  <p style={{ fontSize: "clamp(7px,1.4vw,10px)", letterSpacing: ".25em", color: C.gold, opacity: .75, fontFamily: "'Cinzel',serif" }}>{lbl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Ubicaciones ── */}
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(9px,1.7vw,11px)", letterSpacing: ".42em", color: C.gold, marginBottom: 18 }}>— CÓMO LLEGAR —</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
            {[
              {
                icon: "church", tag: "CEREMONIA · 4:00 PM",
                name: "Parroquia de San José\nEsposo de la Virgen María",
                addr: "Av. Principal #123, Colonia Centro",
                url: "https://maps.google.com/?q=Parroquia+San+Jose+Esposo+Virgen+Maria+Monterrey",
                color: C.navyLight,
              },
              {
                icon: "hall", tag: "RECEPCIÓN · 7:30 PM",
                name: "Salón La Galería Eventos",
                addr: "Av. Eventos #456, Colonia Las Flores",
                url: "https://maps.google.com/?q=Salon+La+Galeria+Eventos+Monterrey",
                color: C.navyMid,
              },
            ].map((loc, i) => (
              <div key={i} className="hov" style={{ borderRadius: 16, overflow: "hidden", border: `1px solid rgba(201,168,76,.28)`, boxShadow: "0 8px 32px rgba(0,0,0,.35)", background: `linear-gradient(160deg, ${loc.color}88, ${C.bg})` }}>
                <div style={{ padding: "18px 20px 14px", borderBottom: `1px solid rgba(201,168,76,.15)`, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "transparent", border: `1.5px solid rgba(201,168,76,.5)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 0 16px rgba(201,168,76,.2)` }}>
                    {loc.icon === "church" ? (
                      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="14" y1="1" x2="14" y2="7"/><line x1="11" y1="4" x2="17" y2="4"/>
                        <rect x="11" y="7" width="6" height="7" fill="none"/>
                        <rect x="5" y="14" width="18" height="12" fill="none"/>
                        <path d="M12 26 L12 21 Q14 19 16 21 L16 26"/>
                        <circle cx="14" cy="17" r="2" fill="none"/>
                        <line x1="3" y1="26" x2="25" y2="26"/>
                      </svg>
                    ) : (
                      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2,11 14,3 26,11"/>
                        <rect x="4" y="11" width="20" height="15" fill="none"/>
                        <rect x="10" y="18" width="3.5" height="8" fill="none"/>
                        <rect x="14.5" y="18" width="3.5" height="8" fill="none"/>
                        <rect x="5.5" y="14" width="4" height="4" fill="none"/>
                        <rect x="18.5" y="14" width="4" height="4" fill="none"/>
                        <path d="M4 3 Q7 5 10 3 Q13 1 14 3" strokeWidth="1"/>
                        <path d="M14 3 Q15 1 18 3 Q21 5 24 3" strokeWidth="1"/>
                        <circle cx="22" cy="8" r=".8" fill="#c9a84c" stroke="none"/>
                        <circle cx="6"  cy="8" r=".8" fill="#c9a84c" stroke="none"/>
                      </svg>
                    )}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontFamily: "'Cinzel',serif", fontSize: 7, letterSpacing: ".22em", color: C.gold, marginBottom: 4 }}>{loc.tag}</p>
                    <p style={{ fontSize: "clamp(13px,2.5vw,15px)", color: C.white, fontWeight: 600, lineHeight: 1.35, whiteSpace: "pre-line" }}>{loc.name}</p>
                  </div>
                </div>
                <div style={{ padding: "14px 20px 18px" }}>
                  <p style={{ fontSize: 12, color: C.goldLight, opacity: .7, marginBottom: 14, textAlign: "left", lineHeight: 1.6 }}>📍 {loc.addr}</p>
                  <a href={loc.url} target="_blank" rel="noopener noreferrer" className="loc-btn"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%",
                      background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                      color: "#012030", fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".2em",
                      fontWeight: 700, padding: "12px 0", borderRadius: 8, textDecoration: "none",
                      boxShadow: `0 4px 16px rgba(201,168,76,.3)`, transition: "all .3s",
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#012030" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    ABRIR EN GOOGLE MAPS
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S5 GALERÍA — Carrusel ════════════════════════════ */}
      <section {...sec(4, { background: `linear-gradient(180deg, ${C.bg}, ${C.navyMid}, ${C.bg})`, gap: 28, padding: "70px 0 60px" })}>
        <Corners size={160}/>
        <div className={rv(4)} style={{ width: "100%", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(9px,1.7vw,11px)", letterSpacing: ".42em", color: C.gold, marginBottom: 8, padding: "0 24px" }}>— GALERÍA —</p>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(48px,11vw,66px)", color: C.goldLight, marginBottom: 28, padding: "0 24px", textShadow: `0 4px 24px rgba(201,168,76,.3)` }}>Mis Momentos</h2>

          <Carousel />
        </div>
      </section>

      {/* ═══ S6 RSVP ══════════════════════════════════════════ */}
      <section {...sec(5, { background: `radial-gradient(ellipse at 50% 52%, ${C.navyLight}, ${C.bg})`, gap: 24 })}>
        <Corners size={160}/>
        <div className={rv(5)} style={{ maxWidth: 470, width: "100%", textAlign: "center" }}>
          <div className="fl" style={{ fontSize: 38, color: C.gold, marginBottom: 14 }}>✉</div>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(9px,1.7vw,11px)", letterSpacing: ".42em", color: C.gold, marginBottom: 8 }}>— CONFIRMA TU ASISTENCIA —</p>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(44px,10vw,60px)", color: C.goldLight, marginBottom: 30 }}>¿Nos acompañas?</h2>

          {/* ── Si ya confirmó que SÍ → bloqueado, no puede cambiar ── */}
          {submitted && attending === true && (
            <div style={{ border: `1px solid rgba(201,168,76,.4)`, borderRadius: 16, padding: "40px 28px", background: `rgba(201,168,76,.07)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              {/* Sello de confirmado */}
              <div style={{ width: 72, height: 72, borderRadius: "50%", border: `2px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, background: `rgba(201,168,76,.1)` }}>✓</div>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(10px,2vw,12px)", letterSpacing: ".3em", color: C.gold }}>ASISTENCIA CONFIRMADA</p>
              <p style={{ fontSize: "clamp(18px,4vw,23px)", color: C.white, fontWeight: 400 }}>¡Qué emoción! Te esperamos</p>
              <p style={{ fontSize: "clamp(15px,3vw,18px)", color: C.goldLight }}>
                Confirmaste <strong style={{ color: C.gold }}>{guestCount}</strong> {guestCount === 1 ? "persona" : "personas"}
              </p>
              <Divider />
              <p style={{ fontSize: 13, color: C.gold, opacity: .65, fontStyle: "italic", lineHeight: 1.9, textAlign: "center" }}>
                Nos vemos el 13 de junio 🌹<br/>Salón La Galería · 7:30 PM
              </p>
              {/* Candado visual — no puede cambiar */}
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, opacity: .4 }}>
                <span style={{ fontSize: 14 }}>🔒</span>
                <p style={{ fontSize: 11, color: C.gold, fontFamily: "'Cinzel',serif", letterSpacing: ".15em" }}>CONFIRMACIÓN REGISTRADA</p>
              </div>
            </div>
          )}

          {/* ── Si dijo que NO → puede arrepentirse ── */}
          {submitted && attending === false && (
            <div style={{ border: `1px solid rgba(201,168,76,.25)`, borderRadius: 16, padding: "36px 28px", background: `rgba(255,255,255,.03)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 48 }}>💙</div>
              <p style={{ fontSize: "clamp(17px,3.5vw,22px)", color: C.white }}>Gracias por avisarnos</p>
              <p style={{ fontSize: 14, color: C.gold, opacity: .65, fontStyle: "italic", lineHeight: 1.8, textAlign: "center" }}>
                Lamentamos que no puedas venir.<br/>Tu amistad siempre será bienvenida 💛
              </p>
              <Divider />
              {/* Opción de arrepentirse */}
              <p style={{ fontSize: 13, color: C.dim, fontStyle: "italic", opacity: .7 }}>
                ¿Cambiaste de opinión?
              </p>
              <button
                onClick={() => { setSubmitted(false); setAttending(null); setGuestCount(1); }}
                className="bg"
                style={{
                  padding: "14px 28px", borderRadius: 8, border: `1px solid ${C.gold}`,
                  background: "transparent", color: C.gold,
                  fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: ".22em",
                  cursor: "pointer", transition: "all .3s",
                }}
              >
                🎉 ¡ME ARREPENTÍ, SÍ VOY!
              </button>
            </div>
          )}

          {/* ── Formulario — solo si NO ha enviado ── */}
          {!submitted && (
            <div style={{ border: `1px solid rgba(201,168,76,.18)`, borderRadius: 16, padding: "30px 22px", background: "rgba(255,255,255,.03)", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ textAlign: "left" }}>
                <label style={{ display: "block", fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".22em", color: C.gold, marginBottom: 8 }}>NOMBRE O FAMILIA</label>
                <input value={guestName} readOnly style={{ width: "100%", background: "rgba(255,255,255,.03)", border: `1px solid rgba(201,168,76,.2)`, borderRadius: 8, padding: "12px 16px", color: C.goldLight, fontSize: "clamp(15px,2.8vw,18px)", fontFamily: "'Cormorant Garamond',serif", cursor: "default", userSelect: "none" }} />
              </div>

              <div>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".22em", color: C.gold, marginBottom: 12, textAlign: "left" }}>¿CONFIRMAS ASISTENCIA?</p>
                <div style={{ display: "flex", gap: 10 }}>
                  {[{ v: true, icon: "🎉", txt: "Sí, asistiré" }, { v: false, icon: "💙", txt: "No podré ir" }].map(opt => (
                    <button key={String(opt.v)} onClick={() => setAttending(opt.v)} style={{ flex: 1, padding: "16px 8px", borderRadius: 8, cursor: "pointer", border: `1px solid ${attending === opt.v ? C.gold : "rgba(201,168,76,.2)"}`, background: attending === opt.v ? `linear-gradient(135deg,rgba(201,168,76,.22),rgba(201,168,76,.08))` : "transparent", color: attending === opt.v ? C.gold : C.dim, fontFamily: "'Cinzel',serif", fontSize: "clamp(13px,3vw,16px)", letterSpacing: ".05em", transition: "all .3s" }}>{opt.icon} {opt.txt}</button>
                  ))}
                </div>
              </div>

              {attending === true && (
                <div>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".2em", color: C.gold, marginBottom: 14, textAlign: "left" }}>¿CUÁNTAS PERSONAS? (máx. {MAX_GUESTS})</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22 }}>
                    <button onClick={() => setGuestCount(g => Math.max(1, g - 1))} style={{ width: 44, height: 44, borderRadius: "50%", border: `1px solid ${C.gold}`, background: "transparent", color: C.gold, fontSize: 24, cursor: "pointer", transition: "all .3s" }}>−</button>
                    <span style={{ fontSize: 46, color: C.white, minWidth: 52, textAlign: "center", fontFamily: "'Cinzel',serif", fontWeight: 600 }}>{guestCount}</span>
                    <button onClick={() => setGuestCount(g => Math.min(MAX_GUESTS, g + 1))} style={{ width: 44, height: 44, borderRadius: "50%", border: `1px solid ${C.gold}`, background: "transparent", color: C.gold, fontSize: 24, cursor: "pointer", transition: "all .3s" }}>+</button>
                  </div>
                  <p style={{ fontSize: 12, color: C.gold, opacity: .5, marginTop: 10, fontStyle: "italic" }}>Puedes asistir en compañía de tu familia</p>
                </div>
              )}

              <button onClick={submitRsvp} disabled={attending === null || submitting} className="bg" style={{ padding: "16px", borderRadius: 8, border: "none", background: attending === null ? "rgba(201,168,76,.22)" : `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: C.navy, fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: ".26em", fontWeight: 700, opacity: attending === null ? .5 : 1, boxShadow: attending !== null ? `0 5px 22px rgba(201,168,76,.32)` : "none" }}>
                {submitting ? "ENVIANDO..." : "CONFIRMAR ASISTENCIA"}
              </button>
            </div>
          )}
        </div>

        {/* Footer — presiona 5 veces para panel admin */}
        <div onClick={footerTap} data-noscroll="true" style={{ marginTop: 58, textAlign: "center", opacity: .3, cursor: "default", userSelect: "none" }}>
          <Divider />
          <div style={{ height: 12 }} />
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: ".38em", color: C.gold }}>♛ ABBY XV AÑOS · 13 JUNIO 2026 ♛</p>
          <p style={{ fontSize: 9, color: C.gold, opacity: .5, marginTop: 5, letterSpacing: ".15em" }}>SALÓN LA GALERÍA EVENTOS</p>
        </div>
      </section>

      {/* ═══ ADMIN PANEL ══════════════════════════════════════ */}
      {showAdmin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(4,8,18,.97)", zIndex: 2000, overflowY: "auto", padding: 24 }}>
          <div style={{ maxWidth: 620, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, paddingBottom: 16, borderBottom: `1px solid rgba(201,168,76,.3)` }}>
              <div>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: ".32em", color: C.gold, marginBottom: 4 }}>PANEL PRIVADO</p>
                <h2 style={{ fontFamily: "'Cinzel',serif", color: C.white, fontSize: 20, letterSpacing: ".1em" }}>Confirmaciones</h2>
              </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={loadRsvps} className="gh" style={{ background: "transparent", border: `1px solid rgba(201,168,76,.4)`, color: C.gold, padding: "8px 14px", cursor: "pointer", borderRadius: 6, fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".12em", transition: "all .25s" }}>
                  {loadingRsvps ? "CARGANDO..." : "↻ RECARGAR"}
                </button>
                <a href={`${GOOGLE_SCRIPT_URL}?action=get`} target="_blank" rel="noopener noreferrer"
                  style={{ background: "transparent", border: `1px solid rgba(201,168,76,.25)`, color: C.dimWhite, padding: "8px 14px", cursor: "pointer", borderRadius: 6, fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".12em", textDecoration: "none", display: "flex", alignItems: "center" }}>
                  🔗 PROBAR URL
                </a>
                <button onClick={() => setShowAdmin(false)} className="gh" style={{ background: "transparent", border: `1px solid rgba(201,168,76,.4)`, color: C.gold, padding: "8px 18px", cursor: "pointer", borderRadius: 6, fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".15em", transition: "all .25s" }}>✕ CERRAR</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 22 }}>
              {[
                { lbl: "TOTAL PERSONAS", val: totalGuests, hi: true },
                { lbl: "FAMILIAS CONF.", val: totalFamilies, hi: true },
                { lbl: "NO ASISTEN",    val: allRsvps.filter(r => !r.attending).length, hi: false },
              ].map((s, i) => (
                <div key={i} style={{ background: `rgba(201,168,76,.07)`, border: `1px solid rgba(201,168,76,.2)`, borderRadius: 10, padding: "16px 10px", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: 7, letterSpacing: ".2em", color: C.gold, marginBottom: 8 }}>{s.lbl}</p>
                  <p className={s.hi ? "gt" : ""} style={{ fontFamily: "'Cinzel',serif", fontSize: 34, fontWeight: 700, color: s.hi ? undefined : C.dim }}>{s.val}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {loadingRsvps
                ? <p style={{ textAlign: "center", color: C.gold, opacity: .55, fontStyle: "italic", padding: 40 }}>Cargando confirmaciones...</p>
                : allRsvps.length === 0
                  ? <div style={{ textAlign: "center", padding: 40 }}>
                      <p style={{ color: C.gold, opacity: .45, fontStyle: "italic", marginBottom: 12 }}>No se encontraron confirmaciones</p>
                      <p style={{ color: C.gold, opacity: .3, fontSize: 11, fontFamily: "'Cinzel',serif", letterSpacing: ".1em" }}>Toca "PROBAR URL" para verificar la conexión con Google Sheets</p>
                    </div>
                : allRsvps.map((r, i) => (
                  <div key={i} style={{ background: r.attending ? "rgba(201,168,76,.08)" : "rgba(255,255,255,.025)", border: `1px solid ${r.attending ? "rgba(201,168,76,.28)" : "rgba(255,255,255,.07)"}`, borderRadius: 10, padding: "15px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ color: C.white, fontSize: 16, marginBottom: 3 }}>{r.familia}</p>
                      <p style={{ fontSize: 11, color: C.gold, opacity: .5 }}>{r.fecha} · {r.hora}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 20 }}>{r.attending ? "✅" : "❌"}</p>
                      <p style={{ fontSize: 13, color: r.attending ? C.gold : C.dim, opacity: r.attending ? 1 : .45 }}>{r.attending ? `${r.personas} pers.` : "No asiste"}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
