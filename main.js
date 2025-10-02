// main.js for Cee — put at https://raw.githubusercontent.com/bittt0/Cee/main/main.js
(async ()=> {
  // CONFIG
  const PORTAL_BASE = 'https://bittt0.github.io/Cee/'; // your GitHub Pages root (trailing slash)
  const RAW_MAIN_JS = 'https://raw.githubusercontent.com/bittt0/Cee/main/main.js';
  const PASSWORD = 'letmein';
  // Note: Google font name is "Lilita One" (not "Litila One")
  const FONT_FAMILY = 'Lilita One, sans-serif';

  // open a new about:blank and write the portal into it
  const win = window.open('about:blank', '_blank');
  if (!win) { alert('Popups blocked — allow popups for this to work'); return; }

  // Build the portal HTML (self-contained)
  const html = `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Cee Portal</title>
    <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet">
    <style>
      :root{
        --glass-bg: rgba(255,255,255,0.06);
        --glass-border: rgba(255,255,255,0.08);
        --accent-1: #b266ff;
        --accent-2: #8000ff;
        --muted: rgba(255,255,255,0.72);
      }
      html,body{height:100%;margin:0;font-family:${FONT_FAMILY};-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;background:#0b0211;color:#fff;overflow:hidden;}
      /* Animated gradient background + subtle floating shapes (SVG) */
      .bg-wrap{position:fixed;inset:0;z-index:0;pointer-events:none;display:block;}
      .bg-gradient{position:absolute;inset:0;background:radial-gradient(30% 40% at 10% 20%, rgba(178,102,255,0.12), transparent 6%), radial-gradient(25% 30% at 90% 80%, rgba(128,0,255,0.08), transparent 6%), linear-gradient(180deg,#070014 0%, #0b0211 100%);filter:blur(18px);transform:translateZ(0);}
      /* moving wave SVG sits above gradient for parallax */
      .editorial{position:fixed;left:0;right:0;bottom:0;height:22vh;z-index:1;opacity:0.85}
      /* Layout */
      .wrap{position:relative; z-index:2; min-height:100vh; display:flex; align-items:center; justify-content:center; padding:28px;}
      .card{width:100%; max-width:1024px; border-radius:20px; padding:22px; box-sizing:border-box; background:var(--glass-bg); border:1px solid var(--glass-border); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow:0 12px 40px rgba(0,0,0,0.6);}
      header{display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px;}
      .brand{display:flex; gap:12px; align-items:center;}
      .logo{width:56px;height:56px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--accent-1),var(--accent-2));font-weight:700;color:#fff;font-size:18px;}
      h1{margin:0;font-size:20px;letter-spacing:0.6px;}
      p.small{margin:0;color:var(--muted);font-size:13px;}
      /* controls */
      .controls{display:flex; gap:8px; align-items:center;}
      .btn{background:transparent;border:1px solid rgba(255,255,255,0.06);padding:8px 12px;border-radius:10px;color:#fff;cursor:pointer;font-weight:600;}
      .btn-primary{background:linear-gradient(180deg,var(--accent-1),var(--accent-2));border:none;color:#fff;}
      .muted{color:var(--muted); font-size:13px;}
      /* games grid */
      .games{display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:12px; margin-top:14px;}
      .game-card{padding:14px;border-radius:12px;background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.03); display:flex; flex-direction:column; gap:10px;}
      .game-title{font-weight:700; font-size:16px;}
      .game-desc{font-size:13px;color:var(--muted);}
      .card-actions{display:flex; gap:8px; margin-top:auto;}
      /* iframe holder */
      .iframe-wrap{margin-top:12px;border-radius:12px;overflow:hidden;background:#000;border:1px solid rgba(255,255,255,0.03);}
      iframe{width:100%;height:520px;border:0;display:block;}
      @media(max-width:640px){ iframe{height:360px;} .card{padding:16px;} h1{font-size:16px} }
      /* small note footer */
      footer{margin-top:12px;color:var(--muted);font-size:13px;text-align:center;}
      /* subtle wave animation keyframes */
      @keyframes floatX { 0% {transform: translateX(0);} 50% {transform: translateX(-30px);} 100% {transform: translateX(0);} }
      .wave-use { animation: floatX 12s linear infinite; }
      .wave-use:nth-child(2){ animation-duration:9s; animation-delay:-2s; }
      .wave-use:nth-child(3){ animation-duration:6s; animation-delay:-4s; }
    </style>
  </head>
  <body>
    <div class="bg-wrap" aria-hidden="true">
      <div class="bg-gradient"></div>
      <!-- simple parallax svg wave -->
      <svg class="editorial" viewBox="0 0 1200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="wave" d="M0 60 C 150 20 350 20 500 60 C 650 100 850 100 1000 60 C1150 20 1200 20 1200 20 L1200 200 L0 200 Z"></path>
        </defs>
        <g fill="none" stroke="none" transform="translate(0,0)">
          <use class="wave-use" href="#wave" fill="rgba(178,102,255,0.10)" x="0" y="0"></use>
          <use class="wave-use" href="#wave" fill="rgba(128,0,255,0.08)" x="30" y="8"></use>
          <use class="wave-use" href="#wave" fill="rgba(96,20,160,0.06)" x="60" y="16"></use>
        </g>
      </svg>
    </div>

    <div class="wrap">
      <div class="card" role="main">
        <header>
          <div class="brand">
            <div class="logo">C</div>
            <div>
              <h1>Cee Games Portal</h1>
              <p class="small muted">Password protected • Mobile friendly</p>
            </div>
          </div>

          <div class="controls">
            <button id="copyBookmark" class="btn">Copy Bookmarklet</button>
            <button id="testOpen" class="btn">Open Cloaked (test)</button>
          </div>
        </header>

        <!-- Password area (if someone laden into raw index, we still show) -->
        <div id="authArea">
          <p class="muted">Enter the portal password to view games.</p>
          <div style="display:flex;gap:8px;margin-top:10px;">
            <input id="pwInput" type="password" placeholder="Password" style="flex:1;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:#fff;">
            <button id="pwBtn" class="btn-primary">Enter</button>
          </div>
          <p id="pwErr" style="color:#ff8080;display:none;margin-top:8px;">Wrong password</p>
        </div>

        <div id="portalArea" style="display:none;">
          <div class="games" id="gamesGrid"></div>

          <div id="iframeHolder" class="iframe-wrap" style="display:none;margin-top:12px;">
            <div style="display:flex;gap:8px;padding:8px;background:linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));align-items:center;">
              <div style="flex:1;color:var(--muted);font-size:13px;">Playing: <span id="playingName"></span></div>
              <button id="fsBtn" class="btn">Full Screen</button>
              <button id="closeIframe" class="btn">Close</button>
            </div>
            <iframe id="gameFrame" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
          </div>

          <footer>Note: client-side password only. Make sure game paths exist at <code>${PORTAL_BASE}games/...</code></footer>
        </div>
      </div>
    </div>

    <script>
      (function(){
        const PASSWORD = ${JSON.stringify(PASSWORD)};
        const PORTAL_BASE = ${JSON.stringify(PORTAL_BASE)};
        const games = [
          { name: 'Drift Boss', url: PORTAL_BASE + 'games/driftboss/index.html' },
          { name: 'Subway Surfers', url: PORTAL_BASE + 'games/subwaysurfers/index.html' },
          { name: 'GunSpin', url: PORTAL_BASE + 'games/gunspin/index.html' },
          { name: 'Doodle Jump', url: PORTAL_BASE + 'games/doodlejump/index.html' },
          { name: 'WeBecome', url: PORTAL_BASE + 'games/webecome/index.html' }
        ];

        const pwInput = document.getElementById('pwInput');
        const pwBtn = document.getElementById('pwBtn');
        const pwErr = document.getElementById('pwErr');
        const authArea = document.getElementById('authArea');
        const portalArea = document.getElementById('portalArea');
        const gamesGrid = document.getElementById('gamesGrid');
        const copyBookmark = document.getElementById('copyBookmark');
        const testOpen = document.getElementById('testOpen');
        const iframeHolder = document.getElementById('iframeHolder');
        const gameFrame = document.getElementById('gameFrame');
        const playingName = document.getElementById('playingName');
        const fsBtn = document.getElementById('fsBtn');
        const closeIframe = document.getElementById('closeIframe');

        function showPortal(){
          authArea.style.display='none';
          portalArea.style.display='';
          renderGames();
        }

        function renderGames(){
          gamesGrid.innerHTML='';
          games.forEach((g, idx)=>{
            const card = document.createElement('div');
            card.className='game-card';
            card.innerHTML = \`
              <div class="game-title">\${g.name}</div>
              <div class="game-desc muted">Tap Play to load inside this tab</div>
              <div class="card-actions">
                <button class="btn btn-primary" data-idx="\${idx}" data-action="play">Play</button>
                <button class="btn" data-idx="\${idx}" data-action="open">Open Raw</button>
              </div>
            \`;
            gamesGrid.appendChild(card);
          });
        }

        // handler for buttons (delegated)
        gamesGrid.addEventListener('click', (e) => {
          const btn = e.target.closest('button');
          if(!btn) return;
          const idx = parseInt(btn.dataset.idx,10);
          const action = btn.dataset.action;
          if(isNaN(idx) || !action) return;
          const g = games[idx];
          if(action === 'open'){
            // open raw in same window (stays in our about:blank context because we're already there)
            location.href = g.url;
          } else if(action === 'play'){
            // load into iframe inside this page (this keeps us in about:blank)
            playingName.textContent = g.name;
            iframeHolder.style.display = '';
            gameFrame.src = g.url;
            // scroll into view
            setTimeout(()=> iframeHolder.scrollIntoView({behavior:'smooth', block:'center'}), 150);
          }
        });

        closeIframe.addEventListener('click', ()=>{
          gameFrame.src = 'about:blank';
          iframeHolder.style.display = 'none';
        });

        fsBtn.addEventListener('click', ()=>{
          if(!iframeHolder || iframeHolder.style.display==='none') return;
          // request fullscreen for the iframe element
          if (gameFrame.requestFullscreen) gameFrame.requestFullscreen();
          else if (gameFrame.webkitRequestFullscreen) gameFrame.webkitRequestFullscreen();
          else if (gameFrame.msRequestFullscreen) gameFrame.msRequestFullscreen();
        });

        pwBtn.addEventListener('click', ()=>{
          if(pwInput.value === PASSWORD){
            showPortal();
            // optional: focus first play button
            setTimeout(()=>{ const first = document.querySelector('[data-action="play"]'); if(first) first.focus(); }, 200);
          } else {
            pwErr.style.display='';
            setTimeout(()=>pwErr.style.display='none', 1800);
            pwInput.value='';
            pwInput.focus();
          }
        });
        pwInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') pwBtn.click(); });

        // Bookmarklet copying: creates a bookmarklet that fetches raw main.js and evals it
        function makeBookmarklet(){
          const code = \`javascript:(function(){fetch(\${JSON.stringify('${RAW_MAIN_JS}')}).then(r=>r.text()).then(js=> (0,eval)(js)).catch(e=>alert('Failed to load: '+e));})();\`;
          return code;
        }
        copyBookmark.addEventListener('click', async ()=>{
          const bm = makeBookmarklet();
          try {
            await navigator.clipboard.writeText(bm);
            copyBookmark.textContent = 'Copied!';
            setTimeout(()=> copyBookmark.textContent = 'Copy Bookmarklet', 1800);
          } catch(e){
            alert('Could not copy — here is the code:\\n\\n'+bm);
          }
        });

        // test open: run the bookmarklet behavior in a new about:blank (same as clicking bookmarklet)
        testOpen.addEventListener('click', async ()=>{
          try {
            const w = window.open('about:blank','_blank');
            if(!w){ alert('Popups blocked'); return; }
            const res = await fetch('${PORTAL_BASE}', {cache:'no-store'});
            const html = await res.text();
            w.document.open();
            w.document.write(html);
            const base = w.document.createElement('base'); base.href = '${PORTAL_BASE}'; w.document.head.appendChild(base);
            w.document.close();
            try{ w.history.replaceState({}, '', '${PORTAL_BASE}'); }catch(e){}
          } catch(err) {
            alert('Failed to open cloaked portal: ' + err);
          }
        });

        // If this page is the portal (someone opened raw index), prefill pwInput focus
        pwInput.focus();
      })();
    </script>
  </body>
  </html>
  `;

  // write to new window
  win.document.open();
  win.document.write(html);
  win.document.close();

})();
