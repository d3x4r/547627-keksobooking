'use strict';

(function () {
  var ESC_KEYCODE = 27;

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
        if (evt.keyCode === ESC_KEYCODE) {
          card.remove();
          document.removeEventListener('keydown', onButtonKeydown);
        }
      };
      document.addEventListener('keydown', onButtonKeydown);
    });
  };

  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoord = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftCoord = {
        x: startCoord.x - moveEvt.pageX,
        y: startCoord.y - moveEvt.pageY
      };

      startCoord = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      // Итоговые координаты пина
      var pinPositionX = window.map.mainPin.offsetLeft - shiftCoord.x;
      var pinPositionY = window.map.mainPin.offsetTop - shiftCoord.y;
      // Проверка на выход пина за пределы родителя и запрет этого
      if (pinPositionX < window.map.pinLimits.left) {
        pinPositionX = window.map.pinLimits.left;
      } else if (pinPositionX > window.map.pinLimits.right) {
        pinPositionX = window.map.pinLimits.right;
      } else if (pinPositionY < window.map.pinLimits.top) {
        pinPositionY = window.map.pinLimits.top;
      } else if (pinPositionY > window.map.pinLimits.bottom) {
        pinPositionY = window.map.pinLimits.bottom;
      }

      window.form.setAddress(window.map.getCoordinatePin());
      window.map.mainPin.style.top = pinPositionY + 'px';
      window.map.mainPin.style.left = pinPositionX + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.setAddress(window.map.getCoordinatePin());
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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

