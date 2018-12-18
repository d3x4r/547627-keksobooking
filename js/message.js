'use strict';

(function () {
  var succesFormTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  var failFormTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var showSuccesMessage = function () {
    var succesWindow = succesFormTemplate.cloneNode(true);
    document.body.appendChild(succesWindow);

    succesWindow.addEventListener('click', function () {
      document.body.removeChild(succesWindow);
      document.removeEventListener('keydown', onMessageClose);
    });

    var onMessageClose = function (evtESC) {
      if (evtESC.keyCode === window.ESC_KEYCODE) {
        var successWindow = document.body.querySelector('.success');
        document.body.removeChild(successWindow);
        document.removeEventListener('keydown', onMessageClose);
      }
    };

    document.addEventListener('keydown', onMessageClose);
  };

  var showErrorMessage = function () {
    var failWindow = failFormTemplate.cloneNode(true);
    document.body.appendChild(failWindow);

    var failButton = failWindow.querySelector('.error__button');
    failButton.addEventListener('click', function () {
      document.body.removeChild(failWindow);
      document.removeEventListener('keydown', onErrorClose);
    });

    var onErrorClose = function (evtESC) {
      if (evtESC.keyCode === window.ESC_KEYCODE) {
        var errorWindow = document.body.querySelector('.error');
        document.body.removeChild(errorWindow);
        document.removeEventListener('keydown', onErrorClose);
      }
    };

    document.addEventListener('keydown', onErrorClose);
  };

  window.message = {
    show: showSuccesMessage,
    showError: showErrorMessage
  };
}());
