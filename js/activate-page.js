'use strict';

(function () {

  var activatePage = function () {
    window.form.setFormState(window.form.adForm);
    window.form.setFormState(window.form.mapForm);
    window.map.map.classList.remove('map--faded');
    window.form.renderPins(window.map.fragmentPins);
    window.map.mainPin.removeEventListener('mouseup', activatePage);
  };
  window.map.mainPin.addEventListener('mouseup', activatePage);
})();

