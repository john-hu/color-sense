$(function docReady() {
  function resizeGame() {
    // the bootstrap has 15px for padding size.
    // we need to subtract them before calculation.
    var wheelWidth = $('.color-wheel').innerWidth() - 15;
    var wheelHeight = $('.color-wheel').innerHeight() - 15;
    var wheelSize = Math.min(wheelWidth, wheelHeight);

    // posit each fan and center at screen
    $('.fan-shape').width(wheelSize + 'px');
    $('.fan-shape').height(wheelSize + 'px');
    $('.fan-shape').css('transform', 'translate(' + ((wheelWidth - wheelSize) / 2) + 'px,'
                                                  + ((wheelHeight - wheelSize) / 2) + 'px)');
    // posit mixed color and center at screen
    $('.mixed-color').width(wheelSize / 2 + 'px');
    $('.mixed-color').height(wheelSize / 2 + 'px');
    $('.mixed-color').css('transform', 'translate(' + ((wheelWidth - wheelSize / 2) / 2) + 'px,'
                                                    + ((wheelHeight - wheelSize / 2) / 2) + 'px)');
    // posit target color and center at screen
    $('.target-color').width(wheelSize / 4 + 'px');
    $('.target-color').height(wheelSize / 4 + 'px');
    $('.target-color').css('transform', 'translate(' + ((wheelWidth - wheelSize / 4) / 2) + 'px,'
                                                     + ((wheelHeight - wheelSize / 4) / 2) + 'px)');

  }

  $(window).resize(resizeGame);

  resizeGame();

});

