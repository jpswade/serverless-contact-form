"use strict";
var config = require('./config.json'),
    qs = require('qs'),
    nodemailer = require('nodemailer'),
    AWS = require('aws-sdk'),
    sesTransport = require('nodemailer-ses-transport');
var ses = new AWS.SES();
var transporter = nodemailer.createTransport(sesTransport({
    ses: ses
}));

module.exports.contact = function (e, context, callback) {
    var referrer = config.website;

    const error_response = {
        statusCode: 500,
        body: 'Could not send message'
    };
    const response = {
        statusCode: 301,
        headers: {
            'Location': referrer + "?sent=true"
        },
        body: 'Redirecting you back to ' + referrer
    };
    var text = JSON.stringify(qs.parse(e.body));
    text += "Source IP: " + e.requestContext.identity.sourceIp + "\n";
    text += "User Agent: " + e.requestContext.identity.userAgent + "\n";
    text += "\n\n\n";
    text += 'Just testing...';

    var options = {
        from: config.from,
        to: config.to,
        subject: 'Contact Form',
        text: text
    };
    var on_done = function (error, info) {
        if (error) {
            console.log(error);
            return callback(null, error_response);
        }
        console.log(info);
        callback(null, response);
    };
    var r = transporter.sendMail(options, on_done);
};
