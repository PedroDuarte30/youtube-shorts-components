const ring = document.getElementById('progressRing');
const timeText = document.getElementById('timeText');
const statusText = document.getElementById('statusText');
const startPauseBtn = document.getElementById('startPauseBtn');
const modeBadge = document.getElementById('modeBadge');

// Cálculo matemático da circunferência do círculo (2 * PI * r)
const radius = ring.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

ring.style.strokeDasharray = `${circumference} ${circumference}`;
ring.style.strokeDashoffset = 0;

let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let timerInterval = null;
let isRunning = false;

function updateDisplay() {
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  timeText.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  // Atualiza o preenchimento do anel SVG
  const progress = remainingSeconds / totalSeconds;
  const offset = circumference - progress * circumference;
  ring.style.strokeDashoffset = offset;
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseBtn.textContent = 'Resume';
    statusText.textContent = 'Paused';
  } else {
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    statusText.textContent = 'Stay focused...';

    timerInterval = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        startPauseBtn.textContent = 'Start';
        statusText.textContent = 'Session complete!';
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  remainingSeconds = totalSeconds;
  startPauseBtn.textContent = 'Start';
  statusText.textContent = 'Ready to focus';
  updateDisplay();
}

function setMode(minutes, label, btn) {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  modeBadge.textContent = label;
  totalSeconds = minutes * 60;
  resetTimer();
}

updateDisplay();