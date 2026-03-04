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
    roomText.innerHTML = text2dis;
  }
  else {
    roomText.innerHTML += text2dis;
  }
}

function findBetween(text, firststring, secondstring) {
  var regExString = new RegExp('(?:' + firststring + ')((.[\\s\\S]*))(?:' + secondstring + ')', 'ig');
  var strResult = regExString.exec(text);
  return strResult[1];
}

function strDelimiterCnt(text, delimiter) {
  var textsep = text.split(delimiter);
  return textsep.length;
}

function strDelimiter(text, delimiter, pos) {
  var textsep = text.split(delimiter);
  return textsep[pos];
}

function rtnStringInstances(string, searchinstance) {
  var escaped = searchinstance.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  var regex = new RegExp(escaped, 'gi');
  var result;
  var indices = [];

  while ((result = regex.exec(string))) {
    indices.push(result);
  }

  return indices.length;
}

function normalizeToken(name) {
  return (name || '').toLowerCase().trim().replace(/\s+/g, '_');
}

function splitAltNames(value) {
  if (!value) {
    return [];
  }

  return value.split(',').map(function (entry) {
    return normalizeToken(entry.replace(/_/g, ' '));
  }).filter(Boolean);
}

function getItemsInLocation(locationId) {
  var results = [];

  for (var objectKey in GameObjects) {
    if (!Object.prototype.hasOwnProperty.call(GameObjects, objectKey)) {
      continue;
    }

    var item = GameObjects[objectKey];
    if (item[ITEMLOCATION] && item[ITEMLOCATION][1] === locationId) {
      results.push(objectKey);
    }
  }

  return results;
}

function getAccessibleItems() {
  var roomItems = getItemsInLocation(OBJECTGLOBAL);
  var inventoryItems = getItemsInLocation('__inventory__');
  return roomItems.concat(inventoryItems.filter(function (entry) {
    return !roomItems.includes(entry);
  }));
}

function getItemTokens(item) {
  var tokens = [];
  tokens.push(normalizeToken(item[ITEMNAME] ? item[ITEMNAME][1] : ''));
  tokens.push(normalizeToken(item[ITEMUNIQUENAME] ? item[ITEMUNIQUENAME][1] : ''));

  splitAltNames(item[ITEMALTNAMES] ? item[ITEMALTNAMES][1] : '').forEach(function (entry) {
    tokens.push(entry);
  });

  splitAltNames(item[ITEMALTNAMES2] ? item[ITEMALTNAMES2][1] : '').forEach(function (entry) {
    tokens.push(entry);
  });

  return tokens.filter(Boolean);
}

function resolveAccessibleItem(inputToken) {
  var normalizedInput = normalizeToken(inputToken);
  var items = getAccessibleItems();
  var matches = [];

  items.forEach(function (key) {
    var item = GameObjects[key];
    var tokens = getItemTokens(item);

    if (tokens.includes(normalizedInput)) {
      matches.push(key);
    }
  });

  if (matches.length === 1) {
    return { status: 'ok', itemKey: matches[0] };
  }

  if (matches.length > 1) {
    return { status: 'ambiguous', itemKey: null };
  }

  return { status: 'missing', itemKey: null };
}

function getLookDirectionField(directionToken) {
  var token = normalizeToken(directionToken).replace(/_/g, ' ');

  if (GAMEEAST.includes(token)) return OBJECTFROMEASTLOOK;
  if (GAMEWEST.includes(token)) return OBJECTFROMWESTLOOK;
  if (GAMENORTH.includes(token)) return OBJECTFROMNORTHLOOK;
  if (GAMESOUTH.includes(token)) return OBJECTFROMSOUTHLOOK;
  if (GAMEUP.includes(token)) return OBJECTFROMUPLOOK;
  if (GAMEDOWN.includes(token)) return OBJECTFROMDOWNLOOK;
  if (GAMENORTHWEST.includes(token)) return OBJECTFROMNORTHWESTLOOK;
  if (GAMENORTHEAST.includes(token)) return OBJECTFROMNORTHEASTLOOK;
  if (GAMESOUTHWEST.includes(token)) return OBJECTFROMSOUTHWESTLOOK;
  if (GAMESOUTHEAST.includes(token)) return OBJECTFROMSOUTHEASTLOOK;

  return null;
}

function hasInventoryItem(itemId) {
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
  if (!PLAYERINVENTORY.length) {
    scrnDisplay('Inventory: (empty)');
    return;
  }

  var itemNames = PLAYERINVENTORY.map(function (item) {
    return item.name;
  });

  scrnDisplay('Inventory: ' + itemNames.join(', '));
}

function autoTakeItem(itemKey) {
  var item = GameObjects[itemKey];
  var canTake = (item[ITEMCANTAKE] && String(item[ITEMCANTAKE][1]).toLowerCase() === 'yes');

  if (!canTake) {
    scrnDisplay("You can't take that.");
    return;
  }

  if (hasInventoryItem(itemKey)) {
    scrnDisplay('You already have that.');
    return;
  }

  addItemToInventory(itemKey, item[ITEMUNIQUENAME][1] || item[ITEMNAME][1]);
  item[ITEMLOCATION][1] = '__inventory__';
  scrnDisplay('Taken.');
}
