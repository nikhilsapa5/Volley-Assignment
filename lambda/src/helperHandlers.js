// Contains the helper handlers that are used in different parts of the Alexa skill
const Alexa = require('ask-sdk-core');
const constants = require('./constants');
const helperFunctions = require('./helperFunctions');

// Invoked by saying saying help and other similar utterances 
const HelpIntentHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
        },
        
		handle(handlerInput) {
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			var expectedNum = sessAttr.expectedNum; // holds the session's expected number
			const speakOutput = 'The instructions are: ' + constants.INSTRUCTIONS + ' The last response was ' + helperFunctions.determineFizzBuzz(expectedNum) + '. OK, it is your turn, let\'s continue. '; // holds what the user will hear
			var generatedReturn = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // generates an return output
			sessAttr.repeat = generatedReturn; // updates repeat value in the session attributes
			sessAttr.expectedNum = expectedNum; // updates the expected number in the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets session attributes
			return generatedReturn;
		}
};

// handles when the user repeats; invoked by saying saying repeat and other similar utterances 
const RepeatIntentHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
        },
        
		handle(handlerInput) {
            var attributes = handlerInput.attributesManager.getSessionAttributes(); // gets the session attributes
            
			if(attributes.repeat !== null) { // checks is repeat value is not null
				return attributes.repeat; // returns the session's repeat value, similar to if triggered by an intent
			} else { // there is nothing to repeat
				attributes.repeat = handlerInput.responseBuilder.speak("Hey, there's nothing to repeat. It is your turn, let's continue.").getResponse();
				handlerInput.attributesManager.setSessionAttributes(attributes);
				return attributes.repeat;
			}
		}
};

// handles when the user ends the game; invoked by saying saying stop and other similar utterances 
const CancelAndStopIntentHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
        },
        
		handle(handlerInput) {
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
			const speakOutput = "That's a tie! Thanks for playing Fizz Buzz game. For another great Alexa game, \
                            check out Song Quiz!"; // this is what the user will hear
			var generatedReturn = handlerInput.responseBuilder.speak(speakOutput).getResponse(); // generates an return output
			sessAttr = null; // clears the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets the session attributes
			return generatedReturn;
		}
};

// exports
module.exports = {
	HelpIntentHandler: HelpIntentHandler,
	RepeatIntentHandler: RepeatIntentHandler,
	CancelAndStopIntentHandler: CancelAndStopIntentHandler
};