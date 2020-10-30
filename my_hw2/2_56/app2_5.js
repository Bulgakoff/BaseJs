 'use strict';

 // Реализовать четыре основные арифметические операции
 //  в виде функций с двумя параметрами.
 // Обязательно использовать оператор return.

 function summ(aaa, bbb) {
     return aaa + bbb;
 }


 function divv(aaa, bbb) {
     return aaa / bbb;
 }


 function mult(aaa, bbb) {
     return aaa * bbb;
 }


 function differ(aaa, bbb) {
     return aaa - bbb;
 }
 // =======================
 let res_mii = differ(3, 5);
 console.log('Разность = ' + res_mii);

 let res = summ(3, 5);
 console.log('сумма =' + res);

 let res_div = divv(3, 5);
 console.log('Деление = ' + res_div);

 let res_muu = mult(3, 5);
 console.log('Произведение = ' + res_muu);