export default function handler(req, res) {
  const familias = {
    "gamez":    { familia: "Fam. Gámez Amaya",    invitados: 5 },
    "saucedo":  { familia: "Fam. Saucedo Amaya",   invitados: 4 },
    "garcia":   { familia: "Fam. García López",    invitados: 3 },
    // 👆 Agrega aquí todas tus familias
  };

  const slug  = (req.query.slug || "").toLowerCase();
  const datos = familias[slug];
  const img   = "https://abby-xv.vercel.app/preview.jpg";

  if (!datos) { res.redirect("/"); return; }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.send(`<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>🌹 XV Años de Abby · 13 Junio 2026</title>
  <meta property="og:type"             content="website"/>
  <meta property="og:site_name"        content="XV Años Abby"/>
  <meta property="og:title"            content="🌹 XV Años de Abby · 13 Junio 2026"/>
  <meta property="og:description"      content="Tienes una invitación especial ✨ ¡Toca para abrirla!"/>
  <meta property="og:url"              content="https://abby-xv.vercel.app/i/${slug}"/>
  <meta property="og:image"            content="${img}"/>
  <meta property="og:image:secure_url" content="${img}"/>
  <meta property="og:image:type"       content="image/jpeg"/>
  <meta property="og:image:width"      content="1200"/>
  <meta property="og:image:height"     content="630"/>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#013a4a;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:Georgia,serif;color:#f4f0e8;text-align:center;padding:24px;}
    .crown{font-size:48px;margin-bottom:8px;animation:float 3s ease-in-out infinite;}
    @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,.5);}50%{box-shadow:0 0 0 12px rgba(201,168,76,0);}}
    h1{font-size:clamp(32px,10vw,56px);color:#c9a84c;margin:8px 0;}
    h2{font-size:clamp(18px,5vw,28px);color:#e8c86d;margin-bottom:20px;font-weight:300;}
    p{font-size:16px;color:rgba(244,240,232,.75);margin-bottom:32px;line-height:1.8;}
    .sep{width:80px;height:1px;background:linear-gradient(90deg,transparent,#c9a84c,transparent);margin:20px auto;}
    .btn{display:inline-block;background:linear-gradient(135deg,#c9a84c,#e8c86d);color:#013a4a;padding:16px 40px;border-radius:4px;text-decoration:none;font-size:13px;letter-spacing:.25em;font-weight:bold;animation:pulse 2s infinite;}
  </style>
</head>
<body>
  <div class="crown">♛</div>
  <h1>XV Años</h1>
  <h2>Abby</h2>
  <div class="sep"></div>
  <p>Tienes una invitación especial<br/>para celebrar este día tan especial ✨</p>
  <a class="btn" href="/?familia=${encodeURIComponent(datos.familia)}&invitados=${datos.invitados}">
    ABRIR INVITACIÓN
  </a>
  <div class="sep"></div>
  <p style="font-size:13px;opacity:.5;margin-top:16px;">13 · Junio · 2026</p>
</body>
</html>`);
}
