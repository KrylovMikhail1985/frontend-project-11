import onChange from 'on-change';
import validation from './validation.js';
import refactor from './refactor.js';
import updateRSSData from './updateRSSData.js';
// import { object } from 'yup';

export default async (currentState, i18n) => {
  const state = currentState;
  const watchState = onChange(state, (path, value) => {
    // console.log('start watchState');
    // console.log('this:', this);
    // console.log('path:', path.slice(0, 15));
    // console.log('value:', value);
    // console.log(state);
    if (path.slice(0, 4) === 'urls') {
      updateRSSData(state, value).then((data) => {
        state.fids = { ...state.fids, ...data.fids };
        watchState.topics = { ...state.topics, ...data.topics };
      });
    }
    if (path.slice(0, 6) === 'topics') {
      refactor(state, i18n);
    }
  });
  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    const input = form.querySelector('#url-input');
    const currentValue = input.value;
    // input.value = `Value = ${currentValue}`;
    validation(currentValue).then((bool) => {
      const allUrls = Object.values(state.urls);
      if (bool) {
        if (allUrls.includes(currentValue)) {
          state.errors = 'already_exist';
        } else {
          state.errors = null;
          state.message = 'succes';
          const urlId = Object.keys(state.urls).length + 1;
          watchState.urls[urlId] = currentValue;
        }
      } else {
        state.errors = 'not_valid';
      }
      refactor(state, i18n);
    });
  });
};
