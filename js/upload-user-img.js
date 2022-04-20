import {isEscapeKey, openModalWindow, disableButton, showLoad} from './util.js';
import {pristine, form} from './validate.js';
import {giveEffects, createSlider} from './slider-img-effect.js';
import {sendData} from './api.js';

const ZOOM_DEFAULT = 100;
const ZOOM_STEP = 25;
const MINIMUM_TRIGGER_VALUE = ZOOM_STEP*2;
const MAXIMUM_TRIGGER_VALUE = ZOOM_DEFAULT-ZOOM_STEP;
const FILE_TYPES = ['webp', 'jpg', 'jpeg', 'png', 'gif'];

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
const loadWindow = document.querySelector('#messages').content.querySelector('.img-upload__message');

const applyZoom = () => {
  previewImg.style.transform = `scale(${inputScale.value.replace('%', '')/ZOOM_DEFAULT})`;
};

const zoomImg = () => {
  smallerScale.addEventListener('click', () => {
    if (inputScale.value.replace('%', '')>=MINIMUM_TRIGGER_VALUE) {
      inputScale.value = `${+inputScale.value.replace('%', '')-ZOOM_STEP}%`;
      applyZoom();
    }
  });

  biggerScale.addEventListener('click', () => {
    if (inputScale.value.replace('%', '')<=MAXIMUM_TRIGGER_VALUE) {
      inputScale.value = `${+inputScale.value.replace('%', '')+ZOOM_STEP}%`;
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

const renderImgPreview = () => {
  const file = inputUploadPicture.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    previewImg.src = URL.createObjectURL(file);
  }
};

const openFormWindow = () => {
  inputUploadPicture.addEventListener('change', () => {
    previewImg.style.filter = '';
    inputScale.value = `${ZOOM_DEFAULT}%`;
    effectsLevel.classList.add('hidden');

    renderImgPreview();
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
    evt.preventDefault();
    if (pristine.validate(true)) {
      disableButton();
      showLoad(loadWindow);
      const formData = new FormData(evt.target);
      sendData(formData, form);
    }
  });
};

export {openFormWindow};
