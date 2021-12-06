/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc () {
    
const calcRes = document.querySelector('.calculating__result span');
let sex = 'female', height, weight, age, ratio = 1.375;

staticInput('#gender', 'calculating__choose-item_active');
staticInput('.calculating__choose_big','calculating__choose-item_active');
dinamicInput('#height');
dinamicInput('#weight');
dinamicInput('#age');

document.addEventListener('click', () => {
    console.log(sex, height, weight, age, ratio);
})

function calcKcal() {
    if (!sex || !height || !weight || !age) {
        calcRes.textContent = '...?'
    } else if (sex == 'female') {
        calcRes.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio);
    } else {
        calcRes.textContent = Math.round(calcRes.textContent = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
    }
    
}
function staticInput(selector, activeClass) {
    const block = document.querySelectorAll(`${selector} div`);
    block.forEach(item => {
        item.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
            ratio = +e.target.getAttribute('data-ratio');
            calcKcal();
        } else {
            sex = e.target.getAttribute('sex');
            calcKcal();
        }
        
        block.forEach(item => item.classList.remove(activeClass));

        e.target.classList.add(activeClass);
        
        }
        )
    })
}
function dinamicInput(selector) {   
 const input = document.querySelector(selector);
 input.addEventListener('input', () => {
     switch(input.getAttribute('id')) {
         case 'height':
             height = +input.value;
             calcKcal();
             break;
         case 'weight':
             weight = +input.value;
             calcKcal();
             break;
         case 'age':
             age = +input.value;
             calcKcal();
             break;         
     }
 })

}

}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    class FoodCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
        }
        changeToUAH() {
            this.price = this.price*this.transfer
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.class = 'menu__item';
                element.classList.add(this.class);
            } else {
            this.classes.forEach(className => {
                element.classList.add(className)
            }) }
            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>`;
            this.parent.append(element);

        }
    }

    const getResource = async (url) => { // передаем ссылку на сервер и контент
        const res = await fetch(url);
        if (!res.ok) {
           throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

            return await res.json();
    };
    // getResource('http://localhost:3000/menu').
    // then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new FoodCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });
    axios.get('http://localhost:3000/menu').
    then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new FoodCard(img, altimg, title, descr, price, '.menu .container').render();
        });



    // Forms



})
}
module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    const forms = document.querySelectorAll('form'); // переносим все формы в переменную
    const message = { // объект для сообщений ответа для пользователя
        loading: '/icons/spin.svg', // анимация для загрузки
        success: 'Спасибо! Скоро с Вами саяжутся',
        failure: 'Что-то пошло не так'
     }
    forms.forEach(item => { // накладываем функцию postData на все формы на странице
        bindPostData(item);
    });

        const postData = async (url, data) => { // передаем ссылку на сервер и контент
            const res = await fetch(  // async и await нужны для того, чтобы асинхронный код выполнялся корректно, ибо в данном случае в res не будет ничего приходить async ставим перед аргументами а await перед асинхронными местами 
                url,
                {
                    method: "POST",
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: data
                }
            );
                return await res.json();
        }

        function bindPostData(form) { // функция будет отвечать за отправку данных на сервер?
            form.addEventListener('submit', (e) => { // у кнопок тип submit стоит автоматически
                e.preventDefault(); // убираем обычное поведение страницы при нажатии на кнопку (перезагрузку)
                const statusMessage = document.createElement('img'); // создадим блок для сообщения пользователю
                statusMessage.src = message.loading;
                statusMessage.style.cssText = 'display:block; margin:0 auto' // добавим ему классов для оформления
                form.insertAdjacentElement('afterend', statusMessage);// добавляем сообщение в конец формы




                // const request = new XMLHttpRequest(); // создаем объект (позже перейдем на более современные варианты)
                // request.open('POST', 'server.php'); // POST, ибо мы отправляем данные на сервер server.php 

                // меняем XMLHttp на fetch



                // request.setRequestHeader('Content-type', 'application/json'); // для работы с json 


                
                const formData = new FormData(form); // создаем переменную с конструктором FormData, в нее отправляем нашу форму
                // const objectjs = {};
                // formData.forEach(function(value, key){
                //     objectjs[key] = value;
                // }); // создаемобычный объект а не formData

                const json = JSON.stringify(Object.fromEntries(formData.entries()));
                //более простой способ перевести данные в json

                // это минигайд как переделать formData в json
                
                

                postData('http://localhost:3000/requests', json)
                // .then(data => data.text()) // модифицируем наш ответ в виде текста init
                .then(data => {
                console.log(data);
                showThankModal(message.success); // сообщение про успешную отправку
                statusMessage.remove();
                }).catch(() => {
                showThankModal(message.failure);
                }).finally(() => form.reset());// очистим форму )



                // в инпутах всегда должен быть аттрибут name для отправки на сервер
                // request.send(json); // отправка 
//                 request.addEventListener('load', () => { //обработчкик события при загрузке
//                     if (request.status === 200) { // проверяем успешно или нет
//                         console.log(request.response); // тест для меня в консоли
//                         showThankModal(message.success); // сообщение про успешную отправку
//                         form.reset(); // очистим форму 
//                             statusMessage.remove();;
// // удаляем сообщение об отправке
//                     } else {
//                         showThankModal(message.failure); // сообщение об ошибке если что-то пошло не так
//                     }
//                 });
            });
        }

    // оформление красивое для сообщения пользователю
}


function showThankModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal(); // вызываем модальное окно без контента
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
    </div>`; // меняем контент в модальном окне на наше сообщение

document.querySelector('.modal').append(thanksModal); // вызываем
setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    closeModal();
}, 4000) // через 4 секунды мы прячем наше сообщение и возвращаем в модальное окно обычный ввод имя телефон, чтобы пользователь мог снова пользоваться кнокой связи
};

// тестовый фетч запрос
// fetch('https://jsonplaceholder.typicode.com/posts', { // ссылка для отправления
//     method: "POST", // настройки для fetch // метод
//     body: JSON.stringify({name: 'Alex'}), // то, что отправляется в нужном формате
//     headers: { // заголовки
//         'Content-type' : 'application/json'
//     }
// })
// .then(response => response.json())
// .then(json => console.log(json));

fetch('db.json').then(data => data.json()).then(res=>console.log(res));


module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    
const modal = document.querySelectorAll('[data-modal]');
const active = document.querySelector('.modal'); 
//const modalClose = document.querySelector('[data-close]');
//modalClose.addEventListener('click', () => {  
//    closeModal();

//})
    modal.forEach((item) => {
        item.addEventListener('click', () => {  
            openModal();
            })
    })
    function closeModal() {
        active.classList.add('hide');
        active.classList.remove('show');
        document.body.style.overflow = '';
    };
    function openModal() {
        active.classList.add('show');
        active.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modaltimerId);
        window.removeEventListener('scroll', showModalScroll);
    };
    active.addEventListener('click', (e) => {
        if (e.target === active || e.target.getAttribute('data-close') == '') { //укоротили код и подстроили его под новый функционал
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && active.classList.contains('show')) {
            closeModal();
        }
    });
    const modaltimerId = setTimeout(openModal, 3000);

    function showModalScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalScroll)
        }
    }
    window.addEventListener('scroll', showModalScroll);
}
module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    
const slides = document.querySelectorAll('.offer__slide');
const next = document.querySelector('.offer__slider-next');
const prev = document.querySelector('.offer__slider-prev');
let slideIndex = 1;
let currentSlide = document.querySelector('#current');
    function slideShow(n) {

        slides.forEach(item => {
            item.style.display = 'none';
        });
        slides[n-1].style.display = 'block';
        currentSlide.textContent = `0${slideIndex}`;
    }
    slideShow(slideIndex);
    next.addEventListener('click', () => {
        if (slideIndex == 4) {
            slideIndex = 0
        } else {
            slideIndex++;
            slideShow(slideIndex);
        }
    });
    prev.addEventListener('click', () => {
        if (slideIndex == 1) {
            slideIndex = 5
        } else {
            slideIndex--;
            slideShow(slideIndex);
        }
    });


};
module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
//tabs

const TabsBtns = document.querySelectorAll('.tabheader__item'),
TabsContents = document.querySelectorAll('.tabcontent'),
BtnsParent = document.querySelector('.tabheader__items');
hideTabContent();
showTabContent();



function hideTabContent() {
TabsContents.forEach(item => {
item.style.display = 'none';
item.classList.add('animate__fadeIn');
})  
TabsBtns.forEach(item => {
item.classList.remove('tabheader__item_active');
})
}
function showTabContent(i = 0) {
TabsContents[i].style.display = 'block';
TabsBtns[i].classList.add('tabheader__item_active');
} 

BtnsParent.addEventListener('click', (e)=> {
// if (e.target.classList.contains('tabheader__item')) {
  TabsBtns.forEach((item, i) => {
      if (e.target == item) {
          hideTabContent();
          showTabContent(i);
      }
  })
// }
})
};

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / 1000 / 60 / 60 / 24),
        hours = Math.floor((t / 1000 / 60 / 60) % 24),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
        
        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'total': total
        }
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else return num;
    }
    
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);
        updateClock();
        
        function updateClock() {
            const ms = getTimeRemaining(endtime);
            days.innerHTML = getZero(ms.days);
            hours.innerHTML = getZero(ms.hours);
            minutes.innerHTML = getZero(ms.minutes);
            seconds.innerHTML = getZero(ms.seconds);
            if (ms.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    
    
    };
    const deadline = '2021-12-5';
setClock('.timer', deadline);

}

module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/

document.addEventListener('DOMContentLoaded', (e) => {
const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
      calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
      cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
      forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
      modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
      slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
      timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

      tabs();
      calc();
      cards();
      forms();
      modal();
      slider();
      timer();

      


})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map