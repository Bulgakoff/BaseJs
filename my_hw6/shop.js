'use strict';

// ===========6======================>
// 1. Продолжаем реализовывать модуль корзины:
// a.Добавлять в объект корзины выбранные товары по клику
// на кнопке« Купить» без перезагрузки страницы;
// b.Привязать к событию покупки товара пересчет корзины
// и обновление ее внешнего вида.





const productsObj = {
    prods: document.querySelector('.products'),

    productsArr: [{
            name: 'Ноут ',
            id: 1,
            price: 20000,
        },
        {
            name: 'клавиатура ',
            id: 2,
            price: 500,
        },
        {
            name: 'мышка ',
            id: 3,
            price: 230,
        },
    ],
    shopCost: 0,
    initMovingGoodsAndPrices() {
        if (this.conditionEmptyBasket()) {
            this.prods.textContent = ' магазин  пуст';

        } else {
            this.prods.textContent = 'товары магазина : ';
            this.setBasketParent();
            this.setDivBasketChild();
            this.setAllPriceBasketChild();
            this.setDivAddedProductsChild();
        

            this.setHTMLmainBlock();

            alert(`В магазине: ${this.productsArr.length} товара на сумму ${this.shopCost} рублей`);
            // тут addListenerButt
            this.setAddListenerOnButton(this.productsArr, this.shopCost);

        }


        //  < div class = "basket" >
        //      <div> КОРЗИНА </div>
        //      <div class="allPrice"> < /div> 
        //      <p> руб < /p> 
        //      <div class="nameBasket"> addedProducts: </div> 
        //   </div >
    },


    setHTMLmainBlock() {
        let ind = 0;
        this.productsArr.forEach(product => {

            let productUnit = document.createElement('div');
            productUnit.className = 'card';
            this.prods.appendChild(productUnit);
            let nameProduct = document.createElement('div');
            let idProduct = document.createElement('div');
            let priceProduct = document.createElement('div');

            productUnit.appendChild(nameProduct);
            productUnit.appendChild(idProduct);
            productUnit.appendChild(priceProduct);


            nameProduct.textContent = this.productsArr[ind].name
            idProduct.textContent = `ID № ${this.productsArr[ind].id}`
            priceProduct.textContent = `${this.productsArr[ind].price} рублей `

            this.shopCost += product.price;
            priceProduct.className = 'price';
            this.setButtonnCard(productUnit);
            this.setButtonnTextCard(productUnit);
            ind += 1

        });
    },
    setButtonnCard(prUnit) {
        let butt = document.createElement('button');
        prUnit.appendChild(butt);
    },
    setButtonnTextCard(pU) {
        let buttonEl = pU.querySelector('button');
        buttonEl.textContent = 'купить';
    },
    conditionEmptyBasket() {
        return this.productsArr.length === 0;
    },
    setBasketParent() {
        let basketDivParent = document.createElement('div');
        this.prods.appendChild(basketDivParent);
        basketDivParent.className = 'basket';
    },
    setDivBasketChild() {
        let basketChild = document.createElement('div');
        let basketPare = document.querySelector('.basket');
        basketPare.appendChild(basketChild);
        basketChild.innerText = 'корзина';
    },
    setAllPriceBasketChild() {
        let allPrice = document.createElement('div');
        let basketPare = document.querySelector('.basket');
        basketPare.appendChild(allPrice);
        allPrice.className = 'allPrice';
        allPrice.insertAdjacentHTML('afterend', '<p class="allPrice"> руб </p>');
    },
    setDivAddedProductsChild() {
        let qwe = document.querySelector('.allPrice');
        qwe.insertAdjacentHTML('beforebegin', '<div class="nameBasket"> добавленные продукты : </div>')
    },
    /**
     *  функция buttonClickHandler 
     */
    setAddListenerOnButton(arrCards, shopRemains) {
        let nodeButtons = document.querySelectorAll('button');
        let allPriceEl = document.querySelector('.allPrice');
        let nameBasketEl = document.querySelector('.nameBasket');
        let sumAllGoods = 0;

        for (let i = 0; i < nodeButtons.length; i++) {
            nodeButtons[i].addEventListener('click', function buttonClickHandler(event) {
                event.target.parentNode.style.display = 'none';
                // console.log(event.target.innerText = 'added!');
                sumAllGoods += arrCards[i].price;
                nameBasketEl.textContent += arrCards[i].name;
                allPriceEl.textContent = sumAllGoods;
                shopRemains -= arrCards[i].price;
                alert(`осталось в магазине товара на ${shopRemains} руб`);
            });
        }

    },


}

productsObj.initMovingGoodsAndPrices();