(function () {
  function log(str) {
    if(typeof console != 'undefined' && typeof console.log != 'undefined') {
      console.log(str);
    }
  }

  var ROTATOR = new function Rotator () {
    var DELAY = 500;

    var summaries, selectedSummary, interval;

    function iterate() {
      var nextIndex = selectedSummary.data('storyIndex') + 1;
      if(nextIndex == summaries.length) {
        nextIndex = 0;
      }
      selectSummary(summaries.eq(nextIndex));
    }

    function selectSummary(summary) {
      selectedSummary.removeClass('selected');
      selectedSummary = summary.addClass('selected');
    }

    function start() {
      interval = setInterval(iterate, DELAY);
    }

    function stop() {
      clearInterval(interval);
      interval = null;
    }

    this.initialize = function () {
      summaries = $('#storylist li').each(function (storyIndex) {
        // Cache the story's index, so we don't have to look it up on every
        // mouseover.
        $(this).data('storyIndex', storyIndex);
      }).mouseover(function () {
        // If I'm hovering over a story, I don't want it to change on me.
        selectSummary($(this));
        stop();
      }).mouseout(function () {
        // Once I stop hovering, change all you like.
        start();
      });

      // Keep a record of which story is already marked as selected.
      selectedSummary = summaries.filter('.selected');

      start();
    }
  };

  ROTATOR.initialize();
})();

