(function() {
  // Load Fredoka font if not loaded
  if (!document.getElementById('fredoka-font-link')) {
    const link = document.createElement('link');
    link.id = 'fredoka-font-link';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fredoka&display=swap';
    document.head.appendChild(link);
  }

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    body, input, select, button {
      font-family: 'Fredoka', sans-serif;
      margin:0; padding:0;
      background:#111; color:#fff;
      overflow:hidden;
    }
    .header1 { 
      font-size:3em; text-align:center; font-weight:bold;
      background: linear-gradient(to bottom, #01AEFD, #015AFD);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-top: 60px;
    }
    .input-box {
      position:fixed; top: 50%; left:50%;
      transform: translate(-50%,-50%);
      display:flex; flex-direction:column; align-items:center;
      gap:12px;
    }
    .input-box input { padding:10px 12px; border-radius:10px; border:none; font-size:1.2em; width:220px; text-align:center; }
    .input-box button { padding:10px 20px; border:none; border-radius:10px; font-size:1.2em; background: #01AEFD; color:white; cursor:pointer; }
    .games-container { display:flex; flex-wrap:wrap; justify-content:center; gap:12px; margin-top:20px; }
    .game-btn { padding:12px 18px; border-radius:12px; background: linear-gradient(to bottom, #01AEFD, #015AFD); border:none; color:white; font-size:1.1em; cursor:pointer; transition:0.2s; }
    .game-btn:hover { transform: scale(1.05); }
    #overlay { position:fixed; top:0; left:0; width:100vw; height:100vh; background: rgba(0,0,0,0.85); display:flex; justify-content:center; align-items:center; z-index:9999; }
    #overlay-box { background: rgba(17,17,17,0.95); border-radius:16px; padding:32px; text-align:center; }
    #overlay-box h1 { color:#01AEFD; font-size:1.8em; margin-bottom:16px; }
    #overlay-box p { color:#fff; margin-bottom:24px; }
    #overlay-box button { background:#01AEFD; border:none; border-radius:10px; padding:10px 16px; color:#fff; font-size:1em; cursor:pointer; }
  `;
  document.head.appendChild(style);

  // Remove existing content
  document.body.innerHTML = '';

  // Password overlay
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.innerHTML = `
    <div id="overlay-box">
      <h1>Enter Password</h1>
      <input type="password" id="pw-input" placeholder="Password" />
      <br><br>
      <button id="pw-submit">Submit</button>
      <p id="pw-error" style="color:red;display:none;">Wrong password!</p>
    </div>
  `;
  document.body.appendChild(overlay);

  const pwInput = document.getElementById('pw-input');
  const pwSubmit = document.getElementById('pw-submit');
  const pwError = document.getElementById('pw-error');
  const PASSWORD = 'cee123';

  function unlock() {
    if (pwInput.value === PASSWORD) {
      overlay.remove();
      showPortal();
    } else {
      pwError.style.display = 'block';
      pwInput.value = '';
    }
  }

  pwSubmit.onclick = unlock;
  pwInput.addEventListener('keydown', e => { if (e.key==='Enter') unlock(); });

  // Show the portal after password
  function showPortal() {
    const header = document.createElement('div');
    header.className = 'header1';
    header.textContent = 'Cee Games';

    const games = ['driftboss','subwaysurfers','gunspin','doodlejump','webecome'];
    const container = document.createElement('div');
    container.className = 'games-container';

    games.forEach(g => {
      const btn = document.createElement('button');
      btn.className = 'game-btn';
      btn.textContent = g.replace(/([A-Z])/g,' $1').replace(/^./, str=>str.toUpperCase());
      btn.onclick = () => {
        window.location.href = `https://bittt0.github.io/Cee/games/${g}/index.html`;
      };
      container.appendChild(btn);
    });

    document.body.appendChild(header);
    document.body.appendChild(container);
  }
})();
