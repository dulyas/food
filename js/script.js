"use strict"
import tabs from'./modules/tabs';
import calc from'./modules/calc';
import cards from'./modules/cards';
import forms from'./modules/forms';
import modal, {openModal} from'./modules/modal';
import slider from'./modules/slider';
import timer from'./modules/timer';
import {postData} from './services/services';



document.addEventListener('DOMContentLoaded', () => {
      const modaltimerId = setTimeout(() => openModal('.modal', modaltimerId), 3000);
      tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
      calc();
      cards();
      forms('form', modaltimerId);
      modal('[data-modal]', '.modal', modaltimerId);
      slider();
      timer('.timer', '2021-12-31');

      


})
