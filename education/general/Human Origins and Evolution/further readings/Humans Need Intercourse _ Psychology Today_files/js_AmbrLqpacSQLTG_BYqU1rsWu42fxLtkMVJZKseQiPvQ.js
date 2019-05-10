(function ($) {
  $(document).ready(function () {
    // toggle the Find Therapist search block on click at mobile widths
    if ( window.innerWidth < 480 && !$('body').hasClass('front') ) {
      $('#td_search_label').removeClass('top-search-open');
      $('.input-wrapper').css('display', 'none');

      tdToggleEvent();
    }

    /*
     *  - We need to reset and reapply bindings after page resize because the form label is a link on tablet/desktop,
     *     but a toggle trigger on mobile.
     *
     *   - In PT-273 we discovered that opening a keyboard in Android devices fires a 'resize' event that we didn't expect.
     *     In some cases, this meant that the keyboard would immediately close after opening.
     *     We'll detect this by comparing the window widths before and after the resize - if they are the same,
     *     assume it was a keyboard event and don't fire our resize callback stuff.
     */
    var windowWidth = $(window).width();

    $(window).bind('resize.ptSlideToggle', function(event){
      if ( windowWidth != $(window).width() ) {
        clearTimeout(this.id);
        if (!$('#block-pt-td-td-top-search input#searchField').is(':focus')) {
          this.id = setTimeout(handleResize, 200);
        }
      }

      // Reset windowWidth with new width
      windowWidth = $(window).width();
    });

    // Reset the state of Therapist Directory to closed after a window resize
    // Specifically unbind the click event (runs a slideToggle) every time to keep them from repeating
    function handleResize() {
      $('#td_search_label').removeClass('top-search-open');
      $('#td_search_label').unbind('click');

      if (window.innerWidth < 480 && !$('body').hasClass('front')) {
        $('.input-wrapper').css('display', 'none');
        tdToggleEvent();
      }
      else {
        $('.input-wrapper').css('display', 'inline-block');
      }
    }

    // Binds the slideToggle click event to the td search Label
    function tdToggleEvent() {
      $('#td_search_label').on('click', function (e) {
        e.preventDefault();
        $('.input-wrapper').slideToggle('fast', function (e) {
          $(this).siblings('#td_search_label').toggleClass('top-search-open');
        });
      });
    }

  });
})(jQuery);
;
(function($) {

  // Country
  var pt_country = localStorage.getItem("pt_country") || '';
  // OK, we're ready!
  $(document).ready(function() {
    // What country are we in?
    switch (pt_country) {
      case 'US': case 'us':

        // Show the top search block
        $('#block-pt-td-td-top-search').closest('.region-below-header').addClass('show-search-block');
        break;

      case 'CA': case 'ca':
        // Override the title.
        $('#block-pt-td-td-top-search #td_search_label a').text('Find a Counsellor');

        // Override the placeholder text.
        $('#block-pt-td-td-top-search #searchField').attr('placeholder', 'City or Postal Code');

        // Override the pt_td_label
        $('#block-pt-td-td-top-search #td_existing .pt_td_label').text('Counsellors:');

        // Show the top search block
        $('#block-pt-td-td-top-search').closest('.region-below-header').addClass('show-search-block');
        break;

      case 'KY': case 'ky':
        // Show the top search block
        $('#block-pt-td-td-top-search').closest('.region-below-header').addClass('show-search-block');

        break;
      default:
        // Do nothing, really.
    }

    // Get the country, if we don't already know. And show Therapist Directory search.
    if (pt_country == '' || pt_country == 'undefined') {
      $.getJSON("/sites/all/modules/custom/pt_td/api/region.php")
        .done(function (json) {

          if ( json.success ) {
            // Set the country to local storage.
            localStorage.setItem("pt_country", json.country);
            switch (json.country) {
              case 'CA':
              case 'ca':
                // Override the title.
                $('#block-pt-td-td-top-search #td_search_label a').text('Find a Counsellor');

                // Override the placeholder text.
                $('#block-pt-td-td-top-search #searchField').attr('placeholder', 'City or Postal Code');

                // Override the pt_td_label
                $('#block-pt-td-td-top-search #td_existing .pt_td_label').text('Counsellors:');

                // Show the top search block
                $('#block-pt-td-td-top-search').closest('.region-below-header').addClass('show-search-block');
                break;
              case 'US':
              case 'us':
              case 'KY':
              case 'ky':
                // Show the top search block
                $('#block-pt-td-td-top-search').closest('.region-below-header').addClass('show-search-block');
                break;
              default:
              // Do nothing, really.
            }
          }
        });
    }
  });

})(jQuery);
;
(function ($) {
  $(document).ready(function(){
    $('#pt-social-media a').not('.email-share-button, .more-share-button, .facebook-share-button').click(function(e){
      e.preventDefault();
      var url = $(this).attr('href');
      window.open(url, 'newwindow', config='height=430, width=500, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
    });
    $('#pt-social-media a.more-share-button').click(function(e){
      e.preventDefault();
      $('.pt-social-media_google-plus, .pt-social-media_linkedin, .pt-social-media_stumble, .pt-social-media_reddit').toggle();
      if ($(this).text() == 'MORE') {
        $('.pt-social-media_more span').text('LESS');
      }
      else {
        $('.pt-social-media_more span').text('MORE');
      }

    });
    $('#pt-social-media-notags a.more-share-button').click(function(e){
      e.preventDefault();
      $('.pt-social-media-notags_google-plus, .pt-social-media-notags_linkedin, .pt-social-media-notags_stumble, .pt-social-media-notags_reddit').toggle();
      if ($(this).text() == 'MORE') {
        $('.pt-social-media-notags_more span').text('LESS');
      }
      else {
        $('.pt-social-media-notags_more span').text('MORE');
      }

    });

    //var url = 'https://www.psychologytoday.com' + window.location.pathname;
    //
    //// Facebook shares
    //$.get( "http://graph.facebook.com/", { id: url } )
    //  .done(function( data ) {
    //  if (data.shares > 0) {
    //    $('#facebook-share span').html( $('#facebook-share span').html() + '('+data.shares+')');
    //  }
    //});
    //


  });
})(jQuery);
;
(function($){

  Drupal.behaviors.pt_ads = {
    attach: function (context, settings) {

      /**
       *
       * Script for making Blog Entry ads scroll with page
       * We'll set ad to fixed position fixed when it hits the top of page and has scrolled less the available height of its scrolling 'runway'
       *
       */
      // Function for getting page scroll position
      function getScrollTop() {
        if (typeof window.pageYOffset !== 'undefined' ) {
          // Most browsers
          return window.pageYOffset;
        }

        var d = document.documentElement;
        if (d.clientHeight) {
          // IE in standards mode
          return d.scrollTop;
        }

        // IE in quirks mode
        return document.body.scrollTop;
      }

      // Do this after window load bc loading ads is slow and won't return a height until fully loaded
      $(window).load(function() {

        page_top = $('.node-type-blog-entry .blue-outer, .node-type-article .blue-outer').innerHeight() + $('.node-type-blog-entry .yellow-outer, .node-type-article .yellow-outer').innerHeight() + 6; // +6px for padding and menu bottom gradient

        // Call all the necessary ad functions in order
        // we do this for blog entries and articles
        //adscroll_600_setup();
        if ( $('body').hasClass('node-type-blog-entry') ) {
          inline_ads_setup('.node-blog-entry');

          // Place incontent ads based on window width ( aka precense of sidebar)
          if (window.innerWidth > 800) {
            place_inline_desktop_ads('.node-blog-entry');
          } else {
            place_inline_tablet_ads('.node-blog-entry');
          }

        }

        if ( $('body').hasClass('node-type-article')  ) {
          inline_ads_setup('.node-article');

          // Place incontent ads based on window width ( aka precense of sidebar)
          if (window.innerWidth > 800) {
            place_inline_desktop_ads('.node-article');
          } else {
            place_inline_tablet_ads('.node-article');
          }
        }

        //set_ad_runway_600(ads_inserted);


        // This code runs as the user scrolls
        window.onscroll = function() {
          // Update scroll position tracker
          var scroll_pos = getScrollTop();

          // Make sure the right ads are loaded on the page before executing the js
          if ($('.block-pt-ads-300x-right-www').length) {

            // Pass the right node type selector
            if ( $('body').hasClass('node-type-blog-entry') || $('body').hasClass('node-type-article') || $('body').hasClass('page-news')  ) {
              adscroll_250(scroll_pos);
            }
          }

          //if ($('#block-pt-ads-300x600-right2-www-site').length) {
          //  adscroll_600(scroll_pos);
          //}
        }
        // End Ad Scrolling code



        // Add a class on ad blocks that have NOT actually loaded an ad unit
        $('.pt-ad').each(function() {
          if( !$(this).find('iframe').attr('id') ) {
            $(this).closest('.block-pt-ads').addClass('ad-unit-not-loaded');
          }
        });



      }); // end $(window).load()

      /*
        * Insert an inline ad in blog entry bodies
       * - Insert after the end of the 600px tall sidebar ad
       * - Insert every three paragraphs following that
       * - Don't insert if there are fewer than 2 paragraphs remaining
       */

      function inline_ads_setup(selector) {
        // Get the ad units set in pt_ads.module
        units = Drupal.settings.pt_ads;

        // Initiate a variable with the bottom position of second sidebar ad, add height including 'Advertisement' label
        sidebar_tall_ad_position = $('#block-pt-ads-300x600-right2-www-site .block__content').offset().top + 630;

        // Initiate tracking variable starting at the the top position of the blog entry
        p_end = $(selector + ' .field__item').offset().top;

        // Initiate tracking variable for number of remaining paragraphs
        p_count = $(selector +  ' .field-name-body .field__item > *').not('div.insertArea > .image-article-inline-half').length;

        // GLOBAL: Initiate a variable to track the number of ads we've inserted
        ads_inserted = 0;

        // Initiate a variable to sum paragraph heights after we start inserting ads;
        ad_spacing = 0;

        // The number of pixels spacing between first and second incontent ads
        incontent_ad_spacing = 750;

        // Tablet/mobile doesn't have sidebar so place incontent ads after this number of paragraphs
        tablet_first_placement = 4;
      }


      function place_inline_desktop_ads(selector) {
        var in_content_ad_unit = null;

        $(selector + ' .field__item > *').not('div.insertArea > .image-article-inline-half').each(function () {

          // Decriment the paragraph counter
          // Break out of this each loop if there are fewer than 2 paragraphs left
          p_count--;
          if (p_count <= 2) {
            return false;
          }

          // Track bottom position of each p (with margin)
          p_end += $(this).outerHeight(true);

          // If the bottom of this p is after the 600px sidebar ad, insert inline ad into body
          if (p_end > sidebar_tall_ad_position) {

            // Insert second ad if first has already been added
            if (ads_inserted >= 1 && ads_inserted < 4) {

              // Track p heights after first ad insert; second ad goes in after 750px
              ad_spacing += $(this).outerHeight(true);

              if (p_count > 2 && ad_spacing > incontent_ad_spacing) {
                in_content_ad_unit = units.shift();
                $(this).after(in_content_ad_unit.markup);
                ads_inserted++;

                // break out after three incontent ads have been placed
                if (ads_inserted > 3) {return false;}

                // Restart ad spacing distance tracker after each add placed
                ad_spacing = 0;
              }
            }

            // Insert first ad
            if (ads_inserted == 0 && p_count > 2) {
              in_content_ad_unit = units.shift();
              $(this).after(in_content_ad_unit.markup);
              ads_inserted++;
            }

          }
        });
      }


      function place_inline_tablet_ads(selector) {
        var tablet_p_count = 0;

        $(selector + ' .field__item > *').not('div.insertArea > .image-article-inline-half').each(function () {

          // Decriment the paragraph counter
          // Break out of this each loop if there are fewer than 2 paragraphs left
          p_count--;
          if (p_count <= 2) {
            return false;
          }

          // Track bottom position of each p (with margin)
          p_end += $(this).outerHeight(true);

          tablet_p_count++;

          // Skip the set number of items before placing incontent ads
          if (tablet_p_count >= tablet_first_placement ) {

            // Insert second ad if first has already been added
            if (ads_inserted >= 1 && ads_inserted <= 3) {

              // Track p heights after first ad insert; second ad goes in after 750px
              ad_spacing += $(this).outerHeight(true);

              if (p_count > 2 && ad_spacing > incontent_ad_spacing) {
                $(this).after(units.shift().markup);

                ads_inserted++;

                // break out after three incontent ads have been placed
                if (ads_inserted > 3) {return false;}

                // Restart ad spacing distance tracker after each add placed
                ad_spacing = 0;
              }
            }

            // Insert first ad
            if (ads_inserted == 0 && p_count > 2) {
              ads_inserted++;
              $(this).after(units.shift().markup);
            }

          }
        });
      }




      // Setup ad scrolling function for 250x300 sidebar ads
      function adscroll_250(scroll_pos) {
        // Setup variables we'll need to ad scrolling for Blog Entry ad units
        var ad_container = $('.region-sidebar-first .block-pt-ads-300x-right-www');
        var ad_container_top = 0;
        if (ad_container.length) {
          ad_container_top = ad_container.offset().top;
        }
        var ad = ad_container.find('.block__content');

        // Code for scrolling FIRST ad unit on Blog Entry page
        // Only activate ad scrolling on sidebar ads that are 300x250
        // with 'Advertisement' label, ad height is 270 (250px + 20px)
        if (ad.innerHeight() <= 270) {
          // Set ad container height so ad has a 'runway' to scroll with (10px margin)
          ad_container.css('height', '620px');

          if ((scroll_pos + page_top) >= ad_container_top && (scroll_pos + page_top) <= (ad_container_top + 350)) {
            ad.css({
              'position': 'fixed',
              'top': page_top,
              'width': '300px'
            });
          }
          else if ((scroll_pos + page_top) >= (ad_container_top + 351)) {
            ad.css({
              'position': 'relative',
              'top': '351px',
            });
          }
          else {
            ad.css({
              'position': 'relative',
              'top': '',
              'width': ''
            });
          }
        };
      } // end adscroll_250

      // Setup ad scrolling function for 600x300 sidebar ads
      function adscroll_600(scroll_pos) {
        // Code for scrolling SECOND ad unit on Blog Entry page
        // Height of ad unit with 'Advertisement' label == 620px
        if ( second_ad_runway_height > 620 ) { // only initiate if calculated runway is bigger than the ad itself
          if ((scroll_pos + page_top) >= second_ad_container_top && (scroll_pos + page_top) <= (second_ad_container_top + second_ad_runway_height - 620 )) {
            second_ad.css({
              'position': 'fixed',
              'top': page_top,
              'width': '300px'
            });
          }
          else if ((scroll_pos + page_top) >= (second_ad_container_top + second_ad_runway_height - 620)) {
            second_ad.css({
              'position': 'relative',
              'top': (second_ad_runway_height - 620) + 'px',
            });
          }
          else {
            second_ad.css({
              'position': 'relative',
              'top': '',
              'width': ''
            });
          }
        }
      } // end adscroll_600

      function adscroll_600_setup() {
        // Calculate top of second ad unit to social media icons on blog entries
        social_bottom = 0;
        if ($('.pt-social-media-bottom').length) {
          social_bottom = $('.pt-social-media-bottom').offset().top - 5; //
        }

        second_ad_container = $('#block-pt-ads-300x600-right2-www-site');
        second_ad_container_top = second_ad_container.offset().top;
        second_ad = second_ad_container.find('.block__content');
      } // end adscroll_600_setup


      function set_ad_runway_600(num_ads) {
        second_ad_runway_height = (social_bottom - second_ad_container_top);

        if (num_ads > 0) {
          var inline_ad_height = $('.field-name-body .pt-ads-300').once().outerHeight(true);
          second_ad_runway_height += (num_ads * inline_ad_height);
        }
        second_ad_container.css('height', second_ad_runway_height);
      }
    }
  }
})(jQuery);
;
(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * Automatically display the guidelines of the selected text format.
 */
Drupal.behaviors.filterGuidelines = {
  attach: function (context) {
    $('.filter-guidelines', context).once('filter-guidelines')
      .find(':header').hide()
      .closest('.filter-wrapper').find('select.filter-list')
      .bind('change', function () {
        $(this).closest('.filter-wrapper')
          .find('.filter-guidelines-item').hide()
          .siblings('.filter-guidelines-' + this.value).show();
      })
      .change();
  }
};

})(jQuery);
;
(function ($) {

Drupal.mollom = Drupal.mollom || {};

/**
 * Open links to Mollom.com in a new window.
 *
 * Required for valid XHTML Strict markup.
 */
Drupal.behaviors.mollomTarget = {
  attach: function (context) {
    $(context).find('.mollom-target').click(function () {
      this.target = '_blank';
    });
  }
};

/**
 * Retrieve and attach the form behavior analysis tracking image if it has not
 * yet been added for the form.
 */
Drupal.behaviors.mollomFBA = {
  attach: function (context, settings) {
    $(':input[name="mollom[fba]"][value=""]', context).once().each(function() {
      $input = $(this);
      $.ajax({
        url: Drupal.settings.basePath + Drupal.settings.pathPrefix + 'mollom/fba',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
          if (!data.tracking_id || !data.tracking_url) {
            return;
          }
          // Save the tracking id in the hidden field.
          $input.val(data.tracking_id);
          // Attach the tracking image.
          $('<img src="' + data.tracking_url + '" width="1" height="1" alt="" />').appendTo('body');
        }
      })
    });
  }
};

 /**
 * Attach click event handlers for CAPTCHA links.
 */
Drupal.behaviors.mollomCaptcha = {
  attach: function (context, settings) {
    $('a.mollom-switch-captcha', context).click(function (e) {
      var $mollomForm = $(this).parents('form');
      var newCaptchaType = $(this).hasClass('mollom-audio-captcha') ? 'audio' : 'image';
      Drupal.mollom.getMollomCaptcha(newCaptchaType, $mollomForm);
    });
    $('a.mollom-refresh-captcha', context).click(function (e) {
      var $mollomForm = $(this).parents('form');
      var currentCaptchaType = $(this).hasClass('mollom-refresh-audio') ? 'audio' : 'image';
      Drupal.mollom.getMollomCaptcha(currentCaptchaType, $mollomForm);
    });
  }
};

/**
 * Fetch a Mollom CAPTCHA and output the image or audio into the form.
 *
 * @param captchaType
 *   The type of CAPTCHA to retrieve; one of "audio" or "image".
 * @param context
 *   The form context for this retrieval.
 */
Drupal.mollom.getMollomCaptcha = function (captchaType, context) {
  var formBuildId = $('input[name="form_build_id"]', context).val();
  var mollomContentId = $('input.mollom-content-id', context).val();

  var path = 'mollom/captcha/' + captchaType + '/' + formBuildId;
  if (mollomContentId) {
    path += '/' + mollomContentId;
  }
  path += '?cb=' + new Date().getTime();

  // Retrieve a new CAPTCHA.
  $.ajax({
    url: Drupal.settings.basePath + Drupal.settings.pathPrefix + path,
    type: 'POST',
    dataType: 'json',
    success: function (data) {
      if (!(data && data.content)) {
        return;
      }
      // Inject new CAPTCHA.
      $('.mollom-captcha-content', context).parent().replaceWith(data.content);
      // Update CAPTCHA ID.
      $('input.mollom-captcha-id', context).val(data.captchaId);
      // Add an onclick-event handler for the new link.
      Drupal.attachBehaviors(context);
      // Focus on the CAPTCHA input.
      if (captchaType == 'image') {
          $('input[name="mollom[captcha]"]', context).focus();
      } else {
         // Focus on audio player.
         // Fallback player code is responsible for setting focus upon embed.
         if ($('#mollom_captcha_audio').is(":visible")) {
             $('#mollom_captcha_audio').focus();
         }
      }
    }
  });
  return false;
}

})(jQuery);
;
/**
 * @file
 * A JavaScript file for the theme.
 * This file should be used as a template for your other js files.
 * It defines a drupal behavior the "Drupal way".
 *
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function ($, Drupal, window, document, undefined) {
  'use strict';

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.hideSubmitBlockit = {
    attach: function(context) {
      var timeoutId = null;
      $('form', context).once('hideSubmitButton', function () {
        var $form = $(this);

        // Bind to input elements.
        if (Drupal.settings.hide_submit.hide_submit_method === 'indicator') {
          // Replace input elements with buttons.
          $('input.form-submit', $form).each(function(index, el) {
            var attrs = {};

            $.each($(this)[0].attributes, function(idx, attr) {
                attrs[attr.nodeName] = attr.nodeValue;
            });

            $(this).replaceWith(function() {
                return $("<button/>", attrs).append($(this).attr('value'));
            });
          });
          // Add needed attributes to the submit buttons.
          $('button.form-submit', $form).each(function(index, el) {
            $(this).addClass('ladda-button button').attr({
              'data-style': Drupal.settings.hide_submit.hide_submit_indicator_style,
              'data-spinner-color': Drupal.settings.hide_submit.hide_submit_spinner_color,
              'data-spinner-lines': Drupal.settings.hide_submit.hide_submit_spinner_lines
            });
          });
          Ladda.bind('.ladda-button', $form, {
            timeout: Drupal.settings.hide_submit.hide_submit_reset_time
          });
        }
        else {
          $('input.form-submit, button.form-submit', $form).click(function (e) {
            var el = $(this);
            el.after('<input type="hidden" name="' + el.attr('name') + '" value="' + el.attr('value') + '" />');
            return true;
          });
        }

        // Bind to form submit.
        $('form', context).submit(function (e) {
          var $inp;
          if (!e.isPropagationStopped()) {
            if (Drupal.settings.hide_submit.hide_submit_method === 'disable') {
              $('input.form-submit, button.form-submit', $form).attr('disabled', 'disabled').each(function (i) {
                var $button = $(this);
                if (Drupal.settings.hide_submit.hide_submit_css) {
                  $button.addClass(Drupal.settings.hide_submit.hide_submit_css);
                }
                if (Drupal.settings.hide_submit.hide_submit_abtext) {
                  $button.val($button.val() + ' ' + Drupal.settings.hide_submit.hide_submit_abtext);
                }
                $inp = $button;
              });

              if ($inp && Drupal.settings.hide_submit.hide_submit_atext) {
                $inp.after('<span class="hide-submit-text">' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_atext) + '</span>');
              }
            }
            else if (Drupal.settings.hide_submit.hide_submit_method !== 'indicator'){
              var pdiv = '<div class="hide-submit-text' + (Drupal.settings.hide_submit.hide_submit_hide_css ? ' ' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_hide_css) + '"' : '') + '>' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_hide_text) + '</div>';
              if (Drupal.settings.hide_submit.hide_submit_hide_fx) {
                $('input.form-submit, button.form-submit', $form).addClass(Drupal.settings.hide_submit.hide_submit_css).fadeOut(100).eq(0).after(pdiv);
                $('input.form-submit, button.form-submit', $form).next().fadeIn(100);
              }
              else {
                $('input.form-submit, button.form-submit', $form).addClass(Drupal.settings.hide_submit.hide_submit_css).hide().eq(0).after(pdiv);
              }
            }
            // Add a timeout to reset the buttons (if needed).
            if (Drupal.settings.hide_submit.hide_submit_reset_time) {
              timeoutId = window.setTimeout(function() {
                hideSubmitResetButtons(null, $form);
              }, Drupal.settings.hide_submit.hide_submit_reset_time);
            }
          }
          return true;
        });
      });

      // Bind to clientsideValidationFormHasErrors to support clientside validation.
      // $(document).bind('clientsideValidationFormHasErrors', function(event, form) {
        //hideSubmitResetButtons(event, form.form);
      // });

      // Reset all buttons.
      function hideSubmitResetButtons(event, form) {
        // Clear timer.
        window.clearTimeout(timeoutId);
        timeoutId = null;
        switch (Drupal.settings.hide_submit.hide_submit_method) {
          case 'disable':
            $('input.' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_css) + ', button.' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_css), form)
              .each(function (i, el) {
                $(el).removeClass(Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_hide_css))
                  .removeAttr('disabled');
              });
            $('.hide-submit-text', form).remove();
            break;

          case 'indicator':
            Ladda.stopAll();
            break;

          default:
            $('input.' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_css) + ', button.' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_css), form)
              .each(function (i, el) {
                $(el).stop()
                  .removeClass(Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_hide_css))
                  .show();
              });
            $('.hide-submit-text', form).remove();
        }
      }
    }
  };

})(jQuery, Drupal, window, this.document);
;
