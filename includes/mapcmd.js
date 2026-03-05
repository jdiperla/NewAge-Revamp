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

  function getCurrentFloorRooms() {
    var currentFloor = getRoomFloor(OBJECTGLOBAL);
    var rooms = [];

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

      var label = GameLocations[roomId][OBJECTNAME] ? GameLocations[roomId][OBJECTNAME][1] : roomId;
      var isCurrent = roomId === OBJECTGLOBAL;

      rooms.push({
        id: roomId,
        label: label,
        icon: getMapIcon(roomId, isCurrent),
        current: isCurrent
      });
    }

    return rooms;
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
