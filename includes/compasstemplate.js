function renderCompassTemplate(rootId, buttons, onClick, state) {
  var wrap = document.getElementById(rootId);
  if (!wrap) {
    return;
  }

  if (!document.getElementById('compass-style')) {
    var style = document.createElement('style');
    style.id = 'compass-style';
    style.innerHTML = [
      '.game-nav-wrap { margin-top: 12px; padding: 10px; background:#1b1b1b; border:1px solid #333; }',
      '.game-nav-title { font-size:12px; color:#bbb; margin-bottom:8px; }',
      '.game-nav-grid { display:grid; gap:8px; grid-template-columns:repeat(7, minmax(40px, 1fr)); }',
      '.game-nav-btn { background:#0f172a; color:#fff; border:1px solid #334155; border-radius:8px; padding:6px; display:flex; flex-direction:column; align-items:center; gap:4px; cursor:pointer; }',
      '.game-nav-btn img { width:24px; height:24px; display:block; }',
      '.game-nav-btn span { font-size:11px; }',
      '.game-nav-btn:disabled { opacity:.45; cursor:not-allowed; }'
    ].join('');
    document.head.appendChild(style);
  }

  wrap.innerHTML = '';
  wrap.className = 'game-nav-wrap';

  var title = document.createElement('div');
  title.className = 'game-nav-title';
  title.textContent = 'Navigation';
  wrap.appendChild(title);

  var grid = document.createElement('div');
  grid.className = 'game-nav-grid';

  buttons.forEach(function (item) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'game-nav-btn';
    btn.setAttribute('data-cmd', item.cmd);
    btn.setAttribute('aria-label', item.label);

    if (state && state.disabled && state.disabled[item.cmd]) {
      btn.disabled = true;
    }

    var img = document.createElement('img');
    img.src = item.icon;
    img.alt = item.label;

    var label = document.createElement('span');
    label.textContent = item.label;

    btn.appendChild(img);
    btn.appendChild(label);
    btn.addEventListener('click', function () {
      onClick(item.cmd);
    });

    grid.appendChild(btn);
  });

  wrap.appendChild(grid);
}
