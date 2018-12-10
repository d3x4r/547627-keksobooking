'use strict';

(function () {

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

  setAddress(window.map.getCoordinatePin());

  window.form = {
    adForm: adForm,
    mapForm: mapForm,
    renderPins: renderPins,
    setFormState: setFormState,
    setAddress: setAddress
  };
})();
