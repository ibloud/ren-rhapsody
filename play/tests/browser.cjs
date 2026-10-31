// Optional maintainer regression check. Playwright/Chromium are supplied externally.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const base=process.env.FIRST_MOVEMENT_URL||'http://127.0.0.1:8041/play/';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
 console.log('Environment',new Date().toISOString(),browser.version(),process.version,base);
 const page=await browser.newPage({viewport:{width:1280,height:900}});const errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 await page.addInitScript(()=>{
  const Native=window.AudioContext||window.webkitAudioContext;window.__audioEvidence={oscillators:0,peak:0,contexts:[]};if(!Native)return;
  window.AudioContext=class extends Native{constructor(...args){super(...args);window.__audioEvidence.contexts.push(this);const analyser=this.createAnalyser();analyser.fftSize=256;analyser.connect(this.destination);const old=this.createGain.bind(this);this.createGain=()=>{const gain=old();const connect=gain.connect.bind(gain);gain.connect=(target,...args)=>connect(target===this.destination?analyser:target,...args);return gain;};setInterval(()=>{const samples=new Float32Array(256);analyser.getFloatTimeDomainData(samples);for(const v of samples)window.__audioEvidence.peak=Math.max(window.__audioEvidence.peak,Math.abs(v));},20);const oscillator=this.createOscillator.bind(this);this.createOscillator=()=>{window.__audioEvidence.oscillators++;return oscillator();};}};
 });
 await page.goto(base);await page.locator('#startButton').focus();await page.keyboard.press('Space');await page.locator('#overlay').waitFor({state:'hidden'});assert.equal(await page.evaluate(()=>document.activeElement.id),'game');
 await page.waitForTimeout(1900);let audio=await page.evaluate(()=>({count:__audioEvidence.oscillators,peak:__audioEvidence.peak,state:__audioEvidence.contexts[0]?.state}));assert.equal(audio.state,'running');assert.ok(audio.count>0&&audio.peak>0,JSON.stringify(audio));console.log('PASS native Web Audio: oscillator scheduling and non-zero rendered signal',audio);
 // Space on sound stays native; game keys only act in the focused canvas.
 await page.locator('#soundToggle').focus();await page.keyboard.press('Space');assert.equal(await page.locator('#soundLabel').innerText(),'SOUND OFF');await page.waitForTimeout(150);assert.equal(await page.evaluate(()=>__audioEvidence.contexts[0].state),'suspended');
 await page.keyboard.press('Space');await page.waitForTimeout(150);assert.equal(await page.evaluate(()=>__audioEvidence.contexts[0].state),'running');
 await page.locator('#game').focus();await page.keyboard.down('ArrowRight');await page.waitForTimeout(250);await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await page.keyboard.up('ArrowRight');assert.equal(await page.locator('#pauseButton').innerText(),'RESUME');await page.waitForTimeout(300);await page.locator('#pauseButton').click();assert.equal(await page.evaluate(()=>document.activeElement.id),'game');
 // Resize in a live run; no restart or loss of controls.
 for(const width of [320,390,820,1280]){await page.setViewportSize({width,height:900});const size=await page.locator('#game').evaluate(e=>({w:e.width,h:e.height,overflow:document.documentElement.scrollWidth>innerWidth}));assert.ok(size.w>0&&size.h>0&&!size.overflow,JSON.stringify(size));}
 await page.setViewportSize({width:1280,height:900});await page.locator('#game').focus();await page.keyboard.down('ArrowRight');
 await page.keyboard.press('Space');for(let i=0;i<65;i++){await page.waitForTimeout(400);if(await page.locator('#endOverlay').isVisible())break;}
 await page.keyboard.up('ArrowRight');assert.ok(await page.locator('#endOverlay').isVisible());assert.equal(await page.locator('#endFragments').innerText(),'5 / 5');assert.equal(await page.evaluate(()=>document.activeElement.id),'restartButton');
 const stats=await page.locator('.run-stats').innerText();await page.screenshot({path:process.env.FIRST_MOVEMENT_END_SCREENSHOT||'/workspace/work/ren-ending.png',fullPage:true});await page.keyboard.press('Space');await page.locator('#endOverlay').waitFor({state:'hidden'});assert.equal(await page.evaluate(()=>document.activeElement.id),'game');assert.equal(await page.locator('#collected').innerText(),'0');console.log('PASS complete real-keyboard run, five fragments, ending, focused restart',stats.replace(/\n/g,' '));
 // Native audio suspension/recovery models an interrupted audio device, not physical acceptance.
 await page.evaluate(()=>__audioEvidence.contexts[0].suspend());await page.locator('#soundToggle').click();await page.locator('#soundToggle').click();await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>__audioEvidence.contexts[0].state),'running');
 assert.deepEqual(errors,[]);assert.ok(requests.every(u=>new URL(u).origin===new URL(base).origin),'external request found');
 await page.screenshot({path:process.env.FIRST_MOVEMENT_SCREENSHOT||'/workspace/work/ren-verified.png',fullPage:true});
 const touch=await browser.newContext({viewport:{width:820,height:900},hasTouch:true,isMobile:true});const tp=await touch.newPage();await tp.goto(base);await tp.locator('#startButton').tap();assert.equal(await tp.locator('#touchControls').isVisible(),true);
 const cdp=await touch.newCDPSession(tp);const right=await tp.locator('[data-control=right]').boundingBox(),jump=await tp.locator('[data-control=jump]').boundingBox();
 const point=(b,id)=>({x:b.x+b.width/2,y:b.y+b.height/2,id});const r=point(right,1),j=point(jump,2);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[r]});await tp.waitForTimeout(300);assert.ok(await tp.locator('[data-control=right]').evaluate(e=>e.classList.contains('pressed')));
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[r,j]});await tp.waitForTimeout(200);await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});assert.equal(await tp.locator('.pressed').count(),0);
 await tp.evaluate(()=>window.dispatchEvent(new Event('blur')));assert.equal(await tp.locator('#pauseButton').innerText(),'RESUME');await tp.locator('#pauseButton').tap();assert.equal(await tp.locator('#pauseButton').innerText(),'PAUSE');
 console.log('PASS touch-emulated simultaneous move/jump, cancellation, tablet-width controls, interruption recovery; not physical iPad Safari');
 await tp.screenshot({path:process.env.FIRST_MOVEMENT_TOUCH_SCREENSHOT||'/workspace/work/ren-touch.png',fullPage:true});
 const silent=await browser.newPage();await silent.addInitScript(()=>{window.AudioContext=undefined;window.webkitAudioContext=undefined;});await silent.goto(base);await silent.locator('#startButton').click();assert.equal(await silent.locator('#soundLabel').innerText(),'SOUND UNAVAILABLE');await silent.keyboard.press('Space');await silent.close();console.log('PASS unsupported audio remains playable with explicit unavailable status');
 await touch.close();console.log('PASS no page errors or external requests; actual headphone/speaker listening and independent playtesting remain unperformed.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
