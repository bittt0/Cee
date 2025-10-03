document.documentElement.innerHTML = '';
document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cee</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: auto;
    }
    .glass {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 2rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      text-align: center;
      color: white;
      max-width: 90vw;
      width: 100%;
      margin: 1rem;
      transition: opacity 0.3s ease;
    }
    .hidden { opacity: 0; pointer-events: none; }
    h1 {
      font-size: 3.5rem;
      font-weight: 300;
      background: linear-gradient(45deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 2px;
      margin-bottom: 1.5rem;
    }
    .subtitle {
      opacity: 0.8;
      font-size: 1.1rem;
      font-style: italic;
      margin-bottom: 2rem;
    }
    .game-menu {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    button {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      color: white;
      padding: 0.75rem;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    #password-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    #password-box {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(15px);
      border-radius: 16px;
      padding: 2rem;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
    }
    #password-input {
      padding: 0.75rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1rem;
      margin: 1rem 0;
      width: 200px;
    }
    #password-input::placeholder { color: rgba(255, 255, 255, 0.6); }
    #password-submit {
      background: rgba(102, 126, 234, 0.8);
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    #password-submit:hover {
      background: rgba(102, 126, 234, 1);
    }
    #error {
      color: #ff6b6b;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
    @media (max-width: 768px) {
      .glass { padding: 1.5rem; margin: 0.5rem; }
      h1 { font-size: 2.5rem; }
      .game-menu { grid-template-columns: 1fr; }
      #password-box { padding: 1.5rem; width: 80vw; max-width: 300px; }
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .glass { animation: fadeIn 0.6s ease-out; }
  </style>
</head>
<body>
  <div id="password-container">
    <div id="password-box">
      <h2>Enter Password to Access Cee</h2>
      <input type="password" id="password-input" placeholder="Password...">
      <br>
      <button id="password-submit">Submit</button>
      <div id="error"></div>
    </div>
  </div>
  <div class="glass hidden" id="main-content">
    <h1>Cee</h1>
    <p class="subtitle">Your Gateway to Epic Games</p>
    <div class="game-menu">
      <button onclick="window.location.href='https://bittt0.github.io/Cee/games/subway-surfers'">Subway Surfers</button>
      <button onclick="window.location.href='https://bittt0.github.io/Cee/games/snake'">Snake</button>
      <button onclick="window.location.href='https://bittt0.github.io/Cee/games/tetris'">Tetris</button>
      <button onclick="window.location.href='https://bittt0.github.io/Cee/games/cookie-clicker'">Cookie Clicker</button>
      <button onclick="window.location.href='https://bittt0.github.io/Cee/games/block-blast'">Block Blast</button>
    </div>
    <div style="margin-top: 2rem; opacity: 0.7; font-size: 0.8rem;">
      <button onclick="window.close()" style="background: rgba(255,0,0,0.2); border-color: rgba(255,0,0,0.3);">Close Window</button>
    </div>
  </div>
</body>
</html>`);

const mainContent = document.getElementById('main-content');
const passwordContainer = document.getElementById('password-container');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const error = document.getElementById('error');

function checkPassword() {
  if (passwordInput.value === 'letmein') {
    passwordContainer.style.display = 'none';
    mainContent.classList.remove('hidden');
    // Randomize window name to evade GoGuardian tracking
    window.name = 'cee_' + Math.random().toString(36).substring(2);
  } else {
    error.textContent = 'Incorrect password. Try again.';
    passwordInput.value = '';
    passwordInput.focus();
  }
}

passwordSubmit.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') checkPassword();
});

// Prevent context menu to reduce fingerprinting by filters
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Ensure script runs after DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    passwordInput.focus();
  });
} else {
  passwordInput.focus();
}

// Clear any existing content to avoid conflicts
if (document.body.children.length > 0) {
  document.body.innerHTML = '';
}
