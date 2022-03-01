const NAMES = [
  'Василий',
  'Андрей',
  'Иван',
  'Фёдор',
  'Алексей',
  'Илья',
  'Екатерина',
  'Ксения',
  'Дарья',
  'Наталия',
  'Виктория',
];

const SURNAMES = [
  'Тёркин',
  'Федько',
  'Шишкин',
  '♥',
  'Новиков',
  'Живаго',
  'Никитенко',
  'Штольберг',
  'Дюма',
  'Мирушко',
  'Ардженикидзе',
];

const DESCRIPTIONS = [
  'Ночь в Крыму.',
  'Рассвет на побережье.',
  'Ах! Какой вкусный тортик!',
  'Разнообразие подводного мира.',
  'Весёлая компания: я и мои друзья!',
  'Самый лучший день в моей жизни!',
  'Маленький рыжий гость из лесной глубинки.',
  '"Добровольцы" на бабушкином огороде.',
  'Интересно, чей это домик?',
  'Мой аленький цветочек.',
  'Жюль Верн был бы в шоке!',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_CARD_COUNT = 25;
const MAX_COMMENT_COUNT = 30;
const randomIDFilter = [];

const getRandomInt = (a, b) => {
  if (a < 0 || b < 0) {
    return window.console.error('Значения не должны быть отрицательными.');
  }
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkStringLength = (string, length) => string.length <= length;

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getRandomID = () => {
  const max = SIMILAR_CARD_COUNT * MAX_COMMENT_COUNT;
  while (randomIDFilter.length <= max) {
    const randomInt = getRandomInt(100, 999);
    if (randomIDFilter.indexOf(randomInt) === -1) {
      randomIDFilter.push(randomInt);
      return randomInt;
    }
  }
};

const createComments = () => ({
  id: getRandomID(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`,
});

const createCard = (_, i) => ({
  id: i + 1,
  url: `photos/${i + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(15, 200),
  comments: Array.from({length: getRandomInt(0, MAX_COMMENT_COUNT)}, createComments),
});

const similarCards = Array.from({length: SIMILAR_CARD_COUNT}, createCard);
randomIDFilter.length = 0;
window.console.log(similarCards);
checkStringLength('some random comment', 140);
