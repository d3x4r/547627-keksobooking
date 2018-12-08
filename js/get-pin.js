'use strict';
(function () {
  var ESC_KEYCODE = 27;
  // Поиск шаблона для генерации новых меток обьявлений
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var createFragmentPins = function (advertisingsTotal) {
    var pinFragment = document.createDocumentFragment();

    for (var i = 0; i < advertisingsTotal.length; i++) {
      var mapPinElement = createPin(advertisingsTotal[i]);
      onPinClick(mapPinElement, advertisingsTotal[i]);
      pinFragment.appendChild(mapPinElement);
    }
    return pinFragment;
  };

  var createPin = function (ad) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.classList.add('map__pin--users');
    mapPinElement.alt = ad.offer.title;
    mapPinElement.style.left = ad.location.x + 'px';
    mapPinElement.style.top = ad.location.y + 'px';
    var img = mapPinElement.querySelector('img');
    img.src = ad.author.avatar;
    return mapPinElement;
  };

  var onPinClick = function (element, pinObject) {
    element.addEventListener('click', function () {
      var mapCard = window.map.querySelector('.map__card');
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
    window.map.appendChild(cardElement);
  };

  window.fragmentPins = fragmentPins;
})();
