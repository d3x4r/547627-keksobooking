'use strict';

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var PRICE_BUNGALO = 0;
var PRICE_FLAT = 1000;
var PRICE_HOUSE = 5000;
var PRICE_PALACE = 10000;

// Переменная, которая отображает необходимое количество обьектов для меток обьявлений и хранит в себе длинну массивов для генерации такого количества обьектов.
var arrayLength = 8;

var adForm = document.querySelector('.ad-form');
var mapForm = document.querySelector('.map__filters');

// Массивы со всеми элементами форм для того что бы контролировать активное состояние
var adFormElements = adForm.querySelectorAll('fieldset');
var mapFormElements = mapForm.querySelectorAll('select');

// Cостояние формы
var getDisabledElements = function (formElements, status) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = status;
  }
};

getDisabledElements(adFormElements, true);
getDisabledElements(mapFormElements, true);

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
var getRandomArray = function (arrayBasic, arrayValue) {
  var arrRandoms = [];
  var randomIndex = 0;
  for (var i = 0; i < arrayValue; i++) {
    randomIndex = Math.round(Math.random() * (arrayBasic.length - 1));
    arrRandoms.push(arrayBasic[randomIndex]);
    arrayBasic.splice(randomIndex, 1);
  }
  return arrRandoms;
};

// Функция для получение случайного числа в диапазоне min-max, необходима для генерации случайных длинн массивов
var getRandomArbitary = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Генерация массивов на основе исходных данных в случайном порядке ***НАЧАЛО***
var randomAvatars = getRandomArray(avatars, arrayLength);
var randomTitles = getRandomArray(titles, arrayLength);
var randomFeatures = getRandomArray(features.slice(), features.length);
var randomPhotos = getRandomArray(photos, photos.length);
// Генерация массивов на основе исходных данных в случайном порядке ***КОНЕЦ***

// Создание массива длинны -number, на основе входящего массива -Array
var getRandomLengthArr = function (Array, number) {
  var randomLengths = [];
  for (var i = 0; i <= number; i++) {
    randomLengths.push(Array[i]);
  }
  return randomLengths;
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

  // Создание пустого массива
  var advertisings = [];

  // Создание обьектов в количестве - arrayValue и добавление этих обьектов в массив
  for (var i = 0; i < arrayValue; i++) {
    var adObject = {};
    adObject.author = {};
    adObject.offer = {};
    adObject.location = {};
    advertisings.push(adObject);
    advertisings[i].author.avatar = randomAvatars[i];
    advertisings[i].offer.title = randomTitles[i];

    // Генерация координат для адресса
    var locX = getRandomArbitary(25, 1150);
    var locY = getRandomArbitary(130, 630);
    advertisings[i].offer.address = locX + ', ' + locY;

    advertisings[i].offer.price = getRandomArbitary(MIN_PRICE, MAX_PRICE);
    advertisings[i].offer.type = types[getRandomArbitary(0, types.length - 1)];
    advertisings[i].offer.rooms = getRandomArbitary(1, 5);

    // Количество гостей немного ограничил на своё усмотрение, в тз на этот счет не очень понятно
    advertisings[i].offer.guests = getRandomArbitary(1, 5) * 2;

    advertisings[i].offer.checkin = times[getRandomArbitary(0, times.length - 1)];
    advertisings[i].offer.checkout = times[getRandomArbitary(0, times.length - 1)];
    advertisings[i].offer.features = getRandomLengthArr(randomFeatures, getRandomArbitary(0, randomFeatures.length - 1));
    advertisings[i].offer.description = '';
    advertisings[i].offer.photos = randomPhotos;

    advertisings[i].location.x = locX;
    advertisings[i].location.y = locY;

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

// Создание фрагмента с пинами на основе массива обьектов
var createFragmentPins = function (advertisingsTotal, pinCount) {
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < pinCount; i++) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.classList.add('map__pin--users');
    mapPinElement.setAttribute('alt', advertisingsTotal[i].offer.title);
    mapPinElement.setAttribute('style', 'left:' + advertisingsTotal[i].location.x + 'px;' + 'top:' + advertisingsTotal[i].location.y + 'px;');
    var img = mapPinElement.querySelector('img');
    img.setAttribute('src', advertisingsTotal[i].author.avatar);
    pinFragment.appendChild(mapPinElement);
  }
  return pinFragment;
};

var fragmentPins = createFragmentPins(totalAdvertisings, arrayLength);

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

// Добавление информации об обьявлении в модальное окно, на основе одного обьекта из итогового массива с индексом -position
var addDescription = function (totalAd) {

  var mapFragment = document.createDocumentFragment();
  // Копирование шаблона модального окна
  var mapElement = mapTemplate.cloneNode(true);

  // Поиск элементов в разметке шаблона и добавление этим элементам значений обьекта
  mapElement.querySelector('.popup__title').textContent = totalAd.offer.title;
  mapElement.querySelector('.popup__text--address').textContent = totalAd.offer.address;
  mapElement.querySelector('.popup__text--price').textContent = totalAd.offer.price + ' ₽/ночь';
  mapElement.querySelector('.popup__type').textContent = getTypeRussian(totalAd.offer.type);
  mapElement.querySelector('.popup__text--capacity').textContent = totalAd.offer.rooms + ' комнаты для ' + totalAd.offer.guests + ' гостей';
  mapElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + totalAd.offer.checkin + ', выезд до ' + totalAd.offer.checkout;

  var featuresMap = mapElement.querySelector('.popup__features');
  // Удаление дочерних элементов блока popup__features в разметке с целью добавления сгенерированных данных
  featuresMap.innerHTML = '';
  // Добавление в разметку в блок popup__features сгенерированных элементов
  for (var j = 0; j < totalAd.offer.features.length; j++) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add('popup__feature--' + totalAd.offer.features[j]);
    featuresMap.appendChild(newElement);
  }

  mapElement.querySelector('.popup__description').textContent = totalAd.offer.description;

  var photosContainer = mapElement.querySelector('.popup__photos');
  var photosContent = photosContainer.querySelector('.popup__photo');

  // Удаление дочерних элементов блока popup__photos в разметке с целью добавления сгенерированных данных
  photosContainer.innerHTML = '';

  // Перемешивание массива с фото в случайном порядке
  var shufflePhotos = shuffleArray(totalAd.offer.photos);

  // Добавление в разметку в блок popup__photos сгенерированных элементов
  for (var k = 0; k < totalAd.offer.photos.length; k++) {
    var photo = photosContent.cloneNode();
    photo.src = shufflePhotos[k];
    photosContainer.appendChild(photo);
  }

  mapElement.querySelector('.popup__avatar').src = totalAd.author.avatar;

  // Добавление завершенного элемента в фрагмент
  mapFragment.appendChild(mapElement);
  // Добавление завершенного элемента в разметку
  map.appendChild(mapFragment);
};

// вывод похожего обьявления
// addDescription(totalAdvertisings[0]);

// Главная метка на карте
var mainPin = document.querySelector('.map__pin--main');

// Поиск поля ввода адреса в форме
var adressInput = adForm.querySelector('[name="address"]');

// Константы определяющие смещение координат на основе размеров метки mainPin
var MAIN_PIN_HEIGHT_INDEX = 70;
var MAIN_PIN_WIDTH_INDEX = 32;

// Добавление адреса в форму на основе координат главной метки
var getCoordinatPin = function (heightIndex, widthIndex) {
  var mainPinX = mainPin.offsetTop + heightIndex;
  var mainPinY = mainPin.offsetLeft + widthIndex;
  adressInput.value = mainPinY + ',' + mainPinX;
  return adressInput.value;
};

getCoordinatPin(MAIN_PIN_HEIGHT_INDEX, MAIN_PIN_WIDTH_INDEX);

// Блокировка ввода данных в инпут адресса от пользователя
adressInput.readOnly = true;

// Функция добавления странице активного состояния, срабатывает один раз
var activatePage = function () {
  getDisabledElements(adFormElements, false);
  getDisabledElements(mapFormElements, false);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  renderPins(fragmentPins);
  mainPin.removeEventListener('mousedown', activatePage);
};

mainPin.addEventListener('mousedown', activatePage);

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var mapOverlay = document.querySelector('.map__overlay');
  var startCoord = {
    x: evt.pageX,
    y: evt.pageY
  };

  // Расчет минимальных и максимальных координат пина относительно родителя
  var pinLimits = {
    top: mapOverlay.offsetTop,
    right: mapOverlay.offsetWidth + mapOverlay.offsetLeft - mainPin.offsetWidth,
    // Тут я 15 временно вкорячил потому, что вроде как адекватно ограничил значение по Y внизу, но всеравно выходит за родителя, мне показалось, что это в разметке самой ножки косяк
    bottom: mapOverlay.offsetHeight + mapOverlay.offsetTop - mainPin.offsetHeight - 15,
    left: mapOverlay.offsetLeft
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

    mainPin.style.top = pinPositionY + 'px';
    mainPin.style.left = pinPositionX + 'px';

    getCoordinatPin(MAIN_PIN_HEIGHT_INDEX, MAIN_PIN_WIDTH_INDEX);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

/* Создание массива с пользовательскими отметками на карте,
добавление обработчика на них, и показ подробной информации текущего*/
mainPin.addEventListener('click', function () {
  var usersPins = document.querySelectorAll('.map__pin--users');

  // По клику на пин добавляется окно с описанием, при клике на другой пин, текущее описание удаляется и открывается новое
  var addPinDescription = function (pin, advertising) {
    pin.addEventListener('click', function () {
      var pinDescription = map.querySelector('.map__card');
      var removeDescription = function () {
        map.removeChild(pinDescription);
      };
      if (pinDescription) {
        removeDescription();
      }
      addDescription(advertising);

      // Отслеживание кнопик закрытие описания и его закрытие при клике
      var closeDescriptionButton = map.querySelector('.popup__close');
      closeDescriptionButton.addEventListener('click', function () {
        var mapCard = map.querySelector('.map__card');
        map.removeChild(mapCard);
      });
    });
  };

  for (var i = 0; i < usersPins.length; i++) {
    addPinDescription(usersPins[i], totalAdvertisings[i]);
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});

// Отслеживание и закрытие описания обьявления по клавише esc
document.addEventListener('keydown', function (evt) {
  var mapCard = map.querySelector('.map__card');
  if (mapCard) {
    if (evt.keyCode === ESC_KEYCODE) {
      map.removeChild(mapCard);
    }
  }
});

// Поиск полей ввода в разметке
var type = document.getElementById('type');
var price = document.getElementById('price');
var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');
var roomNumber = document.getElementById('room_number');
var capacity = document.getElementById('capacity');

// Добавление минимальной цены и плейсхолдера к инпуту
var setPriceInput = function (priceInput, priceValue) {
  priceInput.min = priceValue;
  priceInput.placeholder = priceValue;
};

// Соотношение типа жилья с минимальной стоймостью
type.addEventListener('input', function () {
  if (type.value === 'bungalo') {
    setPriceInput(price, PRICE_BUNGALO);
  } else if (type.value === 'house') {
    setPriceInput(price, PRICE_HOUSE);
  } else if (type.value === 'palace') {
    setPriceInput(price, PRICE_PALACE);
  } else if (type.value === 'flat') {
    setPriceInput(price, PRICE_FLAT);
  }
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
  targetInput.addEventListener('blur', function () {
    var capacityInt = parseInt(capacity.value, 10);
    var roomInt = parseInt(roomNumber.value, 10);
    if (capacityInt > roomInt && capacityInt > 0) {
      targetInput.setCustomValidity('Количество гостей не должно превышать количество комнат');
    } else if (roomInt === 100 && capacityInt > 0) {
      targetInput.setCustomValidity('100 комнат сдается не для гостей');
    } else if (roomInt !== 100 && capacityInt === 0) {
      targetInput.setCustomValidity('Выбирете количество гостей');
    } else {
      // targetInput.setCustomValidity('');
      roomNumber.setCustomValidity('');
      capacity.setCustomValidity('');
    }
  });
};

guestSync(roomNumber);
guestSync(capacity);

// Поиск в разметке шаблона об успешном заполнении формы
var adFormSuccesTemplate = document.querySelector('#success')
.content
.querySelector('.success');
var adFormSuccesWindow = adFormSuccesTemplate.cloneNode(true);


// При вводе валидных данных в разметку добавляется окно-оверлей сообщающий об этом
// Плюс добавлены обработчики событий при нажатии клавишы мыши и ESC
adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  if (adForm.contains(successModal)) {
    adForm.removeChild(successModal);
  }
  adForm.appendChild(adFormSuccesWindow);
  var successModal = document.querySelector('.success');

  successModal.addEventListener('click', function () {
    if (adForm.contains(successModal)) {
      adForm.removeChild(successModal);
    }
  });

  var closeModalEsc = function (escEvt) {
    if (escEvt.keyCode === ESC_KEYCODE) {
      if (adForm.contains(successModal)) {
        adForm.removeChild(successModal);
      }
    }
  };
  adForm.addEventListener('keydown', closeModalEsc);
});


// Поиск в шаблоне модального окна ошибки формы
var adFormButton = adForm.querySelector('.ad-form__submit');
var adFormErrorTemplate = document.querySelector('#error')
.content
.querySelector('.error');
var adFormErrorWindow = adFormErrorTemplate.cloneNode(true);

// Функция переберающая все инпуты и селекты в форме, и навешивающаяя на них событие проверки на валидность
adFormButton.addEventListener('click', function () {
  // Поиск элементов которые нуждаются в проверке
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormSelect = adForm.querySelectorAll('select');
  var addEvents = function (targetElements) {
    for (var i = 0; i < targetElements.length; i++) {
      addInvalid(targetElements[i]);
    }
  };
  addEvents(adFormInputs);
  addEvents(adFormSelect);
});

// Вешает на элемент событие invalid, и при его срабатывании вызывает модальное окно ошибки, которое
// закрывается c клавиатуры и мыши
var addInvalid = function (target) {
  target.addEventListener('invalid', function () {
    adForm.appendChild(adFormErrorWindow);
    var errorContainer = adForm.querySelector('.error');
    var errorButton = adForm.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      if (adForm.contains(errorButton)) {
        adForm.removeChild(adFormErrorWindow);
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (adForm.contains(errorContainer)) {
        if (evt.keyCode === ESC_KEYCODE) {
          evt.preventDefault();
          adForm.removeChild(adFormErrorWindow);
        }
      }
    });
  });
};

// adForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   var adFormSuccesWindow = adFormSuccesTemplate.cloneNode(true);
//   var element = document.querySelector('.success');
//   if (element) {
//     adForm.removeChild(element);
//   }
//   adForm.appendChild(adFormSuccesWindow);
//   adFormSuccesWindow.addEventListener('click', function () {
//     adForm.removeChild(adFormSuccesWindow);
//   });
// });

// adForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   var adFormSuccesWindow = adFormSuccesTemplate.cloneNode(true);
//   var element = document.querySelector('.success');

//   if (element) {
//     adForm.removeChild(element);
//   }

//   adForm.appendChild(adFormSuccesWindow);
//   adFormSuccesWindow.addEventListener('click', function () {
//     adForm.removeChild(adFormSuccesWindow);
//   });

//   var finc = function (escEvt) {
//     if (escEvt.keyCode === ESC_KEYCODE) {
//       adForm.removeChild(adFormSuccesWindow);
//       document.removeEventListener('keydown', finc);
//     }
//   };

//   if (adFormSuccesWindow) {
//     document.addEventListener('keydown', finc);
//   }

// });
