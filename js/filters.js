'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var arrays = filtersForm.querySelectorAll('[id^=housing-]');

  var typeHS = document.querySelector('#housing-type');
  // var price = document.querySelector('#housing-price');
  var rooms = document.querySelector('#housing-rooms');
  // var guest = document.querySelector('#housing-guests');
  // var features = document.querySelector('#housing-features');

  var addInputChangeListener = function (data, callback) {
    arrays.forEach(function (element) {

      element.addEventListener('change', function (evt) {
        var housesArray;
        if (evt.target === typeHS) {
          housesArray = data.filter(function (houseType) {
            return houseType.offer.type === evt.target.value;
          });
        }
        if (evt.target === rooms) {
          housesArray = data.filter(function (houseType) {
            return houseType.offer.rooms == evt.target.value;
          });
        }


        window.map.clearMap();
        callback(housesArray);
      });
    });
  };

  // var addInputChangeListener = function (data, callback) {
  //   type.addEventListener('change', function (evt) {
  //     var housesByType = data.filter(function (houseType) {
  //       return houseType.offer.type === evt.target.value;
  //     });
  //     window.map.clearMap();
  //     callback(housesByType);
  //   });
  // };
  // type.addEventListener('change', function (evt) {
  //   console.log(evt.target.value);
  // });

  // price.addEventListener('change', function (evt) {
  //   console.log(evt.target.value);
  // });

  // rooms.addEventListener('change', function (evt) {
  //   console.log(evt.target.value);
  // });

  // guest.addEventListener('change', function (evt) {
  //   console.log(evt.target.value);
  // });

  // features.addEventListener('change', function (evt) {
  //   console.log(evt.target.value);
  // });
  window.filters = {
    addInputChangeListener: addInputChangeListener
  };
}());
