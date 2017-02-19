var isAttending = function(value) {
  if (value === 'on') return true;
  return false;
}

$(document).ready(function() {
  // Handle Guest RSVP Form Submission
  var db = firebase.database();

  // Elements
  var guestForm = $('#guest-rsvp-form');
  var loadingMessage = $('.message.loading');
  var errorMessage = $('.message.error');
  var successMessage = $('.message.success');

  var messageDelay = 2000;

  // Message handlers
  var clearMessages = function() {
    errorMessage.removeClass('active');
    successMessage.removeClass('active');
    loadingMessage.removeClass('active');
  }

  var showLoading = function(message) {
    if (!message) {
      message = 'Confirming Your RSVP...';
    }
    loadingMessage.text(message);

    errorMessage.removeClass('active');
    successMessage.removeClass('active');
    loadingMessage.addClass('active');
  }

  var showError = function(message, disableDelay) {
    if (!message) {
      message = 'There was an error confirming your RSVP.';
    }
    errorMessage.text(message);

    var delay = messageDelay;
    if (disableDelay) { delay = 0; }

    setTimeout(function() {
      successMessage.removeClass('active');
      loadingMessage.removeClass('active');
      errorMessage.addClass('active');
    }, delay);
  }

  var showSuccess = function(message, disableDelay) {
    if (!message) {
      message = 'RSVP Confirmed!';
    }
    successMessage.text(message);

    var delay = messageDelay;
    if (disableDelay) { delay = 0; }

    setTimeout(function() {
      loadingMessage.removeClass('active');
      errorMessage.removeClass('active');
      successMessage.addClass('active');
    }, delay);
  }

  guestForm.submit(function(e) {
    e.preventDefault();

    // Serialize form data
    var data = $(this).serializeObject();
    var firstName = data['first-name'];
    var lastName = data['last-name'];
    var attendingCeremony = data['attending-ceremony'];
    var attendingReception = data['attending-reception'];
    var message = data['message'];

    /* console.log('firstName', firstName);
    console.log('lastName', lastName);
    console.log('attendingCeremony', attendingCeremony);
    console.log('attendingReception', attendingReception);
    console.log('message', message);*/

    // Get the fullName for this user
    var fullName = firstName.toLowerCase() + '-' + lastName.toLowerCase();
    // console.log('fullName', fullName);

    if (!firstName) return showError('Please provide a first name.', true);
    if (!lastName) return showError('Please provide a last name.', true);

    // Show a loading message
    showLoading();

    // Check for if the fullName exists in our invited collection
    db.ref('invited/' + fullName).once('value').then(function(snap) {
      if (snap.exists()) {
        // console.log('User exists in invite list. Add RSVP info.');

        // Create the payload of data for the user's RSVP
        var payload = {
          'first-name': firstName,
          'last-name': lastName,
          'attending-ceremony': isAttending(attendingCeremony),
          'attending-reception': isAttending(attendingReception),
          message: message,
        };

        // Persist the RSVP to the server
        // Check for if ref already exists before confirming it.
        db.ref('rsvp/' + fullName).once('value').then(function(snap) {
          if (snap.exists()) {
            // console.log('RSVP already confirmed, show success message');
            showSuccess();
          } else {
            // console.log('RSVP not created yet, create it.');
            db.ref('rsvp/' + fullName).set(payload).then(function(result) {
              // console.log('RSVP successful', result);
              showSuccess();
            }).catch(function(error) {
              // console.log('RSVP error', error);
              showError();
            });
          }
        });
      } else {
        // console.log('User not invited. Throw error.');
        showError();
      }
    });
  });

  guestForm.on('keyup', function(e) {
    // Clear any messages that are currently being displayed
    clearMessages();
  });
});
