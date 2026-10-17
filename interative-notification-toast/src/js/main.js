document.addEventListener("DOMContentLoaded", () => {
  
  setTimeout(() => {
    const iconBox = document.getElementById('iconBox');
    const icon = document.getElementById('icon');
    const title = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');

    
    if (iconBox && icon && title && subtitle) {
      
      iconBox.classList.add('success');
      
     
      icon.className = 'fa-solid fa-circle-check';
      
      
      title.textContent = 'Success!';
      subtitle.textContent = 'Download completed successfully.';
    } else {
      console.error("Algum ID não foi encontrado no HTML!");
    }
  }, 3000);
});