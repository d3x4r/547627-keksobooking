'use strict';

(function () {
  var PRICE_BUNGALO = 0;
  var PRICE_FLAT = 1000;
  var PRICE_HOUSE = 5000;
  var PRICE_PALACE = 10000;

  var type = document.getElementById('type');
  var price = document.getElementById('price');
  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');

  var PRICES = {
    bungalo: PRICE_BUNGALO,
    house: PRICE_HOUSE,
    palace: PRICE_PALACE,
    flat: PRICE_FLAT
  };

  type.addEventListener('input', function () {
    var value = PRICES[type.value];
    price.min = value;
    price.placeholder = value;
  });

  var addInputListener = function (inputFirst, inputSecond) {
    inputFirst.addEventListener('input', function () {
      inputSecond.value = inputFirst.value;
    });
  };
  addInputListener(timeIn, timeOut);
  addInputListener(timeOut, timeIn);

  var addChangeListener = function (targetInput) {
    targetInput.addEventListener('change', function () { // не blur, a change
      var capacityInt = parseInt(capacity.value, 10);
      var roomInt = parseInt(roomNumber.value, 10);
      if (capacityInt > roomInt && capacityInt > 0) {
        targetInput.setCustomValidity('Количество гостей не должно превышать количество комнат');
      } else if (roomInt === 100 && capacityInt > 0) {
        targetInput.setCustomValidity('100 комнат сдается не для гостей');
      } else if (roomInt !== 100 && capacityInt === 0) {
        targetInput.setCustomValidity('Выбирете количество гостей');
      } else {
        roomNumber.setCustomValidity('');
        capacity.setCustomValidity('');
      }
    });
  };

  addChangeListener(roomNumber);
  addChangeListener(capacity);
})();
