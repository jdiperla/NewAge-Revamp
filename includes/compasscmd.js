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

  function updateCompass() {
    renderCompassTemplate('gameNav', compassButtons, runCompassCommand, {
      disabled: {
        '__back__': backStack.length === 0,
        '__forward__': forwardStack.length === 0
      }
    });
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
    updateCompass();
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
    updateCompass();
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
      updateCompass();
    };

    wrapped.__compassWrapped = true;
    window.LoadRoom = wrapped;
  }

  window.initGameCompass = function () {
    attachLoadRoomHistoryHook();
    updateCompass();
  };
})();
