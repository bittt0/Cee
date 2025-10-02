javascript:(function(){
  if(!document.getElementById('litila-font-link')){
    const link=document.createElement('link');
    link.id='litila-font-link';
    link.rel='stylesheet';
    link.href='https://fonts.googleapis.com/css2?family=Litila&display=swap';
    document.head.appendChild(link);
  }

  const style=document.createElement('style');
  style.textContent=`
    body{margin:0;padding:0;font-family:'Litila',sans-serif;background:linear-gradient(135deg,#5d00ff,#b300ff);overflow:hidden;}
    .glass-panel{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(255,255,255,0.1);backdrop-filter:blur(12px);border-radius:20px;padding:20px;z-index:9999;text-align:center;color:white;}
    .glass-panel input{padding:10px 12px;border-radius:10px;border:none;background:rgba(255,255,255,0.2);color:white;text-align:center;outline:none;font-family:'Litila',sans-serif;}
    .glass-panel button{padding:10px 20px;margin-top:10px;border-radius:12px;border:none;background:rgba(200,100,255,0.6);color:white;font-weight:bold;cursor:pointer;backdrop-filter:blur(8px);}
    .game-btn{padding:10px 15px;margin:10px;border-radius:12px;border:none;background:rgba(180,50,255,0.5);color:white;cursor:pointer;backdrop-filter:blur(8px);display:block;width:200px;text-align:center;}
    .game-list{position:fixed;top:20%;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:12px;overflow-y:auto;max-height:60%;width:220px;}
  `;
  document.head.appendChild(style);

  const overlay=document.createElement('div');
  overlay.className='glass-panel';
  const input=document.createElement('input');
  input.type='password';
  input.placeholder='Enter Password';
  const btn=document.createElement('button');
  btn.textContent='Enter';
  overlay.appendChild(input);
  overlay.appendChild(btn);
  document.body.appendChild(overlay);

  btn.onclick=checkPassword;
  input.addEventListener('keydown',e=>{if(e.key==='Enter')checkPassword();});

  function checkPassword(){
    if(input.value==='letmein'){
      overlay.remove();
      showGames();
    }else{alert('Incorrect Password!');input.value='';input.focus();}
  }

  function showGames(){
    const list=document.createElement('div');
    list.className='game-list';
    const games=[
      {name:'DriftBoss',url:'https://bittt0.github.io/Cee/games/driftboss/index.html'},
      {name:'SubwaySurfers',url:'https://bittt0.github.io/Cee/games/subwaysurfers/index.html'},
      {name:'GunSpin',url:'https://bittt0.github.io/Cee/games/gunspin/index.html'},
      {name:'DoodleJump',url:'https://bittt0.github.io/Cee/games/doodlejump/index.html'},
      {name:'WeBecome',url:'https://bittt0.github.io/Cee/games/webecome/index.html'}
    ];

    games.forEach(g=>{
      const b=document.createElement('button');
      b.className='game-btn';
      b.textContent=g.name;
      b.onclick=()=>{
        const win=window.open('about:blank','_self');
        win.location.href=g.url;
      };
      list.appendChild(b);
    });
    document.body.appendChild(list);
  }
})();
