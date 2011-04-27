(function () {
  function log(str) {
    if(typeof console != 'undefined' && typeof console.log != 'undefined') {
      console.log(str);
    }
  }

  var ROTATOR = new function Rotator () {
    var summaries, selectedSummary, interval, delay;

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
      // Deselect this summary and its preview
      selectedSummary.removeClass('selected');
      selectedSummary.data('storyPreview').removeClass('selected');

      // Select the new summary and its preview
      selectedSummary = summary.addClass('selected');
      selectedSummary.data('storyPreview').addClass('selected');
    }

    // Start the timed rotation
    function start() {
      interval = setInterval(iterate, delay);
    }

    // Stop the timed rotation
    function stop() {
      clearInterval(interval);
      interval = null;
    }

    // Set up the rotator, and start the timed rotation. This method need only
    // be called once.
    this.initialize = function (options) {
      // First thing first: let's process those options.

      delay = options.delay;
      summaries = $(options.summaries);
      var previews = $(options.previews);

      // Next, prep those summaries with their data and event triggers.
      summaries.each(function (storyIndex) {
        // Cache the story's index and preview, so we don't have to look it up
        // on every iteration.
        $(this).data({
          storyPreview: previews.eq(storyIndex),
          storyIndex: storyIndex
        });
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

      // Start the timed rotation.
      start();
    }
  };

  ROTATOR.initialize({
    delay: 5000,
    previews: '#headline article',
    summaries: '#storylist li'
  });
})();

