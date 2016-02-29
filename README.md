# About the Network
Alexa skill to provide wireless login into.

## Setup
To run this example skill you need to do two things. The first is to deploy the example code in Lambda, and the second is to configure the Alexa skill to use Lambda.

### AWS Lambda Setup
1. Go to the AWS Console and click on the Lambda link. Note: ensure you are in "US East (N. Virginia)" (drop-down in upper-right) or you won't be able to use Alexa with Lambda.
2. Click on the "Create a Lambda Function" or "Get Started Now" button.
3. Skip the blueprint with the "Skip" button in the lower-right.
4. Name the Lambda Function "About-the-Network".
5. Select the runtime as Node.js.
6. In the src directory, rename netSetup_TODO.js to netSetup.js and enter your SSID and password.
7. Go to the the src directory, select all files and then create a zip file, make sure the zip file does not contain the src directory itself, otherwise the Lambda function will not work.
8. Back in the AWS Console, select Code entry type as "Upload a .ZIP file" and then upload the .zip file to the Lambda
9. Keep the Handler as index.handler (this refers to the main js file in the zip).
10. Create a basic execution role and click create.
11. Leave the Advanced settings as the defaults.
12. Click "Next" and review the settings then click "Create Function".
13. Click the "Event Sources" tab and select "Add event source".
14. Set the Event Source type as "Alexa Skills Kit" and click "Submit".
15. Copy the ARN from the top right to be used later in the Alexa Skill Setup.
	(It starts with "arn:aws:lambda". Do not copy the initial "ARN".)

### Alexa Skill Setup
1. Go to the [Amazon Developer Console](https://developer.amazon.com/home.html), click "APPS & SERVICES", "Alexa", and then under "Alexa Skills Kit" click "Get Started" and click the "Add a New Skill" button.
2. Set "About the Network" for the skill name and "about the network" as the invocation name, this is what is used to activate your skill. For example you would say: "Alexa, ask about the network."
3. Select the "Lambda ARN (Amazon Resource Name)" radio button for the Endpoint and paste the ARN copied from above. Click "Next".
4. Copy the Intent Schema from the included IntentSchema.json and paste it into this page.
5. Copy the Sample Utterances from the included SampleUtterances.txt and do the same. Click "Next".
6. [OPTIONAL] Go back to the "Skill Information" tab on the left and copy the "Application Id". (It starts with "amzn1.echo-sdk-ams".) Paste this into your local index.js file in the src directory for the variable APP_ID,
   then update the Lambda source zip file with this change and upload to AWS Lambda again. This step makes sure the Lambda function only serves authorized requests.
7. You are now able to start testing the skill. You should be able to go to the [Echo webpage] (http://echo.amazon.com/#skills) and see your skill enabled.
8. In order to test it, try to say some of the Sample Utterances from the Examples section below.

## Examples
Example user interactions:

### One-shot model:
    User:  "Alexa, ask about the network."

## Template for test case or Service Simulator:
	{
		"session": {
			"sessionId": "SessionId.[my sessionId goes here]",
			"application": {
				"applicationId": "amzn1.echo-sdk-ams.app.[my applicationId goes here]"
			},
			"user": {
				"userId": "amzn1.echo-sdk-account.[my userId goes here]"
			},
			"new": true
		},
		"request": {
			"type": "LaunchRequest",
			"requestId": "EdwRequestId.[my requestId goes here]",
			"timestamp": "xxxx-xx-xxTxx:xx:xxZ"
		}
	}
