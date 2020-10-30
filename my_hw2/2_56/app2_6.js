'use strict';
// Реализовать функцию с тремя параметрами:
// function mathOperation(arg1, arg2, operation), где arg1, arg2 — значения аргументов,
// operation — строка с названием операции.
// В зависимости от переданного значения
// выполнить одну из арифметических операций(использовать функции из пункта 5)
// и вернуть полученное значение(применить switch).

let arg1 = parseInt(Math.random() * 100);
let arg2 = parseInt(Math.random() * 100);


function mathOperation(param1, param2, operation) {
    switch (operation) {
        case '+':
            let res_sum = summ(param1, param2);
            alert('сумма =' + res_sum);
            break;

        case '-':
            let res_diff = differ(param1, param2);
            alert('Разность = ' + res_diff);
            break;

        case '*':
            let res_mult = mult(param1, param2);
            alert('Произведение = ' + res_mult);
            break;

        case '/':
            let res_divisions = divv(param1, param2);
            alert('Разность = ' + res_divisions);
            break;

        default:
            alert('введено не верно')
            break;
    }

}



// ==================================
let stringOperation = prompt('Введите строку операции в виде (+, -, /, *) ')

mathOperation(arg1, arg2, stringOperation)