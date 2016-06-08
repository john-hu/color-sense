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

  function initColorLevel() {
    $('.level-text').text(level);
    var span = Math.floor(256 / level);
    var start = span / 2;
    for (var i = 0; i < level; i++) {
      colorMap[i] = Math.round(start + span * i);
    }
  }

  function initColor() {
    var c = colorMap[0];

    $('.red .fan-shape-mask .fan-color').data('color-index', 0);
    $('.green .fan-shape-mask .fan-color').data('color-index', 0);
    $('.blue .fan-shape-mask .fan-color').data('color-index', 0);

    renderColor();
    // randomize target color
    var rIdx;
    var gIdx;
    var bIdx;
    // the 0, 0, 0 will not be a target color because it's the default value.
    while (!rIdx && !gIdx && !bIdx) {
      rIdx = Math.floor(level * Math.random());
      gIdx = Math.floor(level * Math.random());
      bIdx = Math.floor(level * Math.random());
    }

    var r = colorMap[rIdx];
    var g = colorMap[gIdx];
    var b = colorMap[bIdx];

    $('.target-color').css('background-color', 'rgb(' + r + ', ' + g + ', ' + b + ')');
    answer = { 'r': r, 'g': g, 'b': b };
  }

  function renderColor(dr, dg, db) {
    var r = dr || colorMap[$('.red .fan-shape-mask .fan-color').data('color-index')];
    var g = dg || colorMap[$('.green .fan-shape-mask .fan-color').data('color-index')];
    var b = db || colorMap[$('.blue .fan-shape-mask .fan-color').data('color-index')];

    // put color to fans
    $('.red .fan-shape-mask .fan-color').css('background-color', 'rgb(' + r + ', 0, 0)');
    $('.green .fan-shape-mask .fan-color').css('background-color', 'rgb(0, ' + g + ', 0)');
    $('.blue .fan-shape-mask .fan-color').css('background-color', 'rgb(0, 0, ' + b + ')');

    // render mixed color
    $('.mixed-color').css('background-color', 'rgb(' + r +', ' + g + ', ' + b + ')');
  }

  function handleColorClicked(e) {
    var selector;
    switch(e.target.innerText) {
      case 'R':
        selector = '.red .fan-shape-mask .fan-color';
        break;
      case 'G':
        selector = '.green .fan-shape-mask .fan-color';
        break;
      default:
        selector = '.blue .fan-shape-mask .fan-color';
        break;
    }
    var idx = $(selector).data('color-index');
    if (++idx >= level) {
      idx = 0;
    }
    $(selector).data('color-index', idx);

    renderColor();
    checkAnswer();
  }

  function checkAnswer() {
    var r = colorMap[$('.red .fan-shape-mask .fan-color').data('color-index')];
    var g = colorMap[$('.green .fan-shape-mask .fan-color').data('color-index')];
    var b = colorMap[$('.blue .fan-shape-mask .fan-color').data('color-index')];
    if (answer.r === r && answer.g === g && answer.b === b) {
      alert('You are correct!! Please try next level!!!');
      level++;
      initColorLevel();
      initColor();
    }
  }

  var level = 3;
  var colorMap = [];
  var answer = {};

  $(window).resize(resizeGame);

  // The following code cannot work because of overlapping issue. I should change it
  // to my another circular-menu component to handle it. The buttons, r, g, b, are
  // workaround of this issue.
  $('.button-r').click(handleColorClicked);
  $('.button-g').click(handleColorClicked);
  $('.button-b').click(handleColorClicked);
  // $('.red .fan-shape-mask .fan-color').click(handleColorClicked);
  // $('.green .fan-shape-mask .fan-color').click(handleColorClicked);
  // $('.blue .fan-shape-mask .fan-color').click(handleColorClicked);

  resizeGame();
  initColorLevel();
  initColor();

});

