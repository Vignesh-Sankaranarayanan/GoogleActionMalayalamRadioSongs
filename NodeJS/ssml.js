'use strict'
process.env.DEBUG = 'actions-on-google:*';
const Assist = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');
const WELCOME_INTENT = 'input.ssml';

exports.assistantcodelab = functions.https.onRequest((request, response) => 
{
    const app = new Assist({request: request, response: response});
    let actionMap = new Map();
    actionMap.set(WELCOME_INTENT, welcomeIntent);
	app.handleRequest(actionMap);
    function welcomeIntent (app) 
	{
        app.tell("<speak>these are <say-as interpret-as='characters'>SSML</say-as> examples."
		+"I can speak in cardinal<say-as interpret-as='cardinal'>198</say-as>and "
		+"I can speak in ordinals<say-as interpret-as='ordinal'>567</say-as>"
		+"and also in digits<say-as interpret-as='characters'>234</say-as>."
		+"A paragraph as two sentences."
		+"<p><s>this is one</s><s>this is two</s></p>."
		+"I can also play sounds<audio src = 'https://actions.google.com/sounds/v1/animals/bee_buzz.ogg'></audio>."
		+"</speak>");
	}
});