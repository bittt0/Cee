(function() {
  // Clear existing content safely
  try {
    document.documentElement.innerHTML = '';
  } catch (e) {
    console.error('Error clearing document:', e);
  }

  // Write full HTML
  document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Cee</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: auto;
      -webkit-user-select: none; user-select: none;
      touch-action: manipulation;
    }
    .glass {
      background: rgba(0, 0, 0, 0.3);
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
      font-weight: 300;
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
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: white;
      padding: 0.75rem;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .game-button:hover, .game-button:active {
      background: rgba(0, 0, 0, 0.6);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    #game-iframe {
      width: 100%;
      height: 70vh;
      border: none;
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.2);
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
      background: rgba(0, 0, 0, 0.5);
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
      background: rgba(0, 0, 0, 0.4);
      color: white;
      font-size: 1rem;
      margin: 1rem 0;
      width: 100%;
      outline: none;
    }
    #password-input::placeholder { color: rgba(255, 255, 255, 0.4); }
    #password-submit {
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      color: white;
    }
    #password-submit:hover, #password-submit:active {
      background: rgba(0, 0, 0, 0.8);
    }
    #error {
      color: #ff6b6b;
      font-size: 0.8rem;
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
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: white;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 0.8rem;
      transition: all 0.3s ease;
    }
    .control-btn:hover {
      background: rgba(0, 0, 0, 0.6);
    }
    #settings-panel {
      display: none;
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.5);
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
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 4px;
    }
    .secret-btn {
      position: absolute;
      bottom: 10px;
      right: 10px;
      width: 10px;
      height: 10px;
      background: transparent;
      border: none;
      cursor: pointer;
      opacity: 0.1;
    }
    .secret-btn:hover {
      opacity: 0.5;
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
      <button class="game-button" data-game="subway-surfers">Subway Surfers</button>
      <button class="game-button" data-game="snake">Snake</button>
      <button class="game-button" data-game="tetris">Tetris</button>
      <button class="game-button" data-game="cookie-clicker">Cookie Clicker</button>
      <button class="game-button" data-game="block-blast">Block Blast</button>
    </div>
    <div class="controls">
      <button class="control-btn" onclick="window.open('https://github.com/bittt0/Cee')">GitHub</button>
      <button class="control-btn" id="settings-btn">Settings</button>
      <button class="control-btn" onclick="window.close()">Close</button>
    </div>
    <iframe id="game-iframe" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"></iframe>
    <button class="secret-btn" onclick="alert('Secret message: You found the hidden button! 🚀');" title="Secret"></button>
  </div>
  <div id="settings-panel">
    <h3>Settings</h3>
    <label>Tab Cloaking</label>
    <input type="text" id="title-input" placeholder="New tab title" value="Cee">
    <button onclick="cloakTab()">Apply Cloak</button>
    <br>
    <label>Tab Icon (simple)</label>
    <input type="text" id="icon-color" placeholder="Icon color (e.g., #purple)" value="#764ba2">
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
      document.body.innerHTML = '<h1 style="color:#ff6b6b;text-align:center;">Error: UI failed to load. Check console.</h1>';
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

    // Game loading in iframe to stay in about:blank
    gameMenu.addEventListener('click', (e) => {
      if (e.target.classList.contains('game-button')) {
        const game = e.target.dataset.game;
        gameIframe.src = `https://bittt0.github.io/Cee/${game}`;
        gameIframe.style.display = 'block';
        gameMenu.style.display = 'none';
        document.querySelector('.controls').style.display = 'none';
      }
    });

    // Settings
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
      const color = document.getElementById('icon-color').value || '#764ba2';
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22><rect width=%22256%22 height=%22256%22 fill=%22${color}%22/></svg>`;
      document.head.appendChild(link);
      alert('Simple colored icon set!');
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
    document.body.innerHTML = '<h1 style="color:#ff6b6b;font-family:system-ui;text-align:center;">Error: ' + e.message + '. Check console (F12).</h1>';
  }
})();
