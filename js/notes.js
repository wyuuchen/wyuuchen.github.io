document.addEventListener('DOMContentLoaded', async () => {
  const md = window.markdownit({
    html: true,
    linkify: true,
    typographer: true
  });
  // 找到 notes 目录下的所有 md 文件列表（手动写死或用 GitHub API）
  const files = [
    'notes/2025-07-23-强化学习笔记.md',
    'notes/2025-07-24-PPO调参记录.md',
    // 每天加一行就好
  ];
  const container = document.getElementById('notes-container');
  for (let path of files) {
    const txt = await fetch(path).then(r => r.text());
    const html = md.render(txt);
    const section = document.createElement('section');
    section.innerHTML = html;
    container.appendChild(section);
  }
  renderMathInElement(container, {
    // KaTeX 自动渲染配置
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false},
    ]
  });
});
