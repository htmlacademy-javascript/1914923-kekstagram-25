import {checkStringLength} from './util.js';

const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text'
});

const validateHeshTags = (element) => {
  const tegs = element.split(' ');
  return tegs.length <= 5 && (new Set(tegs)).size === tegs.length;
};

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHeshTags,
  'Нельзя указать повторяющиеся хеш-теги!<br>Не должно быть больше 5 хеш-тегов!<br>Лишние пробелы не допускаются!'
);

const validateDescription = (element) => (checkStringLength(element, 140));

pristine.addValidator(
  form.querySelector('.text__description'),
  validateDescription,
  'Длина описания не должна привышать 140 символов!'
);

export {pristine, form};
