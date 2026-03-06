// Standalone starter game idea using the NewAge Revamp engine.

var IGNOREWORDS = 'the,a,an,to,at';
var DELIMETERWORDS = 'with,on,using,and';
var CMDERROR = 'CMDERROR';

GAMENAME = 'Lighthouse Mystery';

var GlobalTextCommands = {
  'sing a song': '/n♪ The waves keep time while your voice echoes through the lighthouse. ♪'
};

var GameLocations = {
  dock: [
    ['Location Name', 'Foggy Dock'],
    ['Id', 'dock'],
    ['Object Type', 'room'],
    ['A foggy dock stretches below the lighthouse. A path goes north.', 'A foggy dock stretches below the lighthouse. A path goes north.'],
    ['The dock creaks under your feet.', 'The dock creaks under your feet.'],
    ['Alt names', 'pier'],
    ['Alt names 2', 'harbor dock'],
    ['640', '640'],
    ['360', '360'],
    ['https://picsum.photos/id/1011/640/360', 'https://picsum.photos/id/1011/640/360'],
    ['', ''],
    ['Map Icon', ''],
    ['Floor', '0']
  ],
  lighthouse_entry: [
    ['Location Name', 'Lighthouse Entry'],
    ['Id', 'lighthouse_entry'],
    ['Object Type', 'room'],
    ['You stand inside the lighthouse entry hall. Stairs spiral up.', 'You stand inside the lighthouse entry hall. Stairs spiral up.'],
    ['The entry smells of salt and old paper.', 'The entry smells of salt and old paper.'],
    ['Alt names', 'entry hall'],
    ['Alt names 2', 'lobby'],
    ['640', '640'],
    ['360', '360'],
    ['https://picsum.photos/id/1068/640/360', 'https://picsum.photos/id/1068/640/360'],
    ['', ''],
    ['Map Icon', ''],
    ['Floor', '0']
  ],
  lantern_room: [
    ['Location Name', 'Lantern Room'],
    ['Id', 'lantern_room'],
    ['Object Type', 'room'],
    ['The bright lantern room overlooks a stormy sea.', 'The bright lantern room overlooks a stormy sea.'],
    ['The lantern turns slowly overhead.', 'The lantern turns slowly overhead.'],
    ['Alt names', 'top room'],
    ['Alt names 2', 'tower top'],
    ['640', '640'],
    ['360', '360'],
    ['https://picsum.photos/id/1043/640/360', 'https://picsum.photos/id/1043/640/360'],
    ['', ''],
    ['Map Icon', ''],
    ['Floor', '1']
  ]
};

var GameLocationTravel = {
  dock: [
    ['room', 'dock'],
    ['east', ''],
    ['west', ''],
    ['north', 'lighthouse_entry'],
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
    ['south block', 'blocked'],
    ['up block', ''],
    ['down block', ''],
    ['northwest block', ''],
    ['northeast block', ''],
    ['southwest block', ''],
    ['southeast block', ''],
    ['east block desc', ''],
    ['west block desc', ''],
    ['north block desc', ''],
    ['south block desc', 'Dark water churns below the dock.'],
    ['up block desc', ''],
    ['down block desc', ''],
    ['northwest block desc', ''],
    ['northeast block desc', ''],
    ['southwest block desc', ''],
    ['southeast block desc', ''],
    ['from east look', 'A rowboat drifts just out of reach.'],
    ['from west look', 'Old posts line the weathered dock.'],
    ['from north look', 'The lighthouse door stands open.'],
    ['from south look', 'Fog hides the horizon.'],
    ['from up look', ''],
    ['from down look', 'Black waves slap against the dock supports.'],
    ['from northwest look', ''],
    ['from northeast look', ''],
    ['from southwest look', ''],
    ['from southeast look', '']
  ],
  lighthouse_entry: [
    ['room', 'lighthouse_entry'],
    ['east', ''],
    ['west', ''],
    ['north', ''],
    ['south', 'dock'],
    ['up', 'lantern_room'],
    ['down', ''],
    ['northwest', ''],
    ['northeast', ''],
    ['southwest', ''],
    ['southeast', ''],
    ['east block', ''],
    ['west block', ''],
    ['north block', 'blocked'],
    ['south block', ''],
    ['up block', ''],
    ['down block', ''],
    ['northwest block', ''],
    ['northeast block', ''],
    ['southwest block', ''],
    ['southeast block', ''],
    ['east block desc', ''],
    ['west block desc', ''],
    ['north block desc', 'A locked keeper office blocks your way.'],
    ['south block desc', ''],
    ['up block desc', ''],
    ['down block desc', ''],
    ['northwest block desc', ''],
    ['northeast block desc', ''],
    ['southwest block desc', ''],
    ['southeast block desc', ''],
    ['from east look', ''],
    ['from west look', ''],
    ['from north look', 'A brass nameplate hangs on the locked office door.'],
    ['from south look', 'The dock is visible through the open doorway.'],
    ['from up look', 'The spiral stairs rise into the lantern room.'],
    ['from down look', ''],
    ['from northwest look', ''],
    ['from northeast look', ''],
    ['from southwest look', ''],
    ['from southeast look', '']
  ],
  lantern_room: [
    ['room', 'lantern_room'],
    ['east', ''],
    ['west', ''],
    ['north', ''],
    ['south', ''],
    ['up', ''],
    ['down', 'lighthouse_entry'],
    ['northwest', ''],
    ['northeast', ''],
    ['southwest', ''],
    ['southeast', ''],
    ['east block', ''],
    ['west block', ''],
    ['north block', ''],
    ['south block', ''],
    ['up block', 'blocked'],
    ['down block', ''],
    ['northwest block', ''],
    ['northeast block', ''],
    ['southwest block', ''],
    ['southeast block', ''],
    ['east block desc', ''],
    ['west block desc', ''],
    ['north block desc', ''],
    ['south block desc', ''],
    ['up block desc', 'The ceiling is too low to climb higher.'],
    ['down block desc', ''],
    ['northwest block desc', ''],
    ['northeast block desc', ''],
    ['southwest block desc', ''],
    ['southeast block desc', ''],
    ['from east look', 'Lightning flashes over the open sea.'],
    ['from west look', 'Clouds gather over the cliffs.'],
    ['from north look', 'A storm front rolls in.'],
    ['from south look', 'The dock is tiny from this height.'],
    ['from up look', 'The glass lens rotates with a low hum.'],
    ['from down look', 'The spiral stairs descend to the entry hall.'],
    ['from northwest look', ''],
    ['from northeast look', ''],
    ['from southwest look', ''],
    ['from southeast look', '']
  ]
};

var GameObjects = {
  lantern: [
    ['Item Name', 'lantern'],
    ['Id', 'lantern'],
    ['Location', 'dock'],
    ['Unique Name', 'brass lantern'],
    ['Object Type', 'item'],
    ['Description', 'A brass lantern with a warm glow.'],
    ['Alt names', 'lamp'],
    ['Alt names 2', 'old lantern'],
    ['Can be Taken', 'Yes'],
    ['Screen X Coordinate', '38'],
    ['Screen Y Coordinate', '72'],
    ['Image Location', 'https://picsum.photos/id/175/96/96'],
    ['Clickable', 'Yes']
  ],
  journal: [
    ['Item Name', 'journal'],
    ['Id', 'journal'],
    ['Location', 'lighthouse_entry'],
    ['Unique Name', 'keeper journal'],
    ['Object Type', 'item'],
    ['Description', 'A weather-stained journal rests on a small table.'],
    ['Alt names', 'logbook'],
    ['Alt names 2', 'book'],
    ['Can be Taken', 'No'],
    ['Screen X Coordinate', '64'],
    ['Screen Y Coordinate', '58'],
    ['Image Location', 'https://picsum.photos/id/24/96/96'],
    ['Clickable', 'Yes']
  ]
};

var GameObjectCommands = {
  lantern: {
    look: function (itemKey) {
      scrnDisplay(GameObjects[itemKey][ITEMDESC][1]);
    }
  },
  journal: {
    look: function (itemKey) {
      scrnDisplay(GameObjects[itemKey][ITEMDESC][1]);
    },
    read: function () {
      scrnDisplay('/n"The storm comes tonight. Keep the beacon lit."');
    }
  }
};

window.addEventListener('load', function () {
  LoadRoom('dock');
  scrnDisplay('/nType "inventory" anytime to check carried items.');
});
