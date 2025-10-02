(function() {
  // ===== CONFIG =====
  const password = 'letmein';
  const games = [
    { name: 'Drift Boss', path: 'https://bittt0.github.io/Cee/games/driftboss/index.html' },
    { name: 'Subway Surfers', path: 'https://bittt0.github.io/Cee/games/subwaysurfers/index.html' },
    { name: 'Gunspin', path: 'https://bittt0.github.io/Cee/games/gunspin/index.html' },
    { name: 'Doodle Jump', path: 'https://bittt0.github.io/Cee/games/doodlejump/index.html' },
    { name: 'We Become', path: 'https://bittt0.github.io/Cee/games/webecome/index.html' }
  ];

  // ===== CLEAR PAGE =====
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  document.body.style.margin = '0';
  document.body.style.height = '100vh';
  document.body.style.overflow = 'hidden';
  document.body.style.fontFamily = "'Segoe UI', sans-serif";

  // ===== ADD GOOGLE FONT =====
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Litil+One&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // ===== GLASSY ANIMATED BACKGROUND =====
  const bg = document.createElement('div');
  bg.style.position = 'fixed';
  bg.style.top = '0';
  bg.style.left = '0';
  bg.style.width = '100%';
  bg.style.height = '100%';
  bg.style.background = 'linear-gradient(135deg, #a07cff, #6b39ff)';
  bg.style.backgroundSize = '400% 400%';
  bg.style.animation = 'gradientBG 15s ease infinite';
  document.body.appendChild(bg);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes gradientBG {
      0% {background-position: 0% 50%;}
      50% {background-position: 100% 50%;}
      100% {background-position: 0% 50%;}
    }
    .glass-panel {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(12px);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      text-align: center;
      color: white;
      min-width: 320px;
    }
    .glass-panel h1 {
      font-family: 'Litil One', sans-serif;
      margin-bottom: 24px;
      font-size: 2em;
    }
    .glass-panel input {
      padding: 10px 15px;
      border-radius: 12px;
      border: none;
      margin-bottom: 20px;
      font-size: 1em;
      text-align: center;
    }
    .glass-panel button {
      padding: 10px 20px;
      border-radius: 12px;
      border: none;
      background: rgba(255,255,255,0.25);
      color: white;
      font-weight: bold;
      cursor: pointer;
      margin: 5px;
      transition: all 0.2s;
    }
    .glass-panel button:hover {
      background: rgba(255,255,255,0.4);
    }
  `;
  document.head.appendChild(style);

  // ===== PASSWORD PANEL =====
  const panel = document.createElement('div');
  panel.className = 'glass-panel';
  panel.innerHTML = `
    <h1>Enter Password</h1>
    <input type="password" placeholder="Password" id="pwd-input"/>
    <br/>
    <button id="pwd-submit">Submit</button>
  `;
  document.body.appendChild(panel);

  const input = panel.querySelector('#pwd-input');
  const submit = panel.querySelector('#pwd-submit');

  function showGames() {
    panel.innerHTML = '<h1>Select a Game</h1>';
    games.forEach(game => {
      const btn = document.createElement('button');
      btn.textContent = game.name;
      btn.onclick = () => window.location.href = game.path; // opens in same tab
      panel.appendChild(btn);
    });

    // Add copy bookmarklet button
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy Bookmarklet';
    copyBtn.onclick = () => {
      const code = `javascript:(function(){fetch('https://raw.githubusercontent.com/bittt0/Cee/main/main.js').then(r=>r.text()).then(eval);})();`;
      navigator.clipboard.writeText(code).then(() => alert('Bookmarklet copied!'));
    };
    panel.appendChild(document.createElement('br'));
    panel.appendChild(copyBtn);
  }

  submit.onclick = () => {
    if(input.value === password){
      showGames();
    } else {
      alert('Incorrect password!');
    }
  };

  input.addEventListener('keydown', e => {
    if(e.key === 'Enter') submit.click();
  });

})();
