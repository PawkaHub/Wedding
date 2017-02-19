// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

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

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCeHHtpJqfLcKeqMnV4tyx7eGnX3jN4bZ8",
    authDomain: "wedding-57818.firebaseapp.com",
    databaseURL: "https://wedding-57818.firebaseio.com",
    storageBucket: "wedding-57818.appspot.com",
    messagingSenderId: "1054031492307"
};
firebase.initializeApp(config);
