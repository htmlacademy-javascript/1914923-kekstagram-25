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

const createComments = (partData) => {
  for (let i=0; i<partData.comments.length; i++) {
    const commentItem = commentCopy.cloneNode(true);
    commentItem.querySelector('.social__picture').src = partData.comments[i].avatar;
    commentItem.querySelector('.social__picture').alt = partData.comments[i].name;
    commentItem.querySelector('.social__text').textContent = partData.comments[i].message;
    fragment.append(commentItem);
  }

  commentsContent.textContent = '';
  commentsContent.append(fragment);
};

const renderFullPicture = (item) => {
  item.addEventListener('click', (evt) => {
    evt.preventDefault();

    const partData = searchData(item);
    fullSizePicture.src = partData.url;
    likesCount.textContent = partData.likes;
    commentsCount.textContent = partData.comments.length;
    pictureDescription.textContent = partData.description;
    createComments(partData);

    pictureWindow.querySelector('.social__comment-count').classList.add('hidden');
    pictureWindow.querySelector('.comments-loader').classList.add('hidden');

    openModalWindow(pictureWindow);
  });
};

export {renderFullPicture};
