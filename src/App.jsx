import { useState, useEffect, useRef, useMemo } from "react";

const getParam = (k) => { try { return new URLSearchParams(window.location.search).get(k); } catch { return null; } };
const FAMILY_NAME = getParam("familia") || "Familia Invitada";
const MAX_GUESTS  = Math.max(1, parseInt(getParam("invitados") || "2"));

// 👇 PEGA AQUÍ la URL de tu Google Apps Script (ver instrucciones abajo)
const GOOGLE_SCRIPT_URL = "PEGA_AQUÍ_TU_URL";

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

export default function QuinceInvitation() {
  const [active, setActive]         = useState(0);
  const [attending, setAttending]   = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [guestName, setGuestName]   = useState(FAMILY_NAME);
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [allRsvps, setAllRsvps]     = useState([]);
  const [showAdmin, setShowAdmin]   = useState(false);
  const [adminTaps, setAdminTaps]   = useState(0);
  const [photos, setPhotos]         = useState(Array(4).fill(null));
  const [musicOn, setMusicOn]       = useState(false);
  const [visible, setVisible]       = useState({});
  const audioRef  = useRef(null);
  const secRefs   = useRef([]);
  const countdown = useCountdown("2026-06-13T19:30:00");

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
      .gt{background:linear-gradient(90deg,#c9a84c,#f5dfa0,#e8c86d,#f5dfa0,#c9a84c);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite;}
      .fu{animation:fadeUp .85s cubic-bezier(.16,1,.3,1) forwards;}
      .fl{animation:float 3.5s ease-in-out infinite;}
      .hov{transition:transform .3s,box-shadow .3s;} .hov:hover{transform:translateY(-5px);box-shadow:0 18px 45px rgba(0,0,0,.55)!important;}
      .bg{transition:all .3s;cursor:pointer;} .bg:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(201,168,76,.45)!important;}
      .gh:hover{background:rgba(201,168,76,.1)!important;border-color:#c9a84c!important;}
      .sl{transition:all .3s;animation:glow 3s ease-in-out infinite;} .sl:hover{transform:scale(1.025);border-color:#c9a84c!important;}
      button:active{transform:scale(.97)!important;} input{outline:none!important;}
      input:focus{border-color:#c9a84c!important;box-shadow:0 0 0 2px rgba(201,168,76,.15)!important;}
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const i = parseInt(e.target.dataset.i || "0");
        if (e.isIntersecting) { setActive(i); setVisible(v => ({ ...v, [i]: true })); }
      });
    }, { threshold: 0.35 });
    secRefs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    loadRsvps();
    (async () => {
      try {
        const key = `rsvp-${FAMILY_NAME.toLowerCase().replace(/\s+/g, "-")}`;
        const r = await window.storage.get(key, true);
        if (r) { const d = JSON.parse(r.value); setAttending(d.attending); setGuestCount(d.guests || 1); setSubmitted(true); }
      } catch {}
    })();
  }, []);

  const loadRsvps = async () => {
    try {
      const list = await window.storage.list("rsvp-", true);
      if (!list?.keys?.length) return;
      const data = await Promise.all(list.keys.map(async k => {
        try { const r = await window.storage.get(k, true); return r ? JSON.parse(r.value) : null; } catch { return null; }
      }));
      setAllRsvps(data.filter(Boolean));
    } catch {}
  };

  const submitRsvp = async () => {
    setSubmitting(true);
    try {
      const data = {
        familia:   guestName || FAMILY_NAME,
        asistencia: attending ? "Sí asiste" : "No asiste",
        personas:  attending ? guestCount : 0,
        fecha:     new Date().toLocaleDateString("es-MX"),
        hora:      new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
      };

      // ── Enviar a Google Sheets via Apps Script ──
      if (GOOGLE_SCRIPT_URL !== "PEGA_AQUÍ_TU_URL") {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors", // requerido para Apps Script
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      // ── También guardar localmente (panel admin) ──
      try {
        const key = `rsvp-${(guestName || FAMILY_NAME).toLowerCase().replace(/\s+/g, "-")}`;
        await window.storage.set(key, JSON.stringify({ ...data, attending }), true);
        await loadRsvps();
      } catch {}

      setSubmitted(true);
    } catch (err) {
      console.error("Error al enviar:", err);
      setSubmitted(true); // Mostrar éxito igual para no frustrar al usuario
    } finally {
      setSubmitting(false);
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
  const footerTap = () => setAdminTaps(t => { if (t + 1 >= 5) { setShowAdmin(true); loadRsvps(); return 0; } return t + 1; });
  const rv = i => visible[i] ? "fu" : "";

  const totalGuests   = allRsvps.filter(r => r.attending).reduce((s, r) => s + (r.guests || 0), 0);
  const totalFamilies = allRsvps.filter(r => r.attending).length;

  const sec = (i, extra = {}) => ({
    ref: el => { secRefs.current[i] = el; }, "data-i": i,
    style: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 64px", position: "relative", overflow: "hidden", ...extra }
  });

  const Divider = () => <div style={{ width: 100, height: 1, background: `linear-gradient(90deg,transparent,${C.gold},transparent)`, margin: "0 auto" }} />;

  return (
    <div style={{ background: C.bg, color: C.white, fontFamily: "'Cormorant Garamond',serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* 🎵 Reemplaza el src con el URL de tu canción favorita */}
      <audio ref={audioRef} loop preload="none" src="https://www.bensound.com/bensound-music/bensound-romantic.mp3" />

      <Sparkles />

      {/* Botón música */}
      <button onClick={toggleMusic} className="bg" title={musicOn ? "Pausar" : "Música"} style={{ position: "fixed", bottom: 28, right: 28, zIndex: 1000, width: 54, height: 54, borderRadius: "50%", border: "none", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, fontSize: 22, color: C.navy, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 22px rgba(201,168,76,.5)`, animation: musicOn ? "pulse 1.8s infinite" : "none" }}>{musicOn ? "♪" : "♫"}</button>

      {/* Nav dots */}
      <nav style={{ position: "fixed", right: 14, top: "50%", transform: "translateY(-50%)", zIndex: 999, display: "flex", flexDirection: "column", gap: 10 }}>
        {["Inicio", "Invitación", "Detalles", "Galería", "Confirmar"].map((lbl, i) => (
          <button key={i} onClick={() => scrollTo(i)} title={lbl} style={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${C.gold}`, background: active === i ? C.gold : "transparent", cursor: "pointer", padding: 0, transition: "all .3s", transform: active === i ? "scale(1.4)" : "scale(1)" }} />
        ))}
      </nav>

      {/* ═══ S1 PORTADA ═══════════════════════════════════════ */}
      <section {...sec(0, { background: `radial-gradient(ellipse at 50% 38%, ${C.navyLight}, ${C.bg})`, textAlign: "center", gap: 0 })}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />
        {/* Ornamentos florales en las 4 esquinas */}
        <div style={{ position:"absolute", top:0, left:0, pointerEvents:"none" }}>
          <CornerFloral size={160}/>
        </div>
        <div style={{ position:"absolute", top:0, right:0, pointerEvents:"none" }}>
          <CornerFloral size={160} flip/>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, pointerEvents:"none" }}>
          <CornerFloral size={160} flipY/>
        </div>
        <div style={{ position:"absolute", bottom:0, right:0, pointerEvents:"none" }}>
          <CornerFloral size={160} flip flipY/>
        </div>

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
        <div style={{ position:"absolute", top:0, left:0, pointerEvents:"none", opacity:.5 }}><CornerFloral size={110}/></div>
        <div style={{ position:"absolute", top:0, right:0, pointerEvents:"none", opacity:.5 }}><CornerFloral size={110} flip/></div>
        <div style={{ position:"absolute", bottom:0, left:0, pointerEvents:"none", opacity:.5 }}><CornerFloral size={110} flipY/></div>
        <div style={{ position:"absolute", bottom:0, right:0, pointerEvents:"none", opacity:.5 }}><CornerFloral size={110} flip flipY/></div>        <div className={rv(1)} style={{ maxWidth: 560, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
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
      <section {...sec(2, { background: `radial-gradient(ellipse at 50% 58%, ${C.navyLight}, ${C.bg})`, gap: 32 })}>
        <div className={rv(2)} style={{ maxWidth: 680, width: "100%", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(9px,1.7vw,11px)", letterSpacing: ".42em", color: C.gold, marginBottom: 10 }}>— DETALLES DEL EVENTO —</p>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(48px,11vw,68px)", color: C.goldLight, marginBottom: 36 }}>Una noche inolvidable</h2>

          {/* Info rápida: fecha, hora, vestimenta */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(148px,1fr))", gap: 13, marginBottom: 28 }}>
            {[
              { icon: "📅", label: "FECHA",      val: "13 de Junio",  sub: "2026" },
              { icon: "🕖", label: "HORA",       val: "7:30 PM",      sub: "En punto" },
              { icon: "👗", label: "VESTIMENTA", val: "Formal",       sub: "Elegante" },
            ].map((d, i) => (
              <div key={i} className="hov" style={{ background: `linear-gradient(135deg,rgba(255,255,255,.04),rgba(201,168,76,.04))`, border: `1px solid rgba(201,168,76,.24)`, borderRadius: 12, padding: "22px 12px", textAlign: "center", cursor: "default", boxShadow: "0 5px 22px rgba(0,0,0,.28)" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{d.icon}</div>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: ".22em", color: C.gold, marginBottom: 6 }}>{d.label}</p>
                <p style={{ fontSize: "clamp(14px,2.5vw,18px)", color: C.white, fontWeight: 600, marginBottom: 3 }}>{d.val}</p>
                <p style={{ fontSize: 12, color: C.goldLight, opacity: .75 }}>{d.sub}</p>
              </div>
            ))}
          </div>

          {/* ── Ubicaciones con Google Maps ── */}
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(9px,1.7vw,11px)", letterSpacing: ".42em", color: C.gold, marginBottom: 16 }}>— UBICACIONES —</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, marginBottom: 28 }}>

            {/* IGLESIA */}
            <div className="hov" style={{ background: `linear-gradient(135deg,rgba(255,255,255,.04),rgba(201,168,76,.04))`, border: `1px solid rgba(201,168,76,.28)`, borderRadius: 14, overflow: "hidden", boxShadow: "0 6px 28px rgba(0,0,0,.35)" }}>
              {/* Mini mapa embebido — reemplaza el src con el iframe de tu iglesia */}
              <iframe
                title="Iglesia"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594!2d-100.3161!3d25.6866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQxJzExLjgiTiAxMDDCsDE4JzU4LjAiVw!5e0!3m2!1ses!2smx!4v1234567890"
                width="100%" height="160" style={{ border: 0, display: "block", filter: "invert(.9) hue-rotate(180deg) saturate(0.6)" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>⛪</span>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: ".22em", color: C.gold }}>CEREMONIA RELIGIOSA</p>
                </div>
                <p style={{ fontSize: "clamp(14px,2.5vw,17px)", color: C.white, fontWeight: 600, marginBottom: 4 }}>
                  {/* 👇 Cambia por el nombre de tu iglesia */}
                  Parroquia San Juan Bautista
                </p>
                <p style={{ fontSize: 12, color: C.goldLight, opacity: .7, marginBottom: 14 }}>
                  {/* 👇 Cambia por la dirección de tu iglesia */}
                  Av. Principal #123, Colonia Centro
                </p>
                {/* 👇 Reemplaza el href con el link de Google Maps de tu iglesia */}
                <a href="https://maps.google.com/?q=Parroquia+San+Juan+Bautista+Monterrey" target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                  color: "#07101f", fontFamily: "'Cinzel',serif", fontSize: 9,
                  letterSpacing: ".18em", fontWeight: 700, padding: "9px 18px",
                  borderRadius: 6, textDecoration: "none", transition: "all .3s",
                }}>
                  📍 VER EN GOOGLE MAPS
                </a>
              </div>
            </div>

            {/* SALÓN */}
            <div className="hov" style={{ background: `linear-gradient(135deg,rgba(255,255,255,.04),rgba(201,168,76,.04))`, border: `1px solid rgba(201,168,76,.28)`, borderRadius: 14, overflow: "hidden", boxShadow: "0 6px 28px rgba(0,0,0,.35)" }}>
              {/* Mini mapa embebido — reemplaza el src con el iframe de tu salón */}
              <iframe
                title="Salón"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594!2d-100.2900!3d25.6700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQwJzEyLjAiTiAxMDDCsDE3JzI0LjAiVw!5e0!3m2!1ses!2smx!4v1234567891"
                width="100%" height="160" style={{ border: 0, display: "block", filter: "invert(.9) hue-rotate(180deg) saturate(0.6)" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 20 }}>🌹</span>
                  <p style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: ".22em", color: C.gold }}>RECEPCIÓN</p>
                </div>
                <p style={{ fontSize: "clamp(14px,2.5vw,17px)", color: C.white, fontWeight: 600, marginBottom: 4 }}>
                  Salón La Galería Eventos
                </p>
                <p style={{ fontSize: 12, color: C.goldLight, opacity: .7, marginBottom: 14 }}>
                  {/* 👇 Cambia por la dirección del salón */}
                  Av. Eventos #456, Colonia Las Flores
                </p>
                {/* 👇 Reemplaza el href con el link de Google Maps de tu salón */}
                <a href="https://maps.google.com/?q=Salon+La+Galeria+Eventos+Monterrey" target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                  color: "#07101f", fontFamily: "'Cinzel',serif", fontSize: 9,
                  letterSpacing: ".18em", fontWeight: 700, padding: "9px 18px",
                  borderRadius: 6, textDecoration: "none", transition: "all .3s",
                }}>
                  📍 VER EN GOOGLE MAPS
                </a>
              </div>
            </div>

          </div>

          {/* Countdown */}
          <div style={{ border: `1px solid rgba(201,168,76,.28)`, borderRadius: 14, padding: "26px 18px", background: `rgba(201,168,76,.05)`, marginBottom: 26 }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".32em", color: C.gold, marginBottom: 18 }}>CUENTA REGRESIVA</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "clamp(14px,4vw,36px)" }}>
              {[["DÍAS","d"],["HORAS","h"],["MIN","m"],["SEG","s"]].map(([lbl,k]) => (
                <div key={k} style={{ textAlign: "center", minWidth: 48 }}>
                  <p className="gt" style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(34px,9vw,54px)", fontWeight: 700, lineHeight: 1 }}>{String(countdown[k] ?? 0).padStart(2, "0")}</p>
                  <p style={{ fontSize: "clamp(7px,1.4vw,9px)", letterSpacing: ".22em", color: C.gold, opacity: .65, marginTop: 5, fontFamily: "'Cinzel',serif" }}>{lbl}</p>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: "clamp(14px,2.5vw,17px)", color: C.dim, fontStyle: "italic", lineHeight: 2 }}>
            Después de la ceremonia, te esperamos en la recepción<br />para compartir esta noche tan especial.
          </p>
          <p style={{ marginTop: 14, fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".28em", color: C.gold }}>✦ TU PRESENCIA ES EL MEJOR REGALO ✦</p>
        </div>
      </section>

      {/* ═══ S4 GALERÍA ═══════════════════════════════════════ */}
      <section {...sec(3, { background: `linear-gradient(180deg, ${C.bg}, ${C.navyMid}, ${C.bg})`, gap: 32 })}>
        <div className={rv(3)} style={{ maxWidth: 680, width: "100%", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(9px,1.7vw,11px)", letterSpacing: ".42em", color: C.gold, marginBottom: 10 }}>— GALERÍA —</p>
          <h2 style={{ fontFamily: "'Great Vibes',cursive", fontSize: "clamp(48px,11vw,66px)", color: C.goldLight, marginBottom: 6 }}>Mis Momentos</h2>
          <p style={{ fontSize: 13, color: C.gold, opacity: .5, fontStyle: "italic", marginBottom: 26 }}>Toca cada cuadro para agregar tus fotos</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 11 }}>
            {photos.map((photo, idx) => (
              <label key={idx} className="sl" style={{ gridRow: idx === 0 ? "span 2" : "span 1", aspectRatio: idx === 0 ? "3/4.5" : "4/3", cursor: "pointer", borderRadius: 12, overflow: "hidden", border: `2px dashed rgba(201,168,76,.32)`, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(201,168,76,.03)" }}>
                {photo
                  ? <img src={photo} alt={`Foto ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ textAlign: "center", padding: 16 }}>
                    <div style={{ fontSize: 34, marginBottom: 8, color: C.gold, opacity: .38 }}>📷</div>
                    <p style={{ fontSize: 8, color: C.gold, opacity: .45, fontFamily: "'Cinzel',serif", letterSpacing: ".15em" }}>AGREGAR FOTO</p>
                  </div>
                }
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handlePhoto(idx, e)} />
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ S5 RSVP ══════════════════════════════════════════ */}
      <section {...sec(4, { background: `radial-gradient(ellipse at 50% 52%, ${C.navyLight}, ${C.bg})`, gap: 24 })}>
        <div style={{ position:"absolute", top:0, left:0, pointerEvents:"none", opacity:.45 }}><CornerFloral size={110}/></div>
        <div style={{ position:"absolute", top:0, right:0, pointerEvents:"none", opacity:.45 }}><CornerFloral size={110} flip/></div>
        <div style={{ position:"absolute", bottom:0, left:0, pointerEvents:"none", opacity:.45 }}><CornerFloral size={110} flipY/></div>
        <div style={{ position:"absolute", bottom:0, right:0, pointerEvents:"none", opacity:.45 }}><CornerFloral size={110} flip flipY/></div>        <div className={rv(4)} style={{ maxWidth: 470, width: "100%", textAlign: "center" }}>
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
                <input value={guestName} onChange={e => setGuestName(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,.05)", border: `1px solid rgba(201,168,76,.28)`, borderRadius: 8, padding: "12px 16px", color: C.white, fontSize: "clamp(15px,2.8vw,18px)", fontFamily: "'Cormorant Garamond',serif", transition: "all .25s" }} />
              </div>

              <div>
                <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".22em", color: C.gold, marginBottom: 12, textAlign: "left" }}>¿CONFIRMAS ASISTENCIA?</p>
                <div style={{ display: "flex", gap: 10 }}>
                  {[{ v: true, icon: "🎉", txt: "Sí, asistiré" }, { v: false, icon: "💙", txt: "No podré ir" }].map(opt => (
                    <button key={String(opt.v)} onClick={() => setAttending(opt.v)} style={{ flex: 1, padding: "14px 8px", borderRadius: 8, cursor: "pointer", border: `1px solid ${attending === opt.v ? C.gold : "rgba(201,168,76,.2)"}`, background: attending === opt.v ? `linear-gradient(135deg,rgba(201,168,76,.22),rgba(201,168,76,.08))` : "transparent", color: attending === opt.v ? C.gold : C.dim, fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(13px,2.5vw,16px)", transition: "all .3s" }}>{opt.icon} {opt.txt}</button>
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
        <div onClick={footerTap} style={{ marginTop: 58, textAlign: "center", opacity: .3, cursor: "default", userSelect: "none" }}>
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
              <button onClick={() => setShowAdmin(false)} className="gh" style={{ background: "transparent", border: `1px solid rgba(201,168,76,.4)`, color: C.gold, padding: "8px 18px", cursor: "pointer", borderRadius: 6, fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: ".15em", transition: "all .25s" }}>✕ CERRAR</button>
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
              {allRsvps.length === 0
                ? <p style={{ textAlign: "center", color: C.gold, opacity: .45, fontStyle: "italic", padding: 40 }}>Aún no hay confirmaciones</p>
                : allRsvps.map((r, i) => (
                  <div key={i} style={{ background: r.attending ? "rgba(201,168,76,.08)" : "rgba(255,255,255,.025)", border: `1px solid ${r.attending ? "rgba(201,168,76,.28)" : "rgba(255,255,255,.07)"}`, borderRadius: 10, padding: "15px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ color: C.white, fontSize: 16, marginBottom: 3 }}>{r.familia}</p>
                      <p style={{ fontSize: 11, color: C.gold, opacity: .5 }}>{r.date} · {r.time}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 20 }}>{r.attending ? "✅" : "❌"}</p>
                      <p style={{ fontSize: 13, color: r.attending ? C.gold : C.dim, opacity: r.attending ? 1 : .45 }}>{r.attending ? `${r.guests} pers.` : "No asiste"}</p>
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
