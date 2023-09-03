// import _ from 'lodash';
import './scss/styles.scss';
import 'bootstrap';
import view from './view.js';

const state = {
  urls: {},
  errors: null,
  message: null,
};

view(state);
