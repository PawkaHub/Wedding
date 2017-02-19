// Add Serialize Object to jQuery prototype for easy access to form data as an object for insertion into Firebase
$.fn.serializeObject = function()
{
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
     if (o[this.name]) {
         if (!o[this.name].push) {
             o[this.name] = [o[this.name]];
         }
         o[this.name].push(this.value || '');
     } else {
         o[this.name] = this.value || '';
     }
  });
  return o;
};

$(document).ready(function() {
  // Handle Guest RSVP Form Submission
  var guestForm = $('#guest-rsvp-form');
  guestForm.submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeObject();
    console.log('guestForm', data);
  });

  // Handle Plus One RSVP Form Submission
  var plusOneForm = $('#plus-one-rsvp-form');
  plusOneForm.submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeObject();
    console.log('plusOneForm', data);
  })

  // Handle Navigation
  var links = $('.navigation-link');
  var sections = $('.section');

  links.on('click', function(e) {
    var target = $(e.target);
    var href = target.data('href');
    // console.log('clicked', target, href);

    // Clear out all link activeStates
    links.each(function() {
      $(this).removeClass('active');
    });
    target.addClass('active');

    var targetSection = $('#' + href);
    // console.log('targetSection', targetSection);

    // Clear out all sections active state
    sections.each(function() {
      $(this).removeClass('active');
    });

    // Add active state to targetSection
    targetSection.addClass('active');
  });
});
