'use strict';
(function () {
  window.activateValidation = function (form) {
    var type = form.querySelector('#type');
    var price = form.querySelector('#price');
    var timeIn = form.querySelector('#timein');
    var timeOut = form.querySelector('#timeout');
    var roomNumber = form.querySelector('#room_number');
    var capacity = form.querySelector('#capacity');

    var prices = {
      bungalo: window.utils.RentPrice.BUNGALO,
      house: window.utils.RentPrice.HOUSE,
      palace: window.utils.RentPrice.PALACE,
      flat: window.utils.RentPrice.FLAT
    };

    type.addEventListener('input', function () {
      var value = prices[type.value];
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
      targetInput.addEventListener('change', function () {
        var capacityNumber = parseInt(capacity.value, 10);
        var roomInt = parseInt(roomNumber.value, 10);
        if (capacityNumber > roomInt && capacityNumber > 0) {
          targetInput.setCustomValidity('Количество гостей не должно превышать количество комнат');
        } else if (roomInt === 100 && capacityNumber > 0) {
          targetInput.setCustomValidity('100 комнат сдается не для гостей');
        } else if (roomInt !== 100 && capacityNumber === 0) {
          targetInput.setCustomValidity('Выбирете количество гостей');
        } else {
          roomNumber.setCustomValidity('');
          capacity.setCustomValidity('');
        }
      });
    };

    addChangeListener(roomNumber);
    addChangeListener(capacity);
  };
})();
