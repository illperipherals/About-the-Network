/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * Simple skill to read WiFi SSID/Password from a file based off the Amazon examples.
 */

"use strict";
/*jslint undef: true, plusplus: true, todo: true */

/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.echo-sdk-ams.app.[your-unique-value-here];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var NetSetup = require('./netSetup');

/**
 * Network information.
 */
var netSSID = NetSetup.netSSID;
var netPassword = NetSetup.netPassword;

/**
 * Pauses for Alexa speech.
 */
var VoiceBreakEnum = {
    'xweak': "<break strength='x-weak'/>",
	'weak': "<break strength='weak'/>",
	'medium': "<break strength='medium'/>",
	'strong': "<break strength='strong'/>",
	'xstrong': "<break strength='x-strong'/>"
};

/**
 * To make wording changes a bit easier.
 */
var VoiceSnippetEnum = {
	'isUpper': 'capital',
	'isLower': 'lowercase',
	'isAllUpper': 'all uppercase',
	'isAllLower': 'all lowercase'
};

var netSplitSSID = netSSID.split('').join(VoiceBreakEnum.medium);
var netSplitPassword = netPassword.split('').join(VoiceBreakEnum.medium);

/**
 * AboutTheNetwork is a child of AlexaSkill.
 */
var AboutTheNetwork = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
AboutTheNetwork.prototype = Object.create(AlexaSkill.prototype);
AboutTheNetwork.prototype.constructor = AboutTheNetwork;

// ----------------------- Override AlexaSkill request and intent handlers -----------------------
AboutTheNetwork.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("About The Network onSessionStarted requestId: " + sessionStartedRequest.requestId
         + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

AboutTheNetwork.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("About The Network onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleWelcomeRequest(response);
};

AboutTheNetwork.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("About The Network onSessionEnded requestId: " + sessionEndedRequest.requestId
         + ", sessionId: " + session.sessionId);
    // any clean-up logic goes here
};

/**
 * override intentHandlers to map intent handling functions.
 */
AboutTheNetwork.prototype.intentHandlers = {
	HelpIntent: function (intent, session, response) {
    },

    "AMAZON.StopIntent" : function (intent, session, response) {
		var speechOutput = "Okay.";
		response.tell(speechOutput);
    },

    "AMAZON.CancelIntent" : function (intent, session, response) {
		var speechOutput = "Okay.";
		response.tell(speechOutput);
    }
};

/**
 * Format case-sensitive output.
 */
var casedNetSplitSSID,
	casedNetSplitPassword;

function insertCaseWithBreak(str) {
	var i,
		len,
		cased = '';

	if (isUpperCase(str)) {
		cased = VoiceSnippetEnum.isAllUpper
			+ VoiceBreakEnum.xstrong;
		for (i = 0, len = str.length; i < len; i++) {
			if (isUpperCase(str[i])) {
				cased += str[i]
					+ VoiceBreakEnum.xstrong;
			}
		}
	} else if (isLowerCase(str)) {
		cased = VoiceSnippetEnum.isAllLower
			+ VoiceBreakEnum.xstrong;
		for (i = 0, len = str.length; i < len; i++) {
			if (isLowerCase(str[i])) {
				cased += str[i]
					+ VoiceBreakEnum.xstrong;
			}
		}
	} else {
		for (i = 0, len = str.length; i < len; i++) {
			if (isUpperCase(str[i])) {
				cased += VoiceSnippetEnum.isUpper + str[i]
					+ VoiceBreakEnum.xstrong;
			} else {
				cased += str[i]
					+ VoiceBreakEnum.xstrong;
			}
		}
	}

	return cased;
}

function isUpperCase(char) {
	return !!/[A-Z]/.exec(char[0]);
}

function isUpperCase(str) {
	return (/^[A-Z]*$/).test(str);
}

function isLowerCase(str) {
	return (/^[a-z]*$/).test(str);
}

function handleWelcomeRequest(response) {
	casedNetSplitSSID = insertCaseWithBreak(netSSID);
	casedNetSplitPassword = insertCaseWithBreak(netPassword);

	var speechOutput = {
		"type": AlexaSkill.speechOutputType.SSML,
		"speech": "<speak>"
			+ '<audio src="https://s3.amazonaws.com/thewillows/resources/media/audio/ATHF_MyNameIsAlexaAmp.mp3"/>'
			+ VoiceBreakEnum.xstrong + casedNetSplitSSID
			+ VoiceBreakEnum.xstrong + " and the password is "
			+ VoiceBreakEnum.xstrong + casedNetSplitPassword
			+ "</speak>",
		"text": "The network SSID, is "
			+ VoiceBreakEnum.xstrong + casedNetSplitSSID
			+ VoiceBreakEnum.xstrong + " and the password is "
			+ VoiceBreakEnum.xstrong + casedNetSplitPassword
	};

	var cardOutput = {
		"type": "Simple",
		"title": "SSID: " + netSSID + " Portal",
		"content": 'Say, "Alexa, ask about the network." for WiFi information.'
	};

	response.tellWithCard(speechOutput, cardOutput.title, cardOutput.content);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var aboutTheNetwork = new AboutTheNetwork();
    aboutTheNetwork.execute(event, context);
	context.succeed(event);
	// Comment these to clean up the logs.
	console.log('functionName = ', context.functionName);
    console.log('AWSrequestID = ', context.awsRequestId);
    console.log('logGroupName = ', context.logGroupName);
    console.log('logStreamName = ', context.logStreamName);
};