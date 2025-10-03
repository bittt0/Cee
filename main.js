(function() {
  try {
    document.documentElement.innerHTML = '';
  } catch (e) {
    console.error('Error clearing document:', e);
  }

  // Editable secret button message (customize this string in the code)
  const SECRET_MESSAGE = 'fuck you zain';

  document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Cee</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Lilita One', system-ui, -apple-system, sans-serif;
      background: linear-gradient(135deg, #6b46c1 0%, #553c9a 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: auto;
      -webkit-user-select: none; user-select: none;
      touch-action: manipulation;
    }
    .glass {
      background: rgba(107, 70, 193, 0.4);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      text-align: center;
      color: white;
      max-width: 90vw;
      width: 100%;
      margin: 1rem;
      transition: opacity 0.3s ease;
    }
    .hidden { opacity: 0; pointer-events: none; }
    h1 {
      font-size: 3rem;
      font-weight: normal;
      background: linear-gradient(45deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      letter-spacing: 2px;
      margin-bottom: 2rem;
    }
    .game-menu {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .game-button {
      background: rgba(85, 60, 154, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: white;
      padding: 0.75rem;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: normal;
      transition: all 0.3s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .game-button:hover, .game-button:active {
      background: rgba(85, 60, 154, 0.8);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    #game-iframe {
      width: 100%;
      height: 70vh;
      border: none;
      border-radius: 12px;
      background: rgba(85, 60, 154, 0.3);
      display: none;
    }
    #password-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    #password-box {
      background: rgba(85, 60, 154, 0.7);
      backdrop-filter: blur(15px);
      border-radius: 16px;
      padding: 1.5rem;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: white;
      width: 80vw;
      max-width: 300px;
    }
    #password-input {
      padding: 0.75rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(85, 60, 154, 0.5);
      color: white;
      font-size: 1rem;
      font-weight: normal;
      margin: 1rem 0;
      width: 100%;
      outline: none;
    }
    #password-input::placeholder { color: rgba(255, 255, 255, 0.4); }
    #password-submit {
      background: rgba(107, 70, 193, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: normal;
    }
    #password-submit:hover, #password-submit:active {
      background: rgba(107, 70, 193, 1);
    }
    #error {
      color: #ff6b6b;
      font-size: 0.8rem;
      font-weight: normal;
      margin-top: 0.5rem;
    }
    .controls {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }
    .control-btn {
      background: rgba(85, 60, 154, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: white;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: normal;
      transition: all 0.3s ease;
    }
    .control-btn:hover {
      background: rgba(85, 60, 154, 0.8);
    }
    #settings-panel {
      display: none;
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(85, 60, 154, 0.7);
      backdrop-filter: blur(15px);
      border-radius: 12px;
      padding: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      z-index: 1001;
      max-width: 250px;
    }
    #settings-panel input {
      width: 100%;
      padding: 0.5rem;
      margin: 0.5rem 0;
      background: rgba(85, 60, 154, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 4px;
      font-weight: normal;
    }
    #settings-panel input[type="file"] {
      color: white;
      padding: 0;
    }
    #settings-panel button {
      background: rgba(107, 70, 193, 0.8);
      border: none;
      padding: 0.5rem;
      margin-top: 0.5rem;
      font-weight: normal;
    }
    #settings-panel button:hover {
      background: rgba(107, 70, 193, 1);
    }
    .secret-btn {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 15px;
      height: 15px;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      cursor: pointer;
      font-size: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: all 0.3s ease;
    }
    .secret-btn:hover {
      background: rgba(255, 255, 255, 0.4);
      transform: scale(1.1);
    }
    @media (max-width: 768px) {
      .glass { padding: 1rem; margin: 0.5rem; }
      h1 { font-size: 2rem; }
      .game-menu { grid-template-columns: 1fr; }
      .game-button { padding: 0.6rem; font-size: 0.85rem; }
      #game-iframe { height: 60vh; }
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .glass, #password-container { animation: fadeIn 0.6s ease-out; }
  </style>
</head>
<body>
  <div id="password-container">
    <div id="password-box">
      <h2>Enter Password</h2>
      <input type="password" id="password-input" placeholder="Password..." autocomplete="off">
      <br>
      <button id="password-submit">Submit</button>
      <div id="error"></div>
    </div>
  </div>
  <div class="glass hidden" id="main-content">
    <h1>Cee</h1>
    <div class="game-menu" id="game-menu">
      <button class="game-button" data-game="crazystackblocks">Crazy Stack Blocks</button>
      <button class="game-button" data-game="doodlejump">Doodle Jump</button>
      <button class="game-button" data-game="driftboss">Drift Boss</button>
      <button class="game-button" data-game="geometrydash">Geometry Dash</button>
      <button class="game-button" data-game="gunspin">Gun Spin</button>
      <button class="game-button" data-game="leverwarriors">Lever Warriors</button>
      <button class="game-button" data-game="miniblocks">Mini Blocks</button>
      <button class="game-button" data-game="monkeymart">Monkey Mart</button>
      <button class="game-button" data-game="motocross">Motocross</button>
      <button class="game-button" data-game="subwaysurfers">Subway Surfers</button>
      <button class="game-button" data-game="webcome">Webcome</button>
    </div>
    <div class="controls">
      <button class="control-btn" onclick="window.open('https://github.com/bittt0/Cee')">GitHub</button>
      <button class="control-btn" id="settings-btn">Settings</button>
      <button class="control-btn" onclick="document.getElementById('game-iframe').requestFullscreen()">Fullscreen</button>
      <button class="control-btn" onclick="window.close()">Close</button>
    </div>
    <iframe id="game-iframe" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation" onload="console.log('Game loaded:', this.src)" onerror="console.error('Game load failed:', this.src)"></iframe>
    <button class="secret-btn" onclick="alert('${SECRET_MESSAGE}');">?</button>
  </div>
  <div id="settings-panel">
    <h3>Settings</h3>
    <label>Tab Cloaking</label>
    <input type="text" id="title-input" placeholder="New tab title" value="Cee">
    <button onclick="cloakTab()">Apply Cloak</button>
    <br>
    <label>Tab Icon</label>
    <input type="file" id="icon-upload" accept="image/*">
    <button onclick="setIcon()">Set Icon</button>
    <button onclick="document.getElementById('settings-panel').style.display='none'">Close</button>
  </div>
</body>
</html>`);

  try {
    const mainContent = document.getElementById('main-content');
    const passwordContainer = document.getElementById('password-container');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const error = document.getElementById('error');
    const gameMenu = document.getElementById('game-menu');
    const gameIframe = document.getElementById('game-iframe');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');

    if (!mainContent || !passwordContainer || !passwordInput || !passwordSubmit) {
      console.error('DOM elements missing');
      document.body.innerHTML = '<h1 style="color:#ff6b6b;font-family:\'Lilita One\',sans-serif;text-align:center;">Error: UI failed to load. Check console.</h1>';
      return;
    }

    function checkPassword() {
      if (passwordInput.value === 'letmein') {
        passwordContainer.style.display = 'none';
        mainContent.classList.remove('hidden');
        window.name = 'cee_' + Math.random().toString(36).substring(2);
        console.log('Password accepted, UI shown');
      } else {
        error.textContent = 'Incorrect password. Try again.';
        passwordInput.value = '';
        passwordInput.focus();
        console.warn('Incorrect password entered');
      }
    }

    passwordSubmit.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') checkPassword();
    });

    gameMenu.addEventListener('click', (e) => {
      if (e.target.classList.contains('game-button')) {
        const game = e.target.dataset.game;
        const gameUrl = `https://bittt0.github.io/Cee/${game}/index.html`;
        gameIframe.src = gameUrl;
        gameIframe.style.display = 'block';
        gameMenu.style.display = 'none';
        document.querySelector('.controls').style.display = 'none';
        console.log('Loading game:', gameUrl);
      }
    });

    settingsBtn.addEventListener('click', () => {
      settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
    });

    window.cloakTab = () => {
      const newTitle = document.getElementById('title-input').value || 'Cee';
      document.title = newTitle;
      alert('Tab title changed to: ' + newTitle);
      settingsPanel.style.display = 'none';
    };

    window.setIcon = () => {
      const fileInput = document.getElementById('icon-upload');
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = e.target.result;
          document.head.appendChild(link);
          alert('Tab icon updated!');
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image file.');
      }
      settingsPanel.style.display = 'none';
    };

    document.addEventListener('contextmenu', (e) => e.preventDefault());

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        passwordInput.focus();
        console.log('DOM loaded');
      });
    } else {
      passwordInput.focus();
      console.log('DOM already loaded');
    }
  } catch (e) {
    console.error('Script error:', e);
    document.body.innerHTML = '<h1 style="color:#ff6b6b;font-family:\'Lilita One\',sans-serif;text-align:center;">Error: ' + e.message + '. Check console (F12).</h1>';
  }
})();
