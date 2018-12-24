'use strict';
(function () {
  var ADS_DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_AD_URL = 'https://js.dump.academy/keksobooking';

  var createXhr = function (method, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);
    return xhr;
  };

  var load = function (onDownload, onDownloadError) {
    var xhr = createXhr('GET', ADS_DATA_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onDownload(xhr.response);
      } else {
        onDownloadError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.send();
  };

  var upload = function (data, onLoad, onLoadError) {
    var xhr = createXhr('POST', UPLOAD_AD_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onLoadError();
      }
    });

    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
}());
