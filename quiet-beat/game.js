(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const lights = $('lights'); const total = 5;
  let record = null;
  try { const parsed = JSON.parse(sessionStorage.getItem('ren-journey-v1') || 'null'); if (parsed?.version === 1 && Number.isInteger(parsed.fragments) && parsed.fragments >= 0 && parsed.fragments <= total && parsed.total === total) record = parsed; } catch (_) {}
  const count = record ? record.fragments : null;
  $('fragmentCount').textContent = count === null ? 'Independent session' : `${count} of ${total} fragments carried forward`;
  $('fragmentDetail').textContent = count === null ? 'No previous run is required.' : `${total - count} remain quiet around the landing.`;
  $('sessionCopy').textContent = count === null ? 'A small place to listen without a prior run. Nothing here needs to be earned.' : 'A small place to gather what the city gave you. Missing lights remain open, never a failure.';
  for (let i = 0; i < total; i++) { const light = document.createElement('span'); light.className = `light ${count !== null && i < count ? 'collected' : 'missing'}`; light.style.setProperty('--i', i); light.setAttribute('aria-hidden', 'true'); lights.append(light); }
  const tempo = $('tempo'); const start = $('startButton'); const stop = $('stopButton'); const sound = $('soundToggle'); const status = $('status'); let timer = null; let audio = null; let running = false;
  function stopBeat(message = 'Stopped. Continue when ready.') { running = false; clearInterval(timer); timer = null; if (audio) audio.suspend().catch(() => {}); start.disabled = false; stop.disabled = true; status.textContent = message; document.body.classList.remove('beating'); }
  function tone() { if (!sound.checked) return; try { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; audio ||= new AC(); if (audio.state === 'suspended') audio.resume(); const o = audio.createOscillator(); const g = audio.createGain(); o.type = 'sine'; o.frequency.value = 220; g.gain.setValueAtTime(.0001, audio.currentTime); g.gain.exponentialRampToValueAtTime(.035, audio.currentTime + .01); g.gain.exponentialRampToValueAtTime(.0001, audio.currentTime + .18); o.connect(g); g.connect(audio.destination); o.start(); o.stop(audio.currentTime + .2); } catch (_) { status.textContent = 'The visual beat remains available; sound is unavailable here.'; } }
  function startBeat() { stopBeat('The beat is here. Tap or listen at your own pace.'); running = true; start.disabled = true; stop.disabled = false; const interval = 60000 / Number(tempo.value); timer = setInterval(() => { document.body.classList.remove('beating'); void document.body.offsetWidth; document.body.classList.add('beating'); tone(); }, interval); document.body.classList.add('beating'); tone(); }
  start.addEventListener('click', startBeat); stop.addEventListener('click', () => stopBeat()); tempo.addEventListener('change', () => { if (running) startBeat(); }); sound.addEventListener('change', () => { if (sound.checked && running) tone(); });
  document.addEventListener('pointerdown', (event) => { if (event.target.closest('button,select,input,a')) return; const light = lights.children[Math.floor(Math.random() * lights.children.length)]; light?.animate([{transform:'scale(1)',opacity:.65},{transform:'scale(1.35)',opacity:1},{transform:'scale(1)',opacity:.65}], {duration:420, easing:'ease-out'}); status.textContent = 'A gentle response, with no score to chase.'; });
  $('continueButton').addEventListener('click', () => { stopBeat('The threshold is open. Mind’s Theater is next.'); document.querySelector('.quiet-stage').classList.add('continued'); $('continueButton').disabled = true; $('continueButton').textContent = 'THRESHOLD REACHED'; });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopBeat('Paused while away. Continue when ready.'); }); window.addEventListener('pagehide', () => stopBeat());
})();
