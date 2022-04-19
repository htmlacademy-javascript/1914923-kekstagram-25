import {renderFullPicture} from './render-full-img.js';

const fragment = document.createDocumentFragment();
const container = document.querySelector('.pictures.container');
const temp = document.querySelector('#picture').content.querySelector('.picture');

const getRenderedImages = (readyData) => {
  for (let i=0; i<readyData.length; i++) {
    const newContent = temp.cloneNode(true);
    newContent.querySelector('.picture__img').src = readyData[i].url;
    newContent.querySelector('.picture__likes').textContent = readyData[i].likes;
    newContent.querySelector('.picture__comments').textContent = readyData[i].comments.length;
    renderFullPicture(newContent, readyData);
    fragment.append(newContent);
  }

  container.append(fragment);
};

export {getRenderedImages};
