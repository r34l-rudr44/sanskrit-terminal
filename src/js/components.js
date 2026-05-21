import { confirmClearCache } from './state.js';
import { Theme, Prefs, debounce } from './utils.js';

export function injectGlobals() {
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
        <div class="pref-section-title">CONTENT_SIZE</div>
        <div class="font-size-group">
          <button class="fs-btn" id="fs-sm"  onclick="window.setFontSize('sm')"><span class="fs-sample" style="font-size:16px">अ</span><span class="fs-label">SMALL</span></button>
          <button class="fs-btn active" id="fs-md" onclick="window.setFontSize('md')"><span class="fs-sample" style="font-size:22px">अ</span><span class="fs-label">MEDIUM</span></button>
          <button class="fs-btn" id="fs-lg"  onclick="window.setFontSize('lg')"><span class="fs-sample" style="font-size:28px">अ</span><span class="fs-label">LARGE</span></button>
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
  window.setTheme = (mode) => Theme.apply(mode);
  window.setFontSize = (s) => Prefs.setFontSize(s);
  window.setScript = (s) => Prefs.setScript(s);

  document.getElementById('prefs-modal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) window.closePrefs();
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

  window.toggleExploreDropdown = () => {
    const dd = document.getElementById('explore-dropdown');
    syncExploreDropdown();
    dd.classList.toggle('open');
  };
  window.closeExploreDropdown = () => {
    document.getElementById('explore-dropdown').classList.remove('open');
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
