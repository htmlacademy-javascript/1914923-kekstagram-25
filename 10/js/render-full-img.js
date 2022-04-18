import {openModalWindow} from './util.js';
import {readyData} from './data.js';

const fragment = document.createDocumentFragment();
const pictureWindow = document.querySelector('.big-picture');
const fullSizePicture = pictureWindow.querySelector('.big-picture__img img');
const likesCount = pictureWindow.querySelector('.likes-count');
const commentsCount = pictureWindow.querySelector('.comments-count');
const commentsContent = pictureWindow.querySelector('.social__comments');
const commentCopy = commentsContent.querySelector('li').cloneNode(true);
const pictureDescription = pictureWindow.querySelector('.social__caption');

const searchData = (item) => {
  for (let i=0; i<readyData.length; i++) {
    if (item.querySelector('.picture__img').src.includes(readyData[i].url)) {
      return readyData[i];
    }
  }
};

const renderComments = (partData, moreComments) => {
  let messageCounter = 0;
  commentsContent.textContent = '';

  const createComments = () => {
    for (let i=0; messageCounter<partData.comments.length; i++) {
      const commentItem = commentCopy.cloneNode(true);
      commentItem.querySelector('.social__picture').src = partData.comments[messageCounter].avatar;
      commentItem.querySelector('.social__picture').alt = partData.comments[messageCounter].name;
      commentItem.querySelector('.social__text').textContent = partData.comments[messageCounter].message;
      fragment.append(commentItem);
      messageCounter++;
      if (i>=4) {break;}
    }

    commentsContent.append(fragment);
    pictureWindow.querySelector('.social__comment-count').firstChild.textContent = `${messageCounter} из `;

    if (messageCounter>=partData.comments.length) {
      moreComments.classList.add('hidden');
      moreComments.removeEventListener('click', createComments);
    }
  };

  createComments();
  moreComments.addEventListener('click', createComments);
};

const renderFullPicture = (item) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();

    const partData = searchData(item);
    fullSizePicture.src = partData.url;
    likesCount.textContent = partData.likes;
    commentsCount.textContent = partData.comments.length;
    pictureDescription.textContent = partData.description;

    const moreComments = pictureWindow.querySelector('.social__comments-loader');
    moreComments.classList.remove('hidden');
    renderComments(partData, moreComments);

    openModalWindow(pictureWindow);
  });
};

export {renderFullPicture};
