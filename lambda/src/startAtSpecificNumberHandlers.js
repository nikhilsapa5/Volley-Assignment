// Ability of a skill to start game at a particular number mentioned by user 
const Alexa = require('ask-sdk-core');
const helperFunctions = require('./helperFunctions');
const constants = require('./constants');

// handles game when user wants to start at a specific number
const StartAtSpecificNumberHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartAtSpecificNumber';
        },
        
		handle(handlerInput) {
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var expectedNum = sessAttr.number; // expected number keeps track of the game
			const inputNum = handlerInput.requestEnvelope.request.intent.slots.num.value; // stores the slot value
			expectedNum = inputNum; // copying the slot value into session attribute
			const speakOutput = helperFunctions.getSpeakOutputForLevel(expectedNum); // this is what the user will hear
			var generatedReturn = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // return output
			sessAttr.repeat = generatedReturn; // updates the repeat value in the session attributes
			sessAttr.expectedNum = expectedNum; // updates the expected number in the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets session attributes
			return generatedReturn;
		}
};

// exports
module.exports = {
	StartAtSpecificNumberHandler: StartAtSpecificNumberHandler,
};