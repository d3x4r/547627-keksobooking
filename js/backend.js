'use strict';
(function () {
  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);
    // xhr.addEventListener('load', function () {
    //   window.map.mainPin.addEventListener('mouseup', function () {
    //     window.map.renderPins(onSuccess(xhr.response));
    //   });
    // });

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.send();
  };

  var upload = function (data, onDownload, onDownloadError) {
    var url = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onDownload(xhr.response);
      } else {
        onDownloadError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', url);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
}());
