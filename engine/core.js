function getRoomSurfaceElement() {
  var bg = document.getElementById('RoomBackground');
  if (bg) {
    return bg;
  }

  var vid = document.getElementById('mainvid');
  if (vid) {
    return vid;
  }

  return null;
}

function getRoomItemMarkerSize(surface) {
  var baseWidth = 640;
  var scale = surface.getBoundingClientRect().width / baseWidth;
  var size = Math.round(48 * scale);

  if (size < 20) {
    size = 20;
  }
  if (size > 72) {
    size = 72;
  }

  return size;
}

function renderLocationItems() {
 //Render item markers on top of room image based on item screen coordinates.
  var roomLoad = document.getElementById('StartRoomLoad');
  if (!roomLoad) {
    return;
  }

  roomLoad.style.position = 'relative';

  var previous = roomLoad.querySelectorAll('.room-item-hotspot');
  previous.forEach(function (node) {
    node.remove();
  });

  for (var itemKey in GameObjects) {
    if (!Object.prototype.hasOwnProperty.call(GameObjects, itemKey)) {
      continue;
    }

    var item = GameObjects[itemKey];
    if (!item[ITEMLOCATION] || item[ITEMLOCATION][1] !== OBJECTGLOBAL) {
      continue;
    }

    var x = parseFloat(item[ITEMSCREENX] ? item[ITEMSCREENX][1] : '0');
    var y = parseFloat(item[ITEMSCREENY] ? item[ITEMSCREENY][1] : '0');

    if (!(x > 0 || y > 0)) {
      continue;
    }

    var label = item[ITEMNAME] ? item[ITEMNAME][1] : itemKey;
    var uniqueName = item[ITEMUNIQUENAME] ? item[ITEMUNIQUENAME][1] : label;
    var imageSrc = item[ITEMIMAGE] ? item[ITEMIMAGE][1] : '';
    var clickableRaw = item[ITEMCLICKABLE] ? item[ITEMCLICKABLE][1] : 'yes';
    var isClickable = String(clickableRaw).toLowerCase() !== 'no' && String(clickableRaw).toLowerCase() !== 'false' && String(clickableRaw) !== '0';

    var surface = getRoomSurfaceElement();
    if (!surface) {
      continue;
    }

    var surfaceRect = surface.getBoundingClientRect();
    var roomRect = roomLoad.getBoundingClientRect();

    var marker = document.createElement('div');
    marker.className = 'room-item-hotspot';
    marker.style.position = 'absolute';
    var markerSize = getRoomItemMarkerSize(surface);
    marker.style.width = markerSize + 'px';
    marker.style.height = markerSize + 'px';
    marker.style.left = (surfaceRect.left - roomRect.left + ((x / 100) * surfaceRect.width)) + 'px';
    marker.style.top = (surfaceRect.top - roomRect.top + ((y / 100) * surfaceRect.height)) + 'px';
    marker.style.transform = 'translate(-50%, -50%)';
    marker.title = uniqueName;

    var icon = document.createElement('img');
    icon.className = 'room-item-hotspot-image';
    icon.alt = label;
    icon.src = imageSrc || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    marker.appendChild(icon);

    if (isClickable) {
      marker.classList.add('clickable');
      marker.addEventListener('click', function (event) {
        if (typeof iterateCmds === 'function') {
          iterateCmds('look ' + event.currentTarget.title);
        }
      });
    }
    else {
      marker.classList.add('non-clickable');
      marker.style.pointerEvents = 'none';
    }

    roomLoad.appendChild(marker);
  }
}

function LoadRoom(roomname) {
//Loads the specified room and sets the global setting. If a movie file is specified, the engine will play the movie file first. Once the movie is done, it will load the room image.

  OBJECTGLOBAL = roomname;
  EXPLOREDROOMS[roomname] = true;

  if (GameLocations[OBJECTGLOBAL][OBJECTMOVIE][1] !== '') {
    document.getElementById('StartRoomLoad').innerHTML = '<video id="mainvid" onerror="hidevideo(OBJECTGLOBAL);" onended="hidevideo(OBJECTGLOBAL);" width="100%" height="" autoplay><source src="' + GameLocations[OBJECTGLOBAL][OBJECTMOVIE][1] + '" type="video/mp4"></video>';
  }
  else if (GameLocations[OBJECTGLOBAL][OBJECTIMAGE][1] !== '') {
    document.getElementById('StartRoomLoad').innerHTML = "<img src='" + GameLocations[OBJECTGLOBAL][OBJECTIMAGE][1] + "' id='RoomBackground' onload='renderLocationItems();' width='" + GameLocations[OBJECTGLOBAL][OBJECTXSIZE][1] + "' height='" + GameLocations[OBJECTGLOBAL][OBJECTYSIZE][1] + "'></image>";
  }

  scrnDisplay(GameLocations[OBJECTGLOBAL][OBJECTDESCFIRSTTIME][1]);
  renderLocationItems();
}

function hidevideo(roomname) {
//This function is called once a video is played on room enter.
  var x = document.getElementById('mainvid');
  if (x) {
    x.style.display = 'none';
  }

  if (GameLocations[OBJECTGLOBAL][OBJECTIMAGE][1] !== '') {
    document.getElementById('StartRoomLoad').innerHTML = "<img src='" + GameLocations[OBJECTGLOBAL][OBJECTIMAGE][1] + "' id='RoomBackground' onload='renderLocationItems();' width='" + GameLocations[OBJECTGLOBAL][OBJECTXSIZE][1] + "' height='" + GameLocations[OBJECTGLOBAL][OBJECTYSIZE][1] + "'></image>";
  }

  renderLocationItems();
}

function executeObjectCmd(object, command, pos = 1) {
 //Legacy command execution lookup for GameObjectCommands
  if (GameObjectCommands[object] && GameObjectCommands[object][command]) {
    GameObjectCommands[object][command][pos]();
  }
}

function changeLocationValue(location, field, value, pos = 1) {
 //Changes a value in GameLocations
  GameLocations[location][field][pos] = value;
}

function changeObjectValue(object, field, value, pos = 1) {
 //Changes a value in GameObjects (items). Supports pair-arrays and direct values.
  if (!GameObjects[object] || typeof GameObjects[object][field] === 'undefined') {
    return false;
  }

  if (Array.isArray(GameObjects[object][field])) {
    GameObjects[object][field][pos] = value;
  }
  else {
    GameObjects[object][field] = value;
  }

  return true;
}


if (!window.__roomItemResizeHooked) {
  window.addEventListener('resize', function () {
    if (typeof renderLocationItems === 'function') {
      renderLocationItems();
    }
  });
  window.__roomItemResizeHooked = true;
}
