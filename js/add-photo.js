'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChoser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview').children[0];

  var housePhotoChoser = document.querySelector('#images');
  var housePhotoPreview = document.querySelector('.ad-form__photo');
  var housePhotoContainer = document.querySelector('.ad-form__photo-container');
  var housePhoto = housePhotoPreview.querySelector('.ad-form__photo');

  var addLoadListener = function (reader, onLoad) {
    reader.addEventListener('load', function () {
      onLoad(reader);
    });
  };

  var addChangePhotoListener = function (photoChoser, onLoad) {
    photoChoser.addEventListener('change', function () {
      var photo = photoChoser.files[0];
      var photoName = photoChoser.files[0].name;

      var matches = FILE_TYPES.some(function (it) {
        return photoName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        addLoadListener(reader, onLoad);

        reader.readAsDataURL(photo);
      }
    });
  };

  var renderNewPhoto = function (reader) {
    if (!housePhotoPreview.contains(housePhoto)) {
      housePhotoPreview.remove();
    }

    var photoContainer = housePhotoPreview.cloneNode();
    var newPhoto = document.createElement('img');
    newPhoto.classList.add('ad-form__photo');
    newPhoto.src = reader.result;
    photoContainer.appendChild(newPhoto);

    housePhotoContainer.appendChild(photoContainer);
  };

  var onLoad = function (reader) {
    renderNewPhoto(reader);
  };

  addChangePhotoListener(avatarChoser, function (reader) {
    avatarPreview.src = reader.result;
  });

  addChangePhotoListener(housePhotoChoser, function (reader) {
    onLoad(reader);
  });

}());
