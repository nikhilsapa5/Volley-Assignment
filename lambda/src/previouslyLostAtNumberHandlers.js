// Ability of Alexa skill to tell the user at what number was the game lost previously
const Alexa = require('ask-sdk-core');
const helperFunctions = require('./helperFunctions');
const constants = require('./constants');

// handles game when user wants to know the last number lost
const PreviouslyLostAtNumberHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PreviouslyLostAtNumber';
        },
        
		handle(handlerInput) {
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var lostNumber = sessAttr.lostNumber; // copying session attribute to a local varibale
            const speakOutput = lostNumber !== 0 ? "Previously you lost at " + lostNumber : "I'm sorry, game history is not available.";
			var generatedReturn = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // generates an return output
			sessAttr.repeat = generatedReturn; // updates repeat value in the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets session attributes
			return generatedReturn;
		}
};

// exports
module.exports = {
	PreviouslyLostAtNumberHandler: PreviouslyLostAtNumberHandler,
};