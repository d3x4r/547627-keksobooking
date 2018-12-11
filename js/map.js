'use strict';

(function () {
  // Константы определяющие смещение координат на основе размеров метки mainPin
  var MAIN_PIN_HEIGHT_INDEX = 70;
  var MAIN_PIN_WIDTH_INDEX = 32;


  // Поиск в разметке карты обьявлений
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');

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

  // Поиск в разметке контейнера для меток обьявлений
  var mapPinList = document.querySelector('.map__pins');

  // Отрисовка фрагмента с пинами в разметку
  var renderPins = function (pinsFragment) {
    mapPinList.appendChild(pinsFragment);
  };


  window.map = {
    map: map,
    mainPin: mainPin,
    pinLimits: pinLimits,
    getCoordinatePin: getCoordinatePin,
    renderPins: renderPins,
    renderDescription: renderDescription
  };
})();
