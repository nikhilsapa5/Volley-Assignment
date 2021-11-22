// Deletes historical data of the Alexa Skill
const Alexa = require('ask-sdk-core');
const helperFunctions = require('./helperFunctions');
const constants = require('./constants');

// handles game when user wants to delete the historial data
const DeleteHistoryHandler = {
	canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DeleteHistory';
        },
        
		async handle(handlerInput) {
			var sessAttr = handlerInput.attributesManager.getSessionAttributes(); // stores the session attributes
            sessAttr.lostNumber = 0; // Assign 0 to session attribute
            const attributesManager = handlerInput.attributesManager; // get attributes manager
		    let attributes = {"expectedNum":0}; // assigns value 0 to epectedNum in database
		    attributesManager.setPersistentAttributes(attributes); // sets persistant attributes
            await attributesManager.savePersistentAttributes(); // saves attributes to database
            const speakOutput = "Historical game records deleted."; // this is what the user will hear
            var generatedReturn = handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput + constants.REPROMPT_MESSAGE).getResponse(); // return output
			sessAttr.repeat = generatedReturn; // updates repeat value in the session attributes
			handlerInput.attributesManager.setSessionAttributes(sessAttr); // sets session attributes
			return generatedReturn;
		}
};

// exports
module.exports = {
	DeleteHistoryHandler: DeleteHistoryHandler,
};