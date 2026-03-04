// Example game data for NewAge-Revamp.

var IGNOREWORDS = 'the,a,an,to,at';
var DELIMETERWORDS = 'with,on,using,and';
var CMDERROR = 'CMDERROR';

GAMENAME = 'Example: The Lantern Hall';

// Locations/rooms
var GameLocations = {
  foyer: [
    ['Location Name', 'Foyer'],
    ['Id', 'foyer'],
    ['Object Type', 'room'],
    ['A dim foyer with a dusty table. A hallway is to the east.', 'A dim foyer with a dusty table. A hallway is to the east.'],
    ['A dim foyer.', 'A dim foyer.'],
    ['Alt names', 'entry'],
    ['Alt names 2', 'hall entry'],
    ['640', '640'],
    ['360', '360'],
    ['https://picsum.photos/id/1018/640/360', 'https://picsum.photos/id/1018/640/360'],
    ['', '']
  ],
  hall: [
    ['Location Name', 'Hallway'],
    ['Id', 'hall'],
    ['Object Type', 'room'],
    ['A narrow hallway. Foyer is west. A small shed is north.', 'A narrow hallway. Foyer is west. A small shed is north.'],
    ['A narrow hallway.', 'A narrow hallway.'],
    ['Alt names', 'passage'],
    ['Alt names 2', 'corridor'],
    ['640', '640'],
    ['360', '360'],
    ['https://picsum.photos/id/1025/640/360', 'https://picsum.photos/id/1025/640/360'],
    ['', '']
  ],
  shed: [
    ['Location Name', 'Shed'],
    ['Id', 'shed'],
    ['Object Type', 'room'],
    ['A tool shed with a side door hanging open. Hallway is south.', 'A tool shed with a side door hanging open. Hallway is south.'],
    ['A cramped shed.', 'A cramped shed.'],
    ['Alt names', 'tool shed'],
    ['Alt names 2', 'work shed'],
    ['640', '640'],
    ['360', '360'],
    ['https://picsum.photos/id/1067/640/360', 'https://picsum.photos/id/1067/640/360'],
    ['', '']
  ]
};

// Location travel graph
var GameLocationTravel = {
  foyer: [
    ['room', 'foyer'],
    ['east', 'hall'],
    ['west', ''],
    ['north', ''],
    ['south', ''],
    ['up', ''],
    ['down', ''],
    ['northwest', ''],
    ['northeast', ''],
    ['southwest', ''],
    ['southeast', ''],
    ['east block', 'blocked'],
    ['west block', ''],
    ['north block', ''],
    ['south block', ''],
    ['up block', ''],
    ['down block', ''],
    ['northwest block', ''],
    ['northeast block', ''],
    ['southwest block', ''],
    ['southeast block', ''],
    ['east block desc', 'The foyer door is locked.'],
    ['west block desc', ''],
    ['north block desc', ''],
    ['south block desc', ''],
    ['up block desc', ''],
    ['down block desc', ''],
    ['northwest block desc', ''],
    ['northeast block desc', ''],
    ['southwest block desc', ''],
    ['southeast block desc', ''],
    ['from east look', 'A heavy wooden door leads into the hallway.'],
    ['from west look', 'The foyer wall is plain and undecorated.'],
    ['from north look', 'A faded portrait watches you from the wall.'],
    ['from south look', ''],
    ['from up look', ''],
    ['from down look', ''],
    ['from northwest look', ''],
    ['from northeast look', ''],
    ['from southwest look', ''],
    ['from southeast look', '']
  ],
  hall: [
    ['room', 'hall'],
    ['east', ''],
    ['west', 'foyer'],
    ['north', 'shed'],
    ['south', ''],
    ['up', ''],
    ['down', ''],
    ['northwest', ''],
    ['northeast', ''],
    ['southwest', ''],
    ['southeast', ''],
    ['east block', 'blocked'],
    ['west block', ''],
    ['north block', ''],
    ['south block', ''],
    ['up block', ''],
    ['down block', ''],
    ['northwest block', ''],
    ['northeast block', ''],
    ['southwest block', ''],
    ['southeast block', ''],
    ['east block desc', 'A collapsed beam blocks the eastern passage.'],
    ['west block desc', ''],
    ['north block desc', ''],
    ['south block desc', ''],
    ['up block desc', ''],
    ['down block desc', ''],
    ['northwest block desc', ''],
    ['northeast block desc', ''],
    ['southwest block desc', ''],
    ['southeast block desc', ''],
    ['from east look', ''],
    ['from west look', ''],
    ['from north look', 'You spot a shed door to the north.'],
    ['from south look', ''],
    ['from up look', ''],
    ['from down look', ''],
    ['from northwest look', ''],
    ['from northeast look', ''],
    ['from southwest look', ''],
    ['from southeast look', '']
  ],
  shed: [
    ['room', 'shed'],
    ['east', ''],
    ['west', ''],
    ['north', ''],
    ['south', 'hall'],
    ['up', ''],
    ['down', ''],
    ['northwest', ''],
    ['northeast', ''],
    ['southwest', ''],
    ['southeast', ''],
    ['east block', ''],
    ['west block', ''],
    ['north block', ''],
    ['south block', ''],
    ['up block', ''],
    ['down block', ''],
    ['northwest block', ''],
    ['northeast block', ''],
    ['southwest block', ''],
    ['southeast block', ''],
    ['east block desc', ''],
    ['west block desc', ''],
    ['north block desc', ''],
    ['south block desc', ''],
    ['up block desc', ''],
    ['down block desc', ''],
    ['northwest block desc', ''],
    ['northeast block desc', ''],
    ['southwest block desc', ''],
    ['southeast block desc', ''],
    ['from east look', ''],
    ['from west look', ''],
    ['from north look', ''],
    ['from south look', ''],
    ['from up look', ''],
    ['from down look', ''],
    ['from northwest look', ''],
    ['from northeast look', ''],
    ['from southwest look', ''],
    ['from southeast look', '']
  ]
};

// Items
var GameObjects = {
  foyer_door: [
    ['Item Name', 'door'],
    ['Id', 'foyer_door'],
    ['Location', 'foyer'],
    ['Unique Name', 'foyer door'],
    ['Object Type', 'item'],
    ['Description', 'A sturdy locked wooden door.'],
    ['Alt names', 'entry door'],
    ['Alt names 2', 'wooden door'],
    ['Can be Taken', 'No'],
    ['Screen X Coordinate', '36'],
    ['Screen Y Coordinate', '30'],
    ['Image Location', 'https://picsum.photos/id/1067/640/360']
  ],
  shed_door: [
    ['Item Name', 'door'],
    ['Id', 'shed_door'],
    ['Location', 'shed'],
    ['Unique Name', 'shed door'],
    ['Object Type', 'item'],
    ['Description', 'A side door hanging open.'],
    ['Alt names', 'side door'],
    ['Alt names 2', 'open door'],
    ['Can be Taken', 'No'],
    ['Screen X Coordinate', '28'],
    ['Screen Y Coordinate', '22'],
    ['Image Location', 'https://picsum.photos/id/1067/640/360']
  ],
  lamp: [
    ['Item Name', 'lamp'],
    ['Id', 'lamp'],
    ['Location', 'foyer'],
    ['Unique Name', 'foyer lamp'],
    ['Object Type', 'item'],
    ['Description', 'An oil lamp.'],
    ['Alt names', 'hot lamp'],
    ['Alt names 2', 'oil lamp'],
    ['Can be Taken', 'Yes'],
    ['Screen X Coordinate', '36'],
    ['Screen Y Coordinate', '30'],
    ['Image Location', 'https://picsum.photos/id/1067/640/360']
  ]
};

// Item command handlers (item-specific, not room-specific)
var GameObjectCommands = {
  foyer_door: {
    look: function (itemKey) {
      GameLocationTravel.foyer[OBJECTGOEASTBLOCK][1] = '';
      GameLocationTravel.foyer[OBJECTGOEASTBLOCKDESC][1] = '';
      changeObjectValue(itemKey, ITEMDESC, 'A sturdy unlocked wooden door.');
      scrnDisplay(GameObjects[itemKey][ITEMDESC][1] + ' You find a spare key nearby and unlock it.');
    }
  },
  shed_door: {
    look: function (itemKey) {
      scrnDisplay(GameObjects[itemKey][ITEMDESC][1] + ' It is already unlocked.');
    }
  },
  lamp: {
    look: function (itemKey) {
      scrnDisplay(GameObjects[itemKey][ITEMDESC][1]);
    }
  }
};

window.addEventListener('load', function () {
  LoadRoom('foyer');
});
