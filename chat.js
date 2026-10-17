/*
 * "Ask a question" chat for electricianprox.com.
 *
 * Answers come from the siteChat Cloud Function (electrician-native repo,
 * functions/src/functions/siteChat.js), which reads this site's help guides.
 * Add to a page with: <script src="/chat.js" defer></script>
 *
 * Self-contained: injects its own styles (all prefixed epx-chat), keeps the
 * conversation in sessionStorage for the visit, and never renders HTML from a
 * reply (text is escaped; only URLs become links).
 */
(function () {
  'use strict';
  if (window.__epxChat) return;
  window.__epxChat = true;

  var ENDPOINT = 'https://us-central1-electrician-toolkit-33497.cloudfunctions.net/siteChat';
  var STORE_KEY = 'epx-chat-v1';
  var SUPPORT = 'support@proxtrades.com';
  var SUGGESTIONS = [
    'How do I send an estimate?',
    'How do clients pay invoices?',
    'Is there a free plan?',
    'How do I connect Thumbtack leads?',
  ];

  var css = [
    '.epx-chat-btn{position:fixed;right:20px;bottom:20px;z-index:2147483000;display:flex;align-items:center;gap:8px;',
    'padding:12px 18px;border:0;border-radius:999px;background:#F7C600;color:#1f2227;font:700 15px/1 "DM Sans",-apple-system,sans-serif;',
    'box-shadow:0 6px 24px rgba(0,0,0,.35);cursor:pointer}',
    '.epx-chat-btn svg{width:20px;height:20px}',
    '.epx-chat-btn:focus-visible{outline:3px solid #fff;outline-offset:2px}',
    '.epx-chat-panel{position:fixed;right:20px;bottom:20px;z-index:2147483001;width:380px;max-width:calc(100vw - 32px);',
    'height:560px;max-height:calc(100vh - 40px);display:none;flex-direction:column;background:#1f2227;color:#dde1ea;',
    'border:1px solid #3c4350;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.5);overflow:hidden;',
    'font:400 15px/1.5 "DM Sans",-apple-system,sans-serif}',
    '.epx-chat-panel.open{display:flex}',
    '@media (max-width:520px){.epx-chat-panel{right:0;bottom:0;width:100vw;max-width:100vw;height:100%;max-height:100%;border-radius:0;border:0}',
    '.epx-chat-btn{right:16px;bottom:16px}}',
    '.epx-chat-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:#282d35;border-bottom:1px solid #3c4350}',
    '.epx-chat-title{font-weight:700;color:#fff}',
    '.epx-chat-sub{font-size:12px;color:#a8b4c4}',
    '.epx-chat-x{background:none;border:0;color:#dde1ea;font-size:24px;line-height:1;cursor:pointer;padding:4px 8px;border-radius:8px}',
    '.epx-chat-x:focus-visible{outline:2px solid #F7C600}',
    '.epx-chat-log{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}',
    '.epx-chat-msg{max-width:88%;padding:10px 13px;border-radius:14px;white-space:pre-wrap;word-wrap:break-word}',
    '.epx-chat-msg a{color:#F7C600;word-break:break-all}',
    '.epx-chat-bot{align-self:flex-start;background:#282d35;border:1px solid #3c4350;border-bottom-left-radius:4px}',
    '.epx-chat-me{align-self:flex-end;background:#F7C600;color:#1f2227;border-bottom-right-radius:4px}',
    '.epx-chat-err{align-self:flex-start;color:#ff8a80;font-size:14px}',
    '.epx-chat-chips{display:flex;flex-wrap:wrap;gap:8px}',
    '.epx-chat-chip{background:transparent;border:1px solid #3c4350;color:#dde1ea;border-radius:999px;padding:7px 12px;',
    'font:inherit;font-size:13px;cursor:pointer;text-align:left}',
    '.epx-chat-chip:hover{border-color:#F7C600}',
    '.epx-chat-dots{align-self:flex-start;color:#a8b4c4;font-size:14px}',
    '.epx-chat-form{display:flex;gap:8px;padding:12px;border-top:1px solid #3c4350;background:#282d35}',
    '.epx-chat-input{flex:1;min-width:0;resize:none;max-height:120px;padding:10px 12px;border:1px solid #3c4350;border-radius:10px;',
    'background:#1f2227;color:#dde1ea;font:inherit;font-size:16px}',
    '.epx-chat-input:focus{outline:2px solid #F7C600;border-color:transparent}',
    '.epx-chat-send{border:0;border-radius:10px;padding:0 16px;background:#F7C600;color:#1f2227;font:700 15px "DM Sans",sans-serif;cursor:pointer}',
    '.epx-chat-send:disabled{opacity:.5;cursor:default}',
    '.epx-chat-foot{font-size:11px;color:#7a8899;text-align:center;padding:0 12px 10px;background:#282d35}',
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var chatIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

  var btn = document.createElement('button');
  btn.className = 'epx-chat-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Ask a question about Electrician Pro X');
  btn.innerHTML = chatIcon + '<span>Ask a question</span>';

  var panel = document.createElement('div');
  panel.className = 'epx-chat-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Electrician Pro X help chat');
  panel.innerHTML =
    '<div class="epx-chat-head"><div><div class="epx-chat-title">Electrician Pro X help</div>' +
    '<div class="epx-chat-sub">Answers from our user guides</div></div>' +
    '<button type="button" class="epx-chat-x" aria-label="Close chat">&times;</button></div>' +
    '<div class="epx-chat-log" aria-live="polite"></div>' +
    '<form class="epx-chat-form"><textarea class="epx-chat-input" rows="1" maxlength="600" placeholder="Ask about the app…" aria-label="Your question"></textarea>' +
    '<button type="submit" class="epx-chat-send">Send</button></form>' +
    '<div class="epx-chat-foot">AI answers can be wrong. For account help, email ' + SUPPORT + '.</div>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var log = panel.querySelector('.epx-chat-log');
  var form = panel.querySelector('.epx-chat-form');
  var input = panel.querySelector('.epx-chat-input');
  var send = panel.querySelector('.epx-chat-send');
  var busy = false;

  var messages = [];
  try { messages = JSON.parse(sessionStorage.getItem(STORE_KEY) || '[]') || []; } catch (e) { messages = []; }
  function save() {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(messages.slice(-20))); } catch (e) { /* private mode */ }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Escaped text with URLs and the support address turned into links.
  function linkify(text) {
    return escapeHtml(text)
      .replace(/https?:\/\/[^\s<)]+[^\s<).,;:!?'"]/g, function (url) {
        return '<a href="' + url + '" target="_blank" rel="noopener">' + url + '</a>';
      })
      .replace(new RegExp(SUPPORT.replace(/\./g, '\\.'), 'g'), '<a href="mailto:' + SUPPORT + '">' + SUPPORT + '</a>');
  }

  function bubble(role, text) {
    var el = document.createElement('div');
    el.className = 'epx-chat-msg ' + (role === 'user' ? 'epx-chat-me' : 'epx-chat-bot');
    if (role === 'user') el.textContent = text; else el.innerHTML = linkify(text);
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }

  function render() {
    log.innerHTML = '';
    bubble('assistant', 'Hi! Ask me anything about how Electrician Pro X works: estimates, invoices, payments, scheduling, leads, the price book and more.');
    if (!messages.length) {
      var chips = document.createElement('div');
      chips.className = 'epx-chat-chips';
      SUGGESTIONS.forEach(function (q) {
        var c = document.createElement('button');
        c.type = 'button';
        c.className = 'epx-chat-chip';
        c.textContent = q;
        c.addEventListener('click', function () { ask(q); });
        chips.appendChild(c);
      });
      log.appendChild(chips);
    }
    messages.forEach(function (m) { bubble(m.role, m.text); });
  }

  function ask(question) {
    question = String(question || '').trim();
    if (!question || busy) return;
    busy = true;
    send.disabled = true;
    if (!messages.length) { var chips = log.querySelector('.epx-chat-chips'); if (chips) chips.remove(); }
    messages.push({ role: 'user', text: question.slice(0, 600) });
    save();
    bubble('user', question);
    input.value = '';
    autosize();

    var dots = document.createElement('div');
    dots.className = 'epx-chat-dots';
    dots.textContent = 'Looking that up…';
    log.appendChild(dots);
    log.scrollTop = log.scrollHeight;

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages.slice(-8), page: location.pathname }),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (b) { return { ok: r.ok, body: b }; }); })
      .then(function (res) {
        if (!res.ok || !res.body.ok) throw new Error(res.body.error || ('Something went wrong. Please try again, or email ' + SUPPORT + '.'));
        messages.push({ role: 'assistant', text: res.body.reply });
        save();
        dots.remove();
        bubble('assistant', res.body.reply);
      })
      .catch(function (err) {
        dots.remove();
        // fetch itself failing (offline, blocked) reads "Failed to fetch".
        if (err instanceof TypeError) err = new Error('Couldn\'t reach the help service. Check your connection and try again, or email ' + SUPPORT + '.');
        // Drop the unanswered question so a retry isn't sent twice.
        messages.pop();
        save();
        var e = document.createElement('div');
        e.className = 'epx-chat-err';
        e.innerHTML = linkify((err && err.message) || ('Something went wrong. Email ' + SUPPORT + '.'));
        log.appendChild(e);
        log.scrollTop = log.scrollHeight;
        input.value = question;
      })
      .then(function () {
        busy = false;
        send.disabled = false;
        input.focus();
      });
  }

  function autosize() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  }

  function open() {
    panel.classList.add('open');
    btn.style.display = 'none';
    render();
    input.focus();
  }
  function close() {
    panel.classList.remove('open');
    btn.style.display = '';
    btn.focus();
  }

  btn.addEventListener('click', open);
  panel.querySelector('.epx-chat-x').addEventListener('click', close);
  panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); });
  input.addEventListener('input', autosize);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(input.value); }
  });
})();
