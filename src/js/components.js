import { confirmClearCache } from './state.js';
import { Theme, Prefs, debounce } from './utils.js';

export function injectGlobals() {
  const streak = parseInt(localStorage.getItem('sk_streak'), 10) || 0;
  const topbarEl = document.querySelector('.topbar');
  if (topbarEl) topbarEl.innerHTML = `
  <a class="logo" href="/">
    <div class="logo-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 46" aria-hidden="true"><path fill="currentColor" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/></svg></div>
    <div>
      <div class="logo-text">SANSKRIT.EXE <span class="beta-tag">BETA</span></div>
      <div class="logo-sub" id="logo-sub">वाग्देव्यै नमः</div>
    </div>
  </a>
  <div class="topbar-right">
    <div class="streak-badge" tabindex="0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 16" class="streak-flame" aria-hidden="true" fill="currentColor"><path fill-rule="evenodd" d="M6 0C3.5 3 1 7 1 11c0 3.5 2.2 5.5 5 5.5s5-2 5-5.5C11 7 8.5 3 6 0ZM6 6C4.5 9 3.5 11 3.5 13c0 1.5 1.1 2.5 2.5 2.5s2.5-1 2.5-2.5C8.5 11 7.5 9 6 6Z"/></svg><span id="streak-count">${streak}</span>×</div>
    <button class="icon-btn" id="sound-toggle-btn" onclick="window.toggleSound && window.toggleSound()">🔊</button>
    <button class="prefs-btn" onclick="window.openPrefs && window.openPrefs()">⚙ <span class="prefs-label">PREFS</span></button>
  </div>`;

  const html = `
<!-- PREFS MODAL -->
<div class="modal-overlay" id="prefs-modal">
  <div class="modal-box">
    <div class="modal-header">
      <span class="modal-header-title">PREFERENCES</span>
      <button class="modal-close-btn" onclick="window.closePrefs()">✕</button>
    </div>
    <div class="modal-scrollable">
      <div class="pref-section">
        <div class="pref-section-title">THEME</div>
        <div class="theme-row">
          <button class="theme-btn-opt" id="theme-dark"  onclick="window.setTheme('dark')">◉ DARK</button>
          <button class="theme-btn-opt"        id="theme-light" onclick="window.setTheme('light')">◎ LIGHT</button>
        </div>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">INPUT_SCRIPT</div>
        <div class="script-options">
          <button class="script-btn active" id="script-deva"   onclick="window.setScript('deva')"><span class="script-btn-name">Devanagari</span><span class="script-btn-sample">रामः गच्छति</span></button>
          <button class="script-btn"        id="script-iast"   onclick="window.setScript('iast')"><span class="script-btn-name">IAST</span><span class="script-btn-sample">rāmaḥ gacchati</span></button>
          <button class="script-btn"        id="script-itrans" onclick="window.setScript('itrans')"><span class="script-btn-name">ITRANS</span><span class="script-btn-sample">raamaH gacchati</span></button>
          <button class="script-btn"        id="script-hk"     onclick="window.setScript('hk')"><span class="script-btn-name">Harvard-Kyoto</span><span class="script-btn-sample">rAmaH gacchati</span></button>
        </div>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">DATA_MGMT</div>
        <div class="danger-zone-row">
          <span class="danger-desc">Permanently erase streak, progress &amp; all stats.</span>
          <button class="btn-danger" onclick="window.openDeleteOverlay()">🗑 DELETE</button>
        </div>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">APP</div>
        <div class="app-pref-row">
          <button class="app-pref-btn pwa-install-btn" onclick="window.installApp()" style="display:none">⬇ INSTALL APP</button>
          <button class="app-pref-btn" id="prefs-fullscreen-btn" onclick="window.toggleFullscreen()">⛶ FULLSCREEN</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- DELETE CONFIRMATION OVERLAY -->
<div class="delete-overlay" id="delete-overlay">
  <div class="delete-box">
    <div class="delete-box-titlebar">
      <span class="delete-box-titlebar-label">⚠ DANGER_ZONE — FACTORY_RESET</span>
      <div class="delete-box-titlebar-dots"><div class="delete-box-dot"></div><div class="delete-box-dot"></div><div class="delete-box-dot"></div></div>
    </div>
    <div class="delete-box-body">
      <span class="delete-box-icon">🗑</span>
      <div class="delete-box-title">WIPE ALL DATA?</div>
      <div class="delete-box-sub">This will permanently erase your streak, progress, and all stats.<br><strong>This action cannot be undone.</strong></div>
      <span class="delete-box-prompt">Type DELETE to confirm, then press ENTER</span>
      <input class="delete-type-input" id="delete-type-input" type="text" placeholder="type DELETE" autocomplete="off" spellcheck="false"
        oninput="window.onDeleteInput(this)"
        onkeydown="if(event.key==='Enter')window.onDeleteEnter()">
      <div class="delete-box-actions">
        <button class="delete-cancel-btn" onclick="window.closeDeleteOverlay()">✕ CANCEL</button>
        <button class="delete-enter-btn" id="delete-enter-btn" onclick="window.executeClearCache()">⏎ ENTER</button>
      </div>
    </div>
  </div>
</div>

<!-- COMING SOON OVERLAY -->
<div class="coming-soon-overlay" id="coming-soon-overlay" onclick="window.closeComingSoon(event)">
  <div class="coming-soon-box">
    <div class="cs-top"><span id="cs-section-label">FEATURE</span></div>
    <span class="cs-icon" id="cs-icon">🚧</span>
    <div class="cs-title">COMING SOON</div>
    <div class="cs-section" id="cs-section-name"></div>
    <div class="cs-text" id="cs-text"></div>
    <button class="cs-close-btn" onclick="document.getElementById('coming-soon-overlay').classList.remove('active');document.body.style.overflow='';">✕ CLOSE</button>
  </div>
</div>

<!-- PRIVACY MODAL -->
<div class="modal-overlay" id="privacy-modal">
  <div class="modal-box">
    <div class="modal-header">
      <span class="modal-header-title">PRIVACY POLICY</span>
      <button class="modal-close-btn" onclick="window.closePrivacy()">✕</button>
    </div>
    <div class="modal-scrollable">
      <div class="pref-section">
        <div class="pref-section-title">LAST UPDATED: 2026-05-27</div>
        <p class="priv-hl"><strong>We collect nothing.</strong> All your progress lives in your browser's localStorage — on your device, never transmitted to us.</p>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">DATA STORED LOCALLY</div>
        <ul class="priv-list">
          <li>Lesson progress &amp; completed modules</li>
          <li>Daily streak &amp; last-active date</li>
          <li>Achievement badges earned</li>
          <li>Daily quest completions</li>
          <li>Answer history &amp; accuracy stats</li>
          <li>UI preferences (theme, sound)</li>
        </ul>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">ANALYTICS &amp; TRACKING</div>
        <p class="priv-p">No analytics, no tracking pixels, no fingerprinting, no advertising networks, no cookies.</p>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">THIRD-PARTY SERVICES</div>
        <p class="priv-p">Google Fonts CDN serves our typefaces. Your browser contacts Google's servers to fetch these files — Google may log your IP per their own policy. No other external resources.</p>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">YOUR CONTROL</div>
        <ul class="priv-list">
          <li>View: DevTools → Application → Local Storage</li>
          <li>Delete: clear localStorage for this site</li>
          <li>Incognito mode leaves no trace after the session</li>
        </ul>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">CONTACT</div>
        <p class="priv-p">Questions? contact@sanskrit.exe</p>
      </div>
    </div>
  </div>
</div>

<!-- ABOUT US MODAL -->
<div class="modal-overlay" id="about-modal">
  <div class="modal-box">
    <div class="modal-header">
      <span class="modal-header-title">ABOUT US</span>
      <button class="modal-close-btn" onclick="window.closeAbout()">✕</button>
    </div>
    <div class="modal-scrollable">
      <div class="pref-section">
        <div class="pref-section-title">WHO WE ARE</div>
        <p class="priv-p">SANSKRIT.EXE is an independent project dedicated to making Sanskrit accessible through focused, interactive daily practice — no fluff, no paywalls.</p>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">OUR MISSION</div>
        <p class="priv-p">Ancient languages should stay alive. Our goal is to build the most focused, no-friction Sanskrit learning tool on the web — one lesson at a time.</p>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">THE TEAM</div>
        <p class="priv-p">Full team page coming soon.</p>
      </div>
    </div>
  </div>
</div>

<!-- OTHER PRODUCTS MODAL -->
<div class="modal-overlay" id="products-modal">
  <div class="modal-box">
    <div class="modal-header">
      <span class="modal-header-title">OTHER PRODUCTS</span>
      <button class="modal-close-btn" onclick="window.closeProducts()">✕</button>
    </div>
    <div class="modal-scrollable">
      <div class="pref-section">
        <div class="pref-section-title">IN THE PIPELINE</div>
        <p class="priv-p">We're building a suite of tools for classical language learners. First up after SANSKRIT.EXE:</p>
        <ul class="priv-list">
          <li>Sanskrit Dictionary</li>
          <li>Grammar Reference</li>
          <li>Sandhi Calculator</li>
          <li>Metre Analyser</li>
        </ul>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">STATUS</div>
        <p class="priv-p">All coming soon. Follow along — updates will appear here first.</p>
      </div>
    </div>
  </div>
</div>

<!-- DONATE MODAL -->
<div class="modal-overlay" id="donate-modal">
  <div class="modal-box">
    <div class="modal-header">
      <span class="modal-header-title">DONATE</span>
      <button class="modal-close-btn" onclick="window.closeDonate()">✕</button>
    </div>
    <div class="modal-scrollable">
      <div class="pref-section">
        <div class="pref-section-title">WHY IT MATTERS</div>
        <p class="priv-hl"><strong>SANSKRIT.EXE is free</strong> and always will be. Hosting and development are funded out of pocket.</p>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">HOW TO HELP</div>
        <p class="priv-p">Payment links coming soon. The biggest help right now is spreading the word.</p>
      </div>
      <div class="pref-section">
        <div class="pref-section-title">OTHER WAYS</div>
        <ul class="priv-list">
          <li>Share with a friend or teacher</li>
          <li>Star the repo on GitHub</li>
          <li>Send feedback — every bug report matters</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- COOKIE BAR -->
<div class="cookie-bar" id="cookie-bar">
  <span class="cookie-bar-text">This site uses localStorage to save your progress and preferences. No data leaves your device.</span>
  <div class="cookie-bar-actions">
    <button class="cookie-accept-btn" onclick="window.cookieAccept()">✓ GOT IT</button>
    <button class="cookie-decline-btn" onclick="window.cookieDismiss()">✕</button>
  </div>
</div>

<!-- INSTALL BANNER -->
<div class="install-banner" id="install-banner">
  <span class="install-banner-text">⬇ Install SANSKRIT.EXE for a faster, offline-ready experience.</span>
  <div class="install-banner-actions">
    <button class="install-accept-btn pwa-install-btn" onclick="window.installApp()">INSTALL</button>
    <button class="install-dismiss-btn" onclick="window.dismissInstallBanner()">✕</button>
  </div>
</div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);

  // Setup globals
  window.openPrefs = () => {
    document.getElementById('prefs-modal').classList.add('open');
    Prefs.updateUI();
  };
  window.closePrefs = () => document.getElementById('prefs-modal').classList.remove('open');
  window.openPrivacy = () => document.getElementById('privacy-modal').classList.add('open');
  window.closePrivacy = () => document.getElementById('privacy-modal').classList.remove('open');
  window.openAbout = () => document.getElementById('about-modal').classList.add('open');
  window.closeAbout = () => document.getElementById('about-modal').classList.remove('open');
  window.openProducts = () => document.getElementById('products-modal').classList.add('open');
  window.closeProducts = () => document.getElementById('products-modal').classList.remove('open');
  window.openDonate = () => document.getElementById('donate-modal').classList.add('open');
  window.closeDonate = () => document.getElementById('donate-modal').classList.remove('open');
  window.setTheme = (mode) => Theme.apply(mode);
  window.setScript = (s) => Prefs.setScript(s);

  document.getElementById('prefs-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) window.closePrefs();
  });
  document.getElementById('privacy-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) window.closePrivacy();
  });
  document.getElementById('about-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) window.closeAbout();
  });
  document.getElementById('products-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) window.closeProducts();
  });
  document.getElementById('donate-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) window.closeDonate();
  });

  window.openDeleteOverlay = () => {
    const inp = document.getElementById('delete-type-input');
    inp.value = '';
    document.getElementById('delete-enter-btn').classList.remove('ready');
    inp.classList.remove('match');
    document.getElementById('delete-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => inp.focus(), 80);
  };
  window.closeDeleteOverlay = () => {
    document.getElementById('delete-overlay').classList.remove('active');
    document.body.style.overflow = '';
  };
  window.onDeleteInput = (inp) => {
    const isMatch = inp.value === 'DELETE';
    inp.classList.toggle('match', isMatch);
    document.getElementById('delete-enter-btn').classList.toggle('ready', isMatch);
  };
  window.onDeleteEnter = () => {
    if (document.getElementById('delete-type-input').value === 'DELETE') window.executeClearCache();
  };
  window.executeClearCache = () => confirmClearCache();

  window.toggleBottomBar = () => {
    const bar = document.getElementById('bottom-bar');
    const isCollapsed = bar.classList.toggle('collapsed');
    document.getElementById('bottom-bar-tab-icon').textContent = isCollapsed ? '▲' : '▼';
    document.getElementById('bottom-bar-tab-label').textContent = isCollapsed ? 'OPEN' : 'CLOSE';
    document.body.classList.toggle('bar-collapsed', isCollapsed);
    localStorage.setItem('sk_bar', isCollapsed ? '0' : '1');
  };

  const syncExploreDropdown = () => {
    const dd = document.getElementById('explore-dropdown');
    const btn = document.getElementById('explore-btn');
    const wrap = dd?.parentElement;
    if (!dd || !btn || !wrap || window.innerWidth > 640) {
      if (dd) {
        dd.style.left = '';
        dd.style.width = '';
      }
      return;
    }

    const btnRect = btn.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    dd.style.left = `${btnRect.left - wrapRect.left}px`;
    dd.style.width = `${btnRect.width}px`;
  };

  const closeExploreWithAnim = (dd) => {
    const btn = document.getElementById('explore-btn');
    dd.classList.add('closing');
    dd.classList.remove('open');
    btn?.classList.remove('open');
    dd.addEventListener('animationend', () => dd.classList.remove('closing'), { once: true });
  };

  window.toggleExploreDropdown = () => {
    const dd = document.getElementById('explore-dropdown');
    const btn = document.getElementById('explore-btn');
    syncExploreDropdown();
    if (dd.classList.contains('open')) {
      closeExploreWithAnim(dd);
    } else {
      dd.classList.remove('closing');
      dd.classList.add('open');
      btn?.classList.add('open');
    }
  };
  window.closeExploreDropdown = () => {
    const dd = document.getElementById('explore-dropdown');
    if (dd.classList.contains('open')) closeExploreWithAnim(dd);
  };
  window.addEventListener('resize', debounce(syncExploreDropdown, 100));

  window.openComingSoon = (name, icon, section, text) => {
    document.getElementById('cs-section-label').textContent = section.toUpperCase();
    document.getElementById('cs-icon').textContent = icon;
    document.getElementById('cs-section-name').textContent = name;
    document.getElementById('cs-text').textContent = text;
    document.getElementById('coming-soon-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  window.closeComingSoon = (e) => {
    if (e.target.id === 'coming-soon-overlay') {
      e.target.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.cookieAccept = () => {
    localStorage.setItem('sk_cookie_ack', 'true');
    document.getElementById('cookie-bar').classList.remove('visible');
  };
  window.cookieDismiss = () => {
    document.getElementById('cookie-bar').classList.remove('visible');
  };

  if (!localStorage.getItem('sk_cookie_ack')) {
    setTimeout(() => document.getElementById('cookie-bar').classList.add('visible'), 2500);
  }

  // PWA Install
  let _installPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    _installPrompt = e;
    document.querySelectorAll('.pwa-install-btn').forEach(b => b.style.display = '');
    if (!localStorage.getItem('sk_install_dismissed')) {
      document.getElementById('install-banner')?.classList.add('visible');
    }
  });
  window.installApp = async () => {
    if (!_installPrompt) return;
    _installPrompt.prompt();
    const { outcome } = await _installPrompt.userChoice;
    if (outcome === 'accepted') {
      _installPrompt = null;
      document.querySelectorAll('.pwa-install-btn').forEach(b => b.style.display = 'none');
      window.dismissInstallBanner();
    }
  };
  window.dismissInstallBanner = () => {
    localStorage.setItem('sk_install_dismissed', 'true');
    document.getElementById('install-banner')?.classList.remove('visible');
  };
  window.addEventListener('appinstalled', () => {
    _installPrompt = null;
    document.querySelectorAll('.pwa-install-btn').forEach(b => b.style.display = 'none');
    window.dismissInstallBanner();
  });

  // Fullscreen
  const _updateFullscreenUI = () => {
    const isFs = !!document.fullscreenElement;
    const prefsBtn = document.getElementById('prefs-fullscreen-btn');
    if (prefsBtn) prefsBtn.textContent = isFs ? '⊡ EXIT FULL' : '⛶ FULLSCREEN';
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    document.documentElement.classList.toggle('mobile-fs', isFs && isMobile);
  };
  window.toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };
  document.addEventListener('fullscreenchange', _updateFullscreenUI);

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const prefsModal = document.getElementById('prefs-modal');
    if (prefsModal?.classList.contains('open')) { window.closePrefs(); return; }
    const privacyModal = document.getElementById('privacy-modal');
    if (privacyModal?.classList.contains('open')) { window.closePrivacy(); return; }
    const aboutModal = document.getElementById('about-modal');
    if (aboutModal?.classList.contains('open')) { window.closeAbout(); return; }
    const productsModal = document.getElementById('products-modal');
    if (productsModal?.classList.contains('open')) { window.closeProducts(); return; }
    const donateModal = document.getElementById('donate-modal');
    if (donateModal?.classList.contains('open')) { window.closeDonate(); return; }
    const deleteOverlay = document.getElementById('delete-overlay');
    if (deleteOverlay?.classList.contains('active')) { window.closeDeleteOverlay(); return; }
    const comingSoon = document.getElementById('coming-soon-overlay');
    if (comingSoon?.classList.contains('active')) {
      comingSoon.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Handle Boot Sequence for Home Only
  const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
  if (isHomePage) {
    if (!localStorage.getItem('sk_booted')) {
      const htmlBoot = `
      <div class="boot-overlay" id="boot-overlay">
        <div class="boot-terminal">
          <div class="boot-titlebar">
            <span>SANSKRIT.EXE — SYSTEM BOOT</span>
            <div class="boot-titlebar-dots"><div class="boot-dot"></div><div class="boot-dot"></div><div class="boot-dot"></div></div>
          </div>
          <div class="boot-body" id="boot-body">
            <div class="boot-splash" id="boot-splash">SANSKRIT.EXE</div>
          </div>
          <button class="boot-enter-btn" id="boot-enter-btn" onclick="window.bootEnter()">▶ ENTER TERMINAL</button>
        </div>
      </div>`;
      document.body.insertAdjacentHTML('afterbegin', htmlBoot);

      window.bootEnter = () => {
        document.getElementById('boot-overlay').classList.add('hidden');
        localStorage.setItem('sk_booted', 'true');
      };

      const bootLines = [
        'INIT_SYSTEM_RAM... <span class="ok">OK</span>',
        'MOUNT_DRIVE: /dev/sanskrit_root... <span class="ok">OK</span>',
        'LOADING_GRAMMAR_MODULE... <span class="cyan">600_BCE_PANINI</span>',
        'PARSING_VERB_ROOTS... <span class="ok">DONE</span>',
        'RESOLVING_SANDHI... <span class="ok">OK</span>',
        '<span class="brand">SYSTEM READY.</span>'
      ];
      const body = document.getElementById('boot-body');
      let lineIdx = 0;
      const bootTimers = [];
      function showNextLine() {
        if (lineIdx < bootLines.length) {
          const l = document.createElement('div');
          l.className = 'boot-line'; l.innerHTML = bootLines[lineIdx];
          body.appendChild(l);
          bootTimers.push(setTimeout(() => l.classList.add('visible'), 50));
          lineIdx++;
          bootTimers.push(setTimeout(showNextLine, 250 + Math.random() * 350));
        } else {
          bootTimers.push(setTimeout(() => {
            document.querySelectorAll('.boot-line').forEach(el => el.style.display = 'none');
            document.getElementById('boot-splash').style.display = 'block';
            document.getElementById('boot-enter-btn').style.display = 'block';
          }, 800));
        }
      }
      bootTimers.push(setTimeout(showNextLine, 500));
      window.addEventListener('pagehide', () => bootTimers.forEach(clearTimeout), { once: true });
    }
  }

  // Sound Toggle Global
  window.toggleSound = () => {
    window._soundMuted = !window._soundMuted;
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
      btn.classList.toggle('muted', window._soundMuted);
      btn.textContent = window._soundMuted ? '🔇' : '🔊';
      localStorage.setItem('sk_sound', window._soundMuted ? 'muted' : 'on');
    }
  };
  if (localStorage.getItem('sk_sound') === 'muted') window.toggleSound();

  const streakBadge = document.querySelector('.streak-badge');
  if (streakBadge && !streakBadge.dataset.tipBound) {
    streakBadge.dataset.tipBound = '1';
    const tip = document.createElement('div');
    tip.className = 'streak-tip';
    tip.textContent = 'Daily streak';
    document.body.appendChild(tip);
    const show = () => {
      const r = streakBadge.getBoundingClientRect();
      tip.style.top = (r.bottom + 6) + 'px';
      tip.style.right = (window.innerWidth - r.right) + 'px';
      tip.style.left = 'auto';
      tip.classList.add('visible');
    };
    const hide = () => tip.classList.remove('visible');
    streakBadge.addEventListener('mouseenter', show);
    streakBadge.addEventListener('mouseleave', hide);
    streakBadge.addEventListener('focus', show);
    streakBadge.addEventListener('blur', hide);
  }
}
