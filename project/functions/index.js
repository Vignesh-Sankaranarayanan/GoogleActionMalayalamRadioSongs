
'use strict'
const Assist = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions')
var light='off';
var fan='off';
exports.assistantcodelab = functions.https.onRequest((request,response)=>
{
	const app = new Assist({request:request,response:response});
	let actionMap = new Map();
	actionMap.set('input.welcome',welcomeIntent);
	actionMap.set('input.addIntent',addIntent);
	actionMap.set('input.subIntent',subIntent);
	actionMap.set('input.fanoff',fanoffIntent);
	actionMap.set('input.fanon',fanonIntent);
	actionMap.set('input.lightoff',lightoffIntent);
	actionMap.set('input.lighton',lightonIntent);
	actionMap.set('input.ssml',ssml);
	actionMap.set('input.rich',rich);
	actionMap.set('input.resume',resume);
	actionMap.set('input.stop',stop);
	app.handleRequest(actionMap);
	function welcomeIntent(app)
	{
		app.ask('Welcome ,Are you ready to listen to malayalam radio? Say Yes or No');
		
	}
	function addIntent(app){

		var n1=app.getArgument("numberone");
		var n2=app.getArgument("numbertwo");
		var num1=parseInt(n1,10);
		var num2=parseInt(n2,10);
		var result=num1+num2;
		app.tell("The sum of the numbers "+n1+"and"+n2+"is"+result);
	}

	function subIntent(app){

		var n1=app.getArgument("numberone");
		var n2=app.getArgument("numbertwo");
		var num1=parseInt(n1,10);
		var num2=parseInt(n2,10);
		var result=num1-num2;
		app.tell("The subtraction of the numbers "+n1+"and"+n2+"is"+result);
	}

	function lightonIntent(app){

		if(light=='off'){
			app.tell("The light is switched on");
			light='on';

		}
		else{
			app.tell("The light is already on");
		}
		
	}

	function lightoffIntent(app){

		if(light=='on'){
			app.tell("The light is switched off");
			light='off';

		}
		else{
			app.tell("The light is already off");
		}
		
	}

	function fanoffIntent(app){

		if(fan=='on'){
			app.tell("The fan is switched off");
			fan='off';

		}
		else{
			app.tell("The fan is already off");
		}
		
	}

	function fanonIntent(app){

		if(fan=='off'){
			app.tell("The fan is switched on");
			fan='on';

		}
		else{
			app.tell("The fan is already on");
		}
		
	}
function ssml(app){
	app.tell("<speak>these are <say-as interpret-as='characters'>SSML</say-as> examples."
		+"I can speak in cardinal<say-as interpret-as='cardinal'>198</say-as>and "
		+"I can speak in ordinals<say-as interpret-as='ordinal'>567</say-as>"
		+"and also in digits<say-as interpret-as='characters'>234</say-as>."
		+"A paragraph as two sentences."
		+"<p><s>this is one</s><s>this is two</s></p>."
		+"I can also play sounds<audio src = 'https://actions.google.com/sounds/v1/animals/bee_buzz.ogg'></audio>."
		+"</speak>");
}
function rich(app)
	{
		app.ask(app.buildRichResponse()
		.addSimpleResponse('Playing Malayalam Radio, Enjoy!!!')
  .addMediaResponse(app.buildMediaResponse()
  .addMediaObjects([
    app.buildMediaObject("Song One", "http://178.32.107.151:5116/stream")
      .setDescription("Song One with description and large image.") // Optional
      .setImage("https://upload.wikimedia.org/wikipedia/commons/c/cb/Mohanlal_Viswanathan_Nair_BNC.jpg", app.Media.ImageType.LARGE)
        // Optional. Use app.Media.ImageType.ICON if displaying icon.
  ])
)
.addSuggestions(["other songs"]));
	}


function resume(app)
	{
		app.ask(app.buildRichResponse()
		.addSimpleResponse('Resume the radio!!!')
  .addMediaResponse(app.buildMediaResponse()
  .addMediaObjects([
    app.buildMediaObject("Song One", "http://178.32.107.151:5116/stream")
      .setDescription("Song One with description and large image.") // Optional
      .setImage("https://upload.wikimedia.org/wikipedia/commons/c/cb/Mohanlal_Viswanathan_Nair_BNC.jpg", app.Media.ImageType.LARGE)
        // Optional. Use app.Media.ImageType.ICON if displaying icon.
  ])
)
.addSuggestions(["other songs"]));
	}

	function stop(app)
	{
		app.ask({
			speech: 'Thanks,have a great day!!!If you want to resume the play, say Resume',
			displayText: 'Thanks,have a great day!!!If you want to resume the play, say Resume'
		  });
	}


});