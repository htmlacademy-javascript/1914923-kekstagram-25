import {getRenderedImages} from './render-thumb.js';
import {showMessage, showAlert, enableButton} from './util.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');

const getData = () => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      getRenderedImages(data);
    })
    .catch((err) => {
      showAlert(`При загрузке страницы произошла ошибка! (${err.message})`);
    });
};

const sendData = (formData, form) => {
  fetch('https://25.javascript.pages.academy/kekstagram', {method:'POST', type:'multipart/form-data', body:formData})
    .then((response) => {
      enableButton();
      form.querySelector('.img-upload__cancel').click();
      if (response.ok) {
        showMessage(successMessage);
      } else {
        showMessage(errorMessage);
      }
    })
    .catch(() => {
      enableButton();
      form.querySelector('.img-upload__cancel').click();
      showMessage(errorMessage);
    });
};

export {getData, sendData};
