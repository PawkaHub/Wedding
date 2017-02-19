$(document).ready(function() {
  // Handle Form Submission
  var form = $('#rsvp-form');
  form.submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    console.log('formSubmit', data);
  });

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
