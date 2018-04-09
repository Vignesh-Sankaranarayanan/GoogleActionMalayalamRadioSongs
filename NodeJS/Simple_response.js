'use strict'
const Assist = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions')
exports.assistantcodelab = functions.https.onRequest((request,response)=>
{
	const app = new Assist({request:request,response:response});
	let actionMap = new Map();
	actionMap.set('input.welcome',welcomeIntent);
	app.handleRequest(actionMap);
	function welcomeIntent(app)
	{
		app.tell('this response is sent back from our webhook');
	}
});

