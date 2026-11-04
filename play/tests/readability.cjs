// Maintainer-only Chromium audit; no runtime dependencies.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});const results=[];try{
const p=await browser.newPage();
for(const width of [320,390,820,1440])for(const mode of ['default','200%-text','spacing','200%-text+spacing']){
await p.setViewportSize({width,height:900});await p.goto(process.env.FIRST_MOVEMENT_URL||'http://127.0.0.1:8041/play/');
if(mode.includes('200%'))await p.addStyleTag({content:'html {font-size:250% !important}'});
if(mode.includes('spacing'))await p.addStyleTag({content:'* {line-height:1.5 !important;letter-spacing:.12em !important;word-spacing:.16em !important} p {margin-bottom:2em !important}'});
for(const state of ['menu','dialog','selected','hud','completion']){
if(state==='dialog')await p.locator('#introOptions').click();
if(state==='selected')await p.locator('#pointerMode').click();
if(state==='hud'){await p.keyboard.press('Escape');assert.equal(await p.evaluate(()=>document.activeElement.id),'introOptions');await p.locator('#startButton').click();}
if(state==='completion'){await p.locator('[data-control=right]').click();await p.locator('#endOverlay').waitFor({state:'visible',timeout:30000});}
const audit=await p.evaluate(()=>{
const rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number);const lum=c=>c.slice(0,3).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);const contrast=(a,b)=>{a=lum(a);b=lum(b);return(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
const nodes=[],targets=[];const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
while(n=walk.nextNode()){const e=n.parentElement;if(!n.textContent.trim()||e.closest('[aria-hidden=true],script,style')||!e.checkVisibility())continue;const s=getComputedStyle(e);let bg=e;while(bg&&rgb(getComputedStyle(bg).backgroundColor)[3]===0)bg=bg.parentElement;
nodes.push({text:n.textContent.trim(),size:parseFloat(s.fontSize),contrast:contrast(rgb(s.color),rgb(getComputedStyle(bg||document.body).backgroundColor)),clipped:e.scrollWidth>e.clientWidth+2&&e.clientWidth>0});}
for(const e of document.querySelectorAll('button,a'))if(e.checkVisibility()){const r=e.getBoundingClientRect();targets.push({id:e.id||e.textContent.trim(),w:r.width,h:r.height});}
return{nodes,targets,overflow:document.documentElement.scrollWidth>innerWidth,dialog:document.querySelector('dialog').open?{scroll:document.querySelector('dialog').scrollHeight,height:document.querySelector('dialog').clientHeight}:null};});
results.push({width,mode,state,...audit});assert(!audit.overflow,JSON.stringify({width,mode,state,overflow:true}));assert(audit.nodes.every(n=>n.size>=20&&n.contrast>=7&&!n.clipped),JSON.stringify({width,mode,state,bad:audit.nodes.filter(n=>n.size<20||n.contrast<7||n.clipped)}));assert(audit.targets.every(t=>t.w>=48&&t.h>=48),JSON.stringify({width,mode,state,targets:audit.targets}));
if(mode==='default')await p.screenshot({path:`/workspace/work/ren-${width}-${state}.png`,fullPage:true});
}
}
await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await p.locator('button').first().evaluate(e=>getComputedStyle(e).animationName),'none');
console.log('PASS',results.length,'width/text-spacing/state combinations; all visible text nodes >=20px, >=7:1; targets >=48px; no horizontal overflow or text clipping.');
}finally{fs.writeFileSync('/workspace/work/ren-readability.json',JSON.stringify(results,null,2));await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
