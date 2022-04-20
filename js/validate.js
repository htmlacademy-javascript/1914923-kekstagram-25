const MAXIMUM_TEGS_COUNT = 5;
const MAXIMUM_DESC_LENGTH = 140;

const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text'
});

const validateHeshTags = (element) => {
  const tegs = element.toUpperCase().split(' ');
  return tegs.length <= MAXIMUM_TEGS_COUNT && (new Set(tegs)).size === tegs.length;
};

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHeshTags,
  'Нельзя указать повторяющиеся хеш-теги!<br>Не должно быть больше 5 хеш-тегов!<br>Лишние пробелы не допускаются!'
);

const validateDescription = (element) => element.length <= MAXIMUM_DESC_LENGTH;

pristine.addValidator(
  form.querySelector('.text__description'),
  validateDescription,
  `Длина описания не должна привышать ${MAXIMUM_DESC_LENGTH} символов!`
);

export {pristine, form};
