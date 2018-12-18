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

  setFormState(adForm);
  setFormState(mapForm);

  var setAddress = function (addressValue) {
    addressInput.value = addressValue;
  };

  window.form = {
    adForm: adForm,
    mapForm: mapForm,
    setFormState: setFormState,
    setAddress: setAddress,
    resetPageButton: resetPageButton
  };
})();
