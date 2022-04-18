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

const isEscapeKey = (evt) => evt.key === 'Escape';

const openModalWindow = (element) => {
  element.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const closeModalWindow = (evt) => {
    if (evt.type==='click' || isEscapeKey(evt)) {
      element.classList.add('hidden');
      document.body.classList.remove('modal-open');

      if (element.classList.contains('img-upload__overlay')) {
        document.querySelector('.img-upload__form').reset();
      }

      element.querySelector('.cancel').removeEventListener('click', closeModalWindow);
      document.removeEventListener('keydown', closeModalWindow);
    }
  };

  element.querySelector('.cancel').addEventListener('click', closeModalWindow);
  document.addEventListener('keydown', closeModalWindow);
};

export {getRandomInt, getRandomArrayElement, isEscapeKey, openModalWindow, checkStringLength};
