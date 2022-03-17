const getRandomInt = (a, b) => {
  if (a < 0 || b < 0) {
    return window.console.error('Значения не должны быть отрицательными.');
  }
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkStringLength = (string, length) => string.length <= length;
checkStringLength('some random comment', 140);

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

export {getRandomInt, getRandomArrayElement};
