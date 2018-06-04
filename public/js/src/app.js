'use strict';

/* -------------------------------------------------------------------
Copyright (c) 2017-2017 Hexaware Technologies
This file is part of the Innovation LAB - Offline Bot.
------------------------------------------------------------------- */

define(['jquery', 'settings', 'apiService', 'utils'], function ($, config, apiService, utils) {

	$(function () {

		let inputArr = [];
		$("a#google_oauth_login").click(function () {
			const remote = require('electron').remote;
			const BrowserWindow = remote.BrowserWindow
			var win1 = new BrowserWindow({ width: 800, height: 600, frame: false });

		});

		function sendMessage(refr, ev, refs) {
			var text = refr.val() || refs;
			if (text !== "") {
				refr.val('');

				//Calling ApiaiService call
				processor.askBot(text, function (error, html) {
					if (error) {
						alert(error); //change into some inline fancy display, show error in chat window.
					}
					if (html) {
						if (msg_container.hasClass('hidden')) { // can be optimimzed and removed from here
							msg_container.siblings("h1").addClass('hidden');
							msg_container.siblings("div").addClass('hidden');
							msg_container.removeClass('hidden');
						}
						msg_container.append(html);
						utils.scrollSmoothToBottom($('div.chat-body'));
						//renderButton();
					}
				});
				ev.preventDefault();
			}
		}
		var chatKeyPressCount = 0;

		if (config.accessToken && config.chatServerURL) {
			var processor = apiService();
		}

		if (!processor) {
			throw new Error("Message processing manager is not defined!");
		}

		// $("button").on('click', ".apiMultipleQuickreplybtnPayload", function (e) {
		// 	alert('sss');
		// 	$(this).toggleClass("active");
		// });
		// $("button").on('click', function (e) {
		// 	alert('sss');
		// 	$(this).toggleClass("active");
		// });

		var msg_container = $("ul#msg_container");
		console.log('OOOO ', msg_container);
		if (msg_container.find('li').length == 0) {
			msg_container.siblings("h1").removeClass('hidden');
		} else {
			msg_container.siblings("h1").addClass('hidden');
			msg_container.removeClass('hidden');
		}
		$("a#btn-send-message").click(function (e) {
			sendMessage($("#btn-input"), e);
			$(".emoji-wysiwyg-editor").html('');
		});
		// //Chatbox Send message
		// $("#btn-input").keypress(function (e) {
		// 	console.log('POLL', $('#btn-input').val());
		// 	if (e.which == 13) {

		// 		sendMessage($(this), e);
		// 		$(".emoji-wysiwyg-editor").html('');
		// 	}
		// });

		$("div.emoji-wysiwyg-editor").keypress(function (e) {
			if (e.which == 13) {
				$('.emoji-wysiwyg-editor').val($('.emoji-wysiwyg-editor').html());
				sendMessage($('.emoji-wysiwyg-editor'), e);
				$(".emoji-wysiwyg-editor").html('');
			}
		});

		$(document).on('click','.pdfClass', function(e){
			
			//alert($(parent.document).find("body div#fundModal").html());
			//console.log('POL ', $(parent.document).find("div#fundModal"));
			//$("#fundModal").modal('show');
			$(parent.document).find("body div#fundModal").modal('show');
			//$("a.pdfClass").hide();
			//e.preventDefault();
			
		});
		
		//Quick Replies payload button Click
		$(document).on('click', '.QuickreplybtnPayload', function (e) {
			var payloadInput = $(this).data().quickrepliespayload;
			processor.askBot(payloadInput, function (error, html) {
				if (error) {
					console.log("error occured while processing your Request") //change into some inline fancy display, show error in chat window.
				}
				if (html) {
					msg_container.append(html);
					utils.scrollSmoothToBottom($('div.chat-body'));
				}
			});
			e.preventDefault();
		});

		$(document).on('click', '.cardresponsepayload', function (e) {
			var payloadInput = $(this).data().cardpayloadbutton;
			processor.askBot(payloadInput, function (error, html) {
				if (error) {
					console.log("error occured while processing your Request") //change into some inline fancy display, show error in chat window.
				}
				if (html) {
					msg_container.append(html);
					utils.scrollSmoothToBottom($('div.chat-body'));
				}
			});

			e.preventDefault();
		});

		$(document).on('click', '.caroselresponsepayload', function (e) {
			var payloadInput = $(this).data().carouselpayloadbutton;
			console.log('Button Payload' + payloadInput);

			processor.askBot(payloadInput, function (error, html) {
				if (error) {
					console.log("error occured while processing your Request") //change into some inline fancy display, show error in chat window.
				}
				if (html) {
					msg_container.append(html);
					utils.scrollSmoothToBottom($('div.chat-body'));

				}
			});

			e.preventDefault();

		});

		$(document).on('click', '.apiQuickreplybtnPayload', function (e) {
			var payloadInput = $(this).data().apiquickrepliespayload;

			$('.apiQuickreplybtnPayload').hide();
			processor.askBot(payloadInput, function (error, html) {
				if (error) {
					console.log("error occured while processing your Request") //change into some inline fancy display, show error in chat window.
				}
				if (html) {
					msg_container.append(html);
					utils.scrollSmoothToBottom($('div.chat-body'));
				}
			});

			e.preventDefault();
		});

		$(document).on('click', '.apiMultipleQuickreplybtnPayload', function (e) {

			var payloadInput = $(this).data().apimultiplequickrepliespayload;
			if (inputArr.indexOf(payloadInput) == -1) {
				inputArr.push(payloadInput);
			} else {
				inputArr.splice(inputArr.indexOf(payloadInput), 1);
			}
			console.log('OKOK ', inputArr);
			e.preventDefault();
		});

		$(document).on('click', '.multiple-click', function (r) {

			$('.apiMultipleQuickreplybtnPayload').hide();
			$('.multiple-click').hide();
			processor.askBot(inputArr.toString(), function (error, html) {
				if (error) {
					console.log("error occured while processing your Request") //change into some inline fancy display, show error in chat window.
				}
				if (html) {
					msg_container.append(html);
					utils.scrollSmoothToBottom($('div.chat-body'));
				}
			});

		});

		$(document).on('click', function (e) {
			$('[data-toggle="popover"],[data-original-title]').each(function () {
				//the 'is' for buttons that trigger popups
				//the 'has' for icons within a button that triggers a popup
				if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {                
					(($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
				}
			});
		});

	});

});
