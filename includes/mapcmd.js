(function () {
  var DEFAULT_MAP_ICON = 'assets/map/default-room.svg';
  var CURRENT_MAP_ICON = 'assets/map/current-room.svg';
  var FLOOR_COORD_CACHE = {};

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

    var eligibleIds = Object.keys(eligible).sort();
    if (!eligibleIds.length) {
      return { rooms: [], cols: 1, rows: 1, connections: [], cellSize: 96 };
    }

    if (!FLOOR_COORD_CACHE[currentFloor]) {
      FLOOR_COORD_CACHE[currentFloor] = {};
    }

    var coords = FLOOR_COORD_CACHE[currentFloor];
    var anchorId = eligibleIds[0];
    if (!coords[anchorId]) {
      coords[anchorId] = { x: 0, y: 0 };
    }

    var queue = [anchorId];
    var visited = {};
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
      if (visited[current]) {
        continue;
      }
      visited[current] = true;

      var travel = GameLocationTravel[current];
      if (!travel || !coords[current]) {
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
        }

        if (!visited[neighbor]) {
          queue.push(neighbor);
        }
      }
    }

    for (var j = 0; j < eligibleIds.length; j++) {
      if (!coords[eligibleIds[j]]) {
        coords[eligibleIds[j]] = { x: 0, y: 0 };
      }
    }

    var minX = Infinity;
    var maxX = -Infinity;
    var minY = Infinity;
    var maxY = -Infinity;

    eligibleIds.forEach(function (rid) {
      minX = Math.min(minX, coords[rid].x);
      maxX = Math.max(maxX, coords[rid].x);
      minY = Math.min(minY, coords[rid].y);
      maxY = Math.max(maxY, coords[rid].y);
    });

    var rooms = eligibleIds.map(function (roomKey) {
      var label = GameLocations[roomKey][OBJECTNAME] ? GameLocations[roomKey][OBJECTNAME][1] : roomKey;
      var isCurrent = roomKey === OBJECTGLOBAL;
      var point = coords[roomKey];

      return {
        id: roomKey,
        label: label,
        icon: getMapIcon(roomKey, isCurrent),
        current: isCurrent,
        col: (point.x - minX) + 1,
        row: (point.y - minY) + 1
      };
    });

    var roomById = {};
    rooms.forEach(function (room) { roomById[room.id] = room; });
    var connections = [];
    var seenConn = {};

    eligibleIds.forEach(function (fromRoom) {
      var travel = GameLocationTravel[fromRoom];
      if (!travel) {
        return;
      }

      checks.forEach(function (dir) {
        var toRoom = (travel[dir] && travel[dir][1]) || '';
        if (!toRoom || !eligible[toRoom]) {
          return;
        }

        var key = [fromRoom, toRoom].sort().join('::');
        if (seenConn[key]) {
          return;
        }
        seenConn[key] = true;

        if (!roomById[fromRoom] || !roomById[toRoom]) {
          return;
        }

        connections.push({
          from: { col: roomById[fromRoom].col, row: roomById[fromRoom].row },
          to: { col: roomById[toRoom].col, row: roomById[toRoom].row }
        });
      });
    });

    return {
      rooms: rooms,
      cols: (maxX - minX) + 1,
      rows: (maxY - minY) + 1,
      connections: connections,
      cellSize: 96
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
