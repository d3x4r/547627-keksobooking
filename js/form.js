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

  var setFormsState = function () {
    setFormState(adForm);
    setFormState(mapForm);
  };

  setFormsState();

  var setAddress = function (addressValue) {
    addressInput.value = addressValue;
  };

  var addSubmitListener = function (callback) {
    adForm.addEventListener('submit', function (evt) {
      callback();
      evt.preventDefault();
    });
  };

  var addResetListener = function (callback) {
    resetPageButton.addEventListener('click', function (evt) {
      callback();
      evt.preventDefault();
    });
  };

  var resetForm = function () {
    adForm.reset();
  };
  // adForm.addEventListener('submit', function (event) {
  //   window.backend.upload(new FormData(window.form.adForm), onFormUpload, onFormUploadError);
  //   event.preventDefault();
  // });

  window.form = {
    adForm: adForm,
    addSubmitListener: addSubmitListener,
    resetForm: resetForm,
    setFormsState: setFormsState,
    setAddress: setAddress,
    addResetListener: addResetListener
  };
})();
