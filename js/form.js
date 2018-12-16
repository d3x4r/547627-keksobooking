'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');
  var succesFormTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  var failFormTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  // Поиск поля ввода адреса в форме
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

  var onSuccessUpload = function () {
    var succesWindow = succesFormTemplate.cloneNode(true);
    adForm.reset();
    window.form.setAddress(window.map.getCoordinatePin());
    adForm.appendChild(succesWindow);

    succesWindow.addEventListener('click', function () {
      adForm.removeChild(succesWindow);
      document.removeEventListener('keydown', closeSuccessWindow);
    });

    document.addEventListener('keydown', closeSuccessWindow);
  };

  var onFailUpload = function () {
    var failWindow = failFormTemplate.cloneNode(true);
    adForm.appendChild(failWindow);

    var failButton = adForm.querySelector('.error__button');
    failButton.addEventListener('click', function () {
      adForm.removeChild(failWindow);
      document.removeEventListener('keydown', closeFailWindow);
    });

    document.addEventListener('keydown', closeFailWindow);
  };

  // adForm.addEventListener('submit', function (evt) {
  //   window.backend.upload(new FormData(adForm), function () {
  //     var succesWindow = succesFormTemplate.cloneNode(true);
  //     adForm.reset();
  //     window.form.setAddress(window.map.getCoordinatePin());
  //     adForm.appendChild(succesWindow);

  //     succesWindow.addEventListener('click', function () {
  //       adForm.removeChild(succesWindow);
  //     });

  //     document.addEventListener('keydown', closeWindow);

  //   });
  //   evt.preventDefault();
  // });

  var closeSuccessWindow = function (evtESC) {
    if (evtESC.keyCode === window.ESC_KEYCODE) {
      var successWindow = adForm.querySelector('.success');
      adForm.removeChild(successWindow);
      document.removeEventListener('keydown', closeSuccessWindow);
    }
  };

  var closeFailWindow = function (evtESC) {
    if (evtESC.keyCode === window.ESC_KEYCODE) {
      var errorWindow = adForm.querySelector('.error');
      adForm.removeChild(errorWindow);
      document.removeEventListener('keydown', closeFailWindow);
    }
  };

  window.form = {
    adForm: adForm,
    mapForm: mapForm,
    setFormState: setFormState,
    setAddress: setAddress,
    onSuccessUpload: onSuccessUpload,
    onFailUpload: onFailUpload
  };
})();
