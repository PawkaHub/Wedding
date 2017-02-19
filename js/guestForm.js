var isAttending = function(value) {
  if (value === 'on') return true;
  return false;
}

$(document).ready(function() {
  // Handle Guest RSVP Form Submission
  var guestForm = $('#guest-rsvp-form');
  var db = firebase.database();

  guestForm.submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeObject();
    var firstName = data['first-name'];
    var lastName = data['last-name'];
    var attendingCeremony = data['attending-ceremony'];
    var attendingReception = data['attending-reception'];
    var message = data['message'];
    // console.log('guestForm', data);
    console.log('firstName', firstName);
    console.log('lastName', lastName);
    console.log('attendingCeremony', attendingCeremony);
    console.log('attendingReception', attendingReception);
    console.log('message', message);

    var fullName = firstName.toLowerCase() + '-' + lastName.toLowerCase();
    console.log('fullName', fullName);

    // Check for if the fullName exists in our invited collection
    db.ref('invited/' + fullName).once('value').then(function(snap) {
      if (snap.exists()) {
        console.log('User exists in invite list. Add RSVP info.');

        // Create the payload of data for the user's RSVP
        var payload = {
          'first-name': firstName,
          'last-name': lastName,
          'attending-ceremony': isAttending(attendingCeremony),
          'attending-reception': isAttending(attendingReception),
          message: message,
        };

        // Persist the RSVP to the server
        db.ref('rsvp/' + fullName).set(payload).then(function(result) {
          console.log('RSVP successful', result);
        }).catch(function(error) {
          console.log('RSVP error', error);
        });
      } else {
        console.log('User not invited. Throw error.');
      }
    });
  });
});
