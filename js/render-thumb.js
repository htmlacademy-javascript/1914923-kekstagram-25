import {renderFullPicture} from './render-full-img.js';
import {debounce} from './util.js';

const RANDOM_IMG_COUNT = 10;

const fragment = document.createDocumentFragment();
const container = document.querySelector('.pictures.container');
const temp = document.querySelector('#picture').content.querySelector('.picture');
const filterBlock = document.querySelector('.img-filters');
const filterButtonDefault = filterBlock.querySelector('#filter-default');
const filterButtonRandom = filterBlock.querySelector('#filter-random');
const filterButtonDiscussed = filterBlock.querySelector('#filter-discussed');

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
  filterBlock.classList.remove('img-filters--inactive');
};

const clearContainer = (item) => {
  container.querySelectorAll('.picture').forEach((element) => {element.remove();});
  filterBlock.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  item.classList.add('img-filters__button--active');
};

const getMixedMasive = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getFilteredImages = (data) => {
  const previousTarget = [filterButtonDefault];
  filterButtonDefault.addEventListener('click', debounce(
    (evt) => {
      previousTarget[0] = evt.target;
      clearContainer(evt.target);
      getRenderedImages(data);
    }, previousTarget));

  filterButtonRandom.addEventListener('click', debounce(
    (evt) => {
      previousTarget[0] = evt.target;
      clearContainer(evt.target);
      getRenderedImages(
        getMixedMasive(data.slice(0)).slice(0, RANDOM_IMG_COUNT)
      );
    }, previousTarget));

  filterButtonDiscussed.addEventListener('click', debounce(
    (evt) => {
      previousTarget[0] = evt.target;
      clearContainer(evt.target);
      getRenderedImages(
        data.slice(0).sort((a, b) => b.comments.length-a.comments.length)
      );
    }, previousTarget));
};

export {getRenderedImages, getFilteredImages};
