var googleCred = {
  clientId : '943541244956-8sj4q0ephevi3lfktcuv3mfdmu95048k.apps.googleusercontent.com',
  apiKey : 'AIzaSyAPmExamst-E9x4KF_U7cEHgwquWitzjG0'
};

var scopes = ['https://www.googleapis.com/auth/calendar'];

function initGoogleApi() {
  gapi.client.setApiKey(googleCred.apiKey);
  window.setTimeout(checkAuth,1);

  gapi.client.register('calendar.events.insert', { 'apiVersion' : 'v3'});
  gapi.client.register('plus.people.get', {'apiVersion' : 'v1'});
};

function checkAuth() {
  gapi.auth.authorize({client_id: googleCred.clientId, scope: scopes, immediate: true}, handleAuthResult);
};

function handleAuthResult(authResult) {
  var authButton = document.getElementById('googleAuthButton');

  if(authResult && !authResult.error) {
    if (authButton) {
      authButton.style.visibility = 'hidden';
    }
    //loadGoogleCalendarEvents();
    if (!tempInfoObj.createEventStatus) {
      createGoogleCalendarEvent(null, null, null, null, null, true)
    }
  } else if(authButton) {
    authButton.style.visibility = '';
    authButton.onclick = handleAuthClick;
  }
};

/**
* Load Calendar event
* Loads upcoming 10 events
*/
function loadGoogleCalendarEvents() {
  gapi.client.load('calendar', 'v3', function() {
      var request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      });

      request.execute(function(resp) {
        var events = resp.items;
        if (events.length > 0) {
          for (var i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }

            var li = document.createElement('li');
            li.appendChild(document.createTextNode(event.summary + " at " + when));
            document.getElementById('calenderUl').appendChild(li);
          }
        } else {
          appendPre('No upcoming events found.');
        }
      });
  });
};

/**
* Append a pre element to the body containing the given message
* as its text node.
*
* @param {string} message Text to be placed in pre element.
*/
function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
};


function handleAuthClick(event) {
  // Step 3: get authorization to use private data
  gapi.auth.authorize({client_id: googleCred.clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
};

/*
* Hold temporary information about new Calendar event & it creation status
* if Status - False - implies creation of the event had failed, since user not logged in,
*                     so user should log in
*                     then recreate this event once user successfully logs in on success callback
*/
var tempInfoObj = {
  tempEvent : {},
  createEventStatus : true
};

/**
* Create a Google Calendar Event in Users caladar
* with attendees as Physician at requested date & time
*
* @param {string} user's email address
* @param {string} physician's email address
* @param {string} physician Username (attendees name)
* @param {date} start time for the meeting
* @param {date} end time for the meeting (to be taken as 1 hour from start time)
* @param {boolean} whether to copy event data from tempInfoObj
*
* Create an Event & insert in the Calendar
*/
function createGoogleCalendarEvent(userEmail, physicianEmail, physicianUsername, startTime, endTime, copyOfEvent){
  // https://developers.google.com/google-apps/calendar/quickstart/js
  // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any stored credentials.
  var event = {};

  if (!copyOfEvent) {
    var event = {
      'summary': 'Medicos: Doctor Appointment',
      'location': 'c-461, Mahavir Tuscan Apts, Hoodi Circle',
      'description': 'Your appointment with Dr.' + physicianUsername,
      'start': {
        'dateTime': startTime,
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': endTime,
        'timeZone': 'America/Los_Angeles'
      },
      'attendees': [
        {'email': userEmail,
          'comment': 'Contact Dr on time. Please be ready 15 min early'},
        {'email': physicianEmail,
          'comment': 'Please keep time for the patient & be ready with computer.',
          'displayName': physicianUsername
        }
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'sms', 'minutes': 15},
          {'method': 'popup', 'minutes': 15}
        ]
      },
      'sendNotifications' : true,
      'anyoneCanAddSelf' : false,
      'guestsCanInviteOthers': false,
      'guestsCanModify': true,
      'guestsCanSeeOtherGuests': true
    };

    tempInfoObj.tempEvent = $.extend(true, {}, event);
  } else {
    event = tempInfoObj.tempEvent;
  }

  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  });

  request.execute(function(resEvent) {
    if (resEvent.message === "Missing attendee email.") {
      console.log("user email is missing");

    } else if (resEvent.message === "Login Required") {
      handleAuthClick();
      tempInfoObj.createEventStatus = false;
      //create the event again !
    } else {
      //Add this to notification bar
      appendPre('Event created: ' + resEvent.htmlLink);

      tempInfoObj.createEventStatus = true;
    }
  });
};



signinCallback =  function(authResult) {
    if (authResult['status']['signed_in']) {
      label = 'User granted access:';
        gapi.auth.setToken(authResult);
      // Update the app to reflect a signed in user
      // Hide the sign-in button now that the user is authorized, for example:
      document.getElementById('signinButton').setAttribute('style', 'display: none');
    } else {
      // Update the app to reflect a signed out user
      // Possible error values:
      //   "user_signed_out" - User is signed-out
      //   "access_denied" - User denied access to your app
      //   "immediate_failed" - Could not automatically log in the user
      label = 'Access denied: ' + authResult['error']
      console.log('Sign-in state: ' + authResult['error']);

    }

    request = gapi.client.plus.people.get({
    'userId' : 'me'
    })

    request.execute(function(resp) {
      console.log('ID: ' + resp.id);
      console.log('Display Name: ' + resp.displayName);
      console.log('Image URL: ' + resp.image.url);
      console.log('Profile URL: ' + resp.url);
      console.log('Email':resp.emails[0].value);
    });
};
