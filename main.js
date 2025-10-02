javascript:(function(){
  // Load Litila font
  if (!document.getElementById('litila-font')) {
    const link = document.createElement('link');
    link.id = 'litila-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Litila&display=swap';
    document.head.appendChild(link);
  }

  // Reset page
  document.body.innerHTML = '';
  document.head.innerHTML = '';
  document.body.style.margin = '0';
  document.body.style.fontFamily = "'Litila', sans-serif";
  document.body.style.overflowY = 'auto';
  document.body.style.background = '#1c0a2f';
  document.body.style.color = '#fff';

  // Animated purple background
  const bg = document.createElement('div');
  bg.className = 'animated-bg';
  bg.style.position = 'fixed';
  bg.style.top = '0';
  bg.style.left = '0';
  bg.style.width = '100%';
  bg.style.height = '100%';
  bg.style.background = 'linear-gradient(270deg, #5a0abf, #9b4eff, #5a0abf)';
  bg.style.backgroundSize = '600% 600%';
  bg.style.zIndex = '-1';
  bg.style.pointerEvents = 'none';
  bg.style.animation = 'bgMove 20s ease infinite';
  document.body.appendChild(bg);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes bgMove {
      0% {background-position:0% 50%;}
      50% {background-position:100% 50%;}
      100% {background-position:0% 50%;}
    }
    .game-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 2rem;
      gap: 2rem;
    }
    .game-card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(12px);
      border-radius: 16px;
      width: 200px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.2rem;
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
      user-select: none;
    }
    .game-card:hover {
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(155, 78, 255, 0.6);
    }
  `;
  document.head.appendChild(style);

  // Password overlay
  const overlay = document.createElement('div');
  overlay.id = 'password-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '100';
  overlay.innerHTML = `
    <h1 style="color:#b58aff; font-family:'Litila',sans-serif; margin-bottom:1rem;">Enter Password</h1>
    <input id="password-input" type="password" placeholder="Password" style="padding:0.5rem 1rem; font-size:1rem; border-radius:8px; border:none; outline:none; text-align:center;"/>
    <button id="password-submit" style="margin-top:1rem; padding:0.5rem 1rem; border:none; border-radius:8px; background:#9b4eff; color:white; font-weight:bold; cursor:pointer;">Submit</button>
    <div id="password-error" style="color:#ff5555; margin-top:0.5rem; display:none;">Incorrect password</div>
  `;
  document.body.appendChild(overlay);

  const passwordInput = document.getElementById('password-input');
  const passwordSubmit = document.getElementById('password-submit');
  const passwordError = document.getElementById('password-error');
  const PASSWORD = 'letmein';

  function unlock() {
    if(passwordInput.value === PASSWORD){
      overlay.remove();
      showGames();
    } else {
      passwordError.style.display = 'block';
      passwordInput.value = '';
    }
  }

  passwordSubmit.addEventListener('click', unlock);
  passwordInput.addEventListener('keydown', e => {
    if(e.key === 'Enter') unlock();
  });

  // Game list
  function showGames(){
    const games = [
      {name: 'Drift Boss', path: 'https://bittt0.github.io/Cee/games/driftboss/index.html'},
      {name: 'Subway Surfers', path: 'https://bittt0.github.io/Cee/games/subwaysurfers/index.html'},
      {name: 'GunSpin', path: 'https://bittt0.github.io/Cee/games/gunspin/index.html'},
      {name: 'Doodle Jump', path: 'https://bittt0.github.io/Cee/games/doodlejump/index.html'},
      {name: 'We Become', path: 'https://bittt0.github.io/Cee/games/webecome/index.html'}
    ];

    const list = document.createElement('div');
    list.className = 'game-list';
    document.body.appendChild(list);

    games.forEach(game=>{
      const card = document.createElement('div');
      card.className = 'game-card';
      card.textContent = game.name;
      card.onclick = () => {
        // Open in same about:blank window
        window.location.href = game.path;
      };
      list.appendChild(card);
    });
  }
})();
