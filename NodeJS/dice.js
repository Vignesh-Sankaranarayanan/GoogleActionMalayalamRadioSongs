'use strict'
process.env.DEBUG = 'actions-on-google:*';
const Assist = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
function ranNum(faces)
{
	 return Math.floor(Math.random() * (faces)) + 1;
}
exports.assistantcodelab = functions.https.onRequest((request, response) => 
{
	const app = new Assist({request: request, response: response});
	let actionMap = new Map();
	actionMap.set('dice.output', diceIntent);
	app.handleRequest(actionMap);
	function diceIntent(app)
	{
		let face = app.getArgument('number');
		let faces= parseInt(face);
		var randomNum = ranNum(faces);
		var string = randomNum.toString();
		app.tell(string);
	}
});