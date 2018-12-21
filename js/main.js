'use strict';

(function () {
  var PINS_MAX_QUANTITY = 5;
  window.ESC_KEYCODE = 27;

  window.form.setAddress(window.map.getCoordinatePin());

  var createFragmentPins = function (advertisingsTotal) {
    var pinFragment = document.createDocumentFragment();

    for (var i = 0; i < advertisingsTotal.length; i++) {
      if (i === PINS_MAX_QUANTITY) {
        break;
      }
      var mapPinElement = window.createPin(advertisingsTotal[i]);
      setPinClick(mapPinElement, advertisingsTotal[i]);
      pinFragment.appendChild(mapPinElement);
    }
    return pinFragment;
  };

  var setPinClick = function (element, pinObject) {
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

  var onMainPinMouseUp = function () {
    activatePage();
  };

  var deactivatePage = function () {
    window.form.resetForm();
    window.form.setFormsState();
    window.map.reset();
    window.form.setAddress(window.map.getCoordinatePin());
    window.map.putMainPinFocus();

    window.map.addMouseUpListener(onMainPinMouseUp);
  };

  var onResetButtonClick = function () {
    deactivatePage();
  };

  var onFormUpload = function () {
    window.message.show();
    deactivatePage();
  };

  var onFormUploadError = function () {
    window.message.showError();
  };

  var onFormSubmit = function (eventTarget) {
    window.backend.upload(new FormData(eventTarget), onFormUpload, onFormUploadError);
  };
  window.form.addSubmitListener(onFormSubmit);

  window.map.setMainPinMouseMoveCallback(function () {
    window.form.setAddress(window.map.getCoordinatePin());
  });

  var renderFilteredDataDebounce = window.debounce(function (filteredData) {
    window.map.renderFilteredData(filteredData, createFragmentPins);
  });

  var activatePage = function () {
    window.backend.load(function (receivedData) {
      window.form.setFormsState();
      window.map.changeMapStatus();
      window.map.renderPins(createFragmentPins(receivedData));
      window.filters.addFormChangeListener(receivedData, function (filteredData) {
        renderFilteredDataDebounce(filteredData);
      });
    }, onPageLoadError);
  };

  window.map.addMouseUpListener(onMainPinMouseUp);
  window.form.addResetListener(onResetButtonClick);
})();

