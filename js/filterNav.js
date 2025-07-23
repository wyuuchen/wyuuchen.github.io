document.addEventListener('DOMContentLoaded', () => {
    // 假设你在 sidebar nav 上方放了 <input id="navFilter" placeholder="搜索菜单…">
    const input = document.getElementById('navFilter');
    const items = document.querySelectorAll('.sidebar nav li');
    input.addEventListener('input', () => {
      const kw = input.value.trim().toLowerCase();
      items.forEach(li => {
        const txt = li.textContent.toLowerCase();
        li.style.display = txt.includes(kw) ? '' : 'none';
      });
    });
  });
  