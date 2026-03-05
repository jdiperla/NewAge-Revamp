// Global Variables for game settings
var GAMENAME = '';
var OBJECTGLOBAL = '';  // Indicates the current location loaded.
var GAMECURPLAYER = ''; // Indicates the current player you control.
var GAMESCORE = '0';
var GLOBALSETCLS = false;
var GAMEEAST = ['e', 'east', 'go e', 'go east', 'head east', 'head e', 'explore east', 'explore e', 'go eastbound', 'head eastbound', 'go east bound', 'head east bound', 'travel e', 'travel east'];
var GAMEWEST = ['w', 'west', 'go w', 'go west', 'head west', 'head w', 'explore west', 'explore w', 'go westbound', 'head westbound', 'go west bound', 'head west bound', 'travel w', 'travel west'];
var GAMESOUTH = ['s', 'south', 'go s', 'go south', 'head south', 'head s', 'explore south', 'explore s', 'go southbound', 'head southbound', 'go south bound', 'head south bound', 'travel s', 'travel south'];
var GAMENORTH = ['n', 'north', 'go n', 'go north', 'head north', 'head n', 'explore north', 'explore n', 'go northbound', 'head northbound', 'go north bound', 'head north bound', 'travel n', 'travel north'];
var GAMESOUTHEAST = ['se', 'southeast', 'south east', 'go se', 'go southeast', 'go south east', 'head southeast', 'head se', 'explore southeast', 'explore se', 'go southeastbound', 'head southeastbound', 'go southeast bound', 'head southeast bound', 'travel se', 'travel southeast'];
var GAMENORTHEAST = ['ne', 'northeast', 'north east', 'go ne', 'go northeast', 'go north east', 'head northeast', 'head ne', 'explore northeast', 'explore ne', 'go northeastbound', 'head northeastbound', 'go northeast bound', 'head northeast bound', 'travel ne', 'travel northeast'];
var GAMENORTHWEST = ['nw', 'northwest', 'north west', 'go nw', 'go northwest', 'go north west', 'head northwest', 'head nw', 'explore northwest', 'explore nw', 'go northwestbound', 'head northwestbound', 'go northwest bound', 'head northwest bound', 'travel nw', 'travel northwest'];
var GAMESOUTHWEST = ['sw', 'southwest', 'south west', 'go sw', 'go southwest', 'go south west', 'head southwest', 'head sw', 'explore southwest', 'explore sw', 'go southwestbound', 'head southwestbound', 'go southwest bound', 'head southwest bound', 'travel sw', 'travel southwest'];
var GAMEUP = ['u', 'up', 'go u', 'go up', 'head up', 'head u', 'explore up', 'explore u', 'go upbound', 'head upbound', 'go upward', 'head upward', 'travel u', 'travel upward', 'climb up', 'climb u', 'climb upward'];
var GAMEDOWN = ['d', 'down', 'go d', 'go down', 'head down', 'head d', 'explore down', 'explore d', 'go downbound', 'head downbound', 'go downward', 'head downward', 'travel d', 'travel downward', 'climb down', 'climb d', 'climb downward'];

// Location fields for GameLocations
const OBJECTNAME = 0;
const OBJECTID = 1;
const OBJECTTYPE = 2;
const OBJECTDESCFIRSTTIME = 3;
const OBJECTDESC = 4;
const OBJECTSHORTDESC = 5;
const OBJECTALTNAMES = 6;
const OBJECTXSIZE = 7;
const OBJECTYSIZE = 8;
const OBJECTIMAGE = 9;
const OBJECTMOVIE = 10;

// Item fields for GameObjects
const ITEMNAME = 0;
const ITEMID = 1;
const ITEMLOCATION = 2;
const ITEMUNIQUENAME = 3;
const ITEMTYPE = 4;
const ITEMDESC = 5;
const ITEMALTNAMES = 6;
const ITEMALTNAMES2 = 7;
const ITEMCANTAKE = 8;
const ITEMSCREENX = 9;
const ITEMSCREENY = 10;
const ITEMIMAGE = 11;
const ITEMCLICKABLE = 12;

// Direction details for GameLocationTravel
const OBJECTGOEAST = 1;
const OBJECTGOWEST = 2;
const OBJECTGONORTH = 3;
const OBJECTGOSOUTH = 4;
const OBJECTGOUP = 5;
const OBJECTGODOWN = 6;
const OBJECTGONORTHWEST = 7;
const OBJECTGONORTHEAST = 8;
const OBJECTGOSOUTHWEST = 9;
const OBJECTGOSOUTHEAST = 10;

// Blocked or locked locations
const OBJECTGOEASTBLOCK = 11;
const OBJECTGOWESTBLOCK = 12;
const OBJECTGONORTHBLOCK = 13;
const OBJECTGOSOUTHBLOCK = 14;
const OBJECTGOUPBLOCK = 15;
const OBJECTGODOWNBLOCK = 16;
const OBJECTGONORTHWESTBLOCK = 17;
const OBJECTGONORTHEASTBLOCK = 18;
const OBJECTGOSOUTHWESTBLOCK = 19;
const OBJECTGOSOUTHEASTBLOCK = 20;

// Block descriptions
const OBJECTGOEASTBLOCKDESC = 21;
const OBJECTGOWESTBLOCKDESC = 22;
const OBJECTGONORTHBLOCKDESC = 23;
const OBJECTGOSOUTHBLOCKDESC = 24;
const OBJECTGOUPBLOCKDESC = 25;
const OBJECTGODOWNBLOCKDESC = 26;
const OBJECTGONORTHWESTBLOCKDESC = 27;
const OBJECTGONORTHEASTBLOCKDESC = 28;
const OBJECTGOSOUTHWESTBLOCKDESC = 29;
const OBJECTGOSOUTHEASTBLOCKDESC = 30;

// Look descriptions from various directions
const OBJECTFROMEASTLOOK = 31;
const OBJECTFROMWESTLOOK = 32;
const OBJECTFROMNORTHLOOK = 33;
const OBJECTFROMSOUTHLOOK = 34;
const OBJECTFROMUPLOOK = 35;
const OBJECTFROMDOWNLOOK = 36;
const OBJECTFROMNORTHWESTLOOK = 37;
const OBJECTFROMNORTHEASTLOOK = 38;
const OBJECTFROMSOUTHWESTLOOK = 39;
const OBJECTFROMSOUTHEASTLOOK = 40;

// Inventory command aliases and player inventory state
var GAMEINVENTORYCMDS = ['inventory', 'inv', 'i', 'bag', 'items'];
var PLAYERINVENTORY = [];
