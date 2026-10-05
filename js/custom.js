
  (function ($) {
  
  "use strict";

    // JOUAN MARCEL 3D MENU INTERACTIONS
    $('#jouanNav .explainer').on('click', function(e) {
      e.stopPropagation();
      $('#jouanNav').toggleClass('is-open');
    });

    $('#jouanNav a').on('click', function(e) {
      var targetId = $(this).attr('href');
      if (targetId && targetId.startsWith('#')) {
        var $target = $(targetId);
        if ($target.length) {
          e.preventDefault();
          var headerHeight = $('.navbar').outerHeight() || 80;
          $('html, body').animate({
            scrollTop: $target.offset().top - headerHeight + 10
          }, 350);
          $('#jouanNav').removeClass('is-open');
        }
      }
    });

    $(document).on('click', function(e) {
      if (!$(e.target).closest('#jouanNav').length) {
        $('#jouanNav').removeClass('is-open');
      }
    });

    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });
  
  })(window.jQuery);


