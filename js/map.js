'use strict';

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var ESC_KEYCODE = 27;
// var ENTER_KEYCODE = 13;

var PRICE_BUNGALO = 0;
var PRICE_FLAT = 1000;
var PRICE_HOUSE = 5000;
var PRICE_PALACE = 10000;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
// Переменная, которая отображает необходимое количество обьектов для меток обьявлений и хранит в себе длинну массивов для генерации такого количества обьектов.
var arrayLength = 8;

var adForm = document.querySelector('.ad-form');
var mapForm = document.querySelector('.map__filters');

// Cостояние формы
var setFormState = function (form) {
  form.classList.toggle(form.id + '--disabled');
  var formElements = form.querySelectorAll('#' + form.id + ' > *');
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = !formElements[i].disabled;
  }
};

setFormState(adForm);
setFormState(mapForm);

// Генерация упорядоченного массива с аватарами пользователей
var getAvatarList = function (avatarCount) {
  var avatarList = [];
  for (var i = 1; i <= avatarCount; i++) {
    avatarList.push('img/avatars/user0' + i + '.png');
  }
  return avatarList;
};

// ***НАЧАЛО*** Исходные данные для генерации случайных обьектов для меток обьявлений ***НАЧАЛО***
var avatars = getAvatarList(arrayLength);

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var times = [
  '12:00',
  '13:00',
  '14:00'
];

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
// ***КОНЕЦ*** Исходные данные для генерации случайных обьектов для меток обьявлений ***КОНЕЦ***

// Функция для перемешивания массива в случайном порядке
var getRandomArray = function (array) {
  var copyArray = array.slice();
  var arrRandoms = [];
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.round(Math.random() * (copyArray.length - 1));
    arrRandoms.push(copyArray[randomIndex]);
    copyArray.splice(randomIndex, 1);
  }
  return arrRandoms;
};

// Функция для получение случайного числа в диапазоне min-max, необходима для генерации случайных длинн массивов
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomAvatars = getRandomArray(avatars);
var randomTitles = getRandomArray(titles);
var randomFeatures = getRandomArray(features);

// Создание массива длинны -number, на основе входящего массива -Array
var getRandomLengthArr = function (array) {
  return array.slice(0, getRandomInteger(1, array.length));
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

// Фунция для создания массива arrayValue-длинны, состоящего из сгенерированных обьектов
var getAdList = function (arrayValue) {

  var advertisings = [];

  for (var i = 0; i < arrayValue; i++) {

    var location = {
      x: getRandomInteger(25, 1150),
      y: getRandomInteger(130, 630)
    };

    var adObject = {
      author: {
        avatar: randomAvatars[i]
      },
      offer: {
        title: randomTitles[i],
        address: (location.x + PIN_WIDTH / 2) + ', ' + (location.y + PIN_HEIGHT),
        price: getRandomInteger(MIN_PRICE, MAX_PRICE),
        type: types[getRandomInteger(0, types.length - 1)],
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 5) * 2,
        checkin: times[getRandomInteger(0, times.length - 1)],
        checkout: times[getRandomInteger(0, times.length - 1)],
        features: getRandomLengthArr(randomFeatures, getRandomInteger(0, randomFeatures.length - 1)),
        description: '',
        photos: getRandomArray(photos)
      },
      location: location
    };

    advertisings.push(adObject);

  }
  return advertisings;
};

// Генерация итогового массива arrayLength-длинны, который состоит из обьектов
var totalAdvertisings = getAdList(arrayLength);

// Поиск в разметке контейнера для меток обьявлений
var mapPinList = document.querySelector('.map__pins');

// Поиск шаблона для генерации новых меток обьявлений
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var createFragmentPins = function (advertisingsTotal) {
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < advertisingsTotal.length; i++) {
    var mapPinElement = createPin(advertisingsTotal[i]);
    onPinClick(mapPinElement, advertisingsTotal[i]);
    pinFragment.appendChild(mapPinElement);
  }
  return pinFragment;
};

function createPin(ad) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.classList.add('map__pin--users');
  mapPinElement.alt = ad.offer.title;
  mapPinElement.style.left = ad.location.x + 'px';
  mapPinElement.style.top = ad.location.y + 'px';
  var img = mapPinElement.querySelector('img');
  img.src = ad.author.avatar;
  return mapPinElement;
}

var onPinClick = function (element, pinObject) {
  element.addEventListener('click', function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    var card = createDescription(pinObject);
    renderDescription(card);

    card.querySelector('.popup__close').addEventListener('click', function () {
      card.remove();
      document.removeEventListener('keydown', onButtonKeydown);
    });

    var onButtonKeydown = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        card.remove();
        document.removeEventListener('keydown', onButtonKeydown);
      }
    };
    document.addEventListener('keydown', onButtonKeydown);
  });
};

// var fragmentPins = createFragmentPins(totalAdvertisings, arrayLength);
var fragmentPins = createFragmentPins(totalAdvertisings);

// Отрисовка фрагмента с пинами в разметку
var renderPins = function (pinsFragment) {
  mapPinList.appendChild(pinsFragment);
};

// Поиск в разметке карты обьявлений
var map = document.querySelector('.map');
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

// Создание фрагмента карточки обьявления, на основе одного обьекта из итогового массива с индексом -position
var createDescription = function (totalAd) {

  // Копирование шаблона модального окна
  var cardElement = mapTemplate.cloneNode(true);

  // Поиск элементов в разметке шаблона и добавление этим элементам значений обьекта
  cardElement.querySelector('.popup__title').textContent = totalAd.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = totalAd.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = totalAd.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getTypeRussian(totalAd.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = totalAd.offer.rooms + ' комнаты для ' + totalAd.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + totalAd.offer.checkin + ', выезд до ' + totalAd.offer.checkout;

  var featuresContainer = cardElement.querySelector('.popup__features');
  // Удаление дочерних элементов блока popup__features в разметке с целью добавления сгенерированных данных
  featuresContainer.innerHTML = '';
  // Добавление в разметку в блок popup__features сгенерированных элементов
  for (var j = 0; j < totalAd.offer.features.length; j++) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add('popup__feature--' + totalAd.offer.features[j]);
    featuresContainer.appendChild(newElement);
  }

  cardElement.querySelector('.popup__description').textContent = totalAd.offer.description;

  var photosContainer = cardElement.querySelector('.popup__photos');
  var photosContent = photosContainer.querySelector('.popup__photo');

  // Удаление дочерних элементов блока popup__photos в разметке с целью добавления сгенерированных данных
  photosContainer.innerHTML = '';

  // Перемешивание массива с фото в случайном порядке
  var shufflePhotos = shuffleArray(totalAd.offer.photos);

  // Добавление в разметку в блок popup__photos сгенерированных элементов
  for (var k = 0; k < totalAd.offer.photos.length; k++) {
    var photo = photosContent.cloneNode(true);
    photo.src = shufflePhotos[k];
    photosContainer.appendChild(photo);
  }

  cardElement.querySelector('.popup__avatar').src = totalAd.author.avatar;

  return cardElement;
};

// Добавление карточки обьявления в разметку
var renderDescription = function (cardElement) {
  map.appendChild(cardElement);
};

// Главная метка на карте
var mainPin = document.querySelector('.map__pin--main');

// Поиск поля ввода адреса в форме
var addressInput = adForm.querySelector('[name="address"]');

// Константы определяющие смещение координат на основе размеров метки mainPin
var MAIN_PIN_HEIGHT_INDEX = 70;
var MAIN_PIN_WIDTH_INDEX = 32;

// Добавление адреса в форму на основе координат главной метки
var getCoordinatePin = function () {
  if (map.classList.contains('map--faded')) {
    var mainPinX = mainPin.offsetTop + (mainPin.clientHeight / 2);
    var mainPinY = mainPin.offsetLeft + (mainPin.clientWidth / 2);
  } else {
    mainPinX = mainPin.offsetTop + MAIN_PIN_HEIGHT_INDEX;
    mainPinY = mainPin.offsetLeft + MAIN_PIN_WIDTH_INDEX;
  }
  return mainPinY + ',' + mainPinX;
};

var setAddress = function (addressValue) {
  addressInput.value = addressValue;
};

setAddress(getCoordinatePin());

var activatePage = function () {
  setFormState(adForm);
  setFormState(mapForm);
  map.classList.remove('map--faded');
  renderPins(fragmentPins);
  mainPin.removeEventListener('mousedown', activatePage);
};

var mapOverlay = document.querySelector('.map__overlay');

// Расчет минимальных и максимальных координат пина относительно родителя
var pinLimits = {
  top: mapOverlay.offsetTop,
  right: mapOverlay.offsetWidth + mapOverlay.offsetLeft - mainPin.offsetWidth,
  // Тут я 15 временно вкорячил потому, что вроде как адекватно ограничил значение по Y внизу, но всеравно выходит за родителя, мне показалось, что это в разметке самой ножки косяк
  bottom: mapOverlay.offsetHeight + mapOverlay.offsetTop - mainPin.offsetHeight - 15,
  left: mapOverlay.offsetLeft
};

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoord = {
    x: evt.pageX,
    y: evt.pageY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shiftCoord = {
      x: startCoord.x - moveEvt.pageX,
      y: startCoord.y - moveEvt.pageY
    };

    startCoord = {
      x: moveEvt.pageX,
      y: moveEvt.pageY
    };

    // Итоговые координаты пина
    var pinPositionX = mainPin.offsetLeft - shiftCoord.x;
    var pinPositionY = mainPin.offsetTop - shiftCoord.y;
    // Проверка на выход пина за пределы родителя и запрет этого
    if (pinPositionX < pinLimits.left) {
      pinPositionX = pinLimits.left;
    } else if (pinPositionX > pinLimits.right) {
      pinPositionX = pinLimits.right;
    } else if (pinPositionY < pinLimits.top) {
      pinPositionY = pinLimits.top;
    } else if (pinPositionY > pinLimits.bottom) {
      pinPositionY = pinLimits.bottom;
    }

    setAddress(getCoordinatePin());
    mainPin.style.top = pinPositionY + 'px';
    mainPin.style.left = pinPositionX + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    activatePage();
    setAddress(getCoordinatePin());
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Поиск полей ввода в разметке
var type = document.getElementById('type');
var price = document.getElementById('price');
var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');
var roomNumber = document.getElementById('room_number');
var capacity = document.getElementById('capacity');

var PRICES = {
  bungalo: PRICE_BUNGALO,
  house: PRICE_HOUSE,
  palace: PRICE_PALACE,
  flat: PRICE_FLAT
};

type.addEventListener('input', function () {
  var value = PRICES[type.value];
  price.min = value;
  price.placeholder = value;
});
// Синхронизация времени заезда и выезда
var timeSyncInputs = function (inputFirst, inputSecond) {
  inputFirst.addEventListener('input', function () {
    inputSecond.value = inputFirst.value;
  });
};
timeSyncInputs(timeIn, timeOut);
timeSyncInputs(timeOut, timeIn);

// Функция синхронизация гостей и комнат
var guestSync = function (targetInput) {
  targetInput.addEventListener('change', function () { // не blur, a change
    var capacityInt = parseInt(capacity.value, 10);
    var roomInt = parseInt(roomNumber.value, 10);
    if (capacityInt > roomInt && capacityInt > 0) {
      targetInput.setCustomValidity('Количество гостей не должно превышать количество комнат');
    } else if (roomInt === 100 && capacityInt > 0) {
      targetInput.setCustomValidity('100 комнат сдается не для гостей');
    } else if (roomInt !== 100 && capacityInt === 0) {
      targetInput.setCustomValidity('Выбирете количество гостей');
    } else {
      roomNumber.setCustomValidity('');
      capacity.setCustomValidity('');
    }
  });
};

guestSync(roomNumber);
guestSync(capacity);

// // Поиск в разметке шаблона об успешном заполнении формы
// var adFormSuccessTemplate = document.querySelector('#success')
//   .content
//   .querySelector('.success');
// var adFormSuccessWindow = adFormSuccessTemplate.cloneNode(true);
//
//
// // При вводе валидных данных в разметку добавляется окно-оверлей сообщающий об этом
// // Плюс добавлены обработчики событий при нажатии клавишы мыши и ESC
// adForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//
//   if (adForm.contains(successModal)) {
//     adForm.removeChild(successModal);
//   }
//   adForm.appendChild(adFormSuccessWindow);
//   var successModal = document.querySelector('.success');
//
//   successModal.addEventListener('click', function () {
//     if (adForm.contains(successModal)) {
//       adForm.removeChild(successModal);
//     }
//   });
//
//   var closeModalEsc = function (escEvt) {
//     if (escEvt.keyCode === ESC_KEYCODE) {
//       if (adForm.contains(successModal)) {
//         adForm.removeChild(successModal);
//       }
//     }
//   };
//   adForm.addEventListener('keydown', closeModalEsc);
// });


// // Поиск в шаблоне модального окна ошибки формы
// var adFormButton = adForm.querySelector('.ad-form__submit');
// var adFormErrorTemplate = document.querySelector('#error')
//   .content
//   .querySelector('.error');
// var adFormErrorWindow = adFormErrorTemplate.cloneNode(true);
//
// // Функция переберающая все инпуты и селекты в форме, и навешивающаяя на них событие проверки на валидность
// adFormButton.addEventListener('click', function () {
//   // Поиск элементов которые нуждаются в проверке
//   var adFormInputs = adForm.querySelectorAll('input');
//   var adFormSelect = adForm.querySelectorAll('select');
//   var addEvents = function (targetElements) {
//     for (var i = 0; i < targetElements.length; i++) {
//       addInvalid(targetElements[i]);
//     }
//   };
//   addEvents(adFormInputs);
//   addEvents(adFormSelect);
// });
//
// // Вешает на элемент событие invalid, и при его срабатывании вызывает модальное окно ошибки, которое
// // закрывается c клавиатуры и мыши
// var addInvalid = function (target) {
//   target.addEventListener('invalid', function () {
//     adForm.appendChild(adFormErrorWindow);
//     var errorContainer = adForm.querySelector('.error');
//     var errorButton = adForm.querySelector('.error__button');
//     errorButton.addEventListener('click', function () {
//       if (adForm.contains(errorButton)) {
//         adForm.removeChild(adFormErrorWindow);
//       }
//     });
//     document.addEventListener('keydown', function (evt) {
//       if (adForm.contains(errorContainer)) {
//         if (evt.keyCode === ESC_KEYCODE) {
//           evt.preventDefault();
//           adForm.removeChild(adFormErrorWindow);
//         }
//       }
//     });
//   });
// };

// adForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   var adFormSuccessWindow = adFormSuccessTemplate.cloneNode(true);
//   var element = document.querySelector('.success');
//   if (element) {
//     adForm.removeChild(element);
//   }
//   adForm.appendChild(adFormSuccessWindow);
//   adFormSuccessWindow.addEventListener('click', function () {
//     adForm.removeChild(adFormSuccessWindow);
//   });
// });

// adForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   var adFormSuccessWindow = adFormSuccessTemplate.cloneNode(true);
//   var element = document.querySelector('.success');

//   if (element) {
//     adForm.removeChild(element);
//   }

//   adForm.appendChild(adFormSuccessWindow);
//   adFormSuccessWindow.addEventListener('click', function () {
//     adForm.removeChild(adFormSuccessWindow);
//   });

//   var finc = function (escEvt) {
//     if (escEvt.keyCode === ESC_KEYCODE) {
//       adForm.removeChild(adFormSuccessWindow);
//       document.removeEventListener('keydown', finc);
//     }
//   };

//   if (adFormSuccessWindow) {
//     document.addEventListener('keydown', finc);
//   }

// });
