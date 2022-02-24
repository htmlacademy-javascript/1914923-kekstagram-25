// источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random (код был изменён)

function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    return('Значения не должны быть отрицательными.');
  }
  if (min === max || max < min) {
    return('Конечное значение не должно быть равным начальному или меньше него.');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkLength(text, maxLength) {
  if (text.length > maxLength) {
    return(false);
  }
  return(true);
}

getRandomInt(5, 20);
checkLength('some random comment', 140);
