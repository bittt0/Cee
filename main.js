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
body{margin:0;padding:0;font-family:'Litila',sans-serif;overflow:hidden;background:linear-gradient(270deg,#6a0dad,#d46cff,#6a0dad);background-size:600% 600%;animation:gradAnim 15s ease infinite}
@keyframes gradAnim{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.header1{position:fixed;width:100%;text-align:center;font-size:3em;color:#d46cff;text-shadow:0 0 12px #6a0dad;z-index:100}
.header2{position:fixed;top:3.5em;width:100%;text-align:center;font-size:2em;color:#d46cff;text-shadow:0 0 8px #6a0dad;z-index:100}
.description{position:fixed;top:6em;width:100%;text-align:center;font-size:1.2em;color:#eee;z-index:100}
.input-area{position:fixed;top:8em;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;gap:0.5em;align-items:center;z-index:100}
.input-area button{padding:0.4em 1em;border:none;border-radius:8px;background:#9b59b6;color:white;font-size:1.2em;cursor:pointer}
.input-area button:hover{background:#8e44ad}
.game-list{position:fixed;top:12em;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;gap:0.5em;overflow-y:auto;height:70vh;width:80%;max-width:600px;z-index:99}
.game-list button{padding:0.6em 1em;border:none;border-radius:8px;background:rgba(255,255,255,0.2);color:white;font-size:1.1em;cursor:pointer;backdrop-filter:blur(8px);transition:0.2s}
.game-list button:hover{background:rgba(255,255,255,0.35)}
#overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.75);display:flex;justify-content:center;align-items:center;z-index:1000}
#overlay-box{background:rgba(17,17,17,0.95);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px;max-width:520px;width:90%;text-align:center}
#overlay-box h1{color:#9b59b6;margin-bottom:16px}
#overlay-box p{color:white;margin-bottom:24px}
#overlay-box button{padding:10px 20px;border:none;border-radius:10px;background:#9b59b6;color:white;cursor:pointer;font-weight:bold}
`;
document.head.appendChild(style);

document.body.innerHTML='';

const header1=document.createElement('div');
header1.className='header1';
header1.textContent='Cee';
document.body.appendChild(header1);

const header2=document.createElement('div');
header2.className='header2';
header2.textContent='Games Portal';
document.body.appendChild(header2);

const desc=document.createElement('div');
desc.className='description';
desc.textContent='Enter password to access games';
document.body.appendChild(desc);

const inputArea=document.createElement('div');
inputArea.className='input-area';
const input=document.createElement('input');
input.type='password';
input.placeholder='Enter password';
input.style.padding='0.4em 0.6em';
input.style.borderRadius='8px';
input.style.border='1px solid #9b59b6';
input.style.fontSize='1.1em';
inputArea.appendChild(input);

const passButton=document.createElement('button');
passButton.textContent='Unlock';
inputArea.appendChild(passButton);
document.body.appendChild(inputArea);

const gameList=document.createElement('div');
gameList.className='game-list';
document.body.appendChild(gameList);

const games=[
{name:'Driftboss',path:'games/driftboss/index.html'},
{name:'Subway Surfers',path:'games/subwaysurfers/index.html'},
{name:'Gunspin',path:'games/gunspin/index.html'},
{name:'Doodle Jump',path:'games/doodlejump/index.html'},
{name:'We Become',path:'games/webecome/index.html'}
];

function openGame(url){
const win=document.open('about:blank','_self');
const fullBtn=document.createElement('button');
fullBtn.textContent='Fullscreen';
fullBtn.style.position='fixed';
fullBtn.style.top='10px';
fullBtn.style.right='10px';
fullBtn.style.zIndex='9999';
fullBtn.style.padding='0.5em 1em';
fullBtn.style.background='#9b59b6';
fullBtn.style.color='white';
fullBtn.style.border='none';
fullBtn.style.borderRadius='8px';
fullBtn.style.cursor='pointer';
fullBtn.onclick=function(){
if(win.document.documentElement.requestFullscreen) win.document.documentElement.requestFullscreen();
else if(win.document.documentElement.webkitRequestFullscreen) win.document.documentElement.webkitRequestFullscreen();
};
win.document.write('<iframe src="'+url+'" style="border:none;width:100vw;height:100vh;"></iframe>');
win.document.body.appendChild(fullBtn);
}

passButton.onclick=function(){
if(input.value==='letmein'){
inputArea.style.display='none';
desc.style.display='none';
games.forEach(g=>{
const btn=document.createElement('button');
btn.textContent=g.name;
btn.onclick=function(){openGame(g.path)};
gameList.appendChild(btn);
});
}else{alert('Incorrect password');input.value='';}
};
})();
