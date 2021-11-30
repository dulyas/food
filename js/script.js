"use strict"
document.addEventListener('DOMContentLoaded', (e) => {
//tabs

    const TabsBtns = document.querySelectorAll('.tabheader__item'),
          TabsContents = document.querySelectorAll('.tabcontent'),
          BtnsParent = document.querySelector('.tabheader__items');
    hideTabContent();
    showTabContent();
    const deadline = '2021-12-5';
    setClock('.timer', deadline);
    


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


}

//modal

const modal = document.querySelectorAll('[data-modal]');
const active = document.querySelector('.modal'); 
const modalClose = document.querySelector('[data-close]');
modalClose.addEventListener('click', () => {  
    closeModal();

})
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
        if (e.target === active) {
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
// Практика по классам
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

    new FoodCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',

    ).render()
    
    new FoodCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        10,
        '.menu .container',
    ).render()
    
    new FoodCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        12,
        '.menu .container',

    ).render()




})
