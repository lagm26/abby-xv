export default function handler(req, res) {
  // Mapa de invitados — agrega aquí todas tus familias
  const familias = {
    "gamez":    { familia: "Fam. Gámez Amaya",    invitados: 5 },
    "saucedo":  { familia: "Fam. Saucedo Amaya",   invitados: 4 },
    "garcia":   { familia: "Fam. García López",    invitados: 3 },
    // 👆 Agrega aquí todas tus familias
  };

  const slug = req.query.slug;
  const datos = familias[slug];

  if (!datos) {
    res.redirect("/");
    return;
  }

  const url = `/?familia=${encodeURIComponent(datos.familia)}&invitados=${datos.invitados}`;

  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta property="og:title" content="🌹 XV Años de Abby · 13 Junio 2026" />
  <meta property="og:description" content="Tienes una invitación especial ✨ ¡Toca para abrirla!" />
  <meta property="og:image" content="https://abby-xv.vercel.app/preview.jpg" />
  <meta property="og:url" content="https://abby-xv.vercel.app/i/${slug}" />
  <meta http-equiv="refresh" content="0;url=${url}" />
  <script>window.location.href = "${url}"</script>
</head>
<body></body>
</html>`);
}