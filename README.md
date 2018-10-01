# Email Sender

## Details
This Project has 2 seperate concerns for sending emails
* A RESTful Node API which receives request to specific endpoint and sends emails using the Mailgun and SendGrid API's
* A Client side React app which is setup to communicate to the RESTful API

## View Live

[Client](www.example.com)

[API](www.example.com)

![emailSender](/public/images/client.png)

## Setup

1. `yarn install` in client directory
2. `npm install` in root directory
2. `npm run dev` in root directory.
3. `npm start` in client.

## Environment variables

This applications requires environment variables from:
* SendGrid
* Mailgun

Please see the [.env.example](/.env.example) file in the root directory for guidance.

## Backend
The API has one exposed end point

The API will attempt to send with Mailgun first. If an error is received the API will send with SendGrid.

`POST /api/communicate/mail`

`Content-Type: application/json`

this endpoint accepts JSON data in the following format

{

	"recipients": {
		"to": "john@example.com, jane@example.com",
		"cc": "cc@example.com",
		"bcc": "bcc@example.com"
	}, 
		"message": {
			"subject": "subject",
			"text": "main message text"
		}
}

* to and text fields are mandatory
* cc, bcc and subject are optional
* multiple recipients can be sent by seperating the email address with ', ` and a space


## Front End Features
* Instant validation for valid email address
* abliity to accept multiple email recipients
* Dynamic response messages displayed on success and failure
* If email fails the form data does not clear so that user can update and resend
* If email succeeds the form clears so the user can send again
* Mobile responsive

## Further Improvements
* Improve the flow control for the email fallback. Fallback should be handled outside of the error handler.
* No errors logged for initial call to Mailgun. The API uses SendGrid as the fallback and only reports the SendGrid errors.
* send button on client should be diabled until form validates
* write more tests

[] push to prod for client and API
[] update client to send post request to prod
[] write tests REACT