'use strict'
var fan = 'off';
var light = 'off';
const Assist = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
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
	actionMap.set('input.ssml',ssml);
	actionMap.set('input.rich',rich);
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
			app.tell('the light is switched on');
			light = 'on';
		}
		else
		{
			app.tell('light is already on');
		}
	}
	function lightoffIntent(app)
	{
		if(light == 'on')
		{
			app.tell('the light is switched off');
			light = 'off';
		}
		else
		{
			app.tell('the light is already off');
		}
	}
	function onIntent(app)
	{
		
		if (fan == 'off')
		{
			app.tell('the fan is switched on');
			fan = 'on';
		}
		else
		{
			app.tell('the fan is already on');
		}
	}
	function offIntent(app)
	{
		if (fan == 'on')
		{
			app.tell('the fan is switched off');
			fan = 'off';
		}
		else
		{
			app.tell('the fan is already off');
		}		
	}
	function ssml(app)
	{
		app.tell('<speak>'
		+'here are some <say-as interpret-as="characters">SSML</say-as>examples.'
		+'it can speak in cardinals<say-as interpret-as="cardinals">198</say-as>.'
		+'it can speak in ordinals<say-as interpret-as="ordinals">567</say-as>.'
		+'and it can also speak out in digits<say-as interpret-as="characters">234</say-as>.'
		+'it can speak paragraphs as sentences.'
		+'<p><s>first sentence</s><s>second sentence</s>.'
		+'most of all it can play sounds.'
		+'<audio src = "https://actions.google.com/sounds/v1/ambiences/swoosh.ogg"></audio>.'
		+'</speak>'
		);
	}
	function rich(app)
	{
		app.tell(app.buildRichResponse()
		.addSimpleResponse('this is the simple response')
		.addBasicCard(app.buildBasicCard('Building rich response is this easy and also increases user satisfaction multifold')
		.setTitle('this is the title')
		.addButton('read more','http://makerdemy.com/')
		.setImage('http://makerdemy.com/wp-content/uploads/2016/07/yellow-1.png','Image hovering text')
		));
	}
	
	
});