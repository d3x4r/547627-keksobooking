'use strict';
(function () {
  var filtersForm = document.querySelector('.map__filters');
  var arrays = filtersForm.querySelectorAll('select, [type=checkbox]');
  var typeHS = document.querySelector('#housing-type');
  var price = document.querySelector('#housing-price');
  var rooms = document.querySelector('#housing-rooms');
  var guest = document.querySelector('#housing-guests');
  var features = document.querySelectorAll('.map__checkbox');
  // console.log(features);
  var addInputChangeListener = function (data, callback) {
    arrays.forEach(function (element) {

      element.addEventListener('change', function (evt) {
        // var housesArray;
        // if (evt.target === typeHS) {
        //   housesArray = data.filter(function (houseType) {
        //     return houseType.offer.type === evt.target.value;
        //   });
        // }
        // if (evt.target === rooms) {
        //   housesArray = data.filter(function (houseType) {
        //     return houseType.offer.rooms == evt.target.value;
        //   });
        // }
        var housesArray = data;
        var houseType = housesArray.filter(function (houseType) {
          if (typeHS.value === 'any') {
            return houseType;
          }
          return houseType.offer.type === typeHS.value;
        });

        var priceValue = houseType.filter(function (houseType) {
          if (price.value === 'any') {
            return houseType;
          } else if (price.value === 'middle') {
            return houseType.offer.price >= 10000 && houseType.offer.price <= 50000 ;
          } else if (price.value === 'low') {
            return houseType.offer.price < 10000;
          }
          return houseType.offer.price > 50000;
        });

        var roomsValue = priceValue.filter(function (houseType) {
          if (rooms.value === 'any') {
            return houseType;
          }
          return houseType.offer.rooms == rooms.value;
        });

        var guestValue = roomsValue.filter(function (houseType) {
          if (guest.value === 'any') {
            return houseType;
          } else if (guest.value == 2) {
            return houseType.offer.guests == guest.value;
          } else if (guest.value == 1) {
            return houseType.offer.guests == guest.value;
          }
          return houseType.offer.rooms == guest.value;
        });

        // var inputsFilter = function (elementsInputs, arrayList) {
        //   for (var i = 0; i < elementsInputs.length; i++) {
        //     if (elementsInputs[i].checked) {
        //       var filter = arrayList.filter(function (element) {
        //         for (var j = 0; j < element.offer.features.length; j++){
        //           return element.offer.features[j] == elementsInputs[i].value;
        //         }
        //       }); return filter;
        //     }
        //     return arrayList;
        //   }
        // };

        var inputsFilter = function (elementsInputs, arrayList) {
          var copyArr = arrayList.slice();
          var filter;
          for (var i = 0; i < elementsInputs.length; i++) {
            if (elementsInputs[i].checked) {
              filter = copyArr.filter(function (element) {
                var xxx = 0;
                for (var j = 0; j < element.offer.features.length; j++){
                  if (element.offer.features[j] == elementsInputs[i].value) {
                    xxx = 1;
                  }
                  // console.log(element.offer.features[j] == elementsInputs[i].value);
                  // return element.offer.features[j] == elementsInputs[i].value;
                } if (xxx) {
                  return element.offer.features;
                }
              });
              console.log(filter);
              copyArr = filter;
            }
          } return filter;
        };


        // inputsFilter(features, guestValue);
        // var wifiValue = guestValue.filter(function (houseType) {
        //  if (evt.target.value == 'wifi' && evt.target.checked) {
        //     for (var i = 0 ;i < houseType.offer.features.length; i++) {
        //       return houseType.offer.features[i] == 'wifi';
        //     }
        //   } else {
        //     return houseType;
        //   }
        // });

        // var featuresArr = guestValue.filter(function (houseType) {   });
          // var filt = function (array1) {

          //   for (var i = 0; i < array1.length; i++) {

          //     if (array1[i].value == 'wifi' && array1[i].checked) {
          //       return houseType.offer.features == 'wifi';
          //     }
          //   }
          // };
          // filt(features);

          // var filter = function (inputs) {
          //   var fullggg = guestValue;
          //   for (var i = 0; i < inputs.length; i++) {
          //     if (inputs[i].checked) {
          //       console.log(inputs[i]);
          //       // console.log(i);
          //       if (i > 1) {
          //         console.log(i);
          //       }
          //     var finalFilter = fullggg.filter(function (object) {
          //       var base;
          //       object.offer.features.forEach(function (item) {
          //         // console.log(item + ' ' + inputs[i].value);
          //         if (item == inputs[i].value) {
          //           // console.log('gg');
          //           // base++;
          //           // console.log(item + ' ' + inputs[i].value);
          //           // console.log(object);
          //           base = object;

          //         }
          //         });

          //         return base;
          //         // console.log(base+'итог');
          //       });
          //     } else {

          //     }
          //   }

          //   return finalFilter;
          // };



        window.map.clearMap();
        callback(inputsFilter(features, guestValue));
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
