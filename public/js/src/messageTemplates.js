'use strict';

/* -------------------------------------------------------------------
Copyright (c) 2017-2017 Hexaware Technologies
This file is part of the Innovation LAB - Offline Bot.
------------------------------------------------------------------- */
//display: inline-block;




define(["utils", "settings"], function (utils, settings) {

    var methods = {};
    methods.bullets = (data) => {
        var bulletPoints = '';
        if (data.indexOf('>') >= 0) {
            bulletPoints = data.split('>');
            return "<i class='material-icons' style='color: #28a745;font-weight: bold;clear:both;font-size:15px;float:left !important'>check</i>" + bulletPoints.join("<br><i class='material-icons' style='clear:both;color: #28a745;font-weight: bold;float:left !important;font-size:15px'>check</i>");
        } else {
            return data;
        }
    }
    //User Plain Text
    methods.userplaintext = (data) => {

        let html = `<li class="list-group-item background-color-custom">
            <div class="media-left pull-right animated fadeInRight">

            <div class="media-body user-txt-space">
            <img style="border-radius:50%;border:2px solid white;float: right;margin-right: 10px;" width="32" height="32" src='${settings.userAvatar}'/>
            <p class="list-group-item-text-user">${data.payload} <span class="bot-res-timestamp abs">${data.time}</span></p>`;

        // if (data.bottomIcon) {
        //     html += `<p class="user-timestamp"> ${data.time}</p>`;
        // }
        html += `</div></li>`;

        return html;
    }

    //Plain Text Template
    methods.plaintext = (data) => {
        let html = `<li class="list-group-item background-color-custom">
       
        <div class="media-body bot-txt-space animated fadeInLeft">`
        //if (data.responseIndex) {
        html += `<img style="border-radius:50%;border:2px solid white;float: left;margin-right: 10px;" width="32" height="32" src='${settings.botAvatar}'/>
        <p class="list-group-item-text-bot beforeAfter">${data.payload} <span class="bot-res-timestamp abs receiver"> ${data.time}</span></p>`;
        // } else {
        // html += `<img style="border-radius:50%;float: left;margin-right: 10px;" width="40" height="40" src='avatar/blank.ico'/><p class="list-group-item-text-bot">` + methods.bullets(data.payload) + `</p>`;
        // }
       
        // if (data.bottomIcon) {
        // html += `<p class="bot-res-timestamp"> ${data.time}</p>`;
        // }
        html += `</div>
        </li>`;
       
        return html;
    }

    methods.card = (data) => {
        let html;
        let cardButtons = "";
        let cardBody;
        for (let i in data.payload) {
            cardBody = `<li class="list-group-item background-color-custom animated fadeInLeft">
            <div class="pmd-card pmd-card-default pmd-z-depth custom-infocard">
                <!-- Card header -->
                <div class="pmd-card-title">


                </div>`

            if (data.payload[i].imageUrl != "" && data.payload[i].imageUrl != undefined) {
                cardBody += ` <div class="pmd-card-media">
                    <img src="${data.payload[i].imageUrl}" width="1184" height="666" class="img-responsive">
                    </div>`
            }

            cardBody += `<div class="pmd-card-title">
                <h3 class="card-body"><p class="card-title">`+ methods.bullets(data.payload[i].title) + `</p>
                <p class="card-subtitle">`+ methods.bullets(data.payload[i].subtitle) + `</p>
                </div>`

            if (data.buttons && data.payload[i].type == 1) {
                console.log("Buttons" + data);
                cardButtons = `<div class="pmd-card-actions">`
                for (var j = 0; j < data.payload[i].buttons.length; j++) {
                    if (data.payload[i].buttons[j].postback == "other_queries_non_invoice") {
                        cardButtons += `<button type="button"  class="btn btn-primary infocard-btn-custom cardresponsepayload" data-cardpayloadButton = "${data.payload[i].buttons[j].postback}" onClick="window.location.href='https://server.iad.liveperson.net/hc/70994705/?cmd=file&file=visitorWantsToChat&site=70994705&byhref=1&SESSIONVAR!skill=MyRicohSupport&imageUrl=https://server.iad.liveperson.net/hcp/Gallery/ChatButton-Gallery/English/General/1a'; 'height=400,width=600'" >${data.payload[i].buttons[j].text}</button>`
                    }
                    else {
                        cardButtons += ` <button type="button" class="btn btn-primary infocard-btn-custom cardresponsepayload" data-cardpayloadButton = "${data.payload[i].buttons[j].postback}" >${data.payload[i].buttons[j].text}</button>`
                    }

                }
                cardButtons += `</div>`
            }
            html = cardBody + cardButtons + `</div></div>`;
            if (data.bottomIcon) {
                html += `<p class="bot-res-timestamp-card">${data.time}</p>`
            }
            html += `</div></li>`;
        }
        return html;
    }

    methods.quickreplies = (data) => {
        var quickRepliesHtml = `<li class="list-group-item background-color-custom">

        <div class="media-body animated fadeInLeft">`;

        for (let i in data.payload) {


            if (data.payload[i].platform == "facebook") {
                if (data.payload[i].payload.facebook.hasOwnProperty('quick_replies')) {
                    quickRepliesHtml += `<p class="list-group-item-quick-reply-space${data.color}">${data.payload[i].payload.facebook.text}</p><div class="quick-replies-buttons">`;
                    for (var j = 0; j < data.payload[i].payload.facebook.quick_replies.length; j++) {
                        if (data.payload[i].payload.facebook.quick_replies[j].hasOwnProperty('payload')) {
                            quickRepliesHtml += `<button type="button"  class="btn pmd-btn-outline pmd-ripple-effect btn-info QuickreplybtnPayload" data-quickRepliesPayload="${data.payload[i].payload.facebook.quick_replies[j].payload}">${data.payload[i].payload.facebook.quick_replies[j].title}</button>`
                        }
                        else if (data.payload[i].payload.facebook.quick_replies[j].hasOwnProperty('url')) {
                            console.log("URL : " + data.payload[i].payload.facebook.quick_replies[j].url);
                            quickRepliesHtml += `<button type="button"  class="btn pmd-btn-outline pmd-ripple-effect btn-info QuickreplybtnPayload" onClick="window.location.href='${data.payload[i].payload.facebook.quick_replies[j].url}'; 'height=400,width=600'" >${data.payload[i].payload.facebook.quick_replies[j].title}</button>`

                        }
                        else if (data.payload[i].payload.facebook.quick_replies[j].hasOwnProperty('tab')) {
                            console.log("TAB : " + data.payload[i].payload.facebook.quick_replies[j].tab);
                            quickRepliesHtml += `<button type="button"  class="btn pmd-btn-outline pmd-ripple-effect btn-info QuickreplybtnPayload" onClick="window.open('${data.payload[i].payload.facebook.quick_replies[j].tab}','_blank'); " > ${data.payload[i].payload.facebook.quick_replies[j].title}</button>`
                        }
                    }
                }
            }
        }
        quickRepliesHtml += `</div>`;
        if (data.bottomIcon) {
            quickRepliesHtml += `<p class="bot-res-timestamp-qr"> <img style="border-radius:50%;border:2px solid white;" width="32" height="32" src='${settings.botAvatar}'/>${data.time}</p>`;
        }
        quickRepliesHtml += `</div></li>`
        return quickRepliesHtml;
    }

    methods.multiplequickreplyfromapiai = (data) => {
        var apiquickRepliesHtml = `<li class="list-group-item background-color-custom">

        <div class="media-body animated fadeInLeft">`
        let qReply;
        if (data.payload) {
            qReply = data.payload;
        } else {
            qReply = data;
        }
        for (let i in qReply) {
            if (qReply[i].platform == "facebook" && qReply[i].type == "2") {
                if (data.responseIndex) {
                    apiquickRepliesHtml += `<img style="border-radius:50%;border:2px solid white;float: left;margin-right: 10px;" width="32" height="32" src='${settings.botAvatar}'/>`
                    if (qReply[i].title.trim().length) {
                        apiquickRepliesHtml += `<p class="list-group-item-quick-reply-space beforeAfter">${qReply[i].title}</p>`
                    }
                } else {
                    //apiquickRepliesHtml+=	`<img style="border-radius:50%;float: left;margin-right: 10px;" width="40" height="40" src='avatar/blank.ico'/>`
                    if (qReply[i].title.trim().length) {
                        apiquickRepliesHtml += `<img style="border-radius:50%;float: left;margin-right: 10px;" width="40" height="40" src='avatar/blank.ico'/><p class="list-group-item-quick-reply-space">${qReply[i].title}</p>`
                    }

                }
                apiquickRepliesHtml += `<div class="quick-replies-buttons" style="align-items: center;justify-content: center;"  data-toggle="buttons">`
                for (let j = 0; j < qReply[i].replies.length; j++) {
                    apiquickRepliesHtml += `<label class="btn btn-test padding-10px active apiMultipleQuickreplybtnPayload" data-apiMultiplequickRepliesPayload="${qReply[i].replies[j]}">
                    <input type="checkbox" name="options[]" checked="checked" > ${qReply[i].replies[j]}
                </label>`;
                    //apiquickRepliesHtml += `<button type="button" class="btn btn-primary active apiMultipleQuickreplybtnPayload" data-apiMultiplequickRepliesPayload="${qReply[i].replies[j]}"><div class="quick-reply-button-text">${qReply[i].replies[j]}</button>`
                }
                apiquickRepliesHtml += `<button type="button"  class="btn pmd-btn-outline pmd-ripple-effect btn-success .pmd-btn-fab multiple-click"><div class="quick-reply-button-text">Choose</button>`
            }
        }
        apiquickRepliesHtml += `</div>`;
        // if (data.bottomIcon) {
        //     apiquickRepliesHtml += `<p class="bot-res-timestamp-qr"> ${data.time}</p>`;
        // }
        apiquickRepliesHtml += `</div></li>`;
        return apiquickRepliesHtml;
    }

    methods.quickrepliesfromapiai = (data) => {
        
        var apiquickRepliesHtml = `<li class="list-group-item background-color-custom">

        <div class="media-body animated fadeInLeft">`
        // <div class="media-left">
        //     <a href="javascript:void(0);" class="avatar-list-img">
        //     <img class="img-responsive" src="${data.senderAvatar}">
        //     </a>
        // </div>
        // <div class="media-body">
        // <h3 class="list-group-item-heading">${data.senderName}</h3>`;
        let qReply;
        if (data.payload) {
            qReply = data.payload;
        } else {
            qReply = data;
        }

        for (let i in qReply) {
            if (qReply[i].platform == "facebook" && qReply[i].type == "2") {
                if (data.responseIndex) {
                    apiquickRepliesHtml += `<img style="border-radius:50%;border:2px solid white;float: left;margin-right: 10px;" width="32" height="32" src='${settings.botAvatar}'/>`
                    if (qReply[i].title.trim().length) {
                        apiquickRepliesHtml += `<p class="list-group-item-quick-reply-space beforeAfter">${qReply[i].title}</p>`
                    }
                } else {
                    //apiquickRepliesHtml+=	`<img style="border-radius:50%;float: left;margin-right: 10px;" width="40" height="40" src='avatar/blank.ico'/>`
                    if (qReply[i].title.trim().length) {
                        apiquickRepliesHtml += `<img style="border-radius:50%;float: left;margin-right: 10px;" width="40" height="40" src='avatar/blank.ico'/><p class="list-group-item-quick-reply-space">${qReply[i].title}</p>`
                    }

                }
                apiquickRepliesHtml += `<div class="quick-replies-buttons" style="align-items: center;justify-content: center;">`
                console.log('FEDERER ', qReply[i].replies.indexOf("Risk Class"), qReply[i].replies);

                if (qReply[i].replies.indexOf("Risk Class") != -1) {
                    for (let j = 0; j < qReply[i].replies.length; j++) {
                            apiquickRepliesHtml += `<button type="button"  class="btn pmd-btn-outline pmd-ripple-effect btn-info .pmd-btn-fab apiQuickreplybtnPayload" data-apiquickRepliesPayload="${qReply[i].replies[j]}"><img src="./images/queryTypes/${qReply[i].replies[j].replace(/ /g, '')}.svg" class="img-responsive quick-reply-icon"> <div class="quick-reply-button-text">${qReply[i].replies[j]}</div></button>`
                    }
                } else {
                    for (let j = 0; j < qReply[i].replies.length; j++) {
                            apiquickRepliesHtml += `<button type="button"  class="btn pmd-btn-outline pmd-ripple-effect btn-info .pmd-btn-fab apiQuickreplybtnPayload" data-apiquickRepliesPayload="${qReply[i].replies[j]}">${qReply[i].replies[j]}</button>`
                    }
                }
            }
        }
        apiquickRepliesHtml += `</div>`;
        // if (data.bottomIcon) {
        //     apiquickRepliesHtml += `<p class="bot-res-timestamp-qr"> ${data.time}</p>`;
        // }
        apiquickRepliesHtml += `</div></li>`;
        return apiquickRepliesHtml;
    }
    methods.carousel = (data, uniqueId) => {
        var carousel = `<li class="list-group-item background-color-custom animated fadeInLeft">`
        if (data.responseIndex) {
            carousel += `<img style="border-radius:50%;border:2px solid white;float: left;margin-right: 10px;" width="32" height="32" src='${settings.botAvatar}'/><div id="${uniqueId}" class="beforeAfter carousel slide pmd-card pmd-card-default pmd-z-depth carousel-custom" data-ride="false">`
        } else {
            carousel += `<img style="border-radius:50%;float: left;margin-right: 10px;" width="40" height="40" src='avatar/blank.ico'/><div id="${uniqueId}" class="carousel slide pmd-card pmd-card-default pmd-z-depth carousel-custom" data-ride="false">`
        }

        carousel += `<!-- Carousel items -->
            <div class="carousel-inner">`
        var index = 0;

        for (let i in data.payload) {
            if (data.payload[i].type == 1) {

                if (data.action == "SampleInvoiceCarouselIntent") {
                    carousel += `<div class="item ${(index == 0) ? 'active' : ''}">
                    <div class="row">
                        <div class="col-md-12">`

                    if (data.payload[i].imageUrl) {
                        carousel += `<a href="#" id="carousel-thumbnail-modal" class="thumbnail custom-image-wrap">
                                <img data-target="#center-dialog" data-toggle="modal" class="img-circle" src="${data.payload[i].imageUrl}" data-src="${data.payload[i].imageUrl}" alt="Image" style="max-width:100%;">
                            </a><div class="commonHeight"><h3 class="carousel-body" style="margin-top:4px !important"><p class="carousel-title">`+ methods.bullets(data.payload[i].title) + `</p>`
                    } else {
                        carousel += `<div class="commonHeight" style="border-radius:15px;"><h3 class="carousel-body" style="border-radius:15px;margin-top:4px !important"><p class="carousel-title">` + methods.bullets(data.payload[i].title) + `</p>`
                    }
                    if (data.payload[i].subtitle) {
                        carousel += `<p class="carousel-subtitle carouselScrollbar">` + methods.bullets(data.payload[i].subtitle) + `</p></div>`
                    } else {
                        carousel += `</div>`
                    }
                    if (data.buttons && data.payload[i].type == 1) {
                        for (var j = 0; j < data.payload[i].buttons.length; j++) {
                            carousel += `<button type="button" class="btn-carousel btn-info pmd-btn-outline caroselresponsepayload button-custom" data-carouselpayloadButton = "${data.payload[i].buttons[j].postback}" >${data.payload[i].buttons[j].text}</button>`
                        }
                    }
                    carousel += `</div>
                    </div><!--.row-->
                </div> <!--.item-->`;
                    index = 1;
                }
                else {
                    carousel += `<div class="item ${(index == 0) ? 'active' : ''}">
                  <div class="row">
                      <div class="col-md-12">`
                    if (data.payload[i].imageUrl) {
                        carousel += `<a href="#" class="thumbnail custom-image-wrap">
                              <img class="img-circle" src="${data.payload[i].imageUrl}" alt="Image" style="max-width:100%;">
                          </a><div class="commonHeight" style="border-radius: 0px 0px 15px 15px;"><h3 class="carousel-body" style="border-radius: 0px 0px 15px 15px;margin-top:4px !important"><p class="carousel-title">`+ methods.bullets(data.payload[i].title) + `</p>`
                    } else {
                        carousel += `<div class="commonHeight" style="border-radius:15px;"><h3 class="carousel-body" style="border-radius:15px;margin-top:4px !important"> <p class="carousel-title">` + methods.bullets(data.payload[i].title) + `</p>`
                    }

                    if (data.payload[i].subtitle) {
                        carousel += `<p class="carousel-subtitle carouselScrollbar">` + methods.bullets(data.payload[i].subtitle) + `</p>`;
                    }

                    if (data.buttons && data.payload[i].type == 1) {
                        for (var j = 0; j < data.payload[i].buttons.length; j++) {
                            carousel += `<button type="button" class="btn-carousel btn-info pmd-btn-outline caroselresponsepayload button-custom" data-carouselpayloadButton = "${data.payload[i].buttons[j].postback}" >${data.payload[i].buttons[j].text}</button>`
                        }
                    }
                    carousel += `</div></div>
                  </div><!--.row-->
              </div> <!--.item-->`;
                    index = 1;
                }
            }
        }

        carousel += ` </div><!--.carousel-inner-->

		<a data-slide="prev" href="#${uniqueId}" class="left carousel-control custom-carousel-left"><span class="icon-prev" aria-hidden="true"></span>
        <span class="sr-only">Previous</span></a>
		<a data-slide="next" href="#${uniqueId}" class="right carousel-control custom-carousel-right"><span class="icon-next" aria-hidden="true"></span>
        <span class="sr-only">Next</span></a>
	  </div><!--.Carousel--></div>`;
        if (data.bottomIcon) {
            carousel += `<p style="bottom: 10px;" class="bot-res-timestamp-card"> ${data.time}</p>`;
        }
        carousel += `</div></li>`;

        return carousel;
    }

    methods.list = (data) => {
        console.log('in list method', data);
        let html = '';

        let listBody = '<li class="list-group-item background-color-custom animated fadeInLeft">';
        for (let i in data.payload) {

            listBody += `<ul class="list-group pmd-z-depth pmd-list pmd-card-list">`;

            for (let j = 0; j < data.payload[i].payload.facebook.attachment.payload.elements.length; j++) {

                listBody += `<li class="list-group-item">
    
        <a href="#"  class="listresponsepayload"  data = "${data.payload[i].payload.facebook.attachment.payload.elements[j].hasOwnProperty('buttons') ? data.payload[i].payload.facebook.attachment.payload.elements[j].buttons[0].payload : ''}" style="display:block;">
        <div class="media-body">
        <div class="col-xs-9">
            <h3 class="list-group-item-heading">${data.payload[i].payload.facebook.attachment.payload.elements[j].title}</h3>
            <span class="list-group-item-text">${data.payload[i].payload.facebook.attachment.payload.elements[j].subtitle}</span>	
            </div>
            <div class="col-xs-3">
            <img src="${data.payload[i].payload.facebook.attachment.payload.elements[j].image_url}" width="100" height="100" class="img-responsive">
            </div>
         </div>
         </a>
         
    </li>`;
            }
            html += `</ul>`;
            if (data.bottomIcon) {
                html += `<p class="bot-res-timestamp-qr"><img style="border-radius:50%;border:2px solid white;" width="32" height="32" src='${settings.botAvatar}'/>${data.time}</p>`;
            }
            html += `</li>`;
        }
        return listBody + html;
    }
    methods.webview = (data, uniqueId) => {

        let html;
        let cardButtons = "";
        let cardBody;
        cardBody = `<li class="list-group-item background-color-custom animated fadeInLeft">
            <div class="pmd-card pmd-card-default pmd-z-depth custom-infocard">
                <!-- Card header -->
                <div class="pmd-card-title">


                </div>`

        cardBody += `<div class="pmd-card-title">
                <h3 class="card-body"><p class="card-title">${data.payload.text}</p>                
                </div>`

        if (data.payload.buttons) {
            console.log("Buttons" + data);
            cardButtons = `<div class="pmd-card-actions">`
            for (var j = 0; j < data.payload.buttons.length; j++) {
                if (data.payload.buttons[j].postback == "other_queries_non_invoice") {
                    cardButtons += `<button type="button"  class="btn btn-primary infocard-btn-custom cardresponsepayload"  onClick="window.open('http://localhost:3000/"${data.payload.buttons[j].url}"','chat70994705','width=400,height=600,resizable=yes');$('.cardresponsepayload').hide();return false;" >${data.payload.buttons[j].title}</button>`
                }
                else {
                    cardButtons += `<button type="button"  class="btn btn-primary infocard-btn-custom webview"  onClick="window.open('https://fast-reef-26757.herokuapp.com/${data.payload.buttons[j].url}','chat70994705','width=400,height=600,resizable=yes');$('.webview').hide();return false;" >${data.payload.buttons[j].title}</button>`
                }
            }
            cardButtons += `</div>`
        }
        html = cardBody + cardButtons + `</div></div>`;
        if (data.bottomIcon) {
            html += `<p class="bot-res-timestamp-card"> <img style="border-radius:50%;border:2px solid white;" width="32" height="32" src='${settings.botAvatar}'/>${data.time}</p>`;
        }
        html += `</div></li>`;

        return html;
    }

    return methods;
});
