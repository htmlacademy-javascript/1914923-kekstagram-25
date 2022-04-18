import {isEscapeKey, openModalWindow} from './util.js';
import {pristine, form} from './validate.js';
import {giveEffects, createSlider} from './slider-img-effect.js';

const formWindow = document.querySelector('.img-upload__overlay');
const inputUploadPicture = document.querySelector('#upload-file');
const inputHashTag = formWindow.querySelector('.text__hashtags');
const inputDescription = formWindow.querySelector('.text__description');
const smallerScale = formWindow.querySelector('.scale__control--smaller');
const biggerScale = formWindow.querySelector('.scale__control--bigger');
const inputScale = formWindow.querySelector('.scale__control--value');
const previewImg = formWindow.querySelector('.img-upload__preview img');
const effectsSelect = formWindow.querySelectorAll('.effects__radio');
const effectsLevel = formWindow.querySelector('.img-upload__effect-level');

const applyZoom = () => {
  previewImg.style.transform = `scale(${inputScale.value.replace('%', '')/100})`;
};

const zoomImg = () => {
  smallerScale.addEventListener('click', () => {
    if (inputScale.value.replace('%', '')>=50) {
      inputScale.value = `${+inputScale.value.replace('%', '')-25}%`;
      applyZoom();
    }
  });

  biggerScale.addEventListener('click', () => {
    if (inputScale.value.replace('%', '')<=75) {
      inputScale.value = `${+inputScale.value.replace('%', '')+25}%`;
      applyZoom();
    }
  });
};

const renderEffects = (evt) => {
  if (evt.target.value === 'none') {
    effectsLevel.classList.add('hidden');
    previewImg.style.filter = '';
  } else {
    effectsLevel.classList.remove('hidden');
    previewImg.style.filter = giveEffects(evt.target.value);
  }
};

const stopEvent = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const openFormWindow = () => {
  inputUploadPicture.addEventListener('change', () => {
    effectsLevel.classList.add('hidden');
    previewImg.style.filter = '';

    inputScale.value = '100%';
    applyZoom();

    openModalWindow(formWindow);
  });

  zoomImg();
  createSlider();

  effectsSelect.forEach((item) => {
    item.addEventListener('change', renderEffects);
  });

  inputHashTag.addEventListener('keydown', stopEvent);
  inputDescription.addEventListener('keydown', stopEvent);

  form.addEventListener('submit', (evt) => {
    if (!pristine.validate(true)) {
      evt.preventDefault();
    }
  });
};

export {openFormWindow};
