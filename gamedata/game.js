// Example game data for NewAge-Revamp.
// Include this file after globals/functions/parser/core/usercommands files.

var IGNOREWORDS = 'the,a,an,to,at';
var DELIMETERWORDS = 'with,on,using,and';
var CMDERROR = 'CMDERROR';

GAMENAME = 'Example: The Lantern Hall';

var GameObjects = {
  foyer: [
    ['Room Name', 'Foyer'],
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
    ['Room Name', 'Hallway'],
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
    ['Room Name', 'Shed'],
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

var GameObjectTravel = {
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
    ['from north look', ''],
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

var GameObjectsCommands = {
  foyer: {},
  hall: {},
  shed: {}
};

// Room-specific object command handlers.
// Format: GameRoomObjectCommands[roomName][objectName][verb]()
var GameRoomObjectCommands = {
  foyer: {
    door: {
      look: function () {
        scrnDisplay('The foyer door is locked. You find a spare key nearby and unlock it.');
        GameObjectTravel.foyer[OBJECTGOEASTBLOCK][1] = '';
        GameObjectTravel.foyer[OBJECTGOEASTBLOCKDESC][1] = '';
      }
    },
    lamp: {
      look: function () {
        if (addItemToInventory('lamp', 'Oil Lamp')) {
          scrnDisplay('The oil lamp is cold, but there is still fuel inside. You take it.');
        }
        else {
          scrnDisplay('The oil lamp is cold, but there is still fuel inside.');
        }
      }
    }
  },
  shed: {
    door: {
      look: function () {
        scrnDisplay('This shed door is already unlocked and swings freely.');
      }
    }
  }
};

window.addEventListener('load', function () {
  LoadRoom('foyer');
});
