var DIRECTION = '';
var DIRECTIONBLOCK = '';
var DIRECTIONBLOCKDESC = '';

function iterateCmds(command) {
//This command separates commands based on a set of words that can be used as delimiters and then runs each set of commands one after the other.
//EG: Put the water in the pot. Then Put the pot on the stove. Turn the stove on. 
//This still needs work though as some of these delimiter words can be used for other things besides delimiting a sentence.

    command = command.toLowerCase();
    command = replaceAll(command, 'and also', '||');
    command = replaceAll(command, 'and then', '||');
    command = replaceAll(command, 'then also', '||');
    command = replaceAll(command, '. then', '||');
    command = replaceAll(command, 'then', '||');
    command = replaceAll(command, 'also', '||');
    command = replaceAll(command, 'and', '||');
    command = replaceAll(command, '.', '||');

    var cmdsplit = command.split('||');

    for (var i = 0; i < cmdsplit.length; i++) {
        var singleCmd = cmdsplit[i].trim();
        if (singleCmd) {
            processcommand(singleCmd);
        }
    }
}

function processcommand(command) {
    let EAST = GAMEEAST.includes(command);
    let WEST = GAMEWEST.includes(command);
    let SOUTH = GAMESOUTH.includes(command);
    let NORTH = GAMENORTH.includes(command);
    let NORTHEAST = GAMENORTHEAST.includes(command);
    let SOUTHEAST = GAMESOUTHEAST.includes(command);
    let SOUTHWEST = GAMESOUTHWEST.includes(command);
    let NORTHWEST = GAMENORTHWEST.includes(command);
    let UP = GAMEUP.includes(command);
    let DOWN = GAMEDOWN.includes(command);
    let INVENTORY = GAMEINVENTORYCMDS.includes(command);

    if (INVENTORY) {
        showInventory();
    }
    else if (EAST) {
        DIRECTION = OBJECTGOEAST;
        DIRECTIONBLOCK = OBJECTGOEASTBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGOEASTBLOCKDESC;
        performTravel();
    }
    else if (WEST) {
        DIRECTION = OBJECTGOWEST;
        DIRECTIONBLOCK = OBJECTGOWESTBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGOWESTBLOCKDESC;
        performTravel();
    }
    else if (SOUTH) {
        DIRECTION = OBJECTGOSOUTH;
        DIRECTIONBLOCK = OBJECTGOSOUTHBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGOSOUTHBLOCKDESC;
        performTravel();
    }
    else if (NORTH) {
        DIRECTION = OBJECTGONORTH;
        DIRECTIONBLOCK = OBJECTGONORTHBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGONORTHBLOCKDESC;
        performTravel();
    }
    else if (NORTHEAST) {
        DIRECTION = OBJECTGONORTHEAST;
        DIRECTIONBLOCK = OBJECTGONORTHEASTBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGONORTHEASTBLOCKDESC;
        performTravel();
    }
    else if (SOUTHEAST) {
        DIRECTION = OBJECTGOSOUTHEAST;
        DIRECTIONBLOCK = OBJECTGOSOUTHEASTBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGOSOUTHEASTBLOCKDESC;
        performTravel();
    }
    else if (SOUTHWEST) {
        DIRECTION = OBJECTGOSOUTHWEST;
        DIRECTIONBLOCK = OBJECTGOSOUTHWESTBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGOSOUTHWESTBLOCKDESC;
        performTravel();
    }
    else if (NORTHWEST) {
        DIRECTION = OBJECTGONORTHWEST;
        DIRECTIONBLOCK = OBJECTGONORTHWESTBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGONORTHWESTBLOCKDESC;
        performTravel();
    }
    else if (UP) {
        DIRECTION = OBJECTGOUP;
        DIRECTIONBLOCK = OBJECTGOUPBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGOUPBLOCKDESC;
        performTravel();
    }
    else if (DOWN) {
        DIRECTION = OBJECTGODOWN;
        DIRECTIONBLOCK = OBJECTGODOWNBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGODOWNBLOCKDESC;
        performTravel();
    }
    //The final else. If all else fails, parse the command that was given.
    else {
        ParsePlayerInput(IGNOREWORDS, DELIMETERWORDS, command);
    }
}

function performTravel() {
 //The function first checks if the direction is blocked. If not, it will load the room.
 //If the Direction is blocked or locked, it will then display the lock message on the screen.
 //If the Direction you are heading in does not have an exit, it will run the command for "no exit found".
    var travelData = GameObjectTravel[OBJECTGLOBAL] || [];
    var destination = (travelData[DIRECTION] && travelData[DIRECTION][1]) || '';
    var blockReason = (travelData[DIRECTIONBLOCK] && travelData[DIRECTIONBLOCK][1]) || '';
    var blockDesc = (travelData[DIRECTIONBLOCKDESC] && travelData[DIRECTIONBLOCKDESC][1]) || '';

    if (blockReason !== '' || blockDesc !== '') {
        scrnDisplay(blockDesc || errMsg('noexit'));
        return;
    }

    if (!destination) {
        scrnDisplay(errMsg('noexit'));
        return;
    }

    LoadRoom(destination);
}
