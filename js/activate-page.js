'use strict';

(function () {
  var ESC_KEYCODE = 27;

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
        if (evt.keyCode === ESC_KEYCODE) {
          card.remove();
          document.removeEventListener('keydown', onButtonKeydown);
        }
      };
      document.addEventListener('keydown', onButtonKeydown);
    });
  };

  var fragmentPins = createFragmentPins(window.totalAdvertisings);

  var activatePage = function () {
    window.form.setFormState(window.form.adForm);
    window.form.setFormState(window.form.mapForm);
    window.map.map.classList.remove('map--faded');
    window.map.renderPins(fragmentPins);
    window.map.mainPin.removeEventListener('mouseup', activatePage);
  };
  window.map.mainPin.addEventListener('mouseup', activatePage);
})();

