<script>

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}   //end function ParsePlayerInput


function cmdNoExit() {
 //Whenever the player wants to go in a direction that does not exist at the current location, the exit message will throw out a random
 //exit message from the global list.
  rndExitMsgLngth = globalmsg['noexit'].length;
  rndExitMsgRst = Math.floor(Math.random() * rndExitMsgLngth);
  return globalmsg['noexit'][rndExitMsgRst]);
}

<script>
