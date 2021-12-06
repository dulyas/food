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