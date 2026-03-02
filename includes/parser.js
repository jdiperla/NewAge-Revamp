
/*This will parse the command line input received by the user/player and will parse the commands, useless words and objects and Eval
the correct function to perform. myActionArray and myStringArray act as a container for the command words. myIgnoredWods and myUselessWords
act as a container for words to ignore such "With, on, for, etc...". consoleString & cmdSTR would be the complete command entered by the user.
textCMD will the command word that was parsed(EG: Look, Talk, etc...). objectTXT grabs the object that we are performing the action on. */

//Example: ParsePlayerInput('the,At,On', 'on,with,and', 'Talk at the Shiny Lamp')
function ParsePlayerInput(myIgnoredWords, delimeterWords, consoleString) {

//create array for delimeterWords and ignored words
var coldelwords = [];
var coligwords = [];

//make all input lowercase so all cases match
var myUselessWords = myIgnoredWords;
myUselessWords = myUselessWords.toLowerCase();
myUselessWords = myUselessWords.split(',');

consoleString = consoleString.toLowerCase();
var phrasedirect = '';
var onewordcmd = consoleString.split(' ').slice(0, 1).join(' ');
var twowordcmd = consoleString.split(' ').slice(0, 2).join(' ');
var threewordcmd = consoleString.split(' ').slice(0, 3).join(' ');

var textcmd = '';
var firstObj = '';

//Find the command
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
//this removes the command word "textcmd" from the input string
consoleString = consoleString.replace(phrasedirect, '');

}

//Remove the ignored words now
myIgnoredWords = myIgnoredWords.toLowerCase();
var a = myIgnoredWords.split(','), i;

for (i = 0; i < a.length; i++) {
var replacedWord = ' ' + a[i] + ' ';
coligwords.push(replacedWord.trim());
    consoleString = replaceAll(consoleString, replacedWord, ' ');
}

//This will replace delimeter words such as on/and/with or whatever is described with a comma to make it into an array
delimeterWords = delimeterWords.toLowerCase();
a = delimeterWords.split(',');

for (i = 0; i < a.length; i++) {
var replacedDelWord = ' ' + a[i] + ' ';
    consoleString = replaceAll(consoleString, replacedDelWord, ',');
    coldelwords.push(replacedDelWord.trim());
}

//replace white space commands with an underscore after trimming the whitespaces at either end
consoleString = consoleString.trim();
consoleString = replaceAll(consoleString, ' ', '_');

firstObj = consoleString.split(',', 2);

if (textcmd === CMDERROR) {
    scrnDisplay(errMsg('nocmd')); //if No synonym or command is found in the synonym list, it will throw an error. Otherwise will continue processing
}
else {
    var executeParse = firstObj[0] + '_' + textcmd; //eg: desk_look

    if (typeof window[executeParse] === 'function') {
        //if no command was defined in the code, it will throw an error and run one of the customized error messages
        executeParse = executeParse + '()';
        eval(executeParse);
    }
    else {
        scrnDisplay(errMsg('nocmd'));
    }
}
}


