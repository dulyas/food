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
export default cards;