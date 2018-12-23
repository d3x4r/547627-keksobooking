'use strict';

(function () {
  var MAIN_PIN_HEIGHT_INDEX = 70;
  var MAIN_PIN_WIDTH_INDEX = 32;
  var MAIN_PIN_TOP_BASIC_POSITION = '375px';
  var MAIN_PIN_LEFT_BASIC_POSITION = '570px';
  var MAIN_PIN_HEIGHT_CORRECTION = 15;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');

  var PinCoordinatLimit = {
    TOP: mapOverlay.offsetTop,
    RIGHT: mapOverlay.offsetWidth + mapOverlay.offsetLeft - mainPin.offsetWidth,
    BOTTOM: mapOverlay.offsetHeight + mapOverlay.offsetTop - mainPin.offsetHeight - MAIN_PIN_HEIGHT_CORRECTION,
    LEFT: mapOverlay.offsetLeft
  };

  var removeCard = function () {
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
      mainPinX = mainPin.offsetTop + MAIN_PIN_HEIGHT_INDEX;
      mainPinY = mainPin.offsetLeft + MAIN_PIN_WIDTH_INDEX;
    }
    return mainPinY + ',' + mainPinX;
  };

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

      if (pinPositionX < PinCoordinatLimit.LEFT) {
        pinPositionX = PinCoordinatLimit.LEFT;
      } else if (pinPositionX > PinCoordinatLimit.RIGHT) {
        pinPositionX = PinCoordinatLimit.RIGHT;
      } else if (pinPositionY < PinCoordinatLimit.TOP) {
        pinPositionY = PinCoordinatLimit.TOP;
      } else if (pinPositionY > PinCoordinatLimit.BOTTOM) {
        pinPositionY = PinCoordinatLimit.BOTTOM;
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

  var mainPinMouseMoveCallback = null;

  var setMainPinMouseMoveCallback = function (callback) {
    mainPinMouseMoveCallback = callback;
  };

  var mapPinList = document.querySelector('.map__pins');

  var renderPins = function (pinsFragment) {
    if (pinsFragment) {
      mapPinList.appendChild(pinsFragment);
    }
  };

  var clear = function () {
    removeCard();
    var pins = mapPinList.querySelectorAll('.map__pin--users');

    for (var j = 0; j < pins.length; j++) {
      pins[j].remove();
    }
  };

  var changeStatus = function () {
    map.classList.toggle('map--faded');
  };

  var reset = function () {
    removeCard();
    changeStatus();
    clear();
    mainPin.style.top = MAIN_PIN_TOP_BASIC_POSITION;
    mainPin.style.left = MAIN_PIN_LEFT_BASIC_POSITION;
  };

  var addMouseUpListener = function (callback) {
    var onMainPinMouseUp = function () {
      callback();
      mainPin.removeEventListener('mouseup', onMainPinMouseUp);
    };
    mainPin.addEventListener('mouseup', onMainPinMouseUp);
  };

  window.map = {
    removeCard: removeCard,
    clear: clear,
    getCoordinatePin: getCoordinatePin,
    renderPins: renderPins,
    renderDescription: renderDescription,
    setMainPinMouseMoveCallback: setMainPinMouseMoveCallback,
    changeStatus: changeStatus,
    reset: reset,
    addMouseUpListener: addMouseUpListener
  };
})();
