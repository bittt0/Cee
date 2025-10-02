
(async ()=> {
  const PORTAL_BASE = 'https://bittt0.github.io/Cee/'; // trailing slash
  const RAW_MAIN_JS = 'https://raw.githubusercontent.com/bittt0/Cee/main/main.js';
  const PASSWORD = 'letmein';
  const FONT_LINK = 'https://fonts.googleapis.com/css2?family=Lilita+One&display=swap';

  // open about:blank window to host portal
  const win = window.open('about:blank', '_blank');
  if(!win){ alert('Popups blocked — allow popups for this to work'); return; }

  // a compact helper that returns a fully self-contained portal HTML as string
  function buildPortalHTML(){
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Cee Portal</title>
<link href="${FONT_LINK}" rel="stylesheet">
<style>
  :root{ --a:#b266ff; --b:#8000ff; --glass: rgba(255,255,255,0.06); --muted: rgba(255,255,255,0.72); }
  html,body{height:100%;margin:0;background:#08020a;color:#fff;font-family:'Lilita One',sans-serif;overflow-y:auto;}
  .bg{position:fixed;inset:0;z-index:0;pointer-events:none;background:linear-gradient(270deg,#5a0abf,#9b4eff,#5a0abf);background-size:600% 600%;animation:bgMove 18s linear infinite;filter:blur(24px);opacity:0.9}
  @keyframes bgMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  .wrap{position:relative;z-index:2;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:36px 18px;box-sizing:border-box;}
  .card{width:100%;max-width:1100px;border-radius:18px;padding:20px;background:var(--glass);border:1px solid rgba(255,255,255,0.06);backdrop-filter:blur(10px);}
  header{display:flex;align-items:center;justify-content:space-between;gap:12px}
  .brand{display:flex;gap:12px;align-items:center}
  .logo{width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--a),var(--b));font-weight:700}
  h1{margin:0;font-size:20px}
  .subtitle{margin:0;color:var(--muted);font-size:13px}
  .controls{display:flex;gap:8px;align-items:center}
  .btn{border:1px solid rgba(255,255,255,0.06);background:transparent;color:#fff;padding:8px 12px;border-radius:10px;cursor:pointer;font-weight:600}
  .btn-primary{background:linear-gradient(180deg,var(--a),var(--b));border:none}
  .games{margin-top:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
  .game-card{padding:12px;border-radius:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.03);display:flex;flex-direction:column;gap:8px;min-height:110px;box-sizing:border-box}
  .game-title{font-weight:700;font-size:16px}
  .game-desc{font-size:13px;color:var(--muted)}
  .card-actions{margin-top:auto;display:flex;gap:8px;align-items:center}
  .iframe-wrap{margin-top:14px;border-radius:12px;overflow:hidden;background:#000;border:1px solid rgba(255,255,255,0.03);display:none}
  iframe{width:100%;height:560px;border:0}
  @media(max-width:640px){iframe{height:420px}}
  footer{margin-top:12px;color:var(--muted);font-size:13px;text-align:center}
  /* keep background from absorbing pointer events */
  .bg, svg, .decor{pointer-events:none}
</style>
</head>
<body>
  <div class="bg" aria-hidden="true"></div>
  <div class="wrap">
    <main class="card" role="main">
      <header>
        <div class="brand">
          <div class="logo">C</div>
          <div>
            <h1>Cee Games Portal</h1>
            <p class="subtitle">Password protected • Cloaked</p>
          </div>
        </div>
        <div class="controls">
          <button id="openIndexBtn" class="btn" title="Open index.html cloaked">Open index.html (cloaked)</button>
          <button id="copyBMBtn" class="btn">Copy Bookmarklet</button>
          <button id="testOpenBtn" class="btn">Open Cloaked (test)</button>
        </div>
      </header>

      <section id="authSection" style="margin-top:12px">
        <p class="subtitle">Enter password to reveal games</p>
        <div style="display:flex;gap:8px;margin-top:10px">
          <input id="pwInput" type="password" placeholder="Password" style="flex:1;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#fff">
          <button id="pwBtn" class="btn-primary">Enter</button>
        </div>
        <p id="pwErr" style="color:#ff8080;margin-top:8px;display:none">Wrong password</p>
      </section>

      <section id="portal" style="display:none">
        <div id="gamesGrid" class="games"></div>

        <div id="iframeWrap" class="iframe-wrap">
          <div style="display:flex;align-items:center;gap:8px;padding:8px;background:linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))">
            <div style="flex:1;color:var(--muted);font-size:13px">Playing: <span id="playingName"></span></div>
            <button id="fsBtn" class="btn">Full Screen</button>
            <button id="closeFrame" class="btn">Close</button>
          </div>
          <iframe id="gameFrame" sandbox="allow-scripts allow-forms allow-same-origin"></iframe>
        </div>

        <footer>Client-side password only. Make sure game files exist at <code>${PORTAL_BASE}games/...</code></footer>
      </section>
    </main>
  </div>

  <script>
    (function(){
      const PASSWORD = ${JSON.stringify(PASSWORD)};
      const PORTAL_BASE = ${JSON.stringify(PORTAL_BASE)};
      const RAW_MAIN_JS = ${JSON.stringify(RAW_MAIN_JS)};

      const games = [
        { name: 'Drift Boss', url: PORTAL_BASE + 'games/driftboss/index.html', desc: 'Tap/Swipe to drift' },
        { name: 'Subway Surfers', url: PORTAL_BASE + 'games/subwaysurfers/index.html', desc: 'Endless runner' },
        { name: 'GunSpin', url: PORTAL_BASE + 'games/gunspin/index.html', desc: 'Spin & shoot' },
        { name: 'Doodle Jump', url: PORTAL_BASE + 'games/doodlejump/index.html', desc: 'Jump high' },
        { name: 'WeBecome', url: PORTAL_BASE + 'games/webecome/index.html', desc: 'Interactive story' }
      ];

      // DOM refs
      const pwInput = document.getElementById('pwInput');
      const pwBtn = document.getElementById('pwBtn');
      const pwErr = document.getElementById('pwErr');
      const authSection = document.getElementById('authSection');
      const portalSection = document.getElementById('portal');
      const gamesGrid = document.getElementById('gamesGrid');
      const iframeWrap = document.getElementById('iframeWrap');
      const gameFrame = document.getElementById('gameFrame');
      const playingName = document.getElementById('playingName');
      const fsBtn = document.getElementById('fsBtn');
      const closeFrame = document.getElementById('closeFrame');

      const openIndexBtn = document.getElementById('openIndexBtn');
      const copyBMBtn = document.getElementById('copyBMBtn');
      const testOpenBtn = document.getElementById('testOpenBtn');

      function renderGames(){
        gamesGrid.innerHTML = '';
        games.forEach((g, idx) => {
          const card = document.createElement('div');
          card.className = 'game-card';
          card.innerHTML = \`
            <div class="game-title">\${g.name}</div>
            <div class="game-desc">\${g.desc}</div>
            <div class="card-actions">
              <button class="btn btn-primary" data-idx="\${idx}" data-action="play">Play</button>
              <button class="btn" data-idx="\${idx}" data-action="open">Open Raw</button>
            </div>
          \`;
          gamesGrid.appendChild(card);
        });
      }

      function showPortal(){ authSection.style.display='none'; portalSection.style.display=''; renderGames(); }
      function tryAuth(){ if(pwInput.value === PASSWORD) showPortal(); else { pwErr.style.display=''; setTimeout(()=> pwErr.style.display='none',1600); pwInput.value=''; pwInput.focus(); } }
      pwBtn.addEventListener('click', tryAuth);
      pwInput.addEventListener('keydown', e=>{ if(e.key==='Enter') tryAuth(); });

      // click handler for Play/Open buttons
      gamesGrid.addEventListener('click', async (e) => {
        const btn = e.target.closest('button');
        if(!btn) return;
        const idx = Number(btn.dataset.idx);
        const action = btn.dataset.action;
        if(Number.isNaN(idx) || !action) return;
        const g = games[idx];

        if(action === 'open'){
          // navigate in same about:blank window to the hosted page (not blob)
          location.href = g.url;
          return;
        }

        // action === 'play' -> fetch and rewrite then load via blob
        try {
          const html = await fetchText(g.url);
          const base = g.url.replace(/\\/index\\.html?$/i, '');
          const rewritten = rewriteRelativeURLs(html, base);
          // create blob and navigate this page to it (keeps us cloaked)
          const blob = new Blob([rewritten], {type: 'text/html'});
          const blobUrl = URL.createObjectURL(blob);
          // show iframe and point to blob url for convenience, but we prefer navigating to blob so
          // the game runs top-level (choose one). We'll navigate the whole window to the blob so the game runs standalone cloaked.
          // Option A (in-portal iframe): gameFrame.src = blobUrl; iframeWrap.style.display='';
          // Option B (nav same tab) — we'll navigate:
          location.href = blobUrl;
        } catch (err) {
          console.error('Load failed:', err);
          // fallback — navigate to hosted page
          if(confirm('Could not load game via blob. Open hosted page instead?')) location.href = g.url;
        }
      });

      closeFrame.addEventListener('click', ()=>{ gameFrame.src='about:blank'; iframeWrap.style.display='none'; });

      fsBtn.addEventListener('click', async ()=>{
        try{
          if(gameFrame.requestFullscreen) await gameFrame.requestFullscreen();
          else if(gameFrame.webkitRequestFullscreen) await gameFrame.webkitRequestFullscreen();
          else if(gameFrame.msRequestFullscreen) await gameFrame.msRequestFullscreen();
        }catch(e){console.warn('FS failed', e);}
      });

      // helper: fetch text with reasonable error
      async function fetchText(url){
        const res = await fetch(url, {cache:'no-store'});
        if(!res.ok) throw new Error(res.status+' '+res.statusText);
        return await res.text();
      }

      // rewrite common relative references in HTML -> absolute using baseUrl
      function rewriteRelativeURLs(htmlText, baseUrl){
        // Heuristic replacements:
        //  - src="..." and href="..." where the value doesn't start with http(s)://, data:, or //
        //  - srcset entries
        //  - url(...) in inline styles
        const attrRegex = /(src|href)=["']([^"':#?][^"']*)["']/gi;
        htmlText = htmlText.replace(attrRegex, (m, attr, path)=>{
          // ignore if starts with data: or startsWith('#') or contains protocol or starts with '//'
          if(/^(data:|javascript:|#)/i.test(path)) return m;
          if(/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(path)) return m; // protocol present
          // absolute-ify
          const abs = new URL(path, baseUrl).href;
          return `${attr}="${abs}"`;
        });

        // srcset (e.g. "img-1x.png 1x, img-2x.png 2x")
        htmlText = htmlText.replace(/srcset=["']([^"']+)["']/gi, (m, val)=>{
          const parts = val.split(',').map(p=>{
            const [urlPart, rest] = p.trim().split(/\s+/,2);
            const newUrl = (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(urlPart) || urlPart.startsWith('//') || urlPart.startsWith('data:')) ? urlPart : new URL(urlPart, baseUrl).href;
            return rest ? (newUrl + ' ' + rest) : newUrl;
          });
          return `srcset="${parts.join(', ')}"`;
        });

        // CSS url(...) inside style blocks or inline styles
        htmlText = htmlText.replace(/url\\((['"]?)([^'")]+)\\1\\)/gi, (m, q, pth)=>{
          if(/^(data:|http:|https:|\/\/)/i.test(pth)) return m;
          return `url(${new URL(pth, baseUrl).href})`;
        });

        // add <base> tag so any remaining relative URLs resolve — insert after <head>
        if(/<base /i.test(htmlText) === false){
          htmlText = htmlText.replace(/<head(\\s|>)/i, (m)=> m + '\\n<base href="' + baseUrl + '">');
        }
        return htmlText;
      }

      // bookmarklet copy
      copyBMBtn.addEventListener('click', async ()=>{
        const bm = \`javascript:(function(){fetch(\${JSON.stringify(RAW_MAIN_JS)}).then(r=>r.text()).then(js=> (0,eval)(js)).catch(e=>alert('Failed to load: '+e));})();\`;
        try{
          await navigator.clipboard.writeText(bm);
          copyBMBtn.textContent = 'Copied!';
          setTimeout(()=> copyBMBtn.textContent='Copy Bookmarklet', 1500);
        }catch(e){ alert('Could not copy; use this code:\\n\\n' + bm); }
      });

      // testOpen: fetch your repo's index.html and write into new about:blank (quick cloak test)
      testOpenBtn.addEventListener('click', async ()=>{
        try{
          const w2 = window.open('about:blank','_blank');
          if(!w2){ alert('Popups blocked'); return; }
          const res = await fetch(PORTAL_BASE, {cache:'no-store'});
          if(!res.ok) throw new Error(res.status + ' ' + res.statusText);
          const html = await res.text();
          w2.document.open();
          w2.document.write(html);
          const baseEl = w2.document.createElement('base'); baseEl.href = PORTAL_BASE; w2.document.head.appendChild(baseEl);
          w2.document.close();
          try{ w2.history.replaceState({}, '', PORTAL_BASE); }catch(e){}
        }catch(err){ alert('Failed to open cloaked portal: ' + err); }
      });

      // open index.html cloaked (explicit)
      openIndexBtn.addEventListener('click', async ()=>{
        testOpenBtn.click();
      });

      // focus input
      pwInput.focus();
    })();
  </script>
</body>
</html>`;
  }

  // write portal HTML into the opened window
  win.document.open();
  win.document.write(buildPortalHTML());
  win.document.close();

})();
