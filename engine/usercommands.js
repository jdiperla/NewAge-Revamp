<script>

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
        
        goeast();
    }
    
    else if(WEST = true){
        
        gowest();
    }
    
   
     else if(SOUTH = true){
        
        gosouth();
    }
    
    
     
   else if(NORTH = true){
        
        gonorth();
    }
    
    
     
   else if(NORTHEAST = true){
        
        gonortheast();
    }
    
    
     
   else if(SOUTHEAST = true){
        
        gosoutheast();
    }
    
   
     
    else if(SOUTHWEST = true){
        
        gosouthwest();
    }
    
    
     
    else if(NORTHWEST = true){
        
        gonorthwest();
    }
    
    
   
     
   else if(UP = true){
        
        goup();
    }
    
 
     
   else if(DOWN = true){
        
        godown();
    }
    
}

</script>
