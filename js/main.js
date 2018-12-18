'use strict';

(function () {
  window.ESC_KEYCODE = 27;

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

  var onPageLoadError = function (receivedError) {
    throw new Error(receivedError);
  };

  var deactivatePage = function () {
    window.form.adForm.reset();
    window.form.setFormState(window.form.adForm);
    window.form.setFormState(window.form.mapForm);
    window.map.reset();
    window.form.setAddress(window.map.getCoordinatePin());
    window.map.mainPin.focus();

    window.map.mainPin.addEventListener('mouseup', onMainPinMouseUp);
  };

  var onFormUpload = function () {
    window.message.show();
    deactivatePage();
  };

  var onFormUploadError = function () {
    window.message.showError();
  };

  window.form.adForm.addEventListener('submit', function (event) {
    window.backend.upload(new FormData(window.form.adForm), onFormUpload, onFormUploadError);
    event.preventDefault();
  });

  window.map.setMainPinMouseMoveCallback(function () {
    window.form.setAddress(window.map.getCoordinatePin());
  });

  var activatePage = function () {
    window.backend.load(function (receivedData) {
      window.form.setFormState(window.form.adForm);
      window.form.setFormState(window.form.mapForm);
      window.map.changeMapStatus();
      window.map.renderPins(createFragmentPins(receivedData));
      window.map.mainPin.removeEventListener('mouseup', onMainPinMouseUp);
    }, onPageLoadError);
  };

  var onMainPinMouseUp = function () {
    activatePage();
  };

  window.map.mainPin.addEventListener('mouseup', onMainPinMouseUp);
  window.form.resetPageButton.addEventListener('click', function (evt) {
    activatePage();
    evt.preventDefault();
  });
})();

