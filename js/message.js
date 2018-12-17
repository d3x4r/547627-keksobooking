'use strict';

(function () {
  var succesFormTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  var failFormTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var onSuccessUpload = function (targetForm) {
    var succesWindow = succesFormTemplate.cloneNode(true);
    targetForm.appendChild(succesWindow);

    succesWindow.addEventListener('click', function () {
      targetForm.removeChild(succesWindow);
      document.removeEventListener('keydown', closeSuccessWindow);
    });

    var closeSuccessWindow = function (evtESC) {
      if (evtESC.keyCode === window.ESC_KEYCODE) {
        var successWindow = targetForm.querySelector('.success');
        targetForm.removeChild(successWindow);
        document.removeEventListener('keydown', closeSuccessWindow);
      }
    };

    document.addEventListener('keydown', closeSuccessWindow);
  };

  var onFailUpload = function (targetForm) {
    var failWindow = failFormTemplate.cloneNode(true);
    targetForm.appendChild(failWindow);

    var failButton = targetForm.querySelector('.error__button');
    failButton.addEventListener('click', function () {
      targetForm.removeChild(failWindow);
      document.removeEventListener('keydown', closeFailWindow);
    });

    var closeFailWindow = function (evtESC) {
      if (evtESC.keyCode === window.ESC_KEYCODE) {
        var errorWindow = targetForm.querySelector('.error');
        targetForm.removeChild(errorWindow);
        document.removeEventListener('keydown', closeFailWindow);
      }
    };

    document.addEventListener('keydown', closeFailWindow);
  };

  // var closeSuccessWindow = function (evtESC) {
  //   if (evtESC.keyCode === window.ESC_KEYCODE) {
  //     var successWindow = adForm.querySelector('.success');
  //     adForm.removeChild(successWindow);
  //     document.removeEventListener('keydown', closeSuccessWindow);
  //   }
  // };

  // var closeFailWindow = function (evtESC) {
  //   if (evtESC.keyCode === window.ESC_KEYCODE) {
  //     var errorWindow = adForm.querySelector('.error');
  //     adForm.removeChild(errorWindow);
  //     document.removeEventListener('keydown', closeFailWindow);
  //   }
  // };

  window.message = {
    onSuccessUpload: onSuccessUpload,
    onFailUpload: onFailUpload
  };
}());
