'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var checkboxes = Array.from(filtersForm.querySelectorAll('[type=checkbox]'));

  var adTypeSelect = filtersForm.querySelector('#housing-type');
  var adPriceSelect = filtersForm.querySelector('#housing-price');
  var adRoomSelect = filtersForm.querySelector('#housing-rooms');
  var adGuestSelect = filtersForm.querySelector('#housing-guests');

  var setState = function () {
    window.utils.setFormState(filtersForm);
  };

  setState();

  var isTypeMatch = function (ad) {
    return (adTypeSelect.value === 'any') ? true : ad.offer.type === adTypeSelect.value;
  };

  var isPriceMatch = function (ad) {
    switch (adPriceSelect.value) {
      case 'any':
        return true;

      case 'middle':
        return ad.offer.price >= window.utils.MIN_PRICE_VALUE && ad.offer.price <= window.utils.MAX_PRICE_VALUE;

      case 'low':
        return ad.offer.price < window.utils.MIN_PRICE_VALUE;

      default:
        return ad.offer.price > window.utils.MAX_PRICE_VALUE;
    }
  };

  var isRoomsMatch = function (ad) {
    return (adRoomSelect.value === 'any') ? true : ad.offer.rooms === +adRoomSelect.value;
  };

  var isGuestMatch = function (ad) {
    return (adGuestSelect.value === 'any') ? true : ad.offer.guests === +adGuestSelect.value;
  };

  var isFeaturesMatch = function (requiredFeatures) {
    return function (adObject) {
      return requiredFeatures.every(function (requiredFeature) {
        return adObject.offer.features.includes(requiredFeature);
      });

    };
  };

  var getAdsData = function (data) {

    var requiredFeatures = checkboxes.filter(function (checkbox) {
      return checkbox.checked;
    }).map(function (checkboxChecked) {
      return checkboxChecked.value;
    });

    var filteredPins = data.filter(function (item) {
      return isTypeMatch(item) &&
        isPriceMatch(item) &&
        isRoomsMatch(item) &&
        isGuestMatch(item) &&
        isFeaturesMatch(requiredFeatures)(item);
    });

    return filteredPins.length > window.utils.MAX_PIN_NUMBER ? filteredPins.slice(0, window.utils.MAX_PIN_NUMBER) : filteredPins;
  };

  var addFormChangeListener = function (data, callback) {
    filtersForm.addEventListener('change', function () {
      callback(getAdsData(data));
    });
  };

  window.filters = {
    addFormChangeListener: addFormChangeListener,
    getAdsData: getAdsData,
    setState: setState
  };
}()
);
