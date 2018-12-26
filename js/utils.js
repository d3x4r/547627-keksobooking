'use strict';
(function () {
  var ESC_KEYCODE = 27;

  var LOAD_DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_AD_URL = 'https://js.dump.academy/keksobooking';

  var DEBOUNCE_INTERVAL = 500;

  var MIN_PRICE_VALUE = 10000;
  var MAX_PRICE_VALUE = 50000;
  var MAX_PIN_NUMBER = 5;

  var MAIN_PIN_HEIGHT_INDEX = 70;
  var MAIN_PIN_WIDTH_INDEX = 32;
  var MAIN_PIN_TOP_BASIC_POSITION = 375 + 'px';
  var MAIN_PIN_LEFT_BASIC_POSITION = 570 + 'px';

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var RentPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var PinCoordinatLimit = {
    TOP: 0,
    RIGHT: 1135,
    BOTTOM: 624,
    LEFT: 0
  };

  var setFormState = function (form) {
    form.classList.toggle(form.id + '--disabled');
    var formElements = form.querySelectorAll('#' + form.id + ' > *');
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = !formElements[i].disabled;
    }
  };

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    LOAD_DATA_URL: LOAD_DATA_URL,
    UPLOAD_AD_URL: UPLOAD_AD_URL,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    MIN_PRICE_VALUE: MIN_PRICE_VALUE,
    MAX_PRICE_VALUE: MAX_PRICE_VALUE,
    MAX_PIN_NUMBER: MAX_PIN_NUMBER,
    MAIN_PIN_HEIGHT_INDEX: MAIN_PIN_HEIGHT_INDEX,
    MAIN_PIN_WIDTH_INDEX: MAIN_PIN_WIDTH_INDEX,
    MAIN_PIN_TOP_BASIC_POSITION: MAIN_PIN_TOP_BASIC_POSITION,
    MAIN_PIN_LEFT_BASIC_POSITION: MAIN_PIN_LEFT_BASIC_POSITION,
    FILE_TYPES: FILE_TYPES,
    RentPrice: RentPrice,
    PinCoordinatLimit: PinCoordinatLimit,
    setFormState: setFormState
  };
}());
