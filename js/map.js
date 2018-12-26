'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPinList = document.querySelector('.map__pins');

  var mainPinMouseMoveCallback = null;

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftCoord = {
        x: startCoord.x - moveEvt.pageX,
        y: startCoord.y - moveEvt.pageY
      };

      startCoord = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      var pinPositionX = mainPin.offsetLeft - shiftCoord.x;
      var pinPositionY = mainPin.offsetTop - shiftCoord.y;

      if (pinPositionX < window.utils.PinCoordinatLimit.LEFT) {
        pinPositionX = window.utils.PinCoordinatLimit.LEFT;
      } else if (pinPositionX > window.utils.PinCoordinatLimit.RIGHT) {
        pinPositionX = window.utils.PinCoordinatLimit.RIGHT;
      } else if (pinPositionY < window.utils.PinCoordinatLimit.TOP) {
        pinPositionY = window.utils.PinCoordinatLimit.TOP;
      } else if (pinPositionY > window.utils.PinCoordinatLimit.BOTTOM) {
        pinPositionY = window.utils.PinCoordinatLimit.BOTTOM;
      }

      if (mainPinMouseMoveCallback) {
        mainPinMouseMoveCallback();
      }

      mainPin.style.top = pinPositionY + 'px';
      mainPin.style.left = pinPositionX + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (mainPinMouseMoveCallback) {
        mainPinMouseMoveCallback();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var removeDescription = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var renderDescription = function (cardElement) {
    map.appendChild(cardElement);
  };

  var getCoordinatePin = function () {
    if (map.classList.contains('map--faded')) {
      var mainPinX = mainPin.offsetTop + (mainPin.clientHeight / 2);
      var mainPinY = mainPin.offsetLeft + (mainPin.clientWidth / 2);
    } else {
      mainPinX = mainPin.offsetTop + window.utils.MAIN_PIN_HEIGHT_INDEX;
      mainPinY = mainPin.offsetLeft + window.utils.MAIN_PIN_WIDTH_INDEX;
    }
    return mainPinY + ',' + mainPinX;
  };

  var setMainPinMouseMoveCallback = function (callback) {
    mainPinMouseMoveCallback = callback;
  };

  var renderPins = function (pinsFragment) {
    if (pinsFragment) {
      mapPinList.appendChild(pinsFragment);
    }
  };

  var clear = function () {
    removeDescription();
    var pins = mapPinList.querySelectorAll('.map__pin--users');

    for (var j = 0; j < pins.length; j++) {
      pins[j].remove();
    }
  };

  var changeState = function () {
    map.classList.toggle('map--faded');
  };

  var reset = function () {
    removeDescription();
    changeState();
    clear();
    mainPin.style.top = window.utils.MAIN_PIN_TOP_BASIC_POSITION;
    mainPin.style.left = window.utils.MAIN_PIN_LEFT_BASIC_POSITION;
  };

  var addMouseUpListener = function (callback) {
    var onMainPinMouseUp = function () {
      callback();
      mainPin.removeEventListener('mouseup', onMainPinMouseUp);
    };
    mainPin.addEventListener('mouseup', onMainPinMouseUp);
  };

  window.map = {
    removeDescription: removeDescription,
    clear: clear,
    getCoordinatePin: getCoordinatePin,
    renderPins: renderPins,
    renderDescription: renderDescription,
    setMainPinMouseMoveCallback: setMainPinMouseMoveCallback,
    changeState: changeState,
    reset: reset,
    addMouseUpListener: addMouseUpListener
  };
})();
