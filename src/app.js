import './style.scss';
import template from './index.hbs';
import logo from './images/logo.svg';


if (module.hot) {
  module.hot.accept()
}



document.querySelector('.logo').innerHTML = logo;