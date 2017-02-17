$(document).ready(function() {
  /* var canvas = $('#canvas');
  canvas.attr('width', $(window).width());
  canvas.attr('height', $(window).height());

  var kb = canvas.kenburned({
    images: [
      'http://samhugh.com/wp-content/uploads/2015/11/lindsey-and-tom-austin-engagement-session-006.jpg',
      'http://www.desireehartsock.com/wp-content/uploads/2014/05/Chris-Desiree-14-of-119.jpg',
      'https://luminousweddings.ca/wp-content/uploads/2015/01/09-5110-post/Kortright-Centre-Engagement-Photos-in-Toronto-by-Photographer-Luminous-Weddings-219.jpg',
    ],
    display_time: 10000,
    fade_time: 1000,
    frame_per_second: 20,
    background_color: '#333333',
    zoom: 1.3,
  });

  // Handle Window Resizes
  $(window).resize(function() {
    var width = $(window).width();
    var height = $(window).height();
    kb.resize(width, height);
  });*/

  // Handle Masthead Imprint
  /* var imprint = new Vivus('imprint', {
    file: 'img/imprint.svg',
    type: 'oneByOne',
    duration: 100,
    start: 'manual',
    onReady: function(myVivus) {
      myVivus.el.setAttribute('height', '200');
      console.log('check', myVivus, imprint);
      setTimeout(function() {
        myVivus.play();
      }, 500);
    }
  });*/

  // Handle Image Rotation
  /* var images = $('.image');
  console.log('images', images);

  var rotateImage = function() {
    var currentImage = $('.image.active');
    var nextImage = currentImage.next('.image');

    if (!nextImage.length) { nextImage = images.first(); }
    currentImage.removeClass('active');
    nextImage.addClass('active');
  }

  setInterval(rotateImage, 3000);*/

  /* $('#slider').Kenburns({
    images: [
      'http://samhugh.com/wp-content/uploads/2015/11/lindsey-and-tom-austin-engagement-session-006.jpg',
      'http://www.desireehartsock.com/wp-content/uploads/2014/05/Chris-Desiree-14-of-119.jpg',
      'https://luminousweddings.ca/wp-content/uploads/2015/01/09-5110-post/Kortright-Centre-Engagement-Photos-in-Toronto-by-Photographer-Luminous-Weddings-219.jpg',
    ],
    scale: 0.9,
    duration: 8000,
    fadeSpeed: 1000,
    ease3d: 'ease-out',
  });*/

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
