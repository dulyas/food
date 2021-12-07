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
export default slider;