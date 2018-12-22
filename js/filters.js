'use strict';
(function () {
  var MIN_PRICE_VALUE = 10000;
  var MAX_PRICE_VALUE = 50000;

  var PINS_MAX_QUANTITY = 5;

  var filtersForm = document.querySelector('.map__filters');
  var checkboxes = filtersForm.querySelectorAll('[type=checkbox]');

  var adTypeSelect = filtersForm.querySelector('#housing-type');
  var adPriceSelect = filtersForm.querySelector('#housing-price');
  var adRoomSelect = filtersForm.querySelector('#housing-rooms');
  var adGuestSelect = filtersForm.querySelector('#housing-guests');

  var isTypeMatch = function (ad) {
    switch (adTypeSelect.value) {
      case 'any' :
        return true;

      default:
        return ad.offer.type === adTypeSelect.value;
    }
  };

  var isPriceMatch = function (ad) {
    switch (adPriceSelect.value) {
      case 'any' :
        return true;

      case 'middle' :
        return ad.offer.price >= MIN_PRICE_VALUE && ad.offer.price <= MAX_PRICE_VALUE;

      case 'low' :
        return ad.offer.price < MIN_PRICE_VALUE;

      default:
        return ad.offer.price > MAX_PRICE_VALUE;
    }
  };

  var isRoomsMatch = function (ad) {
    switch (adRoomSelect.value) {
      case 'any' :
        return true;

      default :
        return ad.offer.rooms === +adRoomSelect.value;
    }
  };

  var isGuestMatch = function (ad) {
    switch (adGuestSelect.value) {
      case 'any' :
        return true;

      default :
        return ad.offer.guests === +adGuestSelect.value;
    }
  };

  var filterBySelect = function (initialData) {

    var byTypeAds = initialData.filter(isTypeMatch);
    var byPriceAds = byTypeAds.filter(isPriceMatch);
    var byRoomsAds = byPriceAds.filter(isRoomsMatch);
    var byGuestAds = byRoomsAds.filter(isGuestMatch);

    var filteredBySelectAds = byGuestAds;

    return filteredBySelectAds;
  };

  var filterByCheckbox = function (adsList) {
    var checkedElements = Array.from(checkboxes).filter(function (checkbox) {
      return checkbox.checked;
    });

    var requiredFeatures = checkedElements.map(function (checkboxChecked) {
      return checkboxChecked.value;
    });

    var adsFinal = adsList.filter(function (adObject) {
      return requiredFeatures.every(function (featuresValue) {
        var booleanIndex = 0;
        adObject.offer.features.forEach(function (adObjectOfferFeatureValue) {
          if (featuresValue === adObjectOfferFeatureValue) {
            booleanIndex = 1;
          }
        });
        return booleanIndex;
      });
    });
    return adsFinal;
  };

  var filteredByForm = function (data) {
    return filterByCheckbox(filterBySelect(data));
  };

  var filteredByQuantity = function (data) {
    var byQuantityData = data;
    if (byQuantityData.length > PINS_MAX_QUANTITY) {
      byQuantityData = data.filter(function (objectelement, index) {
        return index < PINS_MAX_QUANTITY;
      });
    }
    return byQuantityData;
  };

  var filteredAds = function (data) {
    return filteredByQuantity(filteredByForm(data));
  };

  var addFormChangeListener = function (data, callback) {
    filtersForm.addEventListener('change', function () {
      callback(filteredAds(data));
    });
  };

  window.filters = {
    addFormChangeListener: addFormChangeListener,
    filteredByQuantity: filteredByQuantity
  };
}());
