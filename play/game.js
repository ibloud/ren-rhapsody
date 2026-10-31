(() => {
  'use strict';
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d', { alpha: false });
  const $ = id => document.getElementById(id);
  const ui = {
    overlay: $('overlay'), endOverlay: $('endOverlay'), start: $('startButton'), restart: $('restartButton'),
    sound: $('soundToggle'), pause: $('pauseButton'), soundLabel: $('soundLabel'), objective: $('objective'), hint: $('hint'),
    collected: $('collected'), pulse: $('beatPulse'), beatLabel: document.querySelector('.beat-label'), beatText: $('beatText'),
    status: $('statusText'), best: $('bestScore'), endTitle: $('endTitle'), endCopy: $('endCopy'),
    endGlyph: $('endGlyph'), endEyebrow: $('endEyebrow'), endFragments: $('endFragments'), endBeats: $('endBeats'), endTime: $('endTime')
  };
  const WORLD = 2280, BPM_MS = 720, G = 1650;
  const platforms = [
    {x:0,y:454,w:330}, {x:420,y:421,w:145}, {x:660,y:382,w:145}, {x:895,y:414,w:145},
    {x:1130,y:367,w:150}, {x:1370,y:411,w:145}, {x:1600,y:363,w:150}, {x:1845,y:414,w:150},
    {x:2075,y:454,w:205}
  ];
  const fragments = [
    {x:486,y:385}, {x:724,y:346}, {x:954,y:378}, {x:1188,y:331}, {x:2130,y:416}
  ];
  const keys = {left:false,right:false,jump:false};
  let width=900,height=506,dpr=1,scale=1, running=false, won=false, muted=false, audio=null, beatTimer=null;
  let paused=false,pausedAt=0;
  let gameStart=0,lastFrame=0,camera=0,scoreBeats=0,landings=0,frame=0,particles=[];
  let player, found, checkpoint=50, checkpointY=416, beatPhase=0, lastBeat=-1, best=0;
  try{ best=Number(localStorage.getItem('ren-first-movement-best')||0); }catch(_){}
  ui.best.textContent=best?String(best).padStart(2,'0'):'—';

  function resize(){
    const r=canvas.getBoundingClientRect(); if(!r.width||!r.height)return;
    dpr=Math.min(window.devicePixelRatio||1,2);scale=r.height/506;width=r.width/scale;height=r.height/scale;
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  new ResizeObserver(resize).observe(canvas);window.addEventListener('resize',resize);resize();
  function reset(){
    clearControls();paused=false;ui.pause.disabled=false;ui.pause.textContent='PAUSE';ui.pause.setAttribute('aria-pressed','false');
    player={x:62,y:414,vx:0,vy:0,w:23,h:38,grounded:true,coyote:0,jumpBuffer:0,glow:0};
    found=new Set();camera=0;checkpoint=50;checkpointY=416;scoreBeats=0;landings=0;particles=[];frame=0;won=false;
    lastBeat=-1;beatPhase=0;gameStart=performance.now();lastFrame=gameStart;
    ui.collected.textContent='0';ui.objective.textContent='Reach the first rooftop.';
    ui.hint.textContent='Move with ← → or A / D · jump with Space';
    ui.beatText.textContent='WAITING FOR YOUR DOWNBEAT';ui.beatLabel.classList.remove('hit');
    ui.endOverlay.classList.add('hidden');
  }
  function nowBeat(t){return t/BPM_MS;}
  function untilBeat(t){const phase=t%BPM_MS;return Math.min(phase,BPM_MS-phase);}
  function pressJump(){if(!running||won)return;keys.jump=true;player.jumpBuffer=.13;}
  function releaseJump(){keys.jump=false;if(player&&player.vy<0)player.vy*=.58;}
  function clearControls(){keys.left=keys.right=keys.jump=false;if(player)player.jumpBuffer=0;document.querySelectorAll('[data-control]').forEach(b=>b.classList.remove('pressed'));}
  canvas.addEventListener('blur',clearControls);
  window.addEventListener('keydown',e=>{
    if(!running||document.activeElement!==canvas)return;
    if(['ArrowLeft','ArrowRight','ArrowUp',' ','Spacebar','a','A','d','D','w','W'].includes(e.key))e.preventDefault();
    if(e.key==='ArrowLeft'||e.key==='a'||e.key==='A')keys.left=true;
    if(e.key==='ArrowRight'||e.key==='d'||e.key==='D')keys.right=true;
    if((e.key===' '||e.key==='ArrowUp'||e.key==='w'||e.key==='W')&&!e.repeat)pressJump();
  },{passive:false});
  window.addEventListener('keyup',e=>{
    if(e.key==='ArrowLeft'||e.key==='a'||e.key==='A')keys.left=false;
    if(e.key==='ArrowRight'||e.key==='d'||e.key==='D')keys.right=false;
    if(e.key===' '||e.key==='ArrowUp'||e.key==='w'||e.key==='W')releaseJump();
  });
  window.addEventListener('blur',()=>pauseRun(false));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseRun(false);});
  document.querySelectorAll('[data-control]').forEach(button=>{
    const k=button.dataset.control;
    const down=e=>{if(!running)return;e.preventDefault();canvas.focus({preventScroll:true});button.classList.add('pressed');if(k==='jump')pressJump();else keys[k]=true;try{button.setPointerCapture(e.pointerId);}catch(_){}};
    const up=e=>{e.preventDefault();button.classList.remove('pressed');if(k==='jump')releaseJump();else keys[k]=false;};
    button.addEventListener('keydown',e=>{if(!running||![' ','Enter'].includes(e.key))return;e.preventDefault();if(e.repeat)return;button.classList.add('pressed');if(k==='jump')pressJump();else keys[k]=true;});
    button.addEventListener('keyup',e=>{if([' ','Enter'].includes(e.key))up(e);});
    button.addEventListener('blur',()=>{button.classList.remove('pressed');if(k==='jump')releaseJump();else keys[k]=false;});
    button.addEventListener('pointerdown',down);button.addEventListener('pointerup',up);button.addEventListener('pointercancel',up);button.addEventListener('lostpointercapture',up);
  });

  function initAudio(){
    if(muted)return;
    try{
      const AC=window.AudioContext||window.webkitAudioContext;if(!AC){ui.soundLabel.textContent='SOUND UNAVAILABLE';ui.status.textContent='Audio is unavailable here. The visual beat still works.';return;}
      if(!audio)audio=new AC();if(audio.state==='suspended')audio.resume().catch(()=>{ui.status.textContent='Audio could not resume. Toggle sound to retry; the visual beat still works.';});
      clearInterval(beatTimer);const elapsed=Math.max(0,performance.now()-gameStart);let step=Math.ceil(elapsed/BPM_MS),next=audio.currentTime+(step*BPM_MS-elapsed)/1000;
      beatTimer=setInterval(()=>{
        if(!audio||audio.state!=='running'||!running||muted)return;
        if(next<audio.currentTime-.15){const elapsed=Math.max(0,performance.now()-gameStart);step=Math.ceil(elapsed/BPM_MS);next=audio.currentTime+(step*BPM_MS-elapsed)/1000;}
        while(next<audio.currentTime+.15){playBeat(next,step);next+=BPM_MS/1000;step++;}
      },45);
    }catch(_){ui.status.textContent='Audio is unavailable here. The visual beat still works.';}
  }
  function tone(time,freq,dur,type,volume,endFreq){
    if(!audio||muted)return;const o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.setValueAtTime(freq,time);if(endFreq)o.frequency.exponentialRampToValueAtTime(endFreq,time+dur);
    g.gain.setValueAtTime(.0001,time);g.gain.exponentialRampToValueAtTime(volume,time+.008);g.gain.exponentialRampToValueAtTime(.0001,time+dur);
    o.connect(g);g.connect(audio.destination);o.start(time);o.stop(time+dur+.01);
  }
  function noise(time,dur,volume,filterFreq){
    if(!audio||muted)return;const n=Math.ceil(audio.sampleRate*dur),b=audio.createBuffer(1,n,audio.sampleRate),data=b.getChannelData(0);
    for(let i=0;i<n;i++)data[i]=Math.random()*2-1;
    const src=audio.createBufferSource(),f=audio.createBiquadFilter(),g=audio.createGain();src.buffer=b;f.type='highpass';f.frequency.value=filterFreq;
    g.gain.setValueAtTime(volume,time);g.gain.exponentialRampToValueAtTime(.0001,time+dur);src.connect(f);f.connect(g);g.connect(audio.destination);src.start(time);src.stop(time+dur);
  }
  function playBeat(t,step){
    if(step%4===0){tone(t,112,.24,'sine',.13,44);tone(t+.012,49,.16,'triangle',.06,34);}
    else if(step%4===2){noise(t,.11,.027,800);tone(t,210,.08,'triangle',.022,120);}
    else noise(t,.07,.011,6500);
    const notes=[392,440,523.25,587.33,523.25,440,349.23,392];
    if(step%2===0)tone(t+.03,notes[(step/2)%notes.length],.3,'triangle',.027,notes[(step/2)%notes.length]*.995);
  }
  ui.sound.addEventListener('click',()=>{
    muted=!muted;ui.soundLabel.textContent=muted?'SOUND OFF':'SOUND ON';ui.sound.setAttribute('aria-label',muted?'Turn sound on':'Turn sound off');
    if(muted){clearInterval(beatTimer);if(audio)audio.suspend().catch(()=>{});}else if(running)initAudio();
  });
  function pauseRun(focus=true){
    if(!running||won)return;running=false;paused=true;pausedAt=performance.now();clearControls();clearInterval(beatTimer);if(audio)audio.suspend().catch(()=>{});
    ui.pause.textContent='RESUME';ui.pause.setAttribute('aria-pressed','true');ui.status.textContent='Paused. Use Resume to continue; held controls have been cleared.';if(focus)ui.pause.focus();
  }
  function resumeRun(){if(!paused||won)return;gameStart+=performance.now()-pausedAt;lastFrame=performance.now();paused=false;running=true;ui.pause.textContent='PAUSE';ui.pause.setAttribute('aria-pressed','false');ui.status.textContent='Resumed. Focus the game area to move; sound remains optional.';initAudio();canvas.focus({preventScroll:true});}
  ui.pause.addEventListener('click',()=>paused?resumeRun():pauseRun());
  ui.start.addEventListener('click',()=>{ui.overlay.classList.add('hidden');reset();running=true;ui.status.textContent='Find the rooftops. Listen for the next pulse.';initAudio();canvas.focus?.();});
  ui.restart.addEventListener('click',()=>{reset();running=true;ui.endOverlay.classList.add('hidden');ui.status.textContent='Find the rooftops. Listen for the next pulse.';initAudio();canvas.focus({preventScroll:true});});

  function addBurst(x,y,color,count=9){for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,s=35+Math.random()*145;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-30,life:.55+Math.random()*.48,max:.9,color,r:1.3+Math.random()*2.1});}}
  function update(dt,elapsed){
    frame++;
    const t=elapsed*1000,beatIndex=Math.floor(nowBeat(t));
    if(beatIndex!==lastBeat){lastBeat=beatIndex;ui.pulse.classList.remove('on');void ui.pulse.offsetWidth;ui.pulse.classList.add('on');setTimeout(()=>ui.pulse.classList.remove('on'),220);}
    const beatDist=untilBeat(t),onBeat=beatDist<115;
    ui.beatText.textContent=onBeat?'DOWNBEAT · JUMP NOW':'FEEL THE NEXT PULSE';ui.beatLabel.classList.toggle('hit',onBeat);
    let dir=(keys.right?1:0)-(keys.left?1:0),accel=dir*1350;
    player.vx+=(accel-player.vx)*Math.min(1,dt*8);if(!dir)player.vx*=Math.max(0,1-dt*5.5);
    player.vx=Math.max(-260,Math.min(260,player.vx));
    const prevY=player.y;player.x=Math.max(0,Math.min(WORLD-player.w,player.x+player.vx*dt));
    player.vy+=G*dt;player.y+=player.vy*dt;player.grounded=false;
    for(const p of platforms){const wasAbove=prevY+player.h<=p.y+5,nowBelow=player.y+player.h>=p.y;
      if(wasAbove&&nowBelow&&player.vy>=0&&player.x+player.w>p.x+2&&player.x<p.x+p.w-2){
        player.y=p.y-player.h;player.vy=0;player.grounded=true;landings++;
        player.airJumped=false;
        if(p.x>checkpoint+140){checkpoint=Math.min(WORLD-player.w,p.x+12);checkpointY=p.y-player.h;}
        if(landings%3===0)addBurst(player.x+player.w/2,p.y,'#8ef5eb',5);
        break;
      }
    }
    player.jumpBuffer=Math.max(0,player.jumpBuffer-dt);
    if(player.grounded)player.coyote=.11;else player.coyote=Math.max(0,player.coyote-dt);
    if(player.jumpBuffer>0&&(player.grounded||player.coyote>0||!player.airJumped)){
      const clean=beatDist<125,early=t%BPM_MS<BPM_MS/2&&t%BPM_MS<125;
      const sync=clean||early;
      const launchingFromGround=player.grounded||player.coyote>0;
      player.vy=sync?-708:-565;player.grounded=false;player.coyote=0;player.jumpBuffer=0;player.glow=sync?.3:0;
      if(!launchingFromGround)player.airJumped=true;
      if(sync){scoreBeats++;addBurst(player.x+player.w/2,player.y+player.h,'#ffd18a',4);ui.status.textContent='On the beat — a little extra lift.';}
    }
    if(player.y>height+110){
      const nextRoof=platforms.find(p=>p.x>player.x&&p.x-player.x<180);
      let safe=nextRoof;
      if(!safe){for(const p of platforms)if(p.x<=player.x&&(!safe||p.x>safe.x))safe=p;}
      if(safe){checkpoint=Math.max(checkpoint,Math.min(WORLD-player.w,safe.x+12));checkpointY=safe.y-player.h;}
      player.x=Math.max(0,checkpoint);player.y=checkpointY;player.vx=0;player.vy=0;player.airJumped=false;addBurst(player.x+12,player.y+player.h,'#ff83c8',8);ui.status.textContent='Back on your feet. Keep going.';
    }
    for(let i=0;i<fragments.length;i++)if(!found.has(i)){
      const f=fragments[i],dx=player.x+player.w/2-f.x,dy=player.y+player.h/2-f.y;
      if(Math.abs(dx)<62&&Math.abs(dy)<175){found.add(i);ui.collected.textContent=found.size;addBurst(f.x,f.y,'#ffd18a',20);ui.status.textContent=`Fragment ${found.size} of ${fragments.length} found.`;
        if(found.size===fragments.length)ui.objective.textContent='All five. Find the final stage.';
      }
    }
    if(player.x>1000&&found.size<3)ui.objective.textContent='Keep moving. The light is ahead.';
    if(player.x>WORLD-105){finish();}
    player.glow=Math.max(0,player.glow-dt);
    camera=Math.max(0,Math.min(WORLD-width/Math.min(1.2,width/900),player.x-width*.38));
    for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=280*dt;p.life-=dt;}particles=particles.filter(p=>p.life>0);
  }
  function finish(){if(won)return;won=true;running=false;paused=false;clearControls();ui.pause.disabled=true;clearInterval(beatTimer);ui.endOverlay.classList.remove('hidden');ui.endTitle.textContent=found.size===5?'The light travels.':'You found your way through.';ui.endCopy.textContent=found.size===5?'Five lights returned to the skyline. The next chapter starts with you.':'The last stage is yours. Every fragment tells a different story.';ui.endGlyph.textContent=found.size===5?'✦':'◌';ui.endEyebrow.textContent=found.size===5?'THE CITY REMEMBERS':'THE NIGHT OPENS';ui.endFragments.textContent=`${found.size} / ${fragments.length}`;ui.endBeats.textContent=String(scoreBeats);ui.endTime.textContent=formatTime((performance.now()-gameStart)/1000);ui.status.textContent='Run complete.';ui.restart.focus({preventScroll:true});if(!best||scoreBeats>best){best=scoreBeats;try{localStorage.setItem('ren-first-movement-best',String(best));}catch(_){}ui.best.textContent=String(best).padStart(2,'0');}}
  function formatTime(s){return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;}
  function draw(elapsed){
    const w=width,h=height;ctx.setTransform(dpr,0,0,dpr,0,0);
    const sky=ctx.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#111426');sky.addColorStop(.53,'#242039');sky.addColorStop(1,'#182130');ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
    const par=camera*.16;const moonX=((w*.76-par*.17)%(w+160)+w+160)%(w+160)-80;
    ctx.save();ctx.globalAlpha=.8;ctx.fillStyle='#ffd8c6';ctx.shadowColor='#ff95cc';ctx.shadowBlur=32;ctx.beginPath();ctx.arc(moonX,95,24,0,Math.PI*2);ctx.fill();ctx.restore();
    drawStars(elapsed);drawCity(par,h,.28,'#202238',.14);drawCity(camera*.43,h,.48,'#191c30',.25);drawCity(camera*.76,h,.66,'#17192a',.43);
    ctx.save();ctx.translate(-camera,0);
    for(const p of platforms)drawPlatform(p,elapsed);
    drawFinish(elapsed);
    for(let i=0;i<fragments.length;i++)if(!found.has(i))drawFragment(fragments[i],elapsed,i);
    drawPlayer(elapsed);
    for(const p of particles){ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle=p.color;ctx.shadowColor=p.color;ctx.shadowBlur=12;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;ctx.shadowBlur=0;
    ctx.restore();
    const floor=ctx.createLinearGradient(0,h*.8,0,h);floor.addColorStop(0,'#17152600');floor.addColorStop(1,'#090c15cc');ctx.fillStyle=floor;ctx.fillRect(0,h*.78,w,h*.22);
  }
  function drawStars(t){let s=29;for(let i=0;i<s;i++){const x=((i*197.31+37)%Math.max(1,width)),y=25+(i*83.17%height*.53),a=.2+.33*(.5+.5*Math.sin(t*1.7+i*4));ctx.globalAlpha=a;ctx.fillStyle=i%6===0?'#ffc9e8':'#dce8ff';ctx.fillRect(x,y,i%7===0?2:1,i%7===0?2:1);}ctx.globalAlpha=1;}
  function drawCity(offset,h,factor,color,alpha){ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle=color;const base=h*.77;for(let i=0;i<22;i++){let bw=34+(i*37%63),bh=46+(i*61%140),x=((i*93-offset)%(width+130)+width+130)%(width+130)-60;ctx.fillRect(x,base-bh,bw,bh);ctx.fillStyle='#e29bd2';for(let j=0;j<4;j++)if((i+j)%3===0){ctx.globalAlpha=alpha*.3;ctx.fillRect(x+7+j*9,base-bh+11,2,3);}ctx.globalAlpha=alpha;ctx.fillStyle=color;}ctx.restore();}
  function drawPlatform(p,t){
    const y=p.y;const g=ctx.createLinearGradient(0,y,0,y+32);g.addColorStop(0,'#2e354c');g.addColorStop(1,'#151928');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(p.x,y);ctx.lineTo(p.x+p.w,y);ctx.lineTo(p.x+p.w-9,y+29);ctx.lineTo(p.x+8,y+29);ctx.closePath();ctx.fill();
    ctx.shadowColor='#8ef5eb';ctx.shadowBlur=10;ctx.fillStyle='#8ef5eb';ctx.fillRect(p.x,y,p.w,2);ctx.shadowBlur=0;
    ctx.fillStyle='#54677a';for(let q=p.x+14;q<p.x+p.w-8;q+=28){ctx.globalAlpha=.3+.2*Math.sin(t*3+q);ctx.fillRect(q,y+11,7,2);}ctx.globalAlpha=1;
  }
  function drawFragment(f,t,i){const bob=Math.sin(t*3.4+i*1.8)*5;ctx.save();ctx.translate(f.x,f.y+bob);ctx.rotate(t*.6+i);ctx.shadowColor='#ffd18a';ctx.shadowBlur=20;ctx.fillStyle='#ffe0a0';ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(7,0);ctx.lineTo(0,10);ctx.lineTo(-7,0);ctx.closePath();ctx.fill();ctx.restore();}
  function drawPlayer(t){const p=player,cx=p.x+p.w/2,by=p.y+p.h;const stretch=p.grounded?Math.sin(t*8)*1.2:Math.max(-3,Math.min(3,-p.vy*.005));ctx.save();ctx.translate(cx,by);ctx.shadowColor=p.glow?'#ffd18a':'#8ef5eb';ctx.shadowBlur=p.glow?24:12;
    ctx.fillStyle='#b7fff3';ctx.beginPath();ctx.ellipse(0,-29-stretch,8,9,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#283145';ctx.beginPath();ctx.moveTo(-9,-21);ctx.quadraticCurveTo(0,-27,9,-21);ctx.lineTo(8,-5);ctx.lineTo(4,0);ctx.lineTo(-7,0);ctx.lineTo(-10,-7);ctx.closePath();ctx.fill();ctx.strokeStyle='#a4f5e8';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-5,-4);ctx.lineTo(-8,0);ctx.moveTo(5,-4);ctx.lineTo(8,0);ctx.stroke();ctx.fillStyle='#ffd18a';ctx.fillRect(7,-25,2,2);ctx.restore();}
  function drawFinish(t){const x=2147;ctx.save();const glow=.55+.35*Math.sin(t*3);ctx.globalAlpha=glow;ctx.shadowColor='#ff83c8';ctx.shadowBlur=34;ctx.strokeStyle='#ff83c8';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,403,43,Math.PI,Math.PI*2);ctx.stroke();ctx.shadowBlur=0;ctx.fillStyle='#ffb0d9';ctx.font='10px ui-monospace,monospace';ctx.textAlign='center';ctx.fillText('THE LAST LIGHT',x,344);ctx.fillStyle='#ffe2ba';ctx.beginPath();ctx.arc(x,403,5,0,Math.PI*2);ctx.fill();ctx.restore();}
  function loop(timestamp){requestAnimationFrame(loop);if(!width||!height)return;let dt=Math.min(.035,(timestamp-lastFrame)/1000||0);lastFrame=timestamp;if(running){const elapsed=(timestamp-gameStart)/1000;update(dt,elapsed);draw(elapsed);}else if(player){draw(((paused?pausedAt:timestamp)-gameStart)/1000);}else{ctx.fillStyle='#111426';ctx.fillRect(0,0,width,height);}}
  reset();running=false;ui.pause.disabled=true;requestAnimationFrame(loop);
})();
