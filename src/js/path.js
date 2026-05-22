import { renderHomeModules } from './home.js';
import { Theme, Prefs } from './utils.js';
import { injectGlobals } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
  injectGlobals();
  Theme.init();
  Prefs.init();
  renderHomeModules();
});
