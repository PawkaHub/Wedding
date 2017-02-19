$(document).ready(function() {
  // Handle Plus One RSVP Form Submission
  var plusOneForm = $('#plus-one-rsvp-form');

  plusOneForm.submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeObject();
    console.log('plusOneForm', data);
  });
});
