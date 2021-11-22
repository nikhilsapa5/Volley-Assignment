// Contains all the default intents
const Alexa = require('ask-sdk-core');
const helperFunctions = require('./helperFunctions');
const constants = require('./constants');

// invoked at launch of skill
const LaunchRequestHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
        },
        
		async handle(handlerInput) {
		    const attributesManager = handlerInput.attributesManager; // stores the attributes manager
            const attributes = await attributesManager.getPersistentAttributes() || {}; // get persistent attributes from database
            const counter = attributes.hasOwnProperty('expectedNum')? attributes.expectedNum : 0; // get specific attributes from database
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var expectedNum = 1; // expected number keeps track of the game
			var lostNumber = counter; // copying counter to a variable
			const speakOutput = helperFunctions.getSpeakOutputForLevel(expectedNum, counter); // this is what the user will hear
			var generatedReturn = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // return output
			sessAttr.repeat = generatedReturn; // updates the repeat value in the session attributes
			sessAttr.expectedNum = expectedNum; // updates the expected number in the session attributes
			sessAttr.lostNumber = lostNumber; // stores the previously lost number in the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets session attributes
			return generatedReturn;
		}
};

//SessionEndedRequest notifies that a session was ended.
const SessionEndedRequestHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
        },
        
		handle(handlerInput) {
			console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var generatedReturn = handlerInput.responseBuilder.speak("ending session").getResponse(); // generates an return output
			sessAttr = null; // clears the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets the session attributes
			return generatedReturn;
		}
};

// this handles errors that occur
const ErrorHandler = {
	canHandle() {
			return true;
        },
        
		handle(handlerInput, error) {
			const speakOutput = 'Sorry, I had trouble doing what you asked. The error message is ' + error.message + ' Please contact someone at Volley about this and try again.';
			console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var generatedReturn = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // generates an return output
			sessAttr.repeat = generatedReturn; // updates the repeat value in the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets the session attributes
			return generatedReturn;
		}
};

// exports
module.exports = {
	LaunchRequestHandler: LaunchRequestHandler,
	SessionEndedRequestHandler: SessionEndedRequestHandler,
	ErrorHandler: ErrorHandler
};