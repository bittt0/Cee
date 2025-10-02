// main.js — Cee portal loader
(async () => {
  // CONFIG
  const PORTAL_BASE = 'https://bittt0.github.io/Cee/'; // trailing slash
  const RAW_MAIN_JS = 'https://raw.githubusercontent.com/bittt0/Cee/main/main.js';
  const PASSWORD = 'letmein';
  const FONT_LINK = 'https://fonts.googleapis.com/css2?family=Lilita+One&display=swap';

  // 1) open a clean about:blank window where we will write the portal
  const win = window.open('about:blank', '_blank');
  if (!win) { alert('Popups blocked — allow popups for this to work'); return; }

  // 2) build the portal HTML (self-contained)
  const portalHTML = `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Cee Portal</title>
    <link href="${FONT_LINK}" rel="stylesheet">
    <style>
      :root{
        --accent-a:#b266ff;
        --accent-b:#8000ff;
        --glass: rgba(255,255,255,0.06);
        --glass-border: rgba(255,255,255,0.08);
        --muted: rgba(255,255,255,0.72);
      }
      html,body{height:100%;margin:0;background:#0b0211;color:#fff;font-family:'Lilita One',sans-serif;-webkit-font-smoothing:antialiased;overflow-y:auto;-webkit-overflow-scrolling:touch;}
      /* animated gradient background */
      .bg { position:fixed; inset:0; z-index:0; pointer-events:none; background: linear-gradient(270deg,#5a0abf,#9b4eff,#5a0abf); background-size:600% 600%; animation:bgMove 18s ease infinite; filter: blur(22px); opacity:0.9; }
      @keyframes bgMove { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
      /* main layout */
      .wrap { position:relative; z-index:2; min-height:100vh; display:flex; align-items:flex-start; justify-content:center; padding:36px 18px; box-sizing:border-box; }
      .card { width:100%; max-width:1100px; border-radius:18px; padding:20px; box-sizing:border-box; background:var(--glass); border:1px solid var(--glass-border); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow:0 14px 40px rgba(3,6,20,0.6); }
      header { display:flex; align-items:center; justify-content:space-between; gap:12px; }
      .brand { display:flex; align-items:center; gap:12px; }
      .logo { width:56px; height:56px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:20px; background:linear-gradient(135deg,var(--accent-a),var(--accent-b)); color:white; box-shadow:0 6px 18px rgba(128,0,255,0.14); }
      h1 { margin:0; font-size:20px; letter-spacing:0.3px; }
      .subtitle { margin:0; font-size:13px; color:var(--muted); }
      .controls { display:flex; gap:8px; align-items:center; }

      .btn { border:1px solid rgba(255,255,255,0.06); background:transparent; color:white; padding:8px 12px; border-radius:10px; cursor:pointer; font-weight:600; }
      .btn-primary { background: linear-gradient(180deg,var(--accent-a),var(--accent-b)); border:none; color:white; }

      /* grid */
      .games { margin-top:18px; display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:12px; }
      .game-card { padding:12px; border-radius:12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.03); display:flex; flex-direction:column; gap:8px; min-height:110px; box-sizing:border-box; }
      .game-title { font-weight:700; font-size:16px; }
      .game-desc { font-size:13px; color:var(--muted); margin-bottom:6px; }

      .card-actions { margin-top:auto; display:flex; gap:8px; align-items:center; }
      .iframe-wrap { margin-top:14px; border-radius:12px; overflow:hidden; background:#000; border:1px solid rgba(255,255,255,0.03); display:none; }
      iframe { width:100%; height:560px; border:0; display:block; background:#000; }
      @media(max-width:640px){ iframe{ height:420px } }

      footer { margin-top:12px; color:var(--muted); font-size:13px; text-align:center; }

      /* ensure background doesn't intercept pointer events */
      .bg, svg, .decor { pointer-events: none; }
      /* interactive elements must have pointer-events:auto (default) */
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
              <p class="subtitle">Password protected • Cloaked in about:blank</p>
            </div>
          </div>

          <div class="controls">
            <button id="openIndexBtn" class="btn" title="Open your repo index.html in a cloaked about:blank tab">Open index.html (cloaked)</button>
            <button id="copyBMBtn" class="btn">Copy Bookmarklet</button>
            <button id="testOpenBtn" class="btn">Open Cloaked (test)</button>
          </div>
        </header>

        <!-- authentication -->
        <section id="authSection" style="margin-top:12px;">
          <p class="subtitle">Enter password to reveal games</p>
          <div style="display:flex; gap:8px; margin-top:10px;">
            <input id="pwInput" type="password" placeholder="Password" style="flex:1;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#fff;">
            <button id="pwBtn" class="btn-primary">Enter</button>
          </div>
          <p id="pwErr" style="color:#ff8080; margin-top:8px; display:none;">Wrong password</p>
        </section>

        <!-- portal -->
        <section id="portal" style="display:none;">
          <div id="gamesGrid" class="games"></div>

          <div id="iframeWrap" class="iframe-wrap">
            <div style="display:flex; align-items:center; gap:8px; padding:8px; background:linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));">
              <div style="flex:1; color:var(--muted); font-size:13px;">Playing: <span id="playingName"></span></div>
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

        // Game list:
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

        // auth
        function showPortal(){
          authSection.style.display = 'none';
          portalSection.style.display = '';
          renderGames();
        }
        function tryAuth(){
          if (pwInput.value === PASSWORD){
            showPortal();
          } else {
            pwErr.style.display = '';
            setTimeout(()=> pwErr.style.display = 'none', 1600);
            pwInput.value = '';
            pwInput.focus();
          }
        }
        pwBtn.addEventListener('click', tryAuth);
        pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryAuth(); });

        // delegated click handler for game buttons
        gamesGrid.addEventListener('click', (e) => {
          const btn = e.target.closest('button');
          if (!btn) return;
          const idx = Number(btn.dataset.idx);
          const action = btn.dataset.action;
          if (Number.isNaN(idx) || !action) return;
          const g = games[idx];
          if (action === 'open') {
            // navigate SAME about:blank window to the game's full page (not a GitHub raw page)
            location.href = g.url;
          } else if (action === 'play') {
            // load into iframe inside this portal (keeps us cloaked)
            playingName.textContent = g.name;
            iframeWrap.style.display = '';
            // set src (will load via GitHub Pages)
            gameFrame.src = g.url;
            setTimeout(()=> iframeWrap.scrollIntoView({behavior:'smooth', block:'center'}), 150);
          }
        });

        closeFrame.addEventListener('click', () => {
          gameFrame.src = 'about:blank';
          iframeWrap.style.display = 'none';
        });

        fsBtn.addEventListener('click', async () => {
          try {
            if (gameFrame.requestFullscreen) await gameFrame.requestFullscreen();
            else if (gameFrame.webkitRequestFullscreen) await gameFrame.webkitRequestFullscreen();
            else if (gameFrame.msRequestFullscreen) await gameFrame.msRequestFullscreen();
          } catch (e) { console.warn('Fullscreen failed', e); }
        });

        // Copy bookmarklet (copies one-liner that fetches RAW_MAIN_JS and evals it)
        copyBMBtn.addEventListener('click', async () => {
          const bm = \`javascript:(function(){fetch(\${JSON.stringify(RAW_MAIN_JS)}).then(r=>r.text()).then(js=> (0,eval)(js)).catch(e=>alert('Failed to load: '+e));})();\`;
          try {
            await navigator.clipboard.writeText(bm);
            copyBMBtn.textContent = 'Copied!';
            setTimeout(()=> copyBMBtn.textContent = 'Copy Bookmarklet', 1500);
          } catch (e){
            alert('Could not copy. Use this code:\\n\\n' + bm);
          }
        });

        // Test open: open your portal base in a new about:blank (same as bookmarklet behavior but for test)
        testOpenBtn.addEventListener('click', async () => {
          try {
            const w = window.open('about:blank','_blank');
            if(!w){ alert('Popups blocked'); return; }
            const res = await fetch(PORTAL_BASE, {cache:'no-store'});
            if(!res.ok) throw new Error(res.status+' '+res.statusText);
            const html = await res.text();
            w.document.open();
            w.document.write(html);
            const base = w.document.createElement('base'); base.href = PORTAL_BASE; w.document.head.appendChild(base);
            w.document.close();
            try{ w.history.replaceState({}, '', PORTAL_BASE); } catch(e){}
          } catch (err) {
            alert('Failed to open cloaked portal: ' + err);
          }
        });

        // NEW BUTTON: Open index.html (cloaked) — emulate the user clicking the "open portal" but specifically fetch index.html from your GitHub Pages URL
        openIndexBtn.addEventListener('click', async () => {
          try {
            const w = window.open('about:blank','_blank');
            if(!w){ alert('Popups blocked'); return; }
            const res = await fetch(PORTAL_BASE, {cache:'no-store'});
            if(!res.ok) throw new Error(res.status+' '+res.statusText);
            const html = await res.text();
            w.document.open();
            w.document.write(html);
            const base = w.document.createElement('base'); base.href = PORTAL_BASE; w.document.head.appendChild(base);
            w.document.close();
            try{ w.history.replaceState({}, '', PORTAL_BASE); } catch(e){}
          } catch (err) {
            alert('Failed to open index.html cloaked: ' + err);
          }
        });

        // focus pw input
        pwInput.focus();
      })();
    </script>
  </body>
  </html>
  `;

  // 3) write portal HTML into new window
  win.document.open();
  win.document.write(portalHTML);
  win.document.close();

  // done
})();
