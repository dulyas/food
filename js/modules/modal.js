
    function closeModal(modalSelector) {
        const active = document.querySelector(modalSelector);
        active.classList.add('hide');
        active.classList.remove('show');
        document.body.style.overflow = '';
    };
    function openModal(modalSelector, modaltimerId) {
        const active = document.querySelector(modalSelector);
        active.classList.add('show');
        active.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        if (modaltimerId) {
            clearInterval(modaltimerId);
        }
        window.removeEventListener('scroll', showModalScroll);
        function showModalScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal(modalSelector, modaltimerId);
                window.removeEventListener('scroll', showModalScroll)
            }
        }

    };

function modal(triggetSelector, modalSelector, modaltimerId) {
    

const modal = document.querySelectorAll(triggetSelector);
const active = document.querySelector(modalSelector, modaltimerId); 
//const modalClose = document.querySelector('[data-close]');
//modalClose.addEventListener('click', () => {  
//    closeModal();

//})
    modal.forEach((item) => {
        item.addEventListener('click', () => {  
            openModal(modalSelector);
            })
    })

    active.addEventListener('click', (e) => {
        if (e.target === active || e.target.getAttribute('data-close') == '') { //укоротили код и подстроили его под новый функционал
            closeModal(modalSelector);
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && active.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    window.addEventListener('scroll', showModalScroll);
    function showModalScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modaltimerId);
            window.removeEventListener('scroll', showModalScroll)
        }
    }
}
export default modal;
export {closeModal};
export {openModal};