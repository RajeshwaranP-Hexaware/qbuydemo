module.exports = {	
	accessToken: "aa3c4bf166e14cdbaa1d46d3a3fbe4b4",
    dialogflowAPI : "https://api.api.ai/v1/query?v=20150910",
	mailContent:`<div>Hi,</div><div style='margin-left:10px;margin-bottom:5px'>Greetings from TTC!!!</div><center><b>Package info</b>: <i>WONDERS OF ITALY *NEW* - 11 DAYS, 9 CITIES</i></center><center style='padding-top:5px'><img src='cid:italy@img' alt='Wonders-Italy' height='160' width='160' align='middle'></center><div style='margin-top:15px;'><b>ABOUT THIS TRIP</b></div><div>Pay tribute to the extraordinary masterpieces of Italy's greats - the captivating arias of Puccini and splendour of da Vinci, Michelangelo and Botticelli's talents in their full glory throughout this enduring exploration of Italy's alluring art, architecture and old-world charm. See the city of one hundred churches, the imposing towers of picturesque San Gimignano and the seas of pastel pinks, yellows and blues that cling dramatically to the Cinque Terre's Ligurian cliffs.</div><center style='padding-top:10px'><img src='cid:italyPackage@img' alt='Wonders-package' align='middle'></center> <center><div style='padding-top:10px'><b>Duration:</b> 11 days | <b>From:</b> US$2655 per person</div><div style='padding-top:20px'><a style='background-color:#b11116;color: white; font-family: serif;padding: 10px;text-decoration: none;' href='https://www.trafalgar.com/en-sg/tours/wonders-of-italy/summer-2018' target='_blank'>View trip details ❯ </a></div></center><div style='padding-top:15px'>Regards,</div><div>TTC Team</div>`,
	mailAttachments: [{
        filename: 'italy-wonders.png',
        path: './public/images/italy-wonders.png',
	//content:fs.createReadStream('./public/images/italy-wonders.png'),
        cid: 'italy@img' //same cid value as in the html img src
    },
				     {
        filename: 'italy-package.PNG',
        path: './public/images/italy-package.PNG',
	//content:fs.createReadStream('./public/images/italy-wonders.png'),
        cid: 'italyPackage@img' //same cid value as in the html img src
    }]
}

