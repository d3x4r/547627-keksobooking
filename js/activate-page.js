'use strict';

(function () {
  window.ESC_KEYCODE = 27;
  var MAIN_PIN_TOP_BASIC_POSITION = '375px';
  var MAIN_PIN_LEFT_BASIC_POSITION = '570px';


  window.form.setAddress(window.map.getCoordinatePin());

  var createFragmentPins = function (advertisingsTotal) {
    var pinFragment = document.createDocumentFragment();

    for (var i = 0; i < advertisingsTotal.length; i++) {
      var mapPinElement = window.createPin(advertisingsTotal[i]);
      onPinClick(mapPinElement, advertisingsTotal[i]);
      pinFragment.appendChild(mapPinElement);
    }
    return pinFragment;
  };

  var onPinClick = function (element, pinObject) {
    element.addEventListener('click', function () {
      var mapCard = window.map.map.querySelector('.map__card');
      window.map.removeCard(mapCard);
      var card = window.createDescription(pinObject);
      window.map.renderDescription(card);

      card.querySelector('.popup__close').addEventListener('click', function () {
        card.remove();
        document.removeEventListener('keydown', onButtonKeydown);
      });

      var onButtonKeydown = function (evt) {
        if (evt.keyCode === window.ESC_KEYCODE) {
          card.remove();
          document.removeEventListener('keydown', onButtonKeydown);
        }
      };
      document.addEventListener('keydown', onButtonKeydown);
    });
  };

  var eventPinsReceivedRender = function (receivedData) {
    window.map.renderPins(createFragmentPins(receivedData));
  };

  var eventPinsReceivedError = function (receivedError) {
    throw new Error(receivedError);
  };

  var getPageDeafault = function () {
    var mapCard = window.map.map.querySelector('.map__card');
    window.map.removeCard(mapCard);
    window.form.adForm.reset();
    window.form.setFormState(window.form.adForm);
    window.form.setFormState(window.form.mapForm);
    window.map.map.classList.add('map--faded');
    window.map.mainPin.style.top = MAIN_PIN_TOP_BASIC_POSITION;
    window.map.mainPin.style.left = MAIN_PIN_LEFT_BASIC_POSITION;
    window.form.setAddress(window.map.getCoordinatePin());
    window.map.mainPin.focus();

    if (window.map.map.querySelector('.map__card')) {
      window.map.map.querySelector('.map__card').remove();
    }
    window.map.mainPin.addEventListener('mouseup', activatePage);
  };

  var onSuccessUploadCallback = function () {
    window.message.onSuccessUpload(window.map.map);
    window.map.clearMap();
    getPageDeafault();
  };

  var onFailUploadCallback = function () {
    window.message.onFailUpload(window.form.adForm);
  };

  window.form.adForm.addEventListener('submit', function (event) {
    window.backend.upload(new FormData(window.form.adForm), onSuccessUploadCallback, onFailUploadCallback);
    event.preventDefault();
  });

  window.map.setMainPinMouseMoveCallback(function () {
    window.form.setAddress(window.map.getCoordinatePin());
  });

  var activatePage = function () {
    window.form.setFormState(window.form.adForm);
    window.form.setFormState(window.form.mapForm);
    window.map.map.classList.remove('map--faded');
    window.backend.load(eventPinsReceivedRender, eventPinsReceivedError);
    window.map.mainPin.removeEventListener('mouseup', activatePage);
  };

  window.map.mainPin.addEventListener('mouseup', activatePage);
  window.form.resetPageButton.addEventListener('click', function (evt) {
    window.map.clearMap();
    getPageDeafault();
    evt.preventDefault();
  });
})();

