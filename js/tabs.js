import { storageGet, storageSet } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const tabs    = document.querySelectorAll('.sidebar nav li');
  const panels  = document.querySelectorAll('.content section');
  // 如果有上次打开的 tab
  const last     = storageGet('lastActiveTab', null);
  if (last) {
    activateTab(document.querySelector(`.sidebar li[data-section="${last}"]`));
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activateTab(tab);
      storageSet('lastActiveTab', tab.dataset.section);
    });
  });

  function activateTab(tab) {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.section)
            .classList.add('active');
  }
});
