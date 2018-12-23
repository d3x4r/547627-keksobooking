'use strict';

(function () {
  var successFormTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  var failFormTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var showSuccesWindow = function () {
    var successWindow = successFormTemplate.cloneNode(true);
    document.body.appendChild(successWindow);

    successWindow.addEventListener('click', function () {
      document.body.removeChild(successWindow);
      document.removeEventListener('keydown', onMessageClose);
    });

    var onMessageClose = function (evtESC) {
      if (evtESC.keyCode === window.ESC_KEYCODE) {
        document.body.removeChild(successWindow);
        document.removeEventListener('keydown', onMessageClose);
      }
    };

    document.addEventListener('keydown', onMessageClose);
  };

  var showErrorWindow = function () {
    var failWindow = failFormTemplate.cloneNode(true);
    document.body.appendChild(failWindow);

    var failButton = failWindow.querySelector('.error__button');
    failButton.addEventListener('click', function () {
      document.body.removeChild(failWindow);
      document.removeEventListener('keydown', onErrorClose);
    });

    var onErrorClose = function (evtESC) {
      if (evtESC.keyCode === window.ESC_KEYCODE) {
        document.body.removeChild(failWindow);
        document.removeEventListener('keydown', onErrorClose);
      }
    };

    document.addEventListener('keydown', onErrorClose);
  };

  window.message = {
    show: showSuccesWindow,
    showError: showErrorWindow
  };
}());
