// Include this file at the end of the <body>.

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
      ROTATOR.stop();
    }).mouseout(function () {
      // Once I stop hovering, change all you like.
      ROTATOR.start();
    });

    // Keep a record of which story is already marked as selected.
    selectedSummary = summaries.filter('.selected');
  }

  // Start the timed rotation
  this.start = function () {
    interval = setInterval(iterate, delay);
  }

  // Stop the timed rotation
  this.stop = function () {
    clearInterval(interval);
    interval = null;
  }
};

ROTATOR.initialize({
  delay: 5000,
  previews: '#featuredstories li',
  summaries: '#storylist li'
});

// Appending ?norotate to the URL will disable rotation
if(document.location.search.indexOf('norotate') == -1) {
  ROTATOR.start();
}
