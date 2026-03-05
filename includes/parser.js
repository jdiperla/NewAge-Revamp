/*This will parse the command line input received by the user/player and parse commands and objects.*/

function ParsePlayerInput(myIgnoredWords, delimeterWords, consoleString) {
var coldelwords = [];
var coligwords = [];

consoleString = consoleString.toLowerCase().trim();
if (runCustomTextCommand(consoleString)) {
    return;
}
var phrasedirect = '';
var onewordcmd = consoleString.split(' ').slice(0, 1).join(' ');
var twowordcmd = consoleString.split(' ').slice(0, 2).join(' ');
var threewordcmd = consoleString.split(' ').slice(0, 3).join(' ');

var textcmd = '';

for (let syn in synonyms) {
    if (syn === onewordcmd || syn === twowordcmd || syn === threewordcmd) {
        textcmd = synonyms[syn][0];
        phrasedirect = syn;
        break;
    }
}

if (!textcmd) {
    textcmd = CMDERROR;
}

if (textcmd) {
    consoleString = consoleString.replace(phrasedirect, '');
}

myIgnoredWords = myIgnoredWords.toLowerCase();
var a = myIgnoredWords.split(','), i;

for (i = 0; i < a.length; i++) {
    var replacedWord = ' ' + a[i] + ' ';
    coligwords.push(replacedWord.trim());
    consoleString = replaceAll(consoleString, replacedWord, ' ');
}

delimeterWords = delimeterWords.toLowerCase();
a = delimeterWords.split(',');

for (i = 0; i < a.length; i++) {
    var replacedDelWord = ' ' + a[i] + ' ';
    consoleString = replaceAll(consoleString, replacedDelWord, ',');
    coldelwords.push(replacedDelWord.trim());
}

consoleString = consoleString.trim();
consoleString = replaceAll(consoleString, ' ', '_');

var firstObj = consoleString.split(',', 2);
var objectKey = firstObj[0];

if (textcmd === CMDERROR) {
    scrnDisplay(errMsg('nocmd'));
    return;
}

if (!objectKey) {
    if (textcmd === 'inventory') {
        showInventory();
        return;
    }

    scrnDisplay(errMsg('nocmd'));
    return;
}


var lookDirectionField = null;
if (textcmd === 'look') {
    lookDirectionField = getLookDirectionField(objectKey);
    if (lookDirectionField !== null) {
        var travelData = GameLocationTravel[OBJECTGLOBAL] || [];
        var lookDesc = (travelData[lookDirectionField] && travelData[lookDirectionField][1]) || '';
        if (lookDesc) {
            scrnDisplay(lookDesc);
        }
        else {
            scrnDisplay("You don't notice anything special that way.");
        }
        return;
    }
}

var itemMatch = resolveAccessibleItem(objectKey);

if (itemMatch.status === 'ambiguous') {
    scrnDisplay('Be more specific. More than one matching item is here. Use unique name or alt name.');
    return;
}

if (itemMatch.status === 'ok') {
    var matchedItemKey = itemMatch.itemKey;

    if (textcmd === 'take') {
        autoTakeItem(matchedItemKey);
        return;
    }

    var itemCommandHandler = GameObjectCommands[matchedItemKey] && GameObjectCommands[matchedItemKey][textcmd];
    if (typeof itemCommandHandler === 'function') {
        itemCommandHandler(matchedItemKey);
        return;
    }
}

var executeParse = objectKey + '_' + textcmd;
var execFn = window[executeParse] || globalThis[executeParse];

if (typeof execFn === 'function') {
    execFn();
}
else {
    scrnDisplay(errMsg('nocmd'));
}
}
