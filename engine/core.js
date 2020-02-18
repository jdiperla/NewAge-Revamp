<script>

function LoadRoom(roomname) {
//Loads the specified room and sets the global setting. If a movie file is specified, the engine will play the movie file first. Once the movie is done, it will load the room image. Currently, the video will only play thru once. Once it is played, it will just show an image. If no movie is specified, it will load simply the room background image. If no image is present, it will show no image.
    
           OBJECTGLOBAL = roomname;
          
           if (RoomObjects[OBJECTGLOBAL][OBJECTMOVIE][1] != ''){
 
           document.getElementById("StartRoomLoad").innerHTML = '<video id="mainvid" onerror="hidevideo(OBJECTGLOBAL);" onended="hidevideo(OBJECTGLOBAL);" width="100%" height="" autoplay>' + '<source src="' + RoomObjects[OBJECTGLOBAL][OBJECTMOVIE][1] + '" type="video/mp4"></video>';
           } else if (RoomObjects[OBJECTGLOBAL][ROOMIMAGE][1] != ''){
           document.getElementById("StartRoomLoad").innerHTML = "<img src='" + RoomObjects[OBJECTGLOBAL][ROOMIMAGE][1] + "' id='RoomBackground' display='none' width='" + RoomObjects[OBJECTGLOBAL][OBJECTXSIZE][1] + "' height='" + RoomObjects[OBJECTGLOBAL][OBJECTYSIZE][1] + "'></image>";
           }
                    document.getElementById("StartRoomText").innerHTML = RoomObjects[OBJECTGLOBAL][OBJECTDESCFIRSTTIME][1];
                 
                 
                 
                            }


function hidevideo(roomname) {
//This function is called once a video is played on room enter. It will close the video and then show the image if there is one. 

  var x = document.getElementById("mainvid");
  var y = document.getElementById("RoomBackground");

    x.style.display = "none";

if (RoomObjects[OBJECTGLOBAL][ROOMIMAGE][1] != ''){
           document.getElementById("StartRoomLoad").innerHTML = "<img src='" + RoomObjects[OBJECTGLOBAL][ROOMIMAGE][1] + "' id='RoomBackground' display='none' width='" + RoomObjects[OBJECTGLOBAL][OBJECTXSIZE][1] + "' height='" + RoomObjects[OBJECTGLOBAL][OBJECTYSIZE][1] + "'></image>";
           }
           
}

  function executeObjectCmd(object, pos) {
            //Function to execute the scripted command for the object. Object is the object command name. Pos is the position of the script.
            
            eval(RoomObjects[OBJECTGLOBAL][object][pos]);
            
        }

function changeObjectValue(object, field, value, pos = 1){
            //Changes the value of a field for an object. EG: Description, amounts, etc... Object is the room, character, etc.. Field is the field to change and value is what it is changing too. Pos is the position in the array. Default is always 1.
            
            RoomObjects[room][field][1] = value;
                        
        }


</script>
