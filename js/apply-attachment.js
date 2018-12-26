'use strict';
(function () {
  window.applyAttachment = function (form) {
    var avatarChoser = form.querySelector('#avatar');
    var avatarPreview = form.querySelector('.ad-form-header__preview').children[0];

    var housePhotoChoser = form.querySelector('#images');
    var housePhotoPreview = form.querySelector('.ad-form__photo');
    var housePhotoContainer = form.querySelector('.ad-form__photo-container');
    var housePhoto = housePhotoPreview.querySelector('.ad-form__photo');

    var setBasicAvatar = function (avatarImage) {
      if (avatarImage.src.indexOf('img/muffin-grey.svg') === -1) {
        avatarImage.src = 'img/muffin-grey.svg';
        avatarImage.alt = 'Аватар пользователя';
        avatarImage.width = '40';
        avatarImage.height = '40';
      }
    };

    var setBasicPhoto = function (photos) {
      var allPhotos = photos.querySelectorAll('.ad-form__photo');
      if (allPhotos.length > 1) {
        allPhotos.forEach(function (photo) {
          photo.remove();
        });
        var clearPhotoContainer = document.createElement('div');
        clearPhotoContainer.classList.add('ad-form__photo');
        housePhotoContainer.appendChild(clearPhotoContainer);
      }
    };

    var clear = function () {
      setBasicAvatar(avatarPreview);
      setBasicPhoto(housePhotoContainer);
    };

    var addLoadListener = function (reader, onLoad) {
      reader.addEventListener('load', function () {
        onLoad(reader);
      });
    };

    var addChangePhotoListener = function (photoChoser, onLoad) {
      photoChoser.addEventListener('change', function () {
        var photo = photoChoser.files[0];
        var photoName = photoChoser.files[0].name;

        var matches = window.utils.FILE_TYPES.some(function (it) {
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

    return clear();
  };
}());
