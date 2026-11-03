"use strict";

const session = document.querySelector("#session");
const tap = document.querySelector("#tap");
const tempo = document.querySelector("#tempo");
const tone = document.querySelector("#tone");
const cue = document.querySelector("#cue");
const status = document.querySelector("#session-status");

let audio;
let beatTimer;
let cueTimer;
let tapTimer;
let running = false;

function playTone() {
  if (!tone.checked || audio?.state !== "running") return;

  const note = audio.createOscillator();
  const volume = audio.createGain();
  const now = audio.currentTime;
  note.frequency.value = 330;
  volume.gain.setValueAtTime(0.045, now);
  volume.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
  note.connect(volume).connect(audio.destination);
  note.start(now);
  note.stop(now + 0.1);
}

function unlockAudio() {
  if (!tone.checked) return;
  try {
    audio ??= new AudioContext();
    audio.resume().catch(() => {});
  } catch {
    // The visual beat remains available when audio is unavailable.
  }
}

function beat() {
  cue.dataset.beat = "on";
  clearTimeout(cueTimer);
  cueTimer = setTimeout(() => delete cue.dataset.beat, 180);
  playTone();
}

function scheduleBeat() {
  clearInterval(beatTimer);
  beat();
  beatTimer = setInterval(beat, 60000 / Number(tempo.value));
}

function stop() {
  running = false;
  clearInterval(beatTimer);
  clearTimeout(cueTimer);
  clearTimeout(tapTimer);
  delete cue.dataset.beat;
  delete tap.dataset.tapped;
  if (document.activeElement === tap) session.focus();
  tap.disabled = true;
  session.textContent = "Start beat";
  status.textContent = "Beat stopped.";
}

session.addEventListener("click", () => {
  if (running) {
    stop();
    return;
  }
  unlockAudio();
  running = true;
  tap.disabled = false;
  session.textContent = "Stop beat";
  status.textContent = "Beat running.";
  scheduleBeat();
  tap.focus();
});

tap.addEventListener("click", () => {
  tap.dataset.tapped = "yes";
  clearTimeout(tapTimer);
  tapTimer = setTimeout(() => delete tap.dataset.tapped, 150);
});

tempo.addEventListener("change", () => {
  if (running) scheduleBeat();
});

tone.addEventListener("change", () => {
  if (running) unlockAudio();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && running) stop();
});
window.addEventListener("pagehide", stop);
