"use strict";
var config = require('./config.json'),
    qs = require('qs'),
    nodeMailer = require('nodemailer'),
    AWS = require('aws-sdk'),
    sesTransport = require('nodemailer-ses-transport');
var ses = new AWS.SES();
var transporter = nodeMailer.createTransport(sesTransport({
    ses: ses
}));

module.exports.contact = function (e, context, callback) {
    var redirect = config.redirect;
    var origin = config.origin;

    const errorResponse = {
        statusCode: 500,
        body: 'Could not send message'
    };
    const successResponse = {
        statusCode: 302,
        headers: {
            'Access-Control-Allow-Origin': origin,
            'Location': redirect
        },
        body: 'Redirecting you back to ' + redirect
    };
    var text = JSON.stringify(qs.parse(e.body), null, 2);
    text += "\n Identity: ";
    text += JSON.stringify(qs.parse(e.requestContext.identity), null, 2);

    var options = {
        from: config.from,
        to: config.to,
        subject: 'Contact Form',
        text: text
    };
    var on_done = function (error, info) {
        if (error) {
            console.log(error);
            return callback(null, errorResponse);
        }
        console.log(info);
        callback(null, successResponse);
    };
    var r = transporter.sendMail(options, on_done);
};
