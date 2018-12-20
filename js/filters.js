'use strict';
(function () {
  var MIN_PRICE_VALUE = 10000;
  var MAX_PRICE_VALUE = 50000;

  var filtersForm = document.querySelector('.map__filters');
  var arrays = filtersForm.querySelectorAll('select, [type=checkbox]');
  var adTypeSelect = document.querySelector('#housing-type');
  var adPriceSelect = document.querySelector('#housing-price');
  var adRoomSelect = document.querySelector('#housing-rooms');
  var adGuestSelect = document.querySelector('#housing-guests');
  var featuresCheckbox = document.querySelectorAll('.map__checkbox');

  var filterBySelect = function (initialData) {
    var cleanAds = initialData;

    var byTypeAds = cleanAds.filter(function (ad) {
      if (adTypeSelect.value === 'any') {
        return ad;
      }
      return ad.offer.type === adTypeSelect.value;
    });

    var byPriceAds = byTypeAds.filter(function (ad) {
      if (adPriceSelect.value === 'any') {
        return ad;
      } else if (adPriceSelect.value === 'middle') {
        return ad.offer.price >= MIN_PRICE_VALUE && ad.offer.price <= MAX_PRICE_VALUE;
      } else if (adPriceSelect.value === 'low') {
        return ad.offer.price < MIN_PRICE_VALUE;
      }
      return ad.offer.price > MAX_PRICE_VALUE;
    });

    var byRoomsAds = byPriceAds.filter(function (ad) {
      if (adRoomSelect.value === 'any') {
        return ad;
      }
      return ad.offer.rooms === +adRoomSelect.value;
    });

    var byGuestAds = byRoomsAds.filter(function (ad) {
      if (adGuestSelect.value === 'any') {
        return ad;
      }
      return ad.offer.guests === +adGuestSelect.value;
    });
    var filteredBySelectAds = byGuestAds;
    return filteredBySelectAds;
  };

  var filterByCheckbox = function (adsList) {
    var AdsDuplicate = adsList.slice();
    var filteredAds;
    for (var i = 0; i < featuresCheckbox.length; i++) {
      if (featuresCheckbox[i].checked) {
        filteredAds = AdsDuplicate.filter(function (adElement) {
          for (var j = 0; j < adElement.offer.features.length; j++) {
            if (adElement.offer.features[j] === featuresCheckbox[i].value) {
              return adElement.offer.features;
            }
          }
          return filteredAds;
        });
        AdsDuplicate = filteredAds;
      }
    } if (filteredAds) {
      return filteredAds;
    } else {
      return adsList;
    }
  };

  var filteredAds = function (data) {
    return filterByCheckbox(filterBySelect(data));
  };

  var addInputChangeListener = function (data, callback) {
    arrays.forEach(function (element) {

      element.addEventListener('change', function () {
        callback(filteredAds(data));
      });
    });
  };

  window.filters = {
    addInputChangeListener: addInputChangeListener
  };
}());