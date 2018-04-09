'use strict'
var fan = 'off';
var light = 'off';
const Assist = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');
exports.assistantcodelab = functions.https.onRequest((request,response)=>
{
	const app = new Assist({request:request,response:response});
	const actionMap = new Map();
	actionMap.set('input.welcome',welcomeIntent);
	actionMap.set('input.add',addIntent);
	actionMap.set('input.subtract',subIntent);
	actionMap.set('input.lighton',lightonIntent);
	actionMap.set('input.lightoff',lightoffIntent);
	actionMap.set('input.fanon',onIntent);
	actionMap.set('input.fanoff',offIntent);
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
		console.log(num1 + typeof(num1));
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
	function lightonIntent(app)
	{
		if (light == 'off')
		{
			app.ask('the light is switched on');
			light = 'on';
		}
		else
		{
			app.ask('light is already on');
		}
	}
	function lightoffIntent(app)
	{
		if(light == 'on')
		{
			app.ask('the light is switched off');
			light = 'off';
		}
		else
		{
			app.ask('the light is already off');
		}
	}
	function onIntent(app)
	{
		
		if (fan == 'off')
		{
			app.ask('the fan is switched on');
			fan = 'on';
		}
		else
		{
			app.ask('the fan is already on');
		}
	}
	function offIntent(app)
	{
		if (fan == 'on')
		{
			app.ask('the fan is switched off');
			fan = 'off';
		}
		else
		{
			app.ask('the fan is already off');
		}		
	}
	
});

















