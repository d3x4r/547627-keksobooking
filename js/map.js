'use strict';

var removeClass = function (targetNameClass, removeNameClass) {
  var targetClass = document.querySelector(targetNameClass);
  targetClass.classList.remove(removeNameClass);
};

removeClass('.map', 'map--faded');

var arrayLength = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var getAvatarList = function () {
  var avatarList = [];
  for (var i = 1; i <= arrayLength; i++) {
    avatarList.push('img/avatars/user0' + i + '.png');
  }
  return avatarList;
};

var avatarlist = getAvatarList();

var titleList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var typeList = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var checkTimeList = [
  '12:00',
  '13:00',
  '14:00'
];

var featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photosList = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getRandomArray = function (arrayBasic, arrayValue) {
  var massivRandom = [];
  var randomIndex = 0;
  for (var i = 0; i < arrayValue; i++) {
    randomIndex = Math.round(Math.random() * (arrayBasic.length - 1));
    massivRandom.push(arrayBasic[randomIndex]);
    arrayBasic.splice(randomIndex, 1);
  }
  return massivRandom;
};

var getRandomArbitary = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var avatarRandom = getRandomArray(avatarlist, arrayLength);
var titleListRandom = getRandomArray(titleList, arrayLength);
var randomPrice = getRandomArbitary(MIN_PRICE, MAX_PRICE);
var randomType = typeList[getRandomArbitary(0, typeList.length - 1)];
var rooms = getRandomArbitary(1, 5);
var checkTime = checkTimeList[getRandomArbitary(0, checkTimeList.length - 1)];
var randomFeatures = getRandomArray(featuresList.slice(), featuresList.length);
var randomFeaturesNumber = getRandomArbitary(0, randomFeatures.length);
var randomPhotos = getRandomArray(photosList, photosList.length);

var getAdList = function (arrayValue) {
  var adObject = {};
  adObject.author = {};
  adObject.offer = {};
  adObject.location = {};
  var adList = [];
  for (var i = 0; i < arrayValue; i++) {
    adObject.author.avatar = avatarRandom[0];

    adObject.offer.title = titleListRandom[0];
    adObject.offer.adress = '600, 350';
    adObject.offer.address = '';
    adObject.offer.price = randomPrice;
    adObject.offer.type = randomType;
    adObject.offer.rooms = rooms;
    adObject.offer.guests = rooms * 2;
    adObject.offer.checkin = checkTime;
    adObject.offer.checkout = checkTime;
    adObject.offer.features = '';
    for (var j = 0; j < randomFeaturesNumber; j++) {
      adObject.offer.features += randomFeatures[j] + ' ';
    }
    adObject.offer.description = '';
    adObject.offer.photos = randomPhotos;

    adObject.location.x = 500;
    adObject.location.y = 200;
    adList.push(adObject);
  }
  return adList;
};

var addFullList = getAdList(arrayLength);
console.log(addFullList);
