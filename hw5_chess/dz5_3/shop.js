'use strict';

// 3. Сделать генерацию корзины динамической: верстка корзины не
// должна находиться в HTML - структуре.Там должен быть только div,
//     в который будет вставляться корзина, сгенерированная на базе JS:
// 3.1.Пустая корзина должна выводить строку «Корзина пуста»;
// 3.2.Наполненная должна выводить «В корзине: n товаров на сумму m рублей».

/* 
Разметка карточки товара:

<div class="card">
             <div class = "nameProduct"> $ {здесь_название_товара} </div>
             <div class = "idProduct"> $ {здесь_ id} </div>
             <div class = "priceProduct"> $ {здесь_цена}</div>
</div>
*/

const productsObj = {
    prods: document.querySelector('.products'),



    productsArr: [{
            name: 'Ноут',
            id: 1,
            price: 20000,
        },
        {
            name: 'клавиатура',
            id: 2,
            price: 500,
        },
        {
            name: 'мышка',
            id: 3,
            price: 230,
        },
    ],
    countBasketPrice() {
        let basketCost = 0;
        if (this.productsArr.length === 0) {
            this.prods.textContent = 'КОРЗИНА ТОВАРОВ : пуста';
            alert('Корзина пуста');
        } else {
            this.prods.textContent = 'КОРЗИНА ТОВАРОВ : ';
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
                ind += 1

                basketCost += product.price;
            });
            alert(`В корзине: ${this.productsArr.length} товара на сумму ${basketCost} рублей`);
        }

    },


}

productsObj.countBasketPrice();