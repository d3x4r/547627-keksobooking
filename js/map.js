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
// var randomPrice = getRandomArbitary(MIN_PRICE, MAX_PRICE);
var randomType = typeList[getRandomArbitary(0, typeList.length - 1)];
var rooms = getRandomArbitary(1, 5);
var checkTime = checkTimeList[getRandomArbitary(0, checkTimeList.length - 1)];
var randomFeatures = getRandomArray(featuresList.slice(), featuresList.length);
var randomFeaturesNumber = getRandomArbitary(0, randomFeatures.length);
var randomPhotos = getRandomArray(photosList, photosList.length);

var getAdList = function (arrayValue) {
  // var adObject = {};
  // adObject.author = {};
  // adObject.offer = {};
  // adObject.location = {};
  var adList = [];
  for (var i = 0; i < arrayValue; i++) {
    var adObject = {};
    adObject.author = {};
    adObject.offer = {};
    adObject.location = {};
    adList.push(adObject);
    adList[i].author.avatar = avatarRandom[i];
    adList[i].offer.title = titleListRandom[i];
    adList[i].offer.adress = '600, 350';
    adList[i].offer.address = '';
    adList[i].offer.price = getRandomArbitary(MIN_PRICE, MAX_PRICE);
    adList[i].offer.type = randomType;
    adList[i].offer.rooms = rooms;
    adList[i].offer.guests = rooms * 2;
    adList[i].offer.checkin = checkTime;
    adList[i].offer.checkout = checkTime;
    adList[i].offer.features = '';
    for (var j = 0; j < randomFeaturesNumber; j++) {
      adList[i].offer.features += randomFeatures[j] + ' ';
    }
    adList[i].offer.description = '';
    adList[i].offer.photos = randomPhotos;

    adList[i].location.x = 500;
    adList[i].location.y = 200;

    // adList[i] = adObject;
  }
  return adList;
  // return adObject;
};

// var xxx = getAdList(arrayLength);
// console.log(xxx);
// var arg = [];
// var obj = {};

// for (var i = 0; i < 5; i++) {
//   var obj = {};
//   arg.push(obj);
//   arg[i].key = i;
//   console.log(arg[i].key);
// }
// console.log(obj);
// console.log(arg);
// for (var i = 0; i < arrayLength; i++) {
//   adList[i] =
// }
var addFullList = getAdList(arrayLength);
// console.log(addFullList);

var mapPinList = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

for (var i = 0; i < 8; i++) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.setAttribute('alt', addFullList[i].offer.title);
  // mapPinElement.setAttribute('style', addFullList[i].offer.title);
  var img = mapPinElement.querySelector('img');
  // mapPinElement.src = addFullList[i].author.avatar;
  img.setAttribute('src', addFullList[i].author.avatar);
  mapPinList.appendChild(mapPinElement);
}
