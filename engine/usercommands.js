<script>
var DIRECTION = '';
var DIRECTIONBLOCK = '';
var DIRECTIONBLOCKDESC = '';

function iterateCmds(command) {
//This command separates commands based on a set of words that can be used as delimiters and then runs each set of commands one after the other.
//EG: Put the water in the pot. Then Put the pot on the stove. Turn the stove on. 
//This still needs work though as some of these delimiter words can be used for other things besides delimiting a sentence.
    
    command = command.toLowerCase();
    replaceAll(command, 'and', '||');
    replaceAll(command, 'and also', '||');
    replaceAll(command, 'and then', '||');
    replaceAll(command, 'then also', '||');
    replaceAll(command, 'then', '||');
    replaceAll(command, 'also', '||');
    replaceAll(command, '.', '||');
    replaceAll(command, '. then', '||');
    
    cmdsplit = command.split("||");
    
    for (i = 0; i < cmdsplit.length; i++) {
            
                processcommand(cmdsplit[i]);
        
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
    
    
    if(EAST = true){
        DIRECTION = OBJECTGOEAST;
        DIRECTIONBLOCK = OBJECTGOEASTBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGOEASTBLOCKDESC;
        performTravel();        
    }
    
    else if(WEST = true){        
        DIRECTION = OBJECTGOWEST;
        DIRECTIONBLOCK = OBJECTGOWESTBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGOWESTBLOCKDESC;
        performTravel();
    }
    
   
     else if(SOUTH = true){        
       DIRECTION = OBJECTGOSOUTH;
       DIRECTIONBLOCK = OBJECTGOSOUTHBLOCK;
       DIRECTIONBLOCKDESC = OBJECTGOSOUTHBLOCKDESC;
       performTravel();
    }
    
    
     
   else if(NORTH = true){        
       DIRECTION = OBJECTGONORTH;
       DIRECTIONBLOCK = OBJECTGONORTHBLOCK;
       DIRECTIONBLOCKDESC = OBJECTGONORTHBLOCKDESC;
       performTravel();
    }
    
    
     
   else if(NORTHEAST = true){        
        DIRECTION = OBJECTGONORTHEAST;
       DIRECTIONBLOCK = OBJECTGONORTHEASTBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGONORTHEASTBLOCKDESC;
        performTravel();
    }
    
    
     
   else if(SOUTHEAST = true){        
        DIRECTION = OBJECTGOSOUTHEAST;
        DIRECTIONBLOCK = OBJECTGOSOUTHEASTBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGOSOUTHEASTBLOCKDESC;
        performTravel();
    }
    
   
     
    else if(SOUTHWEST = true){        
        DIRECTION = OBJECTGOSOUTHWEST;
        DIRECTIONBLOCK = OBJECTGOSOUTHWESTBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGOSOUTHWESTBLOCKDESC;
        performTravel();
    }
    
    
     
    else if(NORTHWEST = true){        
        DIRECTION = OBJECTGONORTHWEST;
        DIRECTIONBLOCK = OBJECTGONORTHWESTBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGONORTHWESTBLOCKDESC;
        performTravel();
    }
    
    
   
     
   else if(UP = true){        
        DIRECTION = OBJECTGOUP;
        DIRECTIONBLOCK = OBJECTGOUPBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGOUPBLOCKDESC;
        performTravel();
    }
    
 
     
   else if(DOWN = true){        
        DIRECTION = OBJECTGODOWN;
        DIRECTIONBLOCK = OBJECTGODOWNBLOCK;
        DIRECTIONBLOCKDESC = OBJECTGODOWNBLOCKDESC;
        performTravel();
    }
    
    //The final else. If all else fails, parse the command that was given.
    else {
        
        ParsePlayerInput(IGNOREWORDS, DELIMETERWORDS, command)
        
    }
}

function performTravel() {
 //The function first checks if the direction is blocked. If not, it will load the room.
 //If the Direction is blocked or locked, it will then display the lock message on the screen.
 //If the Direction you are heading in does not have an exit, it will run the command for "no exit found".   
    if (GameObjectTravel[OBJECTGLOBAL][DIRECTIONBLOCK][1] = '') {
        
        LoadRoom(GameObjectTravel[OBJECTGLOBAL][DIRECTION][1]);   
        
    }
    else if(GameObjectTravel[OBJECTGLOBAL][DIRECTIONBLOCK][1] != '' {
        
        scrnDisplay(GameObjectTravel[OBJECTGLOBAL][DIRECTIONBLOCKDESC][1]);
    
    }

if (GameObjectTravel[OBJECTGLOBAL][DIRECTIONB][1] = '') {
    
        errMsg('noexit');

}
     


</script>
