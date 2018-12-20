'use strict';
(function () {
  var MIN_PRICE_VALUE = 10000;
  var MAX_PRICE_VALUE = 50000;

  var filtersForm = document.querySelector('.map__filters');
  var checkboxes = filtersForm.querySelectorAll('[type=checkbox]');

  var adTypeSelect = document.querySelector('#housing-type');
  var adPriceSelect = document.querySelector('#housing-price');
  var adRoomSelect = document.querySelector('#housing-rooms');
  var adGuestSelect = document.querySelector('#housing-guests');

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

  // var filterByCheckbox = function (adsList) {
  //   var adsDuplicate = adsList.slice();
  //   var filteredAds;
  //   for (var i = 0; i < checkboxes.length; i++) {
  //     if (checkboxes[i].checked) {
  //       filteredAds = adsDuplicate.filter(function (adElement) {
  //         for (var j = 0; j < adElement.offer.features.length; j++) {
  //           if (adElement.offer.features[j] === checkboxes[i].value) {
  //             return adElement.offer.features;
  //           }
  //         }
  //         return filteredAds;
  //       });
  //       adsDuplicate = filteredAds;
  //     }
  //   } if (filteredAds) {
  //     return filteredAds;
  //   } else {
  //     return adsList;
  //   }
  // };

  var filteredTest = function (adsList) {
    var adsFinal;
    checkboxes.forEach(function (element) {
      element.addEventListener('change', function () {
        var checkboxesArray = Array.from(checkboxes);
        var checkedElements = checkboxesArray.filter(function (element1) {
          return element1.checked;
        });
        var requiredFeatures = checkedElements.map(function (element2) {
          return element2.value;
        });

        adsFinal = adsList.filter(function (element3) {
          for (var j = 0; j < element3.offer.features.length; j++) {
            for (var g = 0; g < requiredFeatures.length; g++) {
              // console.log(element3.offer.features[j] == requiredFeatures[g]);
              if (element3.offer.features[j] == requiredFeatures[g]) {
                return true;
              }
            }
          }
        }); console.log(adsFinal);
      });
    });
    return adsFinal;
  };

  var filteredAds = function (data) {
    return filteredTest(filterBySelect(data));
  };

  var addFormChangeListener = function (data, callback) {
    filtersForm.addEventListener('change', function () {
      callback(filteredAds(data));
    });
  };

  window.filters = {
    addFormChangeListener: addFormChangeListener,
    filteredTest: filteredTest
  };
}());
