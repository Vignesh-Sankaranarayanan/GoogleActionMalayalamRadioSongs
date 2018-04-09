'use strict'
const Assist = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');
exports.assistantcodelab = functions.https.onRequest((request,response)=>
{
	const app = new Assist({request:request,response:response});
	const actionMap = new Map();
	actionMap.set('input.welcome',welcomeIntent);
	actionMap.set('input.add',addIntent);
	actionMap.set('input.subtract',subIntent);
	app.handleRequest(actionMap);
	function welcomeIntent(app)
	{
		app.tell('This is a response sent backk from the webhook');
	}
	function addIntent(app)
	{
		var n1 = app.getArgument('numberOne');
		var n2 = app.getArgument('numberTwo');
		var num1 = parseInt(n1,10);
		var num2 = parseInt(n2,10);
		var result = num1+num2;
		app.tell('The sum  of the two nuumbers is ' + result);
	}
	function subIntent(app)
	{
		var n1 = app.getArgument('numOne');
		var n2 = app.getArgument('numTwo');
		var num1 = parseInt(n1,10);
		var num2 = parseInt(n2,10);
		var result = num1 - num2;
		app.tell('the difference between the two numbers is ' + result);
	}
});







