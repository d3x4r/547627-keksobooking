'use strict';

(function () {
  var ESC_KEYCODE = 27;

  // Поиск в разметке карты обьявлений
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapOverlay = document.querySelector('.map__overlay');

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
      renderDescription(card);

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

  // Добавление карточки обьявления в разметку
  var renderDescription = function (cardElement) {
    window.map.map.appendChild(cardElement);
  };

  var pinLimits = {
    top: mapOverlay.offsetTop,
    right: mapOverlay.offsetWidth + mapOverlay.offsetLeft - mainPin.offsetWidth,
    // Тут я 15 временно вкорячил потому, что вроде как адекватно ограничил значение по Y внизу, но всеравно выходит за родителя, мне показалось, что это в разметке самой ножки косяк
    bottom: mapOverlay.offsetHeight + mapOverlay.offsetTop - mainPin.offsetHeight - 15,
    left: mapOverlay.offsetLeft
  };

  mainPin.addEventListener('mousedown', function (evt) {
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
      var pinPositionX = mainPin.offsetLeft - shiftCoord.x;
      var pinPositionY = mainPin.offsetTop - shiftCoord.y;
      // Проверка на выход пина за пределы родителя и запрет этого
      if (pinPositionX < pinLimits.left) {
        pinPositionX = pinLimits.left;
      } else if (pinPositionX > pinLimits.right) {
        pinPositionX = pinLimits.right;
      } else if (pinPositionY < pinLimits.top) {
        pinPositionY = pinLimits.top;
      } else if (pinPositionY > pinLimits.bottom) {
        pinPositionY = pinLimits.bottom;
      }

      window.form.setAddress(window.form.getCoordinatePin());
      mainPin.style.top = pinPositionY + 'px';
      mainPin.style.left = pinPositionX + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.setAddress(window.form.getCoordinatePin());
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    map: map,
    mainPin: mainPin,
    fragmentPins: fragmentPins
  };
})();
