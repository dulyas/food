function tabs(tabsSelector, tabsContentSelector, tabParentSelector, activeClass) {
//tabs

const TabsBtns = document.querySelectorAll(tabsSelector),
TabsContents = document.querySelectorAll(tabsContentSelector),
BtnsParent = document.querySelector(tabParentSelector);
hideTabContent();
showTabContent();



function hideTabContent() {
TabsContents.forEach(item => {
item.style.display = 'none';
item.classList.add('animate__fadeIn');
})  
TabsBtns.forEach(item => {
item.classList.remove(activeClass);
})
}
function showTabContent(i = 0) {
TabsContents[i].style.display = 'block';
TabsBtns[i].classList.add(activeClass);
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

export default tabs;