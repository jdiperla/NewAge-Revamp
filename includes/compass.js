(function () {
  var backStack = [];
  var forwardStack = [];
  var suppressHistoryPush = false;

  var compassButtons = [
    { key: 'up', label: 'Up', cmd: 'up', icon: 'assets/compass/up.svg' },
    { key: 'down', label: 'Down', cmd: 'down', icon: 'assets/compass/down.svg' },
    { key: 'left', label: 'Left', cmd: 'west', icon: 'assets/compass/left.svg' },
    { key: 'right', label: 'Right', cmd: 'east', icon: 'assets/compass/right.svg' },
    { key: 'n', label: 'N', cmd: 'north', icon: 'assets/compass/n.svg' },
    { key: 'nw', label: 'NW', cmd: 'northwest', icon: 'assets/compass/nw.svg' },
    { key: 'ne', label: 'NE', cmd: 'northeast', icon: 'assets/compass/ne.svg' },
    { key: 's', label: 'S', cmd: 'south', icon: 'assets/compass/s.svg' },
    { key: 'sw', label: 'SW', cmd: 'southwest', icon: 'assets/compass/sw.svg' },
    { key: 'se', label: 'SE', cmd: 'southeast', icon: 'assets/compass/se.svg' },
    { key: 'e', label: 'E', cmd: 'east', icon: 'assets/compass/e.svg' },
    { key: 'w', label: 'W', cmd: 'west', icon: 'assets/compass/w.svg' },
    { key: 'back', label: 'Back', cmd: '__back__', icon: 'assets/compass/back.svg' },
    { key: 'forward', label: 'Forward', cmd: '__forward__', icon: 'assets/compass/forward.svg' }
  ];

  function injectCompassStyle() {
    if (document.getElementById('compass-style')) {
      return;
    }

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

  function runCompassCommand(cmd) {
    if (cmd === '__back__') {
      navigateBack();
      return;
    }

    if (cmd === '__forward__') {
      navigateForward();
      return;
    }

    if (typeof iterateCmds === 'function') {
      iterateCmds(cmd);
    }
  }

  function updateHistoryButtons() {
    var backBtn = document.querySelector('[data-cmd="__back__"]');
    var forwardBtn = document.querySelector('[data-cmd="__forward__"]');

    if (backBtn) {
      backBtn.disabled = backStack.length === 0;
    }

    if (forwardBtn) {
      forwardBtn.disabled = forwardStack.length === 0;
    }
  }

  function navigateBack() {
    if (!backStack.length || typeof LoadRoom !== 'function') {
      return;
    }

    var current = OBJECTGLOBAL;
    var previousRoom = backStack.pop();
    if (current) {
      forwardStack.push(current);
    }

    suppressHistoryPush = true;
    LoadRoom(previousRoom);
    suppressHistoryPush = false;
    updateHistoryButtons();
  }

  function navigateForward() {
    if (!forwardStack.length || typeof LoadRoom !== 'function') {
      return;
    }

    var current = OBJECTGLOBAL;
    var nextRoom = forwardStack.pop();
    if (current) {
      backStack.push(current);
    }

    suppressHistoryPush = true;
    LoadRoom(nextRoom);
    suppressHistoryPush = false;
    updateHistoryButtons();
  }

  function attachLoadRoomHistoryHook() {
    if (typeof LoadRoom !== 'function' || LoadRoom.__compassWrapped) {
      return;
    }

    var originalLoadRoom = LoadRoom;

    var wrapped = function (roomname) {
      if (!suppressHistoryPush && OBJECTGLOBAL && roomname !== OBJECTGLOBAL) {
        backStack.push(OBJECTGLOBAL);
        forwardStack = [];
      }

      originalLoadRoom(roomname);
      updateHistoryButtons();
    };

    wrapped.__compassWrapped = true;
    window.LoadRoom = wrapped;
  }

  function renderCompass() {
    var wrap = document.getElementById('gameNav');
    if (!wrap) {
      return;
    }

    wrap.innerHTML = '';
    wrap.className = 'game-nav-wrap';

    var title = document.createElement('div');
    title.className = 'game-nav-title';
    title.textContent = 'Navigation';
    wrap.appendChild(title);

    var grid = document.createElement('div');
    grid.className = 'game-nav-grid';

    compassButtons.forEach(function (item) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'game-nav-btn';
      btn.setAttribute('data-cmd', item.cmd);
      btn.setAttribute('aria-label', item.label);

      var img = document.createElement('img');
      img.src = item.icon;
      img.alt = item.label;

      var label = document.createElement('span');
      label.textContent = item.label;

      btn.appendChild(img);
      btn.appendChild(label);

      btn.addEventListener('click', function () {
        runCompassCommand(item.cmd);
      });

      grid.appendChild(btn);
    });

    wrap.appendChild(grid);
    updateHistoryButtons();
  }

  window.initGameCompass = function () {
    injectCompassStyle();
    attachLoadRoomHistoryHook();
    renderCompass();
  };
})();
