javascript:(function(){
  // Load Litila font
  if(!document.getElementById('litila-font-link')){
    const link = document.createElement('link');
    link.id = 'litila-font-link';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Litila&display=swap';
    document.head.appendChild(link);
  }

  // Global styles
  const style = document.createElement('style');
  style.textContent = `
    body, html {
      margin:0;
      padding:0;
      height:100%;
      width:100%;
      overflow:hidden;
      font-family: 'Litila', sans-serif;
      background: linear-gradient(135deg, #6b3cff, #c06cff);
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
    }
    #overlay {
      position: fixed; top:0; left:0;
      width:100vw; height:100vh;
      background: rgba(0,0,0,0.75);
      display:flex; justify-content:center; align-items:center;
      z-index:9999;
    }
    #overlay-box {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(15px);
      padding: 32px;
      border-radius: 16px;
      text-align:center;
      max-width:400px;
      width:90%;
      color:#fff;
      box-shadow:0 0 30px rgba(0,0,0,0.5);
    }
    #overlay-box input {
      padding:8px 12px;
      border-radius:10px;
      border:none;
      outline:none;
      font-size:16px;
      margin-bottom:12px;
      width:80%;
    }
    #overlay-box button {
      padding:8px 16px;
      border:none;
      border-radius:10px;
      cursor:pointer;
      font-size:16px;
      background: #b066ff;
      color:white;
    }
    #games-list {
      margin-top:20px;
      width:90%;
      max-width:600px;
      overflow-y:auto;
      flex:1;
    }
    .game-btn {
      display:block;
      margin:8px 0;
      padding:12px;
      background: rgba(255,255,255,0.1);
      border:none;
      border-radius:12px;
      width:100%;
      color:white;
      font-size:18px;
      cursor:pointer;
      backdrop-filter: blur(10px);
      transition:0.2s;
    }
    .game-btn:hover {
      background: rgba(255,255,255,0.2);
    }
    #bookmarklet-btn {
      margin-top:12px;
      padding:8px 16px;
      border:none;
      border-radius:12px;
      background:#b066ff;
      color:white;
      cursor:pointer;
      font-size:16px;
    }
    /* Scrollbar styling */
    #games-list::-webkit-scrollbar {
      width:8px;
    }
    #games-list::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.3);
      border-radius:4px;
    }
  `;
  document.head.appendChild(style);

  // Password overlay
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.innerHTML = `
    <div id="overlay-box">
      <h2>Enter Password</h2>
      <input id="pass-input" type="password" placeholder="Password"/>
      <br>
      <button id="pass-btn">Submit</button>
      <p style="font-size:12px;margin-top:8px;">Password is case-sensitive.</p>
    </div>
  `;
  document.body.appendChild(overlay);

  const passInput = document.getElementById('pass-input');
  const passBtn = document.getElementById('pass-btn');
  const PASSWORD = 'letmein';

  passBtn.onclick = checkPass;
  passInput.addEventListener('keydown', e => { if(e.key==='Enter') checkPass(); });

  function checkPass(){
    if(passInput.value === PASSWORD){
      overlay.remove();
      showGames();
    } else {
      alert('Incorrect Password!');
      passInput.value='';
      passInput.focus();
    }
  }

  // Game list
  const games = [
    {name:'DriftBoss', path:'https://bittt0.github.io/Cee/games/driftboss/index.html'},
    {name:'Subway Surfers', path:'https://bittt0.github.io/Cee/games/subwaysurfers/index.html'},
    {name:'GunSpin', path:'https://bittt0.github.io/Cee/games/gunspin/index.html'},
    {name:'DoodleJump', path:'https://bittt0.github.io/Cee/games/doodlejump/index.html'},
    {name:'WeBecome', path:'https://bittt0.github.io/Cee/games/webecome/index.html'}
  ];

  function showGames(){
    const list = document.createElement('div');
    list.id='games-list';
    document.body.appendChild(list);

    games.forEach(game => {
      const btn = document.createElement('button');
      btn.className='game-btn';
      btn.textContent = game.name;
      btn.onclick = ()=>{
        // fetch game HTML and replace body
        fetch(game.path)
          .then(res=>res.text())
          .then(html=>{
            document.head.innerHTML=''; 
            document.body.innerHTML=html;
          })
          .catch(err=>alert('Failed to load game: '+err));
      };
      list.appendChild(btn);
    });

    // Add bookmarklet copy button
    const bookmarkBtn = document.createElement('button');
    bookmarkBtn.id='bookmarklet-btn';
    bookmarkBtn.textContent='Copy Bookmarklet';
    bookmarkBtn.onclick = ()=>{
      const code = `javascript:(function(){fetch('https://raw.githubusercontent.com/bittt0/Cee/main/main.js').then(r=>r.text()).then(eval);})();`;
      navigator.clipboard.writeText(code).then(()=>alert('Bookmarklet copied!'));
    };
    document.body.appendChild(bookmarkBtn);
  }

})();
