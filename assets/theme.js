// Light / dark switch for every page. Load it in <head> (before the page draws) so there is no flash.
// No choice yet: follow the computer's setting. After a click: remember the choice on this device.
(function () {
  var KEY = 'guide.theme', root = document.documentElement, mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  var saved = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var system = function () { return mq && mq.matches ? 'dark' : 'light'; };
  var current = function () { return root.getAttribute('data-theme') || system(); };
  function apply(t) {
    root.setAttribute('data-theme', t);
    root.style.colorScheme = t;
    [].forEach.call(document.querySelectorAll('[data-theme-btn]'), label);
    window.dispatchEvent(new CustomEvent('guide-theme', { detail: t }));
  }
  function label(btn) {
    var dark = current() === 'dark';
    btn.textContent = dark ? '☀ Light' : '☾ Dark';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = btn.getAttribute('aria-label');
  }
  apply(saved() || system());
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { if (!saved()) apply(system()); });
  window.guideTheme = {
    current: current,
    isDark: function () { return current() === 'dark'; },
    toggle: function () { var t = current() === 'dark' ? 'light' : 'dark'; try { localStorage.setItem(KEY, t); } catch (e) { /* private mode: still switches */ } apply(t); return t; },
    /** Turns a <button data-theme-btn> into the switch */
    bind: function (btn) { label(btn); btn.addEventListener('click', function () { window.guideTheme.toggle(); }); },
  };
  document.addEventListener('DOMContentLoaded', function () { [].forEach.call(document.querySelectorAll('[data-theme-btn]'), window.guideTheme.bind); });
})();
