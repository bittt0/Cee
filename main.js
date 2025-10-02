javascript:(function(){
  // Load Litila One font
  if (!document.getElementById('litila-font-link')) {
    const link = document.createElement('link');
    link.id = 'litila-font-link';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Litila+One&display=swap';
    document.head.appendChild(link);
  }

  const PASSWORD = 'letmein';

  // Clear old content
  ['.editorial','.content','.header','.description','.input-area'].forEach(sel=>{
    const el = document.querySelector(sel);
    if(el) el.remove();
  });

  // Overlay for password
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;top:0;left:0;width:100vw;height:100vh;
    background: rgba(0,0,0,0.85); display:flex;
    justify-content:center; align-items:center; z-index:99999;
    font-family:'Litila One',sans-serif;
  `;
  const box = document.createElement('div');
  box.style.cssText = `
    background: rgba(60,0,80,0.95); border-radius:16px;
    padding:32px; text-align:center; color:white;
    width:90%; max-width:400px; box-shadow:0 0 20px #8000ff;
  `;
  const title = document.createElement('h1');
  title.textContent = 'Enter Password';
  title.style.color = '#DDA0FF';
  const input = document.createElement('input');
  input.type='password';
  input.placeholder='Password';
  input.style.cssText=`padding:8px 12px;border-radius:8px;border:none;margin:16px 0;width:80%;text-align:center;font-family:'Litila One',sans-serif; font-size:1em;`;
  const submit = document.createElement('button');
  submit.textContent='Enter';
  submit.style.cssText=`padding:8px 16px;background:linear-gradient(to bottom,#B266FF,#8000FF);border:none;border-radius:10px;color:white;font-family:'Litila One',sans-serif;font-size:1em;cursor:pointer;`;

  box.appendChild(title);
  box.appendChild(input);
  box.appendChild(document.createElement('br'));
  box.appendChild(submit);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  submit.onclick = checkPassword;
  input.addEventListener('keydown', e=>{if(e.key==='Enter') checkPassword();});

  function checkPassword(){
    if(input.value===PASSWORD){
      overlay.remove();
      showGames();
    } else{
      alert('Incorrect password!');
      input.value='';
      input.focus();
    }
  }

  function showGames(){
    const container = document.createElement('div');
    container.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:16px;margin-top:40px;font-family:"Litila One",sans-serif;';
    
    const games = [
      {name:'DriftBoss', path:'games/driftboss/index.html'},
      {name:'Subway Surfers', path:'games/subwaysurfers/index.html'},
      {name:'GunSpin', path:'games/gunspin/index.html'},
      {name:'DoodleJump', path:'games/doodlejump/index.html'},
      {name:'WeBecome', path:'games/webecome/index.html'}
    ];

    games.forEach(g=>{
      const btn = document.createElement('button');
      btn.textContent=g.name;
      btn.style.cssText=`padding:10px 20px; font-size:1.2em; border:none; border-radius:12px; background:linear-gradient(to bottom,#B266FF,#8000FF); color:white; cursor:pointer; font-family:'Litila One',sans-serif;`;
      btn.onclick = ()=>{ window.location.href=g.path; }; // same tab
      container.appendChild(btn);
    });

    document.body.appendChild(container);
  }
})();
