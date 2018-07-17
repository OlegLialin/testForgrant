(function () {
// Use strict mode to avoid errors:
  // https://developer.mozilla.org/en/JavaScript/Strict_mode
  'use strict';

  //show list of years for birthday
  $('.js-select').selectpicker();

  // set active link for top nav
  $('.js-nav a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

})(jQuery);
