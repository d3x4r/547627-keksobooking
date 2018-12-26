'use strict';
(function () {
  window.form.setAddress(window.map.getCoordinatePin());

  var createFragmentPins = function (ads) {
    var pinFragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      var mapPinElement = window.createPin(ads[i]);
      setPinClickListener(mapPinElement, ads[i]);
      pinFragment.appendChild(mapPinElement);
    }
    return pinFragment;
  };

  var setPinClickListener = function (element, pinObject) {
    element.addEventListener('click', function () {
      window.map.removeDescription();
      var card = window.createDescription(pinObject);
      window.map.renderDescription(card);

      card.querySelector('.popup__close').addEventListener('click', function () {
        card.remove();
        document.removeEventListener('keydown', onButtonKeydown);
      });

      var onButtonKeydown = function (evt) {
        if (evt.keyCode === window.utils.ESC_KEYCODE) {
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
    window.form.reset();
    window.map.reset();
    window.form.setAddress(window.map.getCoordinatePin());
    document.activeElement.blur();
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

  var onFormChange = window.debounce(function (totallData) {
    window.map.clear();
    window.map.renderPins(createFragmentPins(totallData));
  });

  var activatePage = function () {
    window.backend.load(function (receivedData) {
      window.form.setState();
      window.filters.setState();
      window.map.changeState();
      window.map.renderPins(createFragmentPins(window.filters.getAdsData(receivedData)));
      window.filters.addFormChangeListener(receivedData, function (totallData) {
        onFormChange(totallData);
      });
    }, onPageLoadError);
  };

  window.map.addMouseUpListener(onMainPinMouseUp);
  window.form.addResetListener(onResetButtonClick);
})();

