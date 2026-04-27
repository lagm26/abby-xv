export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const SCRIPT = "https://script.google.com/macros/s/AKfycbyADTir4GoLevg9tefsmhbON9pewZkK_VBTd2ZfFAc-HfHaixt_b7ARJrKfEvSwj8ml/exec";

  const params = new URLSearchParams(req.query).toString();
  const url = `${SCRIPT}?${params}`;

  try {
    const r = await fetch(url);
    const text = await r.text();
    res.setHeader("Content-Type", "application/json");
    res.send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}