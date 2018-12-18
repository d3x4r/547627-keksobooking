'use strict';

(function () {
  // Поиск в разметке шаблона модального окна с информацией об обьявлении
  var mapTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  // Функция вывода значений на русском языке в блоке type
  var getTypeRussian = function (type) {
    var russianType = 'Дом';
    if (type === 'palace') {
      russianType = 'Дворец';
    } else if (type === 'flat') {
      russianType = 'Квартира';
    } else if (type === 'bungalo') {
      russianType = 'Бунгало';
    }
    return russianType;
  };

  // Функция перемешивания массива в случайном порядке
  var shuffleArray = function (array) {
    for (var i = 0; i < array.length; i++) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  var getFeaturesFragment = function (featursList) {
    var featuresFragment = document.createDocumentFragment();
    for (var j = 0; j < featursList.offer.features.length; j++) {
      var newElement = document.createElement('li');
      newElement.classList.add('popup__feature');
      newElement.classList.add('popup__feature--' + featursList.offer.features[j]);
      featuresFragment.appendChild(newElement);
    }
    return featuresFragment;
  };

  var getPhotosFragment = function (photosList, photoPlace) {
    var photosFragment = document.createDocumentFragment();
    var shufflePhotos = shuffleArray(photosList.offer.photos);
    var photoTemplate = photoPlace.querySelector('.popup__photo');

    for (var k = 0; k < photosList.offer.photos.length; k++) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = shufflePhotos[k];
      photosFragment.appendChild(photo);
    }
    return photosFragment;
  };
  // Создание фрагмента карточки обьявления, на основе одного обьекта из итогового массива с индексом -position
  var createDescription = function (totalAd) {

    // Копирование шаблона модального окна
    var cardElement = mapTemplate.cloneNode(true);

    // Поиск элементов в разметке шаблона и добавление этим элементам значений обьекта
    if (totalAd.offer.title) {
      cardElement.querySelector('.popup__title').textContent = totalAd.offer.title;
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__title'));
    }

    if (totalAd.offer.address) {
      cardElement.querySelector('.popup__text--address').textContent = totalAd.offer.address;
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__text--address'));
    }

    if (totalAd.offer.price) {
      cardElement.querySelector('.popup__text--price').textContent = totalAd.offer.price + ' ₽/ночь';
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__text--price'));
    }

    if (totalAd.offer.type) {
      cardElement.querySelector('.popup__type').textContent = getTypeRussian(totalAd.offer.type);
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__type'));
    }

    if (totalAd.offer.rooms > 0 && totalAd.offer.guests > 0) {
      cardElement.querySelector('.popup__text--capacity').textContent = totalAd.offer.rooms + ' комнаты для ' + totalAd.offer.guests + ' гостей';
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__text--capacity'));
    }

    if (totalAd.offer.checkin && totalAd.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + totalAd.offer.checkin + ', выезд до ' + totalAd.offer.checkout;
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__text--time'));
    }

    var featuresContainer = cardElement.querySelector('.popup__features');
    // Удаление дочерних элементов блока popup__features в разметке с целью добавления сгенерированных данных
    featuresContainer.innerHTML = '';

    if (totalAd.offer.features.length > 0) {
      var featuresElement = getFeaturesFragment(totalAd);
      featuresContainer.appendChild(featuresElement);
    } else {
      cardElement.removeChild(featuresContainer);
    }

    if (totalAd.offer.description) {
      cardElement.querySelector('.popup__description').textContent = totalAd.offer.description;
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__description'));
    }

    var photosContainer = cardElement.querySelector('.popup__photos');
    if (totalAd.offer.photos.length > 0) {
      var photosElement = getPhotosFragment(totalAd, photosContainer);

      photosContainer.innerHTML = '';
      photosContainer.appendChild(photosElement);
    } else {
      cardElement.removeChild(photosContainer);
    }

    if (totalAd.author.avatar) {
      cardElement.querySelector('.popup__avatar').src = totalAd.author.avatar;
    } else {
      cardElement.removeChild(cardElement.querySelector('.popup__avatar'));
    }

    return cardElement;
  };

  window.createDescription = createDescription;
})();
