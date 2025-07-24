// js/notes.js
document.addEventListener('DOMContentLoaded', () => {
  // 1. 侧边栏点击切换到 notes 区
  const tabs     = document.querySelectorAll('.sidebar nav li');
  const sections = document.querySelectorAll('.content section');
  const activate = id => {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.section === id));
    sections.forEach(s => s.classList.toggle('active', s.id === id));
  };
  document.querySelector('.sidebar li[data-section="notes"]')
          .addEventListener('click', () => activate('notes'));

  // 2. 准备 markdown-it 和 KaTeX
  const md = window.markdownit({
    html: true, linkify: true, typographer: true
  });
  // KaTeX 自动渲染
  const renderMath = el => renderMathInElement(el, {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$',  right: '$',  display: false},
    ]
  });

  // 3. 笔记元数据列表 —— 每新增一天，就在这里加一行
  const notesMeta = [
    { title: '2025-07-23 离线RL思考', file: 'notes/2025-07-23-rl.md' },
    { title: '2025-07-24 PnP 算法笔记', file: 'notes/2025-07-24-pnp.md' },
    // … 每天新增一行
  ];

  const listEl   = document.getElementById('notes-list');
  const detailEl = document.getElementById('note-detail');

  // 4. 渲染摘要列表
  notesMeta.forEach(({title, file}) => {
    fetch(file)
      .then(r => r.text())
      .then(txt => {
        // 提取前 1 段作为摘要（忽略 front-matter）
        const body = txt.replace(/^---[\s\S]*?---/, '').trim();
        const firstPara = body.split(/\n\s*\n/)[0];
        const summaryHTML = md.render(firstPara);

        const item = document.createElement('div');
        item.className = 'note-item';
        item.innerHTML = `
          <h3>${title}</h3>
          <div class="summary">${summaryHTML}</div>
          <button class="btn-view" data-file="${file}">
            查看详情 →
          </button>
        `;
        listEl.appendChild(item);
        renderMath(item);
      });
  });

  // 5. 列表点击进入详情
  listEl.addEventListener('click', async e => {
    if (e.target.matches('.btn-view')) {
      const file = e.target.dataset.file;
      const txt  = await fetch(file).then(r => r.text());
      const body = txt.replace(/^---[\s\S]*?---/, '').trim();
      const html = md.render(body);

      detailEl.innerHTML = `
        <button id="backToList">← 返回列表</button>
        <div class="note-full">${html}</div>
      `;
      renderMath(detailEl);

      listEl.style.display   = 'none';
      detailEl.style.display = '';
    }
  });

  // 6. 详情点击返回列表
  detailEl.addEventListener('click', e => {
    if (e.target.id === 'backToList') {
      detailEl.style.display = 'none';
      listEl.style.display   = '';
    }
  });
});
