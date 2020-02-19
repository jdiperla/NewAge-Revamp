<script>
//Global Variables for game settings
var GAMENAME = '';
var OBJECTGLOBAL = '';  //Indicates the current OBJECT loaded.
var CURPLAYER = ''; //Indicates the current player you control.
var GAMESCORE = '0';
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


//Global constiables for Game Object details
const OBJECTNAME = 0;
const OBJECTID = 1;
const OBJECTTYPE = 2 ;
const OBJECTDESCFIRSTTIME = 3;
const OBJECTDESC = 4;
const OBJECTSHORTDESC = 5;
const OBJECTALTNAMES = 6;
const OBJECTXSIZE = 7;
const OBJECTYSIZE = 8;
const OBJECTIMAGE = 9;
const OBJECTMOVIE = 10;
const OBJECTPLAYERSTATUS = 11;
const OBJECTAMOUNT = 12;
const OBJECTSCORE = 13;

//Global constiables for Game Object direction details
const GOEAST = 14;
const GOWEST = 15;
const GONORTH = 16;
const GOSOUTH = 17;
const GOUP = 18;
const GODOWN = 19;
const GONORTHWEST = 20;
const GONORTHEAST = 21;
const GOSOUTHWEST = 22;
const GOSOUTHEAST = 23;

//Global constiables for Game Object Blocked Locations
const GOEASTBLOCK = 24;
const GOWESTBLOCK = 25;
const GONORTHBLOCK = 26;
const GOSOUTHBLOCK = 27;
const GOUPBLOCK = 28;
const GODOWNBLOCK = 29;
const GONORTHWESTBLOCK = 30;
const GONORTHEASTBLOCK = 31;
const GOSOUTHWESTBLOCK = 32;
const GOSOUTHEASTBLOCK = 33;

//Global constiables for Game Object Description of Blocked Locations
const GOEASTBLOCKDESC = 34;
const GOWESTBLOCKDESC = 35;
const GONORTHBLOCKDESC = 36;
const GOSOUTHBLOCKDESC = 37;
const GOUPBLOCKDESC = 38;
const GODOWNBLOCKDESC = 39;
const GONORTHWESTBLOCKDESC = 40;
const GONORTHEASTBLOCKDESC = 41;
const GOSOUTHWESTBLOCKDESC = 42;
const GOSOUTHEASTBLOCKDESC = 43;

//Global constiables for Game Object Description when looking at OBJECT from constious directions(EG: Look from southwest at OBJECT)
const FROMEASTLOOK = 44;
const FROMWESTLOOK = 45;
const FROMNORTHLOOK = 46;
const FROMSOUTHLOOK = 47;
const FROMUPLOOK = 48;
const FROMDOWNLOOK = 49;
const FROMNORTHWESTLOOK = 50;
const FROMNORTHEASTLOOK = 51;
const FROMSOUTHWESTLOOK = 52;
const FROMSOUTHEASTLOOK = 53;

//Global constiables for Game Object Commands
const OBJECTLOOK = 54;
const OBJECTTALK = 55;
const OBJECTTAKE = 56;
const OBJECTKICK = 57;
const OBJECTLICK = 58;
const OBJECTPUNCH = 59;
const OBJECTPUSH = 60;
const OBJECTPULL = 61;
const OBJECTTASTE = 62;
const OBJECTSMELL = 63;
const OBJECTLISTEN = 64;
const OBJECTTURNON = 65;
const OBJECTTURNOFF = 66;
const OBJECTTHINK = 67;
const OBJECTSMILE = 68;
const OBJECTCRY = 69;
const OBJECTTHROW = 70;
const OBJECTSHOOT = 71;
const OBJECTOPEN = 72;
const OBJECTCLOSE = 73;
const OBJECTFIGHT = 74;
const OBJECTUSE = 75;
const OBJECTPUTON = 76;
const OBJECTTAKEOFF = 77;
const OBJECTPICKUP = 78;
const OBJECTLOCK = 79;
const OBJECTUNLOCK = 80;
const OBJECTREAD = 81;
const OBJECTFIX = 82;
const OBJECTCLIMB = 83;
const OBJECTMOVE = 84;
const OBJECTDROP = 85;
const OBJECTATTACK = 86;
const OBJECTHIT = 87;
const OBJECTBITE = 88;
const OBJECTLAUGH = 89;
const OBJECTSWITCH = 90;
const OBJECTFLICK = 91;
const OBJECTTRIGGER = 92;
const OBJECTTRANSFORM = 93;
const OBJECTASK = 94;
const OBJECTBLOW = 95;
const OBJECTYELL = 96;
const OBJECTKNOCK = 97;
const OBJECTMOUNT = 98;
const OBJECTDISMOUNT = 99;
const OBJECTEAT = 100;
const OBJECTSWALLOW = 101;
const OBJECTSIT = 102;
const OBJECTSTEP = 103;
const OBJECTSTAND = 104;
const OBJECTDROPKICK = 105;
const OBJECTMOCK = 106;
const OBJECTSEAL = 107;
const OBJECTUNSEAL = 108;
const OBJECTCUT = 109;
const OBJECTSTAB = 110;
const OBJECTRIP = 111;
const OBJECTSLICE = 112;
const OBJECTLAND = 113;
const OBJECTTHANK = 114;
const OBJECTSWEAR = 115;
const OBJECTTEASE = 116;
const OBJECTPOINT = 117;
const OBJECTKISS = 118;
const OBJECTHUG = 119;
const OBJECTTOUCH = 120;
const OBJECTGIVE = 121;
const OBJECTTAKE = 122;
const OBJECTSLAP = 123;
const OBJECTCHALLENGE = 124;
const OBJECTSING = 125;
const OBJECTCALL = 126;
const OBJECTSPARE = 127;
const OBJECTHELP = 128;
const OBJECTHEAL = 129;
const OBJECTKILL = 130;
const OBJECTPUT = 131;
const OBJECTSALUTE = 132;
const OBJECTGREET = 133;
const OBJECTFALL = 134;
const OBJECTJUMP = 135;
const OBJECTSHOUT = 136;
const OBJECTWHISPER = 137;
const OBJECTRUN = 138;
const OBJECTWALK = 139;
const OBJECTDEFEND = 140;
const OBJECTTIE = 141;
const OBJECTUNTIE = 142;
const OBJECTBREAK = 143;
const OBJECTSNORT = 144;
const OBJECTDRINK = 145;
const OBJECTPRAY = 146;
const OBJECTWINK = 147;
const OBJECTSMOKE = 148;
const OBJECTLIGHT = 149;
const OBJECTACTIVATE = 150;
const OBJECTDEACTIVATE = 151;
const OBJECTOPERATE = 152;
const OBJECTSING = 153;
const OBJECTANSWER = 154;
const OBJECTBURN = 155;
const OBJECTCOUNT = 156;
const OBJECTINFLATE = 157;
const OBJECTDEFLATE = 158;
const OBJECTCROSS = 159;
const OBJECTDIG = 160;
const OBJECTBURY = 161;
const OBJECTENTER = 162;
const OBJECTEXIT = 163;
const OBJECTEMPTY = 164;
const OBJECTFILL = 165;
const OBJECTEXTINGUISH = 166;
const OBJECTFOLLOW = 167;
const OBJECTKNOCK = 168;
const OBJECTTRANSFER = 169;
const OBJECTMOVE = 170;
const OBJECTRAISE = 171;
const OBJECTLOWER = 172;
const OBJECTSEARCH = 173;
const OBJECTSHAKE = 174;
const OBJECTSLIDE = 175;
const OBJECTSTAY = 176;
const OBJECTSTRIKE = 177;
const OBJECTFIRE = 178;
const OBJECTSWIM = 179;
const OBJECTTELL = 180;
const OBJECTWAKE = 181;
const OBJECTCHARM = 182;
const OBJECTWAVE = 183;
const OBJECTWIND = 184;
const OBJECTDRILL = 185;
const OBJECTHAMMER = 186;
const OBJECTSCREW = 187;
const OBJECTPOUND = 188;
</script>
