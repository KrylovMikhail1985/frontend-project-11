import validation from './validation.js';
import refactor from './refactor.js';

export default (currentState) => {
  const state = currentState;
  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    const input = form.querySelector('#url-input');
    const currentValue = input.value;
    // input.value = `Value = ${currentValue}`;
    validation(currentValue).then((bool) => {
      const allUrls = Object.keys(state.urls);
      if (bool) {
        if (allUrls.includes(currentValue)) {
          state.errors = 'RSS уже существует';
        } else {
          state.urls[currentValue] = null;
          state.errors = null;
          state.message = 'RSS успешно загружен';
        }
      } else {
        state.errors = 'Ссылка должна быть валидным URL';
      }
      refactor(state);
    });
  });
};