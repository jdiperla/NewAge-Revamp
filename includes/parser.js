<script>

/*This will parse the command line input received by the user/player and will parse the commands, useless words and objects and Eval
the correct function to perform. myActionArray and myStringArray act as a container for the command words. myIgnoredWods and myUselessWords
act as a container for words to ignore such "With, on, for, etc...". consoleString & cmdSTR would be the complete command entered by the user.
textCMD will the command word that was parsed(EG: Look, Talk, etc...). objectTXT grabs the object that we are performing the action on. */

/*A sample call to this function would be: ParsePlayerInput('look,Talk,Walk,Take', 'the,At,On', 'on,with,and', 'Look at the Shiny Lamp')"; 
The first word returned will be the command word, eg: Look. It will separate itself with a semicolon from the rest of the return value. 
Next comes the primary object the command is being performed on, Eg: Shiny_Lamp and that will separate itself from further objects with a colon.
eg: Look at the shiny lamp returns: look;shiny_lamp:. If the object interacts with further objects, this will be added after the colon and
separated by comma's. EG: Look at the Shiny Lamp on the black table with the drawer  - will become: look;shiny_lamp:black_table,drawer*/

//Example: ParsePlayerInput('the,At,On', 'on,with,and', 'Talk at the Shiny Lamp')
	
     function ParsePlayerInput(myIgnoredWords, delimeterWords, consoleString) {

//create array for delimeterWords and ignored words
var coldelwords = new Array();
var coligwords = new Array();

//make all input lowercase so all cases match
		var myUselessWords = myIgnoredWords;
	
			myUselessWords = myUselessWords.toLowerCase();
			myUselessWords = myUselessWords.split(",");
	
		var consoleString = consoleString;
			consoleString = consoleString.toLowerCase();
	    var phrasedirect = '';
	    var onewordcmd = consoleString.split(' ').slice(0,1).join('');
        var twowordcmd = consoleString.split(' ').slice(0,2).join('');
        var threewordcmd = consoleString.split(' ').slice(0,3).join('');
		
		var textcmd = '';
		var firstObj = '';

//Find the command
	for( let syn in synonyms ){
    if (syn == onewordcmd){
        textcmd = synonyms[syn][0];
        phrasedirect = syn;
        break;
    
} else if (syn == twowordcmd){
        textcmd = synonyms[syn][0];
        phrasedirect = syn;
        break;
        
} else if (syn == threewordcmd){
        textcmd = synonyms[syn][0];
        phrasedirect = syn;
        break;	
} else {
	textcmd = CMDERROR;

}
									}
//

if(textcmd)
{
//this removes the command word "textcmd" from the input string
consoleString = consoleString.replace(phrasedirect, "");

}

//Remove the ignored words now
myIgnoredWords = myIgnoredWords.toLowerCase();
var a = myIgnoredWords.split(","),
    i;

for (i = 0; i < a.length; i++) {
var replacedWord = " " + a[i] + " ";
coligwords.push(replacedWord.trim());
    consoleString = replaceAll(consoleString, replacedWord, " ");
  
    
}

//This will replace delimeter words such as on/and/with or whatever is described with a comma to make it into an array
delimeterWords = delimeterWords.toLowerCase();
var a = delimeterWords.split(","),
    i;

for (i = 0; i < a.length; i++) {
var replacedWord = " " + a[i] + " ";

    consoleString = replaceAll(consoleString, replacedWord, ",");
   // consoleString = replaceAll(consoleString, replacedWord, "");
    
  //Deprecated: coldelwords.push(replacedWord.trim());
    
}

//replace white space commands with an underscore after trimming the whitespaces at either end
consoleString = consoleString.trim();
consoleString = replaceAll(consoleString, " ", "_");

firstObj = consoleString.split(",", 2);

if (texcmd = CMDERROR) {
   
	CMDRUNNERROR(); //displays the default error message if the command is not found
	
}
else {
	
eval GameObject[firstObj[0]][textcmd]; //Runs the command from the Parser.
	
}
//Deprecated again: return textcmd + ";" + firstObj[0] + ":" + consoleString.trim();

      //Deprecated: return textcmd + "_" + firstObj[0] + "('" + consoleString.trim() + "','" + coldelwords + "','" + coligwords + "')";


}



</script>
