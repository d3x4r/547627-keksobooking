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
      if (mapCard) {
        mapCard.remove();
      }
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
    window.map.mainPin.addEventListener('mouseup', function () {
      window.map.renderPins(createFragmentPins(receivedData));
    });
  };

  var eventPinsReceivedError = function (receivedError) {
    alert(receivedError);
  };
  // var fragmentPins = createFragmentPins(window.totalAdvertisings);
  // load(createFragmentPins);
  // window.backend.load(function (receivedData) {
  //   window.map.mainPin.addEventListener('mouseup', function () {
  //     window.map.renderPins(createFragmentPins(receivedData));
  //   });
  // });

  window.backend.load(eventPinsReceivedRender, eventPinsReceivedError);
  window.form.adForm.addEventListener('submit', function (event) {
    window.backend.upload(new FormData(window.form.adForm), window.form.onSuccessUpload, window.form.onFailUpload);
    event.preventDefault();

  });

  window.map.setMainPinMouseMoveCallback(function () {
    window.form.setAddress(window.map.getCoordinatePin());
  });

  var activatePage = function () {
    window.form.setFormState(window.form.adForm);
    window.form.setFormState(window.form.mapForm);
    window.map.map.classList.remove('map--faded');
    // window.map.renderPins(fragmentPins);
    window.map.mainPin.removeEventListener('mouseup', activatePage);
  };

  window.map.mainPin.addEventListener('mouseup', activatePage);
})();

