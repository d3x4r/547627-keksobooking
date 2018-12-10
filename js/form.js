'use strict';

(function () {
  // Константы определяющие смещение координат на основе размеров метки mainPin
  var MAIN_PIN_HEIGHT_INDEX = 70;
  var MAIN_PIN_WIDTH_INDEX = 32;
  var adForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');

  // Поиск поля ввода адреса в форме
  var addressInput = adForm.querySelector('[name="address"]');

  // Поиск в разметке контейнера для меток обьявлений
  var mapPinList = document.querySelector('.map__pins');

  // Отрисовка фрагмента с пинами в разметку
  var renderPins = function (pinsFragment) {
    mapPinList.appendChild(pinsFragment);
  };

  var setFormState = function (form) {
    form.classList.toggle(form.id + '--disabled');
    var formElements = form.querySelectorAll('#' + form.id + ' > *');
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = !formElements[i].disabled;
    }
  };

  setFormState(adForm);
  setFormState(mapForm);

  var setAddress = function (addressValue) {
    addressInput.value = addressValue;
  };

  var getCoordinatePin = function () {
    if (window.map.map.classList.contains('map--faded')) {
      var mainPinX = window.map.mainPin.offsetTop + (window.map.mainPin.clientHeight / 2);
      var mainPinY = window.map.mainPin.offsetLeft + (window.map.mainPin.clientWidth / 2);
    } else {
      mainPinX = window.map.mainPin.offsetTop + MAIN_PIN_HEIGHT_INDEX;
      mainPinY = window.map.mainPin.offsetLeft + MAIN_PIN_WIDTH_INDEX;
    }
    return mainPinY + ',' + mainPinX;
  };

  setAddress(getCoordinatePin());

  window.form = {
    adForm: adForm,
    mapForm: mapForm,
    renderPins: renderPins,
    setFormState: setFormState,
    setAddress: setAddress,
    getCoordinatePin: getCoordinatePin
  };
})();
