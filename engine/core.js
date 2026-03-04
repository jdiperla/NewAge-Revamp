function LoadRoom(roomname) {
//Loads the specified room and sets the global setting. If a movie file is specified, the engine will play the movie file first. Once the movie is done, it will load the room image.

  OBJECTGLOBAL = roomname;

  if (GameLocations[OBJECTGLOBAL][OBJECTMOVIE][1] !== '') {
    document.getElementById('StartRoomLoad').innerHTML = '<video id="mainvid" onerror="hidevideo(OBJECTGLOBAL);" onended="hidevideo(OBJECTGLOBAL);" width="100%" height="" autoplay><source src="' + GameLocations[OBJECTGLOBAL][OBJECTMOVIE][1] + '" type="video/mp4"></video>';
  }
  else if (GameLocations[OBJECTGLOBAL][OBJECTIMAGE][1] !== '') {
    document.getElementById('StartRoomLoad').innerHTML = "<img src='" + GameLocations[OBJECTGLOBAL][OBJECTIMAGE][1] + "' id='RoomBackground' width='" + GameLocations[OBJECTGLOBAL][OBJECTXSIZE][1] + "' height='" + GameLocations[OBJECTGLOBAL][OBJECTYSIZE][1] + "'></image>";
  }

  document.getElementById('StartRoomText').innerHTML = GameLocations[OBJECTGLOBAL][OBJECTDESCFIRSTTIME][1];
}

function hidevideo(roomname) {
//This function is called once a video is played on room enter.
  var x = document.getElementById('mainvid');
  if (x) {
    x.style.display = 'none';
  }

  if (GameLocations[OBJECTGLOBAL][OBJECTIMAGE][1] !== '') {
    document.getElementById('StartRoomLoad').innerHTML = "<img src='" + GameLocations[OBJECTGLOBAL][OBJECTIMAGE][1] + "' id='RoomBackground' width='" + GameLocations[OBJECTGLOBAL][OBJECTXSIZE][1] + "' height='" + GameLocations[OBJECTGLOBAL][OBJECTYSIZE][1] + "'></image>";
  }
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
 //Changes a value in GameObjects (items)
  GameObjects[object][field][pos] = value;
}
