// Draws pages and blocks, in the guide's look. Used by the website (index.html) and the admin preview.
// Markdown -> HTML with marked, cleaned by DOMPurify (no scripts, no event handlers, safe links only), then dressed up:
// tables scroll, ```mermaid becomes a diagram, other code gets a Copy button, > quotes become notes, - [ ] items get tick boxes.
(function (root) {
  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); };
  var TAG = { 'in use': 'ok', ready: 'plan', new: 'ok', planned: 'warn' };
  var tagHtml = function (t) { return t ? ' <span class="st ' + (TAG[t] || 'plan') + '">' + esc(t) + '</span>' : ''; };

  if (root.DOMPurify) {
    root.DOMPurify.addHook('afterSanitizeAttributes', function (node) {
      if (node.tagName === 'A' && /^https?:/i.test(node.getAttribute('href') || '')) { node.setAttribute('target', '_blank'); node.setAttribute('rel', 'noopener noreferrer'); }
    });
  }
  function clean(html) {
    return root.DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, FORBID_TAGS: ['style', 'form', 'input', 'button', 'textarea', 'select', 'iframe', 'object', 'embed'], FORBID_ATTR: ['style'] });
  }

  /** Markdown -> a <div> with the guide's styling */
  function md(src, cls) {
    var div = document.createElement('div');
    div.className = cls || 'prose';
    // task lists (- [ ] item): the cleaner removes form inputs, so each tick box is kept as a marker and drawn again below
    var html = root.marked.parse(String(src || ''), { gfm: true, breaks: false }).replace(/<input\b[^>]*type="checkbox"[^>]*>/gi, function (m) {
      return '<span class="tick-mark"' + (/\bchecked\b/i.test(m) ? ' data-checked="1"' : '') + '></span>';
    });
    div.innerHTML = clean(html);
    [].forEach.call(div.querySelectorAll('span.tick-mark'), function (m) {
      var box = document.createElement('input'); box.type = 'checkbox'; box.className = 'tick'; box.disabled = true;
      box.checked = m.getAttribute('data-checked') === '1'; box.defaultChecked = box.checked;
      var li = m.closest('li'); if (li) { li.classList.add('task'); var ul = li.parentNode; if (ul) ul.classList.add('tasks'); }
      m.parentNode.replaceChild(box, m);
      // the item's text in one box next to the tick, so it wraps like normal text
      if (li && box.parentNode === li) {
        var txt = document.createElement('span'); txt.className = 'ttext';
        while (box.nextSibling) txt.appendChild(box.nextSibling);
        li.appendChild(txt);
      }
    });
    [].forEach.call(div.querySelectorAll('table'), function (t) {
      t.classList.add('doc');
      // on phones each row becomes a small card: every cell gets its column name (shown above the value)
      var heads = [].map.call(t.querySelectorAll('thead th'), function (th) { return th.textContent.trim(); });
      if (heads.length) {
        t.classList.add('stack');
        [].forEach.call(t.querySelectorAll('tbody tr'), function (tr) {
          [].forEach.call(tr.children, function (td, i) { if (heads[i]) td.setAttribute('data-label', heads[i]); });
        });
      }
      var w = document.createElement('div'); w.className = 'tscroll';
      t.parentNode.insertBefore(w, t); w.appendChild(t);
    });
    [].forEach.call(div.querySelectorAll('pre > code'), function (code) {
      var pre = code.parentNode, lang = ((code.className.match(/language-([\w-]+)/) || [])[1] || '').toLowerCase();
      if (lang === 'mermaid') {
        var fig = document.createElement('figure'); fig.className = 'dfig';
        fig.innerHTML = '<div class="mscroll"><pre class="mermaid"></pre></div>';
        fig.querySelector('pre').textContent = code.textContent;
        pre.parentNode.replaceChild(fig, pre);
        return;
      }
      var box = document.createElement('div'); box.className = 'query';
      box.innerHTML = '<div class="qhead"><span class="lang">' + esc(lang || 'text') + '</span><button type="button" class="copy">Copy</button></div><pre class="sql"></pre>';
      box.querySelector('pre').textContent = code.textContent.replace(/\n$/, '');
      pre.parentNode.replaceChild(box, pre);
    });
    [].forEach.call(div.querySelectorAll('blockquote'), function (q) { q.classList.add('note'); });
    return div;
  }

  /** One block as a <section id="anchor"> */
  function block(b) {
    var s = document.createElement('section');
    s.className = 'doc-sec block-' + b.kind + (b.published === false ? ' is-hidden' : '');
    s.id = b.anchor;
    s.innerHTML = '<div class="dhead"><h2>' + esc(b.title) + tagHtml(b.tag) + '</h2>' + (b.published === false ? '<span class="dcount">hidden</span>' : '') + '</div>';
    if (b.kind === 'cards') {
      if (b.body) s.appendChild(md(b.body, 'prose lead'));
      var grid = document.createElement('div'); grid.className = 'fgrid';
      (b.cards || []).forEach(function (c) { grid.appendChild(card(c)); });
      s.appendChild(grid);
    } else if (b.kind === 'generated') {
      if (b.body) s.appendChild(md(b.body, 'prose'));
      var g = document.createElement('div'); g.className = 'generated';
      g.innerHTML = b.html || '<p class="hint">Generated part "' + esc(b.source) + '"</p>'; // from the server's own code, not from the database
      s.appendChild(g);
    } else {
      s.appendChild(md(b.body, 'prose'));
    }
    return s;
  }

  function card(c) {
    var d = document.createElement('div');
    d.className = 'fcard' + (c.published === false ? ' is-hidden' : '');
    d.innerHTML = '<h3><span>' + esc(c.title) + (c.path ? ' <code class="path">' + esc(c.path) + '</code>' : '') + '</span>' + tagHtml(c.tag) + '</h3>';
    d.appendChild(md(c.body, 'prose'));
    return d;
  }

  var mermaidTheme = null;
  var isDark = function () { return root.guideTheme ? root.guideTheme.isDark() : (root.matchMedia && root.matchMedia('(prefers-color-scheme: dark)').matches); };
  function diagrams(where) {
    if (!root.mermaid) return Promise.resolve();
    var theme = isDark() ? 'dark' : 'neutral';
    if (mermaidTheme !== theme) { root.mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: theme, fontFamily: 'inherit' }); mermaidTheme = theme; }
    var nodes = (where || document).querySelectorAll('pre.mermaid:not([data-processed])');
    // keep each diagram's text, so it can be drawn again in the other colours
    [].forEach.call(nodes, function (n) { if (!n.hasAttribute('data-src')) n.setAttribute('data-src', n.textContent); });
    // resolves when every diagram is drawn (a broken diagram stays as text)
    return nodes.length ? root.mermaid.run({ nodes: nodes }).catch(function () {}) : Promise.resolve();
  }
  // light / dark switched: draw every diagram again
  root.addEventListener('guide-theme', function () {
    if (!root.mermaid) return;
    [].forEach.call(document.querySelectorAll('pre.mermaid[data-src]'), function (n) { n.removeAttribute('data-processed'); n.textContent = n.getAttribute('data-src'); });
    diagrams(document);
  });

  // Copy buttons on code blocks (also the generated SQL queries)
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.copy'); if (!b) return;
    var pre = b.closest('.query') && b.closest('.query').querySelector('pre'); if (!pre) return;
    navigator.clipboard.writeText(pre.textContent).then(function () { var t = b.textContent; b.textContent = 'Copied'; setTimeout(function () { b.textContent = t; }, 1200); });
  });

  root.guideRender = { esc: esc, md: md, block: block, card: card, diagrams: diagrams, tagHtml: tagHtml };
})(window);
