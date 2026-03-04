
function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function errMsg(errorglobal) {
 //Whenever the player wants to go in a direction that does not exist at the current location, the exit message will throw out a random
 //exit message from the global list.
  var rndMsgLngth = globalmsg[errorglobal].length;
  var rndMsgRst = Math.floor(Math.random() * rndMsgLngth);
  return globalmsg[errorglobal][rndMsgRst];
}

function scrnDisplay(text2dis) {
 //Function that writes to the screen.
  var roomText = document.getElementById('StartRoomText');

  if (GLOBALSETCLS === true) {
   //if globally set to clear the screen for every new text inputted.
    roomText.innerHTML = text2dis;
  }
  else {
    roomText.innerHTML += text2dis;
  }
}

function findBetween(text, firststring, secondstring){
  //Function to text between two strings.
  var regExString = new RegExp('(?:' + firststring + ')((.[\\s\\S]*))(?:' + secondstring + ')', 'ig');
  var strResult = regExString.exec(text);

  return strResult[1];
}

function strDelimiterCnt(text, delimiter){
 //Function to enter a string and divide it using a delimiter and return the count
  var textsep = text.split(delimiter);

  return textsep.length;
}

function strDelimiter(text, delimiter, pos){
 //Function to enter a string and divide it using a delimiter and return the string at the split position
  var textsep = text.split(delimiter);

  return textsep[pos];
}

function rtnStringInstances(string, searchinstance) {
//returns the number of times the search appears in the string.
  var escaped = searchinstance.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  var regex = new RegExp(escaped, 'gi');
  var result;
  var indices = [];

  while ((result = regex.exec(string))) {
    indices.push(result);
  }

  return indices.length;
}

function hasInventoryItem(itemId) {
 //Checks if the player already has an item in inventory by id.
  return PLAYERINVENTORY.some(function (entry) {
    return entry.id === itemId;
  });
}

function addItemToInventory(itemId, displayName) {
 //Scripting helper: add an item to player inventory. Returns true if added, false if already owned.
  if (!itemId) {
    return false;
  }

  if (hasInventoryItem(itemId)) {
    return false;
  }

  PLAYERINVENTORY.push({
    id: itemId,
    name: displayName || itemId
  });

  return true;
}

function showInventory() {
 //Shows player inventory to screen.
  if (!PLAYERINVENTORY.length) {
    scrnDisplay('Inventory: (empty)');
    return;
  }

  var itemNames = PLAYERINVENTORY.map(function (item) {
    return item.name;
  });

  scrnDisplay('Inventory: ' + itemNames.join(', '));
}
