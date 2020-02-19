<script>

function processcommand(command) {
    
    let EAST = GAMEEAST.includes(command);
     
    if(EAST = true){
        
        goeast();
    }
    
    let WEST = GAMEWEST.includes(command);
     
    if(WEST = true){
        
        gowest();
    }
    
    let SOUTH = GAMESOUTH.includes(command);
     
    if(SOUTH = true){
        
        gosouth();
    }
    
    let NORTH = GAMENORTH.includes(command);
     
    if(NORTH = true){
        
        gonorth();
    }
    
    let NORTHEAST = GAMENORTHEAST.includes(command);
     
    if(NORTHEAST = true){
        
        gonortheast();
    }
    
    let SOUTHEAST = GAMESOUTHEAST.includes(command);
     
    if(SOUTHEAST = true){
        
        gosoutheast();
    }
    
    let SOUTHWEST = GAMESOUTHWEST.includes(command);
     
    if(SOUTHWEST = true){
        
        gosouthwest();
    }
    
    let NORTHWEST = GAMENORTHWEST.includes(command);
     
    if(NORTHWEST = true){
        
        gonorthwest();
    }
    
    
   let UP = GAMEUP.includes(command);
     
    if(UP = true){
        
        goup();
    }
    
    let DOWN = GAMEDOWN.includes(command);
     
    if(DOWN = true){
        
        godown();
    }
    
}

</script>
