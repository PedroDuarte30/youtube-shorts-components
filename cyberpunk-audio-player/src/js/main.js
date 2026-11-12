let isPlaying = false;
let animationInterval = null;

const player = document.getElementById('player');
const bars = document.querySelectorAll('.bar');

function togglePlay() {
  isPlaying = !isPlaying;
  
  if (isPlaying) {
    player.classList.add('playing');
    startVisualizer();
  } else {
    player.classList.remove('playing');
    stopVisualizer();
  }
}

function startVisualizer() {
  animationInterval = setInterval(() => {
    bars.forEach(bar => {
      const randomHeight = Math.floor(Math.random() * 36) + 12;
      bar.style.height = `${randomHeight}px`;
    });
  }, 120);
}

function stopVisualizer() {
  clearInterval(animationInterval);
  bars.forEach(bar => {
    bar.style.height = '8px';
  });
}