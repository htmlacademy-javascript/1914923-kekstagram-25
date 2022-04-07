import {readyData} from './data.js';

const fragment = document.createDocumentFragment();
const thumbnails = document.querySelector('.pictures.container').children;
const pictureWindow = document.querySelector('.big-picture');
const fullSizePicture = pictureWindow.querySelector('.big-picture__img img');
const likesCount = pictureWindow.querySelector('.likes-count');
const commentsCount = pictureWindow.querySelector('.comments-count');
const commentsContent = pictureWindow.querySelector('.social__comments');
const pictureDescription = pictureWindow.querySelector('.social__caption');
const cancelPictureWindow = pictureWindow.querySelector('.big-picture__cancel');

const searchData = (item) => {
  for (let i=0; i<readyData.length; i++) {
    if (item.querySelector('.picture__img').src.includes(readyData[i].url)) {
      return readyData[i];
    }
  }
};

const createComments = (partData) => {
  for (let i=0; i<partData.comments.length; i++) {
    const commentItem = commentsContent.children[0].cloneNode(true);
    commentItem.querySelector('.social__picture').src = partData.comments[i].avatar;
    commentItem.querySelector('.social__picture').alt = partData.comments[i].name;
    commentItem.querySelector('.social__text').textContent = partData.comments[i].message;
    fragment.append(commentItem);
  }

  commentsContent.textContent = '';
  commentsContent.append(fragment);
};

const createBlock = (item) => {
  item.onclick = (evt) => {
    evt.preventDefault();

    const partData = searchData(item);
    fullSizePicture.src = partData.url;
    likesCount.textContent = partData.likes;
    commentsCount.textContent = partData.comments.length;
    pictureDescription.textContent = partData.description;
    createComments(partData);

    pictureWindow.querySelector('.social__comment-count').classList.add('hidden');
    pictureWindow.querySelector('.comments-loader').classList.add('hidden');

    pictureWindow.classList.remove('hidden');
    document.body.classList.add('modal-open');

    cancelPictureWindow.onclick = () => {
      pictureWindow.classList.add('hidden');
      document.body.classList.remove('modal-open');
    };

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        pictureWindow.classList.add('hidden');
        document.body.classList.remove('modal-open');
      }
    });
  };
};

const getFullImage = () => {
  for (let i=0; i<thumbnails.length; i++) {
    if (thumbnails[i].classList.contains('picture')) {
      createBlock(thumbnails[i]);
    }
  }
};

export {getFullImage};
