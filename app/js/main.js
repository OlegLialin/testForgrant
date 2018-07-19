(function ($) {
// Use strict mode to avoid errors:
  // https://developer.mozilla.org/en/JavaScript/Strict_mode
  'use strict';

  //show list of years for birthday
  $('.js-select').selectpicker();


  // Navigation
  var topMenu = $(".js-nav"),
    offset = 130,
    topMenuHeight = topMenu.outerHeight() + offset,
    // All list items
    menuItems = topMenu.find('a[href*="#"]'),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
      var href = $(this).attr("href"),
        id = href.substring(href.indexOf('#')),
        item = $(id);
      //console.log(item)
      if (item.length) {
        return item;
      }
    });

  // so we can get a fancy scroll animation
  menuItems.click(function (e) {
    var href = $(this).attr("href"),
      id = href.substring(href.indexOf('#')),
      offsetTop = href === "#" ? 0 : $(id).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 500);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop)
        return this;
    });

    // Get the id of the current element
    cur = cur[cur.length - 1];

    var id = cur && cur.length ? cur[0].id : "";
    menuItems.parent().find('.nav-link').removeClass("active show");
    if (id) {
      menuItems.parent().end().filter("[href*='#" + id + "']").parent().find('.nav-link').addClass("active show");
    }

  });

  $('#my-form').submit(function (e) {
  e.preventDefault();
    var email = $( "input[name='email']").val(),
        name = $( "input[name='name']").val(),
        birthday = $( "select[name='birthday'] option:selected").text(),
        livingLocation = $( "input[name='living-location'] ").val(),
        skype = $( "input[name='skype']").val(),
        oocss = $( "input[name='oocss']:checked").val() || 0,
        sass = $( "input[name='sass']:checked").val() || 0,
        svg = $( "input[name='svg']:checked").val() || 0,
        semantics = $( "input[name='semantics']:checked").val() || 0,
        es5 = $( "input[name='es5']:checked").val() || 0,
        gulp = $( "input[name='gulp']:checked").val() || 0,
        webpack = $( "input[name='webpack']:checked").val() || 0,
        jQuery = $( "input[name='jQuery']:checked").val() || 0,
        git = $( "input[name='git']:checked").val() || 0,
        message = $( "textarea[name='message']").val();

    alert( "Имя: " + name+ '\n' +
    "День рождения: " + birthday+ '\n' +
    "Место проживания: " + livingLocation+ '\n' +
      "Skype: " + skype+ '\n' +
      "E-mail: " + email+ '\n' +
      "БЭМ/OOCSS: " + oocss+ '\n' +
      "Stylus/LESS/SASS: " + sass+ '\n' +
      "Работаю с SVG: " + svg+ '\n' +
      "Верстаю семантично: " + semantics+ '\n' +
      "ES2015/ES2016: " + es5+ '\n' +
      "Gulp/GRUNT: " + gulp+ '\n' +
      "Webpack: " + webpack+ '\n' +
      "jQuery: " + git+ '\n' +
      "Ипользую Git: " + oocss+ '\n' +
      "О себе: \n" + message+ '\n'
    )
  });

})(jQuery);
