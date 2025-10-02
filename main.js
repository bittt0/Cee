javascript:(function(){
if(!document.getElementById('litila-font')){
  const link=document.createElement('link');
  link.id='litila-font';
  link.rel='stylesheet';
  link.href='https://fonts.googleapis.com/css2?family=Litila&display=swap';
  document.head.appendChild(link);
}

document.head.innerHTML='';
document.body.innerHTML='';
document.body.style.margin='0';
document.body.style.height='100vh';
document.body.style.overflow='hidden';
document.body.style.background='linear-gradient(135deg, rgba(120,81,169,0.4), rgba(180,123,210,0.4))';
document.body.style.backdropFilter='blur(12px)';
document.body.style.fontFamily="'Litila', sans-serif";
document.body.style.display='flex';
document.body.style.flexDirection='column';
document.body.style.alignItems='center';
document.body.style.justifyContent='center';

const waves=document.createElement('canvas');
waves.id='waves-canvas';
waves.style.position='absolute';
waves.style.top='0';
waves.style.left='0';
waves.width=window.innerWidth;
waves.height=window.innerHeight;
document.body.appendChild(waves);
const ctx=waves.getContext('2d');
let t=0;
function drawWaves(){
  ctx.clearRect(0,0,waves.width,waves.height);
  for(let i=0;i<3;i++){
    ctx.beginPath();
    ctx.moveTo(0,waves.height/2+i*20);
    for(let x=0;x<waves.width;x++){
      ctx.lineTo(x,waves.height/2+i*20+Math.sin((x+t)/50+i)*20);
    }
    ctx.strokeStyle=`rgba(${150+i*30},${50},${200-i*40},0.4)`;
    ctx.lineWidth=2;
    ctx.stroke();
  }
  t+=2;
  requestAnimationFrame(drawWaves);
}
drawWaves();

const overlay=document.createElement('div');
overlay.style.position='absolute';
overlay.style.top='0';
overlay.style.left='0';
overlay.style.width='100vw';
overlay.style.height='100vh';
overlay.style.background='rgba(0,0,0,0.75)';
overlay.style.display='flex';
overlay.style.flexDirection='column';
overlay.style.justifyContent='center';
overlay.style.alignItems='center';
overlay.style.zIndex='1000';
document.body.appendChild(overlay);

const title=document.createElement('h1');
title.textContent='Cee';
title.style.color='#b16aff';
title.style.fontSize='3em';
overlay.appendChild(title);

const input=document.createElement('input');
input.type='password';
input.placeholder='Enter password';
input.style.fontSize='1.2em';
input.style.padding='0.5em';
input.style.borderRadius='10px';
input.style.border='2px solid #b16aff';
input.style.marginTop='1em';
overlay.appendChild(input);

const btn=document.createElement('button');
btn.textContent='Unlock';
btn.style.marginTop='1em';
btn.style.padding='0.5em 1em';
btn.style.borderRadius='10px';
btn.style.border='none';
btn.style.background='#b16aff';
btn.style.color='white';
btn.style.cursor='pointer';
overlay.appendChild(btn);

const games=[
  {name:'Drift Boss',url:'https://bittt0.github.io/Cee/games/driftboss/index.html'},
  {name:'Subway Surfers',url:'https://bittt0.github.io/Cee/games/subwaysurfers/index.html'},
  {name:'Gunspin',url:'https://bittt0.github.io/Cee/games/gunspin/index.html'},
  {name:'Doodle Jump',url:'https://bittt0.github.io/Cee/games/doodlejump/index.html'},
  {name:'WeBecome',url:'https://bittt0.github.io/Cee/games/webecome/index.html'}
];

btn.onclick=function(){
  if(input.value==='letmein'){
    overlay.remove();
    const gameContainer=document.createElement('div');
    gameContainer.style.position='absolute';
    gameContainer.style.top='10vh';
    gameContainer.style.bottom='10vh';
    gameContainer.style.overflowY='auto';
    gameContainer.style.width='80%';
    gameContainer.style.background='rgba(255,255,255,0.1)';
    gameContainer.style.backdropFilter='blur(12px)';
    gameContainer.style.borderRadius='16px';
    gameContainer.style.padding='1em';
    gameContainer.style.display='flex';
    gameContainer.style.flexDirection='column';
    gameContainer.style.gap='1em';
    document.body.appendChild(gameContainer');

    games.forEach(g=>{
      const b=document.createElement('button');
      b.textContent=g.name;
      b.style.padding='0.5em';
      b.style.fontSize='1em';
      b.style.borderRadius='12px';
      b.style.border='none';
      b.style.cursor='pointer';
      b.style.background='rgba(200,150,255,0.5)';
      b.style.color='white';
      b.onclick=function(){
        const iframe=document.createElement('iframe');
        iframe.src=g.url;
        iframe.style.position='fixed';
        iframe.style.top='0';
        iframe.style.left='0';
        iframe.style.width='100vw';
        iframe.style.height='100vh';
        iframe.style.border='none';
        document.body.innerHTML='';
        document.body.appendChild(iframe);
      };
      gameContainer.appendChild(b);
    });
  }else{
    alert('Incorrect password');
  }
};
})();
