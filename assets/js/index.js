/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);


(function($) {
  // if (ScrollToTop) return;

  ScrollToTop = {
    setup: function() {
      var $window = $(window),
          $scrollToTopButton = $('<div id="scroll-to-top"></div>').appendTo('body');

      $scrollToTopButton.on('click touchstart', function() {
        $('body, html').animate({ scrollTop: 0 }, 300);
      });

      // show and hide scroll to top button logic
      $window.on('scroll.scroll-to-top', function() {
        var threshold = 50,
            duration = 200;

        if ($window.scrollTop() >= threshold && $scrollToTopButton.is(':hidden')) {
          $scrollToTopButton.fadeIn(duration);
        } else if ($window.scrollTop() < threshold && $scrollToTopButton.is(':visible')) {
          $scrollToTopButton.fadeOut(duration);
        }
      });

      // Mousewheel events don't work through position-fixed elements. This is a fix.
      // http://stackoverflow.com/questions/7182502/pass-mousewheel-event-through-fixed-content
      $scrollToTopButton.on('mousewheel DOMMouseScroll', function(e) {
        var originalEvent = e.originalEvent,
            wheelDelta;

        if (originalEvent.wheelDelta) {
          wheelDelta = originalEvent.wheelDelta * -1;
        } else if (originalEvent.detail) {
          wheelDelta = originalEvent.detail * 15;
        }

        var scrollTo = wheelDelta + $window.scrollTop();
        $window.scrollTop(scrollTo);
      });
    },

    teardown: function() {
      $(window).off('scroll.scroll-to-top');
      $('#scroll-to-top').remove();
    }
  }
}(jQuery));