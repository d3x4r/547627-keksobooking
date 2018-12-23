'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');
  var resetPageButton = document.querySelector('.ad-form__reset');

  var addressInput = adForm.querySelector('[name="address"]');

  var setFormState = function (form) {
    form.classList.toggle(form.id + '--disabled');
    var formElements = form.querySelectorAll('#' + form.id + ' > *');
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = !formElements[i].disabled;
    }
  };

  var setState = function () {
    setFormState(adForm);
    setFormState(mapForm);
  };

  setState();

  var setAddress = function (addressValue) {
    addressInput.value = addressValue;
  };

  var addSubmitListener = function (onSubmit) {
    adForm.addEventListener('submit', function (evt) {
      onSubmit(evt.target);
      evt.preventDefault();
    });
  };

  var addResetListener = function (onClick) {
    resetPageButton.addEventListener('click', function (evt) {
      onClick();
      evt.preventDefault();
    });
  };

  var reset = function () {
    adForm.reset();
    setState();
  };

  window.form = {
    reset: reset,
    setState: setState,
    setAddress: setAddress,
    addSubmitListener: addSubmitListener,
    addResetListener: addResetListener
  };
})();
