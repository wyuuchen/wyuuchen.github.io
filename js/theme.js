// 深浅色切换按钮示例，你可以在 sidebar 加一个 <button id="themeToggle">🌙</button>
document.addEventListener('DOMContentLoaded', () => {
    const btn   = document.getElementById('themeToggle');
    const dark  = storageGet('darkMode', false);
    setTheme(dark);
  
    btn.addEventListener('click', () => {
      const now = document.body.classList.toggle('dark');
      storageSet('darkMode', now);
      setTheme(now);
    });
  
    function setTheme(isDark) {
      document.body.classList.toggle('dark', isDark);
      btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    }
  });
  