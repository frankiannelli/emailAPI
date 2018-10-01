# Email Sender

## Details

### Problem 
Set up an email API that accepts necessary information and sends emails. If one service goes down the application should failover to different service without affecting the users experience.
### Solution / Coding Decisions
Build a solution that has 2 seperate concerns for sending emails
* A RESTful Node API which receives requests to a specific endpoint and sends emails using the Mailgun and SendGrid API's. Using node will allow easy use of npm packages which will do alot of the "heavy lifting" speeding up the development process.
* A Client side React app which is setup to communicate to the RESTful API. Using a reactive front-end framework/library will allow for instant user validaition and dynamic feedback within the application. React is a component based library which will allow components to be easily reused should there be further requirements added to the project at a later stage.

### Separation of concerns will benefit in the following ways

* Maintainence of the solution will be streamlined as new features and improvements can be made to the code that is directly associated with the respective area. This should result in less code that needs to be changed throughout the life-time of the solution.
* If behaviours of the solution are seperated out then new implementations can be easily swapped out without the need to fully understand and manipulate the rest of the solution.
* Seperation of concerns helps prevent the need to change code in unrelated features which means breakage of code is less likely.
* If your architecture is agnostic to technical or business logic detail then changes to implementation are less likely to require new architectural features. For example, if your main domain logic is front-end framework agnostic then supporting a new front-end framework should be as easy as swapping in a new implementation.


## View Live

[Client](http://competent-fermi-72ba9c.netlify.com)

[API](https://serene-inlet-87099.herokuapp.com/)

![emailSender](/public/images/client.png)

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

* `to` and `text` fields are mandatory
* `cc`, `bcc` and `subject` are optional
* multiple recipients can be sent by seperating the email addresses with `, ` and a space

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

## Front End Features
* Instant validation for valid email addresses
* Abliity to accept multiple email recipients
* Dynamic response messages displayed on success and failure
* If email fails the form data does not clear so that user can update and resend
* If email succeeds the form clears so the user can send again
* Mobile responsive
* Loading spinner while user waits for response
* Basic tests implemented
* Deployed to Netlify

## Backend Features
* Failback if the first mail API fails
* Use of ES8 async/await syntax for ease of readability
* Use of eslint
* Endpoints tested with Mocha
* Deployed to Heroku


## Further Improvements
* Improve the flow control for the email fallback. Fallback should be handled outside of the error handler.
* No errors logged for initial call to Mailgun. The API uses SendGrid as the fallback and only reports the SendGrid errors.
* Send button on client should be disabled until form validates
* Write more tests
* Support IE10
* UX designer to provide requirements for front-end layout
