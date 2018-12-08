'use strict';

(function () {
  // Константы определяющие смещение координат на основе размеров метки mainPin
  var MAIN_PIN_HEIGHT_INDEX = 70;
  var MAIN_PIN_WIDTH_INDEX = 32;

  // Поиск в разметке карты обьявлений
  var map = document.querySelector('.map');

  var adForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');

  // Поиск поля ввода адреса в форме
  var addressInput = adForm.querySelector('[name="address"]');

  // Главная метка на карте
  var mainPin = document.querySelector('.map__pin--main');

  var mapOverlay = document.querySelector('.map__overlay');
  // Поиск в разметке контейнера для меток обьявлений
  var mapPinList = document.querySelector('.map__pins');

  var setFormState = function (form) {
    form.classList.toggle(form.id + '--disabled');
    var formElements = form.querySelectorAll('#' + form.id + ' > *');
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = !formElements[i].disabled;
    }
  };

  setFormState(adForm);
  setFormState(mapForm);


  var activatePage = function () {
    setFormState(adForm);
    setFormState(mapForm);
    window.map.classList.remove('map--faded');
    renderPins(window.fragmentPins);
    mainPin.removeEventListener('mouseup', activatePage);
  };

  mainPin.addEventListener('mouseup', activatePage);

  // Отрисовка фрагмента с пинами в разметку
  var renderPins = function (pinsFragment) {
    mapPinList.appendChild(pinsFragment);
  };

  // Расчет минимальных и максимальных координат пина относительно родителя
  var pinLimits = {
    top: mapOverlay.offsetTop,
    right: mapOverlay.offsetWidth + mapOverlay.offsetLeft - mainPin.offsetWidth,
    // Тут я 15 временно вкорячил потому, что вроде как адекватно ограничил значение по Y внизу, но всеравно выходит за родителя, мне показалось, что это в разметке самой ножки косяк
    bottom: mapOverlay.offsetHeight + mapOverlay.offsetTop - mainPin.offsetHeight - 15,
    left: mapOverlay.offsetLeft
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

      setAddress(getCoordinatePin());
      mainPin.style.top = pinPositionY + 'px';
      mainPin.style.left = pinPositionX + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      setAddress(getCoordinatePin());
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Добавление адреса в форму на основе координат главной метки
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

  var setAddress = function (addressValue) {
    addressInput.value = addressValue;
  };

  setAddress(getCoordinatePin());

  window.map = map;
})();

