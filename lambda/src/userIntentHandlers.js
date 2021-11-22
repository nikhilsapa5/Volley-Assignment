// Handles the user's turn in the game
const Alexa = require('ask-sdk-core');
const constants = require('./constants');
const helperFunctions = require('./helperFunctions');

// handles the user's turn which can be a number, fizz, buzz, or fizzbuzz
const UserIntentHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'UserIntent';
        },
        
		async handle(handlerInput) {
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var expectedNum = sessAttr.expectedNum; // track of the current turn
			var speakOutput; // this is what the user will hear
			
			const inputNum = parseInt(Alexa.getSlotValue(handlerInput.requestEnvelope, 'number'), 10);
			const inputFizz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fizz');
			const inputBuzz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'buzz');
			const inputFizzBuzz = Alexa.getSlotValue(handlerInput.requestEnvelope, 'fizzbuzz');
            const inputString = inputFizz || inputBuzz || inputFizzBuzz || undefined; // determine which non-number slot type is used if any
            
			// handle unknowns
			if(helperFunctions.isOption(inputNum, inputFizz, inputBuzz, inputFizzBuzz, inputFizzBuzz)) {
				speakOutput = "I did not understand your response. Please say a number, fizz, buzz, or fizzbuzz to continue with the game.";
				generatedReturn = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // return output
				sessAttr.repeat = generatedReturn; // updates repeat value in the session attributes
				return generatedReturn;
			} else { // it is a valid option
				expectedNum++; // increment expectedNum so that the value matches the user and continues the game's progression
            		}
            
			// handle the given slot
			if((inputNum === helperFunctions.determineFizzBuzz(expectedNum)) || inputString === helperFunctions.determineFizzBuzz(expectedNum)) { // check if the user's input is correct by seeing if inputNum (number slot type) equals expectedNum or the inputString equals correct string for expectedNum
				expectedNum++;
				speakOutput = helperFunctions.getSpeakOutputForLevel(expectedNum);
				
				var generatedReturn = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // return output
				
				sessAttr.repeat = generatedReturn; // updates the repeat value in the session attributes
				sessAttr.expectedNum = expectedNum; //updates the expected number in the session attributes
				handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets the session attributes
				return generatedReturn;
			} // handle wrong answer
			else {
		        const attributesManager = handlerInput.attributesManager; // get attributes manager
			    let attributes = {"expectedNum":expectedNum}; // stores expectedNum into database
			    attributesManager.setPersistentAttributes(attributes); // sets persistant attributes
                await attributesManager.savePersistentAttributes(); // saves persistant attribytes to database
				speakOutput = helperFunctions.getSpeakOutputForLoss(expectedNum);
				sessAttr = null; // clears the session because game is over
				handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets the session attributes
				return handlerInput.responseBuilder.speak(speakOutput).getResponse();
			}
		}
};

// exports
module.exports = {
	UserIntentHandler: UserIntentHandler
};