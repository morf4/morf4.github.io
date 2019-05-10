(function ($) {

Drupal.behaviors.quote = {
  attach: function(context, settings) {
    var level = Drupal.settings.quote_nest - 1;
    if (level >= 0) {
      var top = $('blockquote.quote-nest-1', context);
      $('blockquote.quote-msg:eq(' + level + ')', top)
      .hide()
      .after('<div class="quote-snip">' + Drupal.t('<a href="#">[snip]</a>') + '</div>')
      .next('.quote-snip')
      .children('a')
      .click(function(e) {
        $(this).parent().siblings('.quote-msg').toggle();
        e.preventDefault();
      });
    }
  }
};

}(jQuery));
;
(function($) {

  Drupal.behaviors.morecomments = {
    attach: function() {
      var pager = Drupal.settings.morecomments_pager;
      // Replace the default pager with the more comments pager
      $("#comments .pager").replaceWith(pager);

      $(".morecomments-button").live('click', morecomments_load);

      function morecomments_load(event) {
        var classes = $(this).attr("class");
        var info = classes.match("node-([0-9]+) page-([0-9]+)");
        $(".morecomments-button").append("<div class = 'wait'>&nbsp;</div>");
        $.get(Drupal.settings.basePath + "morecomments/" + info[1] + "/" + info[2], function(data) {
          var parent = $(".morecomments-button").parent();
          $(".morecomments-button").replaceWith(data);
          Drupal.attachBehaviors(parent);
        });
      }
    }
  };

})(jQuery);
;
(function($){

  Drupal.behaviors.pt_copyright = {
    /**
     * Most blog entries have inline images inserted directly into the body markup.
     * We want to ensure that the images all have Origin/Copyright information
     * displayed underneath the image.
     *
     * Most blog posts created in the Drupal 7 era have this automatically; the
     * Insert module templates already include the 'origin' text. But older blog
     * posts probably do not show Origin text with their inline images. Since it
     * is inline markup, it's too difficult to try to fix the markup server-side.
     *
     * This attach behavior finds all inline images, determines if it needs
     * source/copyright text, and programmatically inserts the text markup below
     * the image if so. The text associated with each image is supplied in
     * Drupal.settings, which comes from the pt_blog_node_view() hook.
     *
     * @see pt_blog_node_view()
     * @see https://teamten7.atlassian.net/browse/PT-233
     */
    attach: function (context, settings) {
      // Find all .insertArea elements.
      $('.insertArea', context).each(function(index){
        // Skip this .insertArea if it already has origin text.
        var hasOriginText = $(this).find('.insertArea--origin').text().trim();
        if (hasOriginText.length > 0) {
          return true;
        }
        // Find the proper origin text in Drupal.settings for this particular image.
        var fileSrc = $(this).find('img').attr('src');
        var originText = '';
        $.each(Drupal.settings.pt_copyright, function (index, value){
          // The 'index' corresponds to the stored image file name. However, the
          // actual img src attribute may have appended a '_0' before the file
          // extension, which would break the string match. To work around this,
          // we search the fileSrc attribute for only the part of the filename
          // without the extension, since that string will match regardless of
          // a '_0' appendix.
          // Because that new file string may be extremely generic, like 'image',
          // we also search for a leading slash in front of it.
          var imagename = '/' + index.substring(0, index.indexOf('.'));
          if (fileSrc.indexOf(imagename) > -1 && value !== '') {
            originText = value;
            return false;
          }
        });
        // Prepare and insert the origin text markup into the image's containing
        // DIV.
        var $imgContainer = $(this).find('.insert-inner');
        $imgContainer.append('<div class="subtext insertArea--origin">Source: ' + originText + '</div>');
      });
    }
  }

})(jQuery);
;
