// A small, safe Markdown renderer for guide cards: everything is escaped first, then only these are allowed:
//   - bullet lines, ## headings, paragraphs, **bold**, *italic*, `code`, [text](link)  (links: http(s), mailto, relative, #anchor)
(function (root) {
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); };
  function inline(s) {
    var codes = [];
    s = esc(s).replace(/`([^`]+)`/g, function (_, c) { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, t, href) {
      var ok = /^(https?:\/\/|mailto:|#|\/|\.\/|[a-z0-9_-]+\.html)/i.test(href) && !/^javascript:/i.test(href);
      return ok ? '<a href="' + href + '"' + (/^https?:/i.test(href) ? ' target="_blank" rel="noopener"' : '') + '>' + t + '</a>' : t;
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<i>$2</i>');
    return s.replace(/\u0000(\d+)\u0000/g, function (_, i) { return '<code>' + codes[+i] + '</code>'; });
  }
  function md(src) {
    var out = [], list = false, para = [];
    var flush = function () { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } };
    String(src || '').replace(/\r/g, '').split('\n').forEach(function (line) {
      var t = line.trim(), m;
      if ((m = /^[-*]\s+(.*)$/.exec(t))) { flush(); if (!list) { out.push('<ul>'); list = true; } out.push('<li>' + inline(m[1]) + '</li>'); return; }
      if (list) { out.push('</ul>'); list = false; }
      if (!t) { flush(); return; }
      if ((m = /^#{2,4}\s+(.*)$/.exec(t))) { flush(); out.push('<h4>' + inline(m[1]) + '</h4>'); return; }
      para.push(t);
    });
    flush(); if (list) out.push('</ul>');
    return out.join('');
  }
  root.guideMd = { md: md, inline: inline, esc: esc };
})(window);
