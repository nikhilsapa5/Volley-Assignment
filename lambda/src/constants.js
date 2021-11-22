// Contains the constants that are referenced in different parts of the Alexa skill

// messages
const INSTRUCTIONS = 'We’ll each take turns counting up from one. \
                    However, you must replace numbers divisible by 3 with the word “fizz” \
                    and you must replace numbers divisible by 5 with the word “buzz”. \
                    If a number is divisible by both 3 and 5, you should instead say “fizz buzz”. \
                    If you get one wrong, you lose.';
const REPROMPT_MESSAGE = '. I am going to close soon. Please respond.';
const LOOSE_MESSAGE = '. You lose! Thanks for playing Fizz Buzz. \
                    For another great Alexa game, check out Song Quiz!';

//audios                    
const START = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Moral+Combat/Start1.mp3" />';
const LOOSE = '<audio src="https://alexa-skill-audio-assets.s3.amazonaws.com/Generic/Loose1.mp3" />';


// exports
module.exports = {
	INSTRUCTIONS: INSTRUCTIONS,
	REPROMPT_MESSAGE: REPROMPT_MESSAGE,
	LOOSE_MESSAGE: LOOSE_MESSAGE,
	START: START,
	LOOSE: LOOSE
};