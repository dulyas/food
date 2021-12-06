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