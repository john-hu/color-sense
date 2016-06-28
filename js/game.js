$(function docReady() {

  function resizeGame() {
    // the bootstrap has 15px for padding size.
    // we need to subtract them before calculation.
    var wheelWidth = $('.color-wheel').innerWidth() - 15;
    var wheelHeight = $('.color-wheel').innerHeight() - 15;
    var wheelSize = Math.min(wheelWidth, wheelHeight);

    // posit each fan and center at screen
    $('#main-container').width(wheelSize + 'px');
    $('#main-container').height(wheelSize + 'px');
    $('#main-container').css('transform', 'translate(' + ((wheelWidth - wheelSize) / 2) + 'px,'
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
    if (level > 256) {
      alert('You are awesome!!! You had finished all levels.');
      return false;
    }
    // Since the algorithm is starting from 3, we should subtract 2 to have a game from level 1.
    $('.level-text').text((level - 2));
    var span = Math.floor(256 / level);
    var start = span / 2;
    for (var i = 0; i < level; i++) {
      colorMap[i] = Math.round(start + span * i);
    }
    return true;
  }

  function initColor() {
    var c = colorMap[0];

    $('.red .circular-menu-item-anchor').data('color-index', level - 1);
    $('.green .circular-menu-item-anchor').data('color-index', level - 1);
    $('.blue .circular-menu-item-anchor').data('color-index', level - 1);

    renderColor();
    // randomize target color
    var rIdx;
    var gIdx;
    var bIdx;
    // the level - 1 will not be a target color because it's the default value.
    do {
      rIdx = Math.floor(level * Math.random());
      gIdx = Math.floor(level * Math.random());
      bIdx = Math.floor(level * Math.random());
    } while (rIdx === level - 1 && gIdx === level - 1 && bIdx === level - 1)

    var r = colorMap[rIdx];
    var g = colorMap[gIdx];
    var b = colorMap[bIdx];

    $('.target-color').css('background-color', 'rgb(' + r + ', ' + g + ', ' + b + ')');
    answer = { 'r': r, 'g': g, 'b': b };
  }

  function renderColor(dr, dg, db) {
    var r = dr || colorMap[$('.red .circular-menu-item-anchor').data('color-index')];
    var g = dg || colorMap[$('.green .circular-menu-item-anchor').data('color-index')];
    var b = db || colorMap[$('.blue .circular-menu-item-anchor').data('color-index')];

    // XXX: There should be some issues here. We should use css function instead of attr. The color
    // will not be set when we use css('background-color', 'rgb(r, g, b)');
    // put color to fans
    $('.red .circular-menu-item-anchor').attr('style', 'background-color: rgb(' + r + ', 0, 0);');
    $('.green .circular-menu-item-anchor').attr('style', 'background-color: rgb(0, ' + g + ', 0);');
    $('.blue .circular-menu-item-anchor').attr('style', 'background-color: rgb(0, 0, ' + b + ');');

    // render mixed color
    $('.mixed-color').css('background-color', 'rgb(' + r +', ' + g + ', ' + b + ')');
  }

  function handleColorClicked(e) {
    var idx = $(e.target).data('color-index');
    if (++idx >= level) {
      idx = 0;
    }
    $(e.target).data('color-index', idx);

    renderColor();
    checkAnswer();
  }

  function checkAnswer() {
    var r = colorMap[$('.red .circular-menu-item-anchor').data('color-index')];
    var g = colorMap[$('.green .circular-menu-item-anchor').data('color-index')];
    var b = colorMap[$('.blue .circular-menu-item-anchor').data('color-index')];
    if (answer.r === r && answer.g === g && answer.b === b) {
      alert('You are correct!! Please try next level!!!');
      level++;
      initColorLevel() && initColor();
    }
  }

  function introduction() {
    if (document.cookie.indexOf('ftudone=true') > -1) {
      return;
    }
    var trip = new Trip([{
      'sel': $('.target-color'),
      'content': Lang.intro_target,
      'position': 's',
      'expose': true
    }, {
      'sel': $('.mixed-color'),
      'content': Lang.intro_mixed,
      'position': 'n',
      'expose': true
    }, {
      'sel': $('#main-container'),
      'content': Lang.intro_colors,
      'position': 'e',
      'expose': true
    }, {
      'content': Lang.intro_start,
      'position': 'screen-center',
      'expose': true
    }], {
      'delay': -1,
      'showNavigation' : true,
      'showCloseBox': true,
      'onEnd': function() {
        document.cookie = 'ftudone=true';
      }
    });
    trip.start();
  }

  // code starts from here.

  var level = 3;
  var colorMap = [];
  var answer = {};

  $(window).resize(resizeGame);

  var menu = new CircularMenu($('#main-container').get(0));
  menu.marginAngle = 2;
  menu.totalAngle = 360;
  menu.addItem('blue', null, 'blue');
  menu.addItem();
  menu.addItem('red', null, 'red');
  menu.addItem();
  menu.addItem('green', null, 'green');
  menu.addItem();
  menu.render();

  window.setTimeout(function() {
    menu.open().then(function() {
      $('.red .circular-menu-item-anchor').click(handleColorClicked);
      $('.green .circular-menu-item-anchor').click(handleColorClicked);
      $('.blue .circular-menu-item-anchor').click(handleColorClicked);

      resizeGame();
      initColorLevel() && initColor();
      introduction();
    });
  });
});

