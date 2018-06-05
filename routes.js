var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require("fs");
var request = require('request');
var path = require("path");
var config = require("./config");
var mail = require('./utilities/mail');

//var Authentication = require('./utilities/Authentication');


//const sendOtp 		= new SendOtp('209393AILCgzYm2m675acd86a1');
router.get('/', function (req, res) {
	console.log('hari');
	res.redirect("/home.html");
});

router.get('/chat', function (req, res) {
	res.redirect('/chat.html');
});

router.post('/dialogflowAPI', function (req, res) {
	var options = {
		method: 'POST',
		url: config.dialogflowAPI,
		headers: {
			"Authorization": "Bearer " + config.accessToken
		},
		body: req.body,
		json: true
	};
	request(options, function (error, response, body) {
		if (error) {
			res.json({ error: "error in chat server api call" }).end();
		} else {
			
			if(body.result && body.result.action && body.result.action=='discount.discount-custom'){

				let resolvedQuery = body.result.resolvedQuery;
				let count = resolvedQuery.split(',').length;

				if(count <4){
					body.result.fulfillment.messages[0].speech = body.result.fulfillment.messages[0].speech.replace('2  coverage', count+' coverage')
					body.result.fulfillment.messages[2].speech = '<a class="pdfClass" data-toggle="modal" data-target="#fundModal">Click here</a> to refer the discount chart for more details'
				} else {
					body.result.fulfillment.messages[1].speech = "We already offering an exciting <b>20% discount</b> for a minimum of <b>4 coverage</b> sections";
					body.result.fulfillment.messages.splice(0,1);
					body.result.fulfillment.messages[1].speech = '<a class="pdfClass" data-toggle="modal" data-target="#fundModal">Click here</a> to refer the discount chart for more details'
				}
				res.json(body).end();
			} else if(body.result && body.result.action && body.result.action == "selectDeductible" || body.result && body.result.action && body.result.action == "others"){
				body.result.fulfillment.messages[0].speech = body.result.fulfillment.messages[0].speech.replace('Click here', '<a>Click here</a>')
				res.json(body).end();
			}
			// } else if(body.result && body.result.action && body.result.action =="riskClass"){
				
			// 	let riskClass = body.result.parameters && body.result.parameters.RiskClass ? body.result.parameters.RiskClass : "Candy Manufacturing Business";
			// 	console.log('YEAH', riskClass, body.result.parameters);
			// 	if(riskClass){

			// 		var options = {
			// 			method: 'GET',
			// 			url: "http://10.76.1.53:7999/aa/industry?industryCode="+ riskClass,
			// 			headers: {
			// 			},
			// 			body: {},
			// 			json: true
			// 		};
			// 		request(options, function (error, response, responseBody) {
			// 			if (error) {
			// 				console.log('ERROR IN GUIDEWIRE API CALL');
			// 				res.json(body).end();
			// 			} else {
			// 				console.log('SUCCESS IN GUIDEWIRE API CALL', response, responseBody);
			// 				if(responseBody && responseBody.description){
			// 					body.result.fulfillment.messages[0].speech = body.result.fulfillment.messages[0].speech.replace('Candy & Confectionery Products Manufacturing', responseBody.description);
			// 				}
			// 				res.json(body).end();
			// 			}
			// 		});					
			// 	} else {
			// 		res.json(body).end();
			// 	}
			// } 
			else{
				res.json(body).end();
			}
		}
	});
});


router.post('/botHandler',/*Authentication.SetRealm('botHandler'), Authentication.BasicAuthentication, */function (req, res) {
	//console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
	console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
	var intentName = req.body.result.metadata.intentName;
	switch (intentName) {
		case 'easyQuote': func = easyQuote; break;
		case 'feedBackOptionsIntent': func = feedBackOptionsIntent; break;
		case 'feedBackNoIntent': func = feedBackNoIntent; break;
	}
	func(req.body)
		.then((resp) => {
			console.log(resp);
			res.json(resp).end();
		})
		.catch((err) => {
			res.json(err).end();
		});
});

module.exports = router;