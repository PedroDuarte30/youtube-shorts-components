const btn = document.getElementById('uploadBtn');
const icon = document.getElementById('icon');
const text = document.getElementById('text');
const progress = document.getElementById('progress');

btn.addEventListener('click', () => {
  if (btn.classList.contains('done')) return;

  // 1. Estado de Carregamento (1.2 segundos)
  text.textContent = 'Uploading...';
  icon.className = 'bx bx-loader-alt bx-spin';
  progress.style.width = '100%';

  // 2. Estado Concluído
  setTimeout(() => {
    btn.classList.add('done');
    text.textContent = 'Success!';
    icon.className = 'bx bx-check-circle';
  }, 1200);
});