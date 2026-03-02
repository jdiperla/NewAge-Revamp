
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
    ['A dim foyer with a dusty table. A hallway leads east.', 'A dim foyer with a dusty table. A hallway leads east.'],
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
    ['A narrow hallway. There is a door to the west back to the foyer.', 'A narrow hallway. There is a door to the west back to the foyer.'],
    ['A narrow hallway.', 'A narrow hallway.'],
    ['Alt names', 'passage'],
    ['Alt names 2', 'corridor'],
    ['640', '640'],
    ['360', '360'],
    ['https://picsum.photos/id/1025/640/360', 'https://picsum.photos/id/1025/640/360'],
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
    ['east block desc', 'The hallway door is jammed shut.'],
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
    ['north', ''],
    ['south', ''],
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
  hall: {}
};

function lamp_look() {
  scrnDisplay('The oil lamp is cold, but there is still fuel inside.');
}

function door_look() {
  scrnDisplay('A plain wooden door. It opens toward the hallway.');
}

window.addEventListener('load', function () {
  LoadRoom('foyer');
});
