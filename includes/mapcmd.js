(function () {
  var DEFAULT_MAP_ICON = 'assets/map/default-room.svg';
  var CURRENT_MAP_ICON = 'assets/map/current-room.svg';

  function getRoomFloor(roomId) {
    var room = GameLocations[roomId];
    if (!room || !room[OBJECTFLOOR]) {
      return '0';
    }

    return String(room[OBJECTFLOOR][1] || '0');
  }

  function getMapIcon(roomId, isCurrent) {
    if (isCurrent) {
      return CURRENT_MAP_ICON;
    }

    var room = GameLocations[roomId];
    if (room && room[OBJECTMAPICON] && room[OBJECTMAPICON][1]) {
      return room[OBJECTMAPICON][1];
    }

    return DEFAULT_MAP_ICON;
  }

  function getDirectionOffset(directionField) {
    if (directionField === OBJECTGOEAST) return { x: 1, y: 0 };
    if (directionField === OBJECTGOWEST) return { x: -1, y: 0 };
    if (directionField === OBJECTGONORTH) return { x: 0, y: -1 };
    if (directionField === OBJECTGOSOUTH) return { x: 0, y: 1 };
    if (directionField === OBJECTGONORTHEAST) return { x: 1, y: -1 };
    if (directionField === OBJECTGONORTHWEST) return { x: -1, y: -1 };
    if (directionField === OBJECTGOSOUTHEAST) return { x: 1, y: 1 };
    if (directionField === OBJECTGOSOUTHWEST) return { x: -1, y: 1 };
    return null;
  }

  function getCurrentFloorRooms() {
    var currentFloor = getRoomFloor(OBJECTGLOBAL);
    var eligible = {};

    for (var roomId in GameLocations) {
      if (!Object.prototype.hasOwnProperty.call(GameLocations, roomId)) {
        continue;
      }
      if (!EXPLOREDROOMS[roomId]) {
        continue;
      }
      if (getRoomFloor(roomId) !== currentFloor) {
        continue;
      }
      eligible[roomId] = true;
    }

    if (!eligible[OBJECTGLOBAL]) {
      return { rooms: [], cols: 1, rows: 1 };
    }

    var coords = {};
    coords[OBJECTGLOBAL] = { x: 0, y: 0 };
    var queue = [OBJECTGLOBAL];

    var checks = [
      OBJECTGOEAST,
      OBJECTGOWEST,
      OBJECTGONORTH,
      OBJECTGOSOUTH,
      OBJECTGONORTHEAST,
      OBJECTGONORTHWEST,
      OBJECTGOSOUTHEAST,
      OBJECTGOSOUTHWEST
    ];

    while (queue.length) {
      var current = queue.shift();
      var travel = GameLocationTravel[current];
      if (!travel) {
        continue;
      }

      for (var i = 0; i < checks.length; i++) {
        var dir = checks[i];
        var offset = getDirectionOffset(dir);
        var neighbor = (travel[dir] && travel[dir][1]) || '';

        if (!neighbor || !eligible[neighbor] || !offset) {
          continue;
        }

        if (!coords[neighbor]) {
          coords[neighbor] = {
            x: coords[current].x + offset.x,
            y: coords[current].y + offset.y
          };
          queue.push(neighbor);
        }
      }
    }

    var minX = 0;
    var maxX = 0;
    var minY = 0;
    var maxY = 0;
    var rooms = [];

    for (var exploredId in eligible) {
      if (!Object.prototype.hasOwnProperty.call(eligible, exploredId)) {
        continue;
      }

      if (!coords[exploredId]) {
        coords[exploredId] = { x: 0, y: 0 };
      }

      minX = Math.min(minX, coords[exploredId].x);
      maxX = Math.max(maxX, coords[exploredId].x);
      minY = Math.min(minY, coords[exploredId].y);
      maxY = Math.max(maxY, coords[exploredId].y);
    }

    for (var roomKey in eligible) {
      if (!Object.prototype.hasOwnProperty.call(eligible, roomKey)) {
        continue;
      }

      var label = GameLocations[roomKey][OBJECTNAME] ? GameLocations[roomKey][OBJECTNAME][1] : roomKey;
      var isCurrent = roomKey === OBJECTGLOBAL;
      var point = coords[roomKey] || { x: 0, y: 0 };

      rooms.push({
        id: roomKey,
        label: label,
        icon: getMapIcon(roomKey, isCurrent),
        current: isCurrent,
        col: (point.x - minX) + 1,
        row: (point.y - minY) + 1
      });
    }

    return {
      rooms: rooms,
      cols: (maxX - minX) + 1,
      rows: (maxY - minY) + 1
    };
  }

  function findDirectTravelDirection(fromRoom, toRoom) {
    var travel = GameLocationTravel[fromRoom];
    if (!travel) {
      return null;
    }

    var checks = [
      [OBJECTGOEAST, OBJECTGOEASTBLOCK],
      [OBJECTGOWEST, OBJECTGOWESTBLOCK],
      [OBJECTGONORTH, OBJECTGONORTHBLOCK],
      [OBJECTGOSOUTH, OBJECTGOSOUTHBLOCK],
      [OBJECTGOUP, OBJECTGOUPBLOCK],
      [OBJECTGODOWN, OBJECTGODOWNBLOCK],
      [OBJECTGONORTHWEST, OBJECTGONORTHWESTBLOCK],
      [OBJECTGONORTHEAST, OBJECTGONORTHEASTBLOCK],
      [OBJECTGOSOUTHWEST, OBJECTGOSOUTHWESTBLOCK],
      [OBJECTGOSOUTHEAST, OBJECTGOSOUTHEASTBLOCK]
    ];

    for (var i = 0; i < checks.length; i++) {
      var dir = checks[i][0];
      var block = checks[i][1];
      var destination = (travel[dir] && travel[dir][1]) || '';
      var blocked = (travel[block] && travel[block][1]) || '';

      if (destination === toRoom && blocked === '') {
        return dir;
      }
    }

    return null;
  }

  function navigateToMappedRoom(targetRoom) {
    if (targetRoom === OBJECTGLOBAL) {
      return;
    }

    var directionFound = findDirectTravelDirection(OBJECTGLOBAL, targetRoom);
    if (directionFound !== null) {
      LoadRoom(targetRoom);
      return;
    }

    scrnDisplay("You cannot travel directly there from here.");
  }

  function updateRoomMap() {
    if (!OBJECTGLOBAL) {
      return;
    }

    var rooms = getCurrentFloorRooms();
    renderRoomMapTemplate('gameMap', rooms, navigateToMappedRoom);
  }

  function attachMapLoadRoomHook() {
    if (typeof LoadRoom !== 'function' || LoadRoom.__mapWrapped) {
      return;
    }

    var originalLoadRoom = LoadRoom;
    var wrapped = function (roomname) {
      originalLoadRoom(roomname);
      updateRoomMap();
    };

    wrapped.__mapWrapped = true;
    window.LoadRoom = wrapped;
  }

  window.initGameMap = function () {
    attachMapLoadRoomHook();
    updateRoomMap();
  };
})();
