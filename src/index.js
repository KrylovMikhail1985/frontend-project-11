// import _ from 'lodash';
import './scss/styles.scss';
import 'bootstrap';
import view from './view.js';
import i18n from './i18n.js';

const state = {
  urls: {},
  errors: null,
  message: null,
};

view(state, i18n);
