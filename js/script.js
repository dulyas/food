"use strict"
document.addEventListener('DOMContentLoaded', (e) => {
const tabs = require('./modules/tabs'),
      calc = require('./modules/calc'),
      cards = require('./modules/cards'),
      forms = require('./modules/forms'),
      modal = require('./modules/modal'),
      slider = require('./modules/slider'),
      timer = require('./modules/timer');

      tabs();
      calc();
      cards();
      forms();
      modal();
      slider();
      timer();

      


})
