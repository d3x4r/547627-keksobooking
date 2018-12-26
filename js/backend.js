'use strict';
(function () {
  var createXhr = function (method, url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open(method, url);
    return xhr;
  };

  var load = function (onDownload, onDownloadError) {
    var xhr = createXhr('GET', window.utils.LOAD_DATA_URL, onDownload, onDownloadError);

    xhr.send();
  };

  var upload = function (data, onLoad, onLoadError) {
    var xhr = createXhr('POST', window.utils.UPLOAD_AD_URL, onLoad, onLoadError);

    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
}());
