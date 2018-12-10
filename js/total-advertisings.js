'use strict';

(function () {

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  // Переменная, которая отображает необходимое количество обьектов для меток обьявлений и хранит в себе длинну массивов для генерации такого количества обьектов.
  var NUMBERS_OF_ADS = 8;

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

  // Генерация упорядоченного массива с аватарами пользователей
  var getAvatarList = function (avatarCount) {
    var avatarList = [];
    for (var i = 1; i <= avatarCount; i++) {
      avatarList.push('img/avatars/user0' + i + '.png');
    }
    return avatarList;
  };
  var avatars = getAvatarList(NUMBERS_OF_ADS);

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
  window.totalAdvertisings = getAdList(NUMBERS_OF_ADS);
})();
