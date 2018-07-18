(function () {
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
    console.log(cur);
    menuItems.parent().find('.nav-link').removeClass("active show");
    if (id) {
      menuItems.parent().end().filter("[href*='#" + id + "']").parent().find('.nav-link').addClass("active show");
    }

  })


})(jQuery);
