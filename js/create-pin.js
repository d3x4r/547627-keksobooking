'use strict';
(function () {
  var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  window.createPin = function (ad) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.classList.add('map__pin--users');
    mapPinElement.alt = ad.offer.title;
    mapPinElement.style.left = ad.location.x + 'px';
    mapPinElement.style.top = ad.location.y + 'px';
    var img = mapPinElement.querySelector('img');
    img.src = ad.author.avatar;
    return mapPinElement;
  };
}());
