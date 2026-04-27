export const Audio = (() => {
  let ctx = null;
  function getCtx() { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); return ctx; }
  function playTone(correct) {
    if (window._soundMuted) return;
    try {
      const c = getCtx();
      const osc = c.createOscillator(); const gain = c.createGain();
      osc.connect(gain); gain.connect(c.destination); osc.type = 'square';
      if (correct) {
        osc.frequency.setValueAtTime(440, c.currentTime);
        osc.frequency.setValueAtTime(554, c.currentTime + .1);
        osc.frequency.setValueAtTime(659, c.currentTime + .2);
      } else {
        osc.frequency.setValueAtTime(220, c.currentTime);
        osc.frequency.setValueAtTime(165, c.currentTime + .15);
      }
      gain.gain.setValueAtTime(.09, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, c.currentTime + .4);
      osc.start(c.currentTime); osc.stop(c.currentTime + .4);
    } catch(e) {}
  }
  return { playTone };
})();

export const Effects = (() => {
  function launchConfetti(count = 80) {
    const wrap = document.getElementById('confetti-wrap'); 
    if(!wrap) return;
    wrap.innerHTML = '';
    const colors = ['#F0A500','#3DD68C','#00D4C8','#FF4D4D','#FFD700','#A78BFA'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div'); p.className = 'particle';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (1.5 + Math.random() * 2.5) + 's';
      p.style.animationDelay   = Math.random() * 1 + 's';
      const size = (6 + Math.random() * 10) + 'px';
      p.style.width = p.style.height = size;
      wrap.appendChild(p);
    }
    setTimeout(() => { wrap.innerHTML = ''; }, 5000);
  }
  return { launchConfetti };
})();

export const Theme = (() => {
  function apply(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('sk_theme', mode);
    document.getElementById('theme-dark')?.classList.toggle('active', mode === 'dark');
    document.getElementById('theme-light')?.classList.toggle('active', mode === 'light');
  }
  function init() { apply(localStorage.getItem('sk_theme') || 'dark'); }
  return { apply, init };
})();

export const Prefs = (() => {
  const FONT_SIZES = { sm:{q:'17px',input:'15px',tile:'14px'}, md:{q:'22px',input:'18px',tile:'17px'}, lg:{q:'27px',input:'22px',tile:'21px'} };
  const SCRIPT_MAP = {
    deva:   {placeholder:'देवनागरी में टाइप करें…', hint:'// type in Devanagari script (e.g. रामः)'},
    iast:   {placeholder:'Type in IAST…',            hint:'// IAST — e.g. rāmaḥ vanam gacchati'},
    itrans: {placeholder:'Type in ITRANS…',          hint:'// ITRANS — e.g. raamaH vanam gacchati'},
    hk:     {placeholder:'Type in Harvard-Kyoto…',   hint:'// HK — e.g. rAmaH vanam gacchati'}
  };
  let fontSize = localStorage.getItem('sk_fs') || 'md';
  let script   = localStorage.getItem('sk_script') || 'deva';
  
  function applyFontSize() {
    const f = FONT_SIZES[fontSize] || FONT_SIZES.md;
    const r = document.documentElement.style;
    r.setProperty('--q-size', f.q); r.setProperty('--inp-size', f.input); r.setProperty('--tile-size', f.tile);
  }
  function updateUI() {
    ['sm','md','lg'].forEach(s => document.getElementById('fs-'+s)?.classList.toggle('active', fontSize === s));
    ['deva','iast','itrans','hk'].forEach(s => document.getElementById('script-'+s)?.classList.toggle('active', script === s));
  }
  function setFontSize(size) { fontSize = size; localStorage.setItem('sk_fs', size); applyFontSize(); updateUI(); }
  function setScript(s)   { script = s; localStorage.setItem('sk_script', s); updateUI(); }
  function getScriptHint() { return SCRIPT_MAP[script] || SCRIPT_MAP.deva; }
  function init() { applyFontSize(); updateUI(); }
  return { init, setFontSize, setScript, getScriptHint, updateUI };
})();
