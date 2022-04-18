import {isEscapeKey, openModalWindow} from './util.js';
import {pristine, form} from './validate.js';

const formWindow = document.querySelector('.img-upload__overlay');
const inputUploadPicture = document.querySelector('#upload-file');
const inputHashTag = formWindow.querySelector('.text__hashtags');
const inputDescription = formWindow.querySelector('.text__description');

const stopEvent = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const openFormWindow = () => {
  inputUploadPicture.addEventListener('change', () => {
    openModalWindow(formWindow);
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
