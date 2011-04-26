(function () {
  function log(str) {
    if(typeof console != 'undefined' && typeof console.log != 'undefined') {
      console.log(str);
    }
  }

  var ROTATOR = new function Rotator () {
    var DELAY = 500;

    var summaries, selectedSummary, interval;

    // Move to the next story, or, if we're at the end, the first story.
    function iterate() {
      var nextIndex = selectedSummary.data('storyIndex') + 1;
      if(nextIndex == summaries.length) {
        nextIndex = 0;
      }
      selectSummary(summaries.eq(nextIndex));
    }

    // Select a story by its summary jQuery object
    function selectSummary(summary) {
      selectedSummary.removeClass('selected');
      selectedSummary = summary.addClass('selected');
    }

    // Start the timed rotation
    function start() {
      interval = setInterval(iterate, DELAY);
    }

    // Stop the timed rotation
    function stop() {
      clearInterval(interval);
      interval = null;
    }

    // Set up the rotator, and start the timed rotation. This method need only
    // be called once.
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

