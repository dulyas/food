import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modaltimerId) {
    const forms = document.querySelectorAll(formSelector); // переносим все формы в переменную
    const message = { // объект для сообщений ответа для пользователя
        loading: '/icons/spin.svg', // анимация для загрузки
        success: 'Спасибо! Скоро с Вами саяжутся',
        failure: 'Что-то пошло не так'
     }
    forms.forEach(item => { // накладываем функцию postData на все формы на странице
        bindPostData(item);
    });



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


function showThankModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal('.modal', modaltimerId); // вызываем модальное окно без контента
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
    closeModal('.modal');
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
}


export default forms;