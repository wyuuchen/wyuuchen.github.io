// js/hideNav.js
document.addEventListener('DOMContentLoaded', () => {
  const btn   = document.getElementById('toggleNav');
  const nav   = document.querySelector('.sidebar nav');

  btn.addEventListener('click', () => {
    const hidden = nav.classList.toggle('collapsed');
    btn.textContent = hidden ? '显示导航' : '隐藏导航';
  });
});
