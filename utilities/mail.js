var nodemailer 	= require('nodemailer');
var fs 			= require('fs');
var path		= require('path');	
var mailer = {
	sendMail:function(toAddress, mainContent, mailAttachment){
		return new Promise(function(resolve, reject){
			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'hexatestmailer@gmail.com',
					pass: 'a###W14&$'
				}
			});			
			var mailOptions = {
			  from: 'hexatestmailer@gmail.com',
			  to: toAddress,
			  subject: 'Package Details',
			  html: mainContent,	
			  attachments:mailAttachment
			};

			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					console.log(error);
					reject(error);
				} else {
					console.log(info.response);
					resolve(info.response);
				}
			});
		});
	}	

}

module.exports = mailer;

