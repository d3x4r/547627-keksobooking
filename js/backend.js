'use strict';

var URL = 'https://js.dump.academy/keksobooking/data';

var load = function (onSuccess) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.open('GET', URL);

  xhr.addEventListener('load', function () {
    window.map.mainPin.addEventListener('mouseup', function () {
      window.map.renderPins(onSuccess(xhr.response));
    });
  });

  xhr.send();
};
