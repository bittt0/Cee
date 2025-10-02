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
body{margin:0;font-family:'Litila',sans-serif;overflow:hidden;background:#220022;color:white;}
.header1{position:fixed;width:100%;text-align:center;font-weight:bold;font-size:3em;background:linear-gradient(to bottom,#8e2eff,#d36aff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;z-index:100;}
.header2{position:fixed;top:4em;width:100%;text-align:center;font-weight:bold;font-size:2em;background:linear-gradient(to bottom,#8e2eff,#d36aff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;z-index:100;}
.description{position:fixed;top:8em;width:100%;text-align:center;font-size:1em;color:#ccc;z-index:100;}
.input-area{position:fixed;top:11em;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.5em;z-index:100;}
.input-area button{padding:0.5em 1em;border:none;border-radius:8px;background:linear-gradient(to bottom,#8e2eff,#d36aff);color:white;font-weight:bold;cursor:pointer;}
.game-list{position:fixed;top:16em;bottom:0;width:100%;overflow-y:auto;padding:0 1em;display:flex;flex-direction:column;gap:1em;scrollbar-width:none;}
.game-list::-webkit-scrollbar{display:none;}
.game-card{padding:1em;border-radius:16px;background:rgba(255,255,255,0.05);backdrop-filter:blur(8px);cursor:pointer;transition:0.2s;}
.game-card:hover{background:rgba(255,255,255,0.1);}
.fullscreen-btn{position:absolute;top:1em;right:1em;padding:0.3em 0.6em;border:none;border-radius:8px;background:#8e2eff;color:white;cursor:pointer;z-index:1000;}
#overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);display:flex;justify-content:center;align-items:center;z-index:9999;}
#overlay-box{background:rgba(50,0,50,0.95);border-radius:16px;padding:32px;text-align:center;}
#overlay-box input{padding:8px 12px;border-radius:8px;border:1px solid #444;width:80%;margin-bottom:16px;outline:none;}
#overlay-box button{padding:8px 12px;border:none;border-radius:8px;background:#8e2eff;color:white;font-weight:bold;cursor:pointer;}
`;
document.head.appendChild(style);

const body=document.body;
body.innerHTML='';

const header1=document.createElement('div');
header1.className='header1';
header1.textContent='Cee';
body.appendChild(header1);

const header2=document.createElement('div');
header2.className='header2';
header2.textContent='Games Portal';
body.appendChild(header2);

const description=document.createElement('div');
description.className='description';
description.textContent='Enter the password to access games';
body.appendChild(description);

const overlay=document.createElement('div');
overlay.id='overlay';
const overlayBox=document.createElement('div');
overlayBox.id='overlay-box';
overlayBox.innerHTML=`
<h2>Password Required</h2>
<input type="password" id="password-input" placeholder="Enter Password"/>
<br/>
<button id="password-submit">Submit</button>
<div id="password-error" style="color:red;margin-top:10px;display:none;">Incorrect password</div>
`;
overlay.appendChild(overlayBox);
body.appendChild(overlay);

const passInput=document.getElementById('password-input');
const passBtn=document.getElementById('password-submit');
const passError=document.getElementById('password-error');
const password='letmein';

passBtn.onclick=()=>{
  if(passInput.value===password){
    overlay.remove();
    showGames();
  }else{
    passError.style.display='block';
    passInput.value='';
    passInput.focus();
  }
};

function showGames(){
  const gameList=document.createElement('div');
  gameList.className='game-list';
  body.appendChild(gameList);

  const games=[
    {name:'Driftboss',url:'https://bittt0.github.io/Cee/games/driftboss/index.html'},
    {name:'Subway Surfers',url:'https://bittt0.github.io/Cee/games/subwaysurfers/index.html'},
    {name:'GunSpin',url:'https://bittt0.github.io/Cee/games/gunspin/index.html'},
    {name:'DoodleJump',url:'https://bittt0.github.io/Cee/games/doodlejump/index.html'},
    {name:'WeBecome',url:'https://bittt0.github.io/Cee/games/webecome/index.html'}
  ];

  games.forEach(g=>{
    const card=document.createElement('div');
    card.className='game-card';
    card.textContent=g.name;
    card.onclick=()=>{
      openGame(g.url);
    };
    gameList.appendChild(card);
  });
}

function openGame(url){
  body.innerHTML='';
  const iframe=document.createElement('iframe');
  iframe.src=url;
  iframe.style.width='100%';
  iframe.style.height='100vh';
  iframe.style.border='none';
  iframe.style.backdropFilter='blur(8px)';
  body.appendChild(iframe);
  const fsBtn=document.createElement('button');
  fsBtn.className='fullscreen-btn';
  fsBtn.textContent='Fullscreen';
  fsBtn.onclick=()=>{iframe.requestFullscreen()};
  body.appendChild(fsBtn);
}

const bg=document.createElement('div');
bg.style.position='fixed';
bg.style.top='0';
bg.style.left='0';
bg.style.width='100vw';
bg.style.height='100vh';
bg.style.zIndex='-1';
bg.style.background='linear-gradient(270deg,#8e2eff,#d36aff,#8e2eff)';
bg.style.backgroundSize='600% 600%';
bg.style.animation='gradientBG 20s ease infinite';
document.body.appendChild(bg);

const animStyle=document.createElement('style');
animStyle.textContent='@keyframes gradientBG{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}';
document.head.appendChild(animStyle);
})();
