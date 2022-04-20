const ALERT_SHOW_TIME = 10000;
const DEBOUNCE_TIMEOUT = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, previousTarget, timeoutDelay = DEBOUNCE_TIMEOUT) => {
  let timeoutId;
  return (...rest) => {
    if(rest[0].target===previousTarget[0]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    } else {
      return callback.apply(this, rest);
    }
  };
};

const openModalWindow = (element) => {
  element.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const closeModalWindow = (evt) => {
    if (evt.type==='click' || isEscapeKey(evt)) {
      element.classList.add('hidden');
      document.body.classList.remove('modal-open');

      if (element.classList.contains('img-upload__overlay')) {
        document.querySelector('.img-upload__form').reset();
      } else {
        const oldButton = element.querySelector('.social__comments-loader');
        const clearButton = oldButton.cloneNode(true);
        oldButton.parentNode.replaceChild(clearButton, oldButton);
      }

      element.querySelector('.cancel').removeEventListener('click', closeModalWindow);
      document.removeEventListener('keydown', closeModalWindow);
    }
  };

  element.querySelector('.cancel').addEventListener('click', closeModalWindow);
  document.addEventListener('keydown', closeModalWindow);
};

const showLoad = (element) => {
  const loadWindow = element.cloneNode(true);
  document.body.classList.add('modal-open');
  document.body.append(loadWindow);
};

const showMessage = (element) => {
  const messageWindow = element.cloneNode(true);
  const messageClose = messageWindow.querySelector('button');
  document.body.classList.add('modal-open');

  const closeMessage = (evt) => {
    if ((evt.type==='click' && (evt.target===messageWindow || evt.target===messageClose)) || isEscapeKey(evt)) {
      document.body.classList.remove('modal-open');
      messageWindow.remove();
    }
  };

  messageWindow.addEventListener('click', closeMessage);
  messageClose.addEventListener('click', closeMessage);
  document.addEventListener('keydown', closeMessage);
  document.querySelector('.img-upload__message').remove();
  document.body.append(messageWindow);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '20px';
  alertContainer.style.right = '0';
  alertContainer.style.maxWidth = 'fit-content';
  alertContainer.style.margin = '0 auto';
  alertContainer.style.padding = '10px 5px 10px 20px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.background = 'linear-gradient(90deg, #ff000f 15px, #232321 15px)';
  alertContainer.style.border = '3px solid #ff000f';
  alertContainer.style.borderRadius = '15px';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const disableButton = () => {
  document.querySelector('.img-upload__submit').disabled = true;
  document.querySelector('.img-upload__submit').textContent = 'Публикация...';
};

const enableButton = () => {
  document.querySelector('.img-upload__submit').disabled = false;
  document.querySelector('.img-upload__submit').textContent = 'Опубликовать';
};

export {isEscapeKey, debounce, openModalWindow, showAlert, disableButton, enableButton, showMessage, showLoad};
