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