const copy = {
  ro: {
    brandSub: "Registrul de pădure",
    navLedger: "Registru",
    navAbout: "Dosar",
    navLinks: "Legături",
    metaWhere: "Carpați",
    saved: "salvat pe acest dispozitiv",
    tagline: "We are the Champignions, my friend!",
    lede: "Un personaj din iarbă și un caiet public pentru povești scurte: ciuperci, vreme, poteci. Fără magazin. Fără slogan de agenție.",
    plateCap: "Pleurotus · studiu",
    ledgerTitle: "Registru",
    ledgerHint: "Trei rânduri active. Restul se adaugă când există material, nu înainte.",
    r1t: "Personajul",
    r1d: "Om-ciupercă în iarba din Carpați. Cap ras, barbă scurtă, emblemă. Nu este un supererou de oraș.",
    r2t: "Pădurea",
    r2d: "Desenul de pe pagină rămâne sigiliul vizual până există un portret oficial.",
    r3t: "Filmele",
    r3d: "Poveștile lungi stau pe video. Canalul se leagă aici când adresa e reală, nu pagina generică YouTube.",
    stLive: "viu",
    stHold: "în lucru",
    stWait: "așteaptă",
    kpi1: "om-ciupercă în iarbă",
    kpi2: "sigiliu vizual",
    kpi3: "canal real, nu generic",
    aboutTitle: "Dosar",
    aboutPull: "Nu este o firmă. Este un nume sub care se adună desene, filme și note din zonă de munte.",
    about1: "Tonul e serios față de natură și lejer față de sine. Site-ul ține cadrul; poveștile trăiesc în iarbă și pe ecran.",
    about2: "Următoarele rânduri din registru: portretul personajului, apoi un canal cu piesă gata de arătat.",
    linksTitle: "Legături",
    linkYt: "YouTube",
    linkYtNote: "se completează cu URL-ul real",
    linkFbNote: "idem — fără pagină inventată",
    colophon: "Caiet deschis, 2026. Rândurile se scriu rar și pe bune."
  },
  en: {
    brandSub: "Forest ledger",
    navLedger: "Ledger",
    navAbout: "Dossier",
    navLinks: "Links",
    metaWhere: "Carpathians",
    saved: "saved on this device",
    tagline: "We are the Champignions, my friend!",
    lede: "A grass-level character and a public notebook for short forest stories: mushrooms, weather, paths. Not a shop. Not an agency line.",
    plateCap: "Pleurotus · study",
    ledgerTitle: "Ledger",
    ledgerHint: "Three live rows. Nothing else is added until there is material.",
    r1t: "The character",
    r1d: "A mushroom figure in Carpathian grass. Shaved head, short beard, emblem. Not a city superhero.",
    r2t: "The forest",
    r2d: "The drawing on this page stays the visual seal until there is an official portrait.",
    r3t: "The films",
    r3d: "Longer stories live on video. The channel is linked here when the URL is real, not a generic YouTube homepage.",
    stLive: "live",
    stHold: "in progress",
    stWait: "waiting",
    kpi1: "mushroom figure in grass",
    kpi2: "visual seal",
    kpi3: "real channel, not generic",
    aboutTitle: "Dossier",
    aboutPull: "Not a company. A name under which drawings, films and mountain notes collect.",
    about1: "Serious about the woods, light about itself. The site holds the frame; the stories live in grass and on screen.",
    about2: "Next ledger rows: the character portrait, then a channel with a finished piece.",
    linksTitle: "Links",
    linkYt: "YouTube",
    linkYtNote: "filled when the real URL exists",
    linkFbNote: "same — no invented page",
    colophon: "Open notebook, 2026. Rows are written rarely and for real."
  }
};

function applyLang(lang) {
  const dict = copy[lang] || copy.ro;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll(".lang button").forEach((btn) => {
    btn.classList.toggle("is-on", btn.dataset.lang === lang);
  });
  try { localStorage.setItem("ciuperman-lang", lang); } catch (e) {}
}

document.querySelectorAll(".lang button").forEach((btn) => {
  btn.addEventListener("click", () => applyLang(btn.dataset.lang));
});

const saved = (() => {
  try { return localStorage.getItem("ciuperman-lang"); } catch (e) { return null; }
})();
applyLang(saved === "en" ? "en" : "ro");

(function matrixRain() {
  const canvas = document.getElementById("matrix-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: false });
  const glyphs = "01";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cols = [];
  let fontSize = 16;
  let raf = 0;
  let last = 0;
  let w = 0;
  let h = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fontSize = w < 700 ? 14 : 18;
    const n = Math.ceil(w / fontSize);
    cols = Array.from({ length: n }, () => Math.random() * (h / fontSize));
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
  }

  function drawStatic() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    ctx.font = "500 " + fontSize + "px \"IBM Plex Mono\", ui-monospace, monospace";
    ctx.fillStyle = "rgba(57,255,20,0.22)";
    for (let i = 0; i < cols.length; i++) {
      for (let r = 0; r < 12; r++) {
        ctx.fillText(glyphs[(Math.random() * 2) | 0], i * fontSize, Math.random() * h);
      }
    }
  }

  function frame(t) {
    raf = requestAnimationFrame(frame);
    if (t - last < 32) return;
    last = t;

    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, w, h);
    ctx.font = "500 " + fontSize + "px \"IBM Plex Mono\", ui-monospace, monospace";
    ctx.textBaseline = "top";

    for (let i = 0; i < cols.length; i++) {
      const x = i * fontSize;
      const y = cols[i] * fontSize;
      const ch = glyphs[(Math.random() * 2) | 0];

      ctx.shadowColor = "#39ff14";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#eaffea";
      ctx.fillText(ch, x, y);
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(57,255,20,0.45)";
      ctx.fillText(glyphs[(Math.random() * 2) | 0], x, y - fontSize);

      if (y > h && Math.random() > 0.975) cols[i] = 0;
      else cols[i] += 0.85 + Math.random() * 0.4;
    }
  }

  resize();
  window.addEventListener("resize", resize);

  if (reduce) {
    drawStatic();
    return;
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else if (!raf) {
      last = 0;
      raf = requestAnimationFrame(frame);
    }
  });

  raf = requestAnimationFrame(frame);
})();
