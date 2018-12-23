'use strict';
(function () {
  var MIN_PRICE_VALUE = 10000;
  var MAX_PRICE_VALUE = 50000;
  var MAX_PIN_NUMBER = 5;

  var filtersForm = document.querySelector('.map__filters');
  var checkboxes = Array.from(filtersForm.querySelectorAll('[type=checkbox]'));

  var adTypeSelect = document.querySelector('#housing-type');
  var adPriceSelect = document.querySelector('#housing-price');
  var adRoomSelect = document.querySelector('#housing-rooms');
  var adGuestSelect = document.querySelector('#housing-guests');


  var isTypeMatch = function (ad) {
    switch (adTypeSelect.value) {
      case 'any':
        return true;

      default:
        return ad.offer.type === adTypeSelect.value;
    }
  };

  var isPriceMatch = function (ad) {
    switch (adPriceSelect.value) {
      case 'any':
        return true;

      case 'middle':
        return ad.offer.price >= MIN_PRICE_VALUE && ad.offer.price <= MAX_PRICE_VALUE;

      case 'low':
        return ad.offer.price < MIN_PRICE_VALUE;

      default:
        return ad.offer.price > MAX_PRICE_VALUE;
    }
  };

  var isRoomsMatch = function (ad) {
    switch (adRoomSelect.value) {
      case 'any':
        return true;

      default:
        return ad.offer.rooms === +adRoomSelect.value;
    }
  };

  var isGuestMatch = function (ad) {
    switch (adGuestSelect.value) {
      case 'any':
        return true;

      default:
        return ad.offer.guests === +adGuestSelect.value;
    }
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

    return filteredPins.length > MAX_PIN_NUMBER ? filteredPins.slice(0, MAX_PIN_NUMBER) : filteredPins;
  };

  var addFormChangeListener = function (data, callback) {
    filtersForm.addEventListener('change', function () {
      callback(getAdsData(data));
    });
  };


  window.filters = {
    addFormChangeListener: addFormChangeListener,
    getAdsData: getAdsData
  };
}()
);
