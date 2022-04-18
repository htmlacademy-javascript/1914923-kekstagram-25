const sliderEffect = document.querySelector('.effect-level__slider');
const inputEffect = document.querySelector('.effect-level__value');
const filterStyle = document.querySelector('.img-upload__preview img');

const createSlider = () => {
  noUiSlider.create(sliderEffect, {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 0,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderEffect.noUiSlider.on('update', () => {
    inputEffect.value = sliderEffect.noUiSlider.get();
    filterStyle.style.filter = filterStyle.style.filter.replace(/[0-9]+(\.\d+)?/, inputEffect.value);
  });
};

const giveEffects = (value) => {
  switch(value) {
    case 'chrome':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 0,
      });
      return 'grayscale(0)';

    case 'sepia':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 0,
      });
      return 'sepia(0)';

    case 'marvin':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 0,
      });
      return 'invert(0%)';

    case 'phobos':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 0,
      });
      return 'blur(0px)';

    case 'heat':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 1,
      });
      return 'brightness(1)';
  }
};

export {giveEffects, createSlider};
