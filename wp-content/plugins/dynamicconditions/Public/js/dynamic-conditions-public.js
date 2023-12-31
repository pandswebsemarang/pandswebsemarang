(function ($) {
  'use strict';

  /**
   * All of the code for your public-facing JavaScript source
   * should reside in this file.
   *
   * Note that this assume you're going to use jQuery, so it prepares
   * the $ function reference to be used within the scope of this
   * function.
   *
   * From here, you're able to define handlers for when the DOM is
   * ready:
   *
   * $(function() {
   *
   * });
   *
   * Or when the window is loaded:
   *
   * $( window ).load(function() {
   *
   * });
   *
   * ...and so on.
   *
   * Remember that ideally, we should not attach any more than a single DOM-ready or window-load handler
   * for any particular page. Though other scripts in WordPress core, other plugins, and other themes may
   * be doing this, we should try to minimize doing that in our own work.
   */

  function resizeColumns() {
    var columns = $('.dc-madxartwork-hidden-column');
    columns.each(function (index, column) {
      column = $(column);
      var hiddenSize = parseFloat(column.data('size')),
        row = column.closest('.madxartwork-row'),
        children = row.find('> .madxartwork-column'),
        rowSize = 0;

      if (children.length === 0) {
        return;
      }

      // get percent-width of row
      children.each(function (cIndex, child) {
        child = $(child);
        rowSize += parseFloat(child.width() / row.width() * 100);
      });

      children.each(function (cIndex, child) {
        // resize columns
        child = $(child);
        var childSize = parseFloat(child.width() / row.width() * 100),
          newSize = childSize + (hiddenSize * (childSize / rowSize));

        if (childSize < 100 && newSize < 100) {
          child.css({width: newSize + '%'});
        }
      });

    });
  }

  function resetColumns() {
    var columns = $('.dc-madxartwork-hidden-column');
    columns.each(function (index, column) {
      column = $(column);
      var row = column.closest('.madxartwork-row'),
        children = row.find('> .madxartwork-column');

      // reset width for recalc
      children.css({width: ''});
    });
  }


  $(window).on('resize', function () {
    resetColumns();
    resizeColumns();
  });

  $(window).on('madxartwork/frontend/init', function () {
    resetColumns();
    resizeColumns();
  });
})(jQuery);
