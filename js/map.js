'use strict';

(function () {
  // Константы определяющие смещение координат на основе размеров метки mainPin
  var MAIN_PIN_HEIGHT_INDEX = 70;
  var MAIN_PIN_WIDTH_INDEX = 32;
  var MAIN_PIN_TOP_BASIC_POSITION = '375px';
  var MAIN_PIN_LEFT_BASIC_POSITION = '570px';


  // Поиск в разметке карты обьявлений
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');

  var removeCard = function () {
    var mapCard = window.map.map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };
  // Добавление карточки обьявления в разметку
  var renderDescription = function (cardElement) {
    map.appendChild(cardElement);
  };

  var pinLimits = {
    top: mapOverlay.offsetTop,
    right: mapOverlay.offsetWidth + mapOverlay.offsetLeft - mainPin.offsetWidth,
    // Тут я 15 временно вкорячил потому, что вроде как адекватно ограничил значение по Y внизу, но всеравно выходит за родителя, мне показалось, что это в разметке самой ножки косяк
    bottom: mapOverlay.offsetHeight + mapOverlay.offsetTop - mainPin.offsetHeight - 15,
    left: mapOverlay.offsetLeft
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

      // Итоговые координаты пина
      var pinPositionX = mainPin.offsetLeft - shiftCoord.x;
      var pinPositionY = mainPin.offsetTop - shiftCoord.y;
      // Проверка на выход пина за пределы родителя и запрет этого
      if (pinPositionX < pinLimits.left) {
        pinPositionX = pinLimits.left;
      } else if (pinPositionX > pinLimits.right) {
        pinPositionX = pinLimits.right;
      } else if (pinPositionY < pinLimits.top) {
        pinPositionY = pinLimits.top;
      } else if (pinPositionY > pinLimits.bottom) {
        pinPositionY = pinLimits.bottom;
      }

      if (mainPinMouseMoveCallback) {
        mainPinMouseMoveCallback();
      }

      // window.form.setAddress(getCoordinatePin());
      mainPin.style.top = pinPositionY + 'px';
      mainPin.style.left = pinPositionX + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (mainPinMouseMoveCallback) {
        mainPinMouseMoveCallback();
      }

      // window.form.setAddress(getCoordinatePin());
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

  // Поиск в разметке контейнера для меток обьявлений
  var mapPinList = document.querySelector('.map__pins');

  // Отрисовка фрагмента с пинами в разметку
  var renderPins = function (pinsFragment) {
    if (pinsFragment) {
      mapPinList.appendChild(pinsFragment);
    }
  };

  var renderFilteredData = function (data, createPinsCallback) {
    removeCard();
    clearMap();
    renderPins(createPinsCallback(data));
  };

  var clearMap = function () {
    var pins = mapPinList.querySelectorAll('.map__pin--users');

    for (var j = 0; j < pins.length; j++) {
      pins[j].remove();
    }
  };

  var changeMapStatus = function () {
    map.classList.toggle('map--faded');
  };

  var reset = function () {
    removeCard();
    changeMapStatus();
    clearMap();
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

  var putMainPinFocus = function () {
    mainPin.focus();
  };


  window.map = {
    map: map,
    removeCard: removeCard,
    getCoordinatePin: getCoordinatePin,
    renderPins: renderPins,
    renderDescription: renderDescription,
    setMainPinMouseMoveCallback: setMainPinMouseMoveCallback,
    changeMapStatus: changeMapStatus,
    reset: reset,
    addMouseUpListener: addMouseUpListener,
    putMainPinFocus: putMainPinFocus,
    renderFilteredData: renderFilteredData
  };
})();
