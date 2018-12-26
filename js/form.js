'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var resetPageButton = document.querySelector('.ad-form__reset');
  var addressInput = adForm.querySelector('[name="address"]');

  window.applyAttachment(adForm);
  window.activateValidation(adForm);

  var setState = function () {
    window.utils.setFormState(adForm);
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

  var resetAttachment = function () {
    window.applyAttachment(adForm);
  };

  var reset = function () {
    resetAttachment();
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
