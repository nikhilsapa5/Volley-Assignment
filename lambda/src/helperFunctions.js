// Contains the helper functions that are used in this Alexa skill
const constants = require('./constants');

/* *
 * description: gets the spoken output based on the expected number and the theme of the game for that turn.
 * parameters: givenExpectedNum, the expected number as the game progresses, and givenTheme, the selected game theme
 * returns: a variable that holds just a string or also mp3 sound assets when a new level is reached
 * */
function getSpeakOutputForLevel(givenExpectedNum, counter) {
	if(givenExpectedNum === 1) { // game start
		const generatedReturn = constants.START + 'Welcome to Fizz Buzz. ' + constants.INSTRUCTIONS + (counter !== 0 ? ' Previously you lost at ' + counter + '. ': '') + ' OK, I\'ll start... ' + givenExpectedNum;
		return generatedReturn;
	} else { // no new level reached
		const generatedReturn = determineFizzBuzz(givenExpectedNum).toString();
		return generatedReturn;
	}
}

/* *
 * description: gets the spoken output when the user looses
 * parameters: givenExpectedNum, the expected number as the game progresses, used to output 
 * correct answer, and givenTheme, the selected game theme
 * returns: a variable that holds just a string and mp3 sound assets 
 * */
function getSpeakOutputForLoss(givenExpectedNum) {
	const generatedReturn = constants.LOOSE + "I’m sorry, the correct response was " + determineFizzBuzz(givenExpectedNum) + constants.LOOSE_MESSAGE;
	return generatedReturn;
}

/* *
 * description: this function determines the correct output (fizz or buzz or fizz buzz or a number) based on the the given number
 * parameters: givenNum, the number that will be processed
 * returns: either fizz, buzz, fizz buzz, or the number depending on the expected number
 * */
function determineFizzBuzz(givenNum) {
	if(givenNum % 3 === 0 && givenNum % 5 !== 0) { // if this is multiple of 3 and not 5, output fizz
		return "fizz";
	} else if(givenNum % 5 === 0 && givenNum % 3 !== 0) { // if this is multiple of 5 and not 3, output buzz
		return "buzz";
	} else if(givenNum % 3 === 0 && givenNum % 5 === 0) { // if this is multiple of 3 and 5, output fizz buzz
		return "fizz buzz";
	} else { // output the number
		return givenNum;
	}
}
/* *
 * description: checks if a given number is an integer data type and returns true if it is
 * parameters: givenNum, the number that will be processed 
 * returns: a boolean 
 * */
function isInt(givenNum) {
	if(givenNum === parseInt(givenNum, 10)) {
		return true;
	} else {
		return false;
	}
}
/* *
 * description: checks if a given slot value is a valid option and returns true if it is
 * parameters: givenInputNum, givenInputFizz, givenInputBuzz, givenInputFizzBuzz, these are all the slot values
 * returns: a boolean 
 * */
function isOption(givenInputNum, givenInputFizz, givenInputBuzz, givenInputFizzBuzz) {
	if(isInt(givenInputNum) === false && givenInputFizz !== "fizz" && givenInputBuzz !== "buzz" && givenInputFizzBuzz !== "fizzbuzz" && givenInputFizzBuzz !== "fizz buzz") {
		return true;
	} else {
		return false;
	}
}
// exports
module.exports = {
	getSpeakOutputForLevel: getSpeakOutputForLevel,
	getSpeakOutputForLoss: getSpeakOutputForLoss,
	determineFizzBuzz: determineFizzBuzz,
	isOption: isOption
};