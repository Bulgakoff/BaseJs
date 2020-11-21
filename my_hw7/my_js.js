"use strict";

/**
 * ПОКА ТОЛЬКО ЗАГЛУШКА
 */

const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 5,

};

const config = {
    settings,

    init(userSettings = {}) { //сюда приходит объект 
        Object.assign(this.settings, userSettings); // update установки
    },

    // ==============================================================
    // геттеры settings

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.settings.rowsCount < 10 || this.settings.rowsCount > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне от 10 до 30 включительно.');
        }

        if (this.settings.colsCount < 10 || this.settings.colsCount > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне от 10 до 30 включительно.');
        }

        if (this.settings.speed < 1 || this.settings.speed > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне от 1 до 10 включительно.');
        }

        if (this.settings.winFoodCount < 1 || this.settings.winFoodCount > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне от 1 до 10 включительно.');
        }

        return result;
    },
};

const map = {
    cells: {}, //общее коллич  cells
    usedCells: [], //использованное коллич  cells

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {} // { x1_y1: td, x1_y2: td, ... , xn_yn}
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                this.cells[`x${col}_y${row}`] = td;
                tr.appendChild(td);
            }
        }
    },

    render(snakePointsArray, foodPoint) { //присваиваем классы для расскравски 
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        snakePointsArray.forEach((point, index) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            // console.log(snakeCell);
            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);
    },
};

const snake = {
    body: [], // массив точек {x:..., y:...,}
    direction: null,
    lastStepDirection: null,
    /**
     * @param {}
     startBody === [{
         x: Math.floor(this.config.getColsCount() / 2),
         y: Math.floor(this.config.getRowsCount() / 2),
     }];
     * @param  {} direction = up
     */
    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    isOnPoint(point) { //не наступила ли змейка сама на себя
        return this.body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y); //true 
        //значит есть совпаение false - нет
    },

    makeStep() {
        this.lastStepDirection = this.direction; //запоминаем последнее направление
        this.body.unshift(this.getNextStepHeadPoint()); //и относительно головы 
        //добавляем точки по выбранному направению в начало списка (делаем новую голову)
        this.body.pop(); //режем хвост
    },

    growUp() {
        const lastBodyIndex = this.body.length - 1;
        const lastBodyPoint = this.body[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);

        this.body.push(lastBodyPointClone);
    },

    getNextStepHeadPoint() { //получить где находится голова
        const firstPoint = this.body[0];

        switch (this.direction) {
            case 'up':
                return {
                    x: firstPoint.x, y: firstPoint.y - 1
                };
            case 'right':
                return {
                    x: firstPoint.x + 1, y: firstPoint.y
                };
            case 'down':
                return {
                    x: firstPoint.x, y: firstPoint.y + 1
                };
            case 'left':
                return {
                    x: firstPoint.x - 1, y: firstPoint.y
                };
        }
    },

    setDirection(direction) {
        this.direction = direction;
    },
};

const food = {
    x: null,
    y: null,
    c: 0,
    getCountF() {
        return {
            c: this.c
        };
    },
    setCountFood(count) {
        this.c = count.c;
    },

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        }
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const statusP = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food,
    statusP,
    tickInterval: null,

    init(userSettings) {
        // передаем {speed: 2}
        this.config.init(userSettings); // update установки
        // проверяем установки settings
        const validation = this.config.validate(); // получаем результат проверок в виде объекта 

        if (!validation.isValid) { // реверс false ===> true
            for (const err of validation.errors) {
                console.log(err);
            }

            return;
        }
        // рисуем поле :
        this.map.init(this.config.getRowsCount(), this.config.getColsCount());

        this.setEventHandlers();
        this.reset();
    },

    reset() { //кнопки на старт
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up'); // стартуем змейку
        //(но вначале // вернем массив с начальной 1 точкой змеи )
        this.food.setCoordinates(this.getRandomFreeCoordinates()); //ставим рандомно еду
        this.render(); //присваиваем классы для расскравски змеи ее тела и еды
    },

    render() {
        //присваиваем классы для расскравски:
        this.map.render(this.snake.getBody(), this.food.getCoordinates());
    },

    play() {
        this.statusP.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButtonState('Стоп'); // декорируется кнопка активным зеленным или серым цветом
    },

    stop() {
        this.statusP.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButtonState('Старт'); // декорируется кнопка активным зеленным или серым цветом
    },

    finish() {
        this.statusP.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButtonState('Игра окончена', true); //добавляется класс disabled
        this.food.setCountFood(this.zeroCount());

        console.log(this.food.getCountF().c);
    },

    tickHandler() {
        if (!this.canMakeStep()) { // если можно сделать шаг
            return this.finish(); //заканчиваем игру
        }

        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) { //isOnPoint - укусил 
            //кто нибудь еду ил не  (но в начале- getNextStepHeadPoint-->получить где находится голова)
            this.snake.growUp(); // добвим в конец змейки точку в массив
            this.food.setCountFood(this.countFood()); //СЧЕТЧИК
            this.showCount();
            console.log(this.food.getCountF().c);

            this.food.setCoordinates(this.getRandomFreeCoordinates()); //ставим рандомно следующую еду

            if (this.isGameWon()) { //тело змейки > колва еды то выход с победой
                this.finish();
            }
        }

        this.snake.makeStep(); //если не на еде то змея в движении
        this.render(); //присваиваем классы для расскравски:
    },
    zeroCount() {
        const displayCount = document.querySelector('.count');
        displayCount.textContent = 0;
        const summ_zero = {
            c: this.food.getCountF().c * 0,
        };
        return summ_zero;

    },
    showCount() {
        const displayCount = document.querySelector('.count');
        displayCount.textContent = this.food.getCountF().c;
    },
    countFood() {
        const summ_food = {
            c: this.food.getCountF().c + 1,
        };
        return summ_food;
    },
    canMakeStep() {
        const nextHeadPoint = this.snake.getNextStepHeadPoint(); //получить где находится голова

        return !this.snake.isOnPoint(nextHeadPoint) &&
            nextHeadPoint.x < this.config.getColsCount() && //не зашли ли за границы 
            nextHeadPoint.y < this.config.getRowsCount() &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0;
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    setPlayButtonState(text, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = text;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    getStartSnakeBody() { // вернем массив с точкой змеи
        return [{
            x: Math.floor(this.config.getColsCount() / 2),
            y: Math.floor(this.config.getRowsCount() / 2),
        }];
    },

    getRandomFreeCoordinates() {
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody()]; //все занятые ячейки
        //getBody - возвращает все точки тела змейки
        while (true) {
            const rndPoint = { //рандомная точка очередной еды
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) {
                return rndPoint; //усли нет совпадений то вернем свежую точку еды 
            }
        }
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },

    playClickHandler() { // функция смены запуска и остановки  игры 
        if (this.statusP.isPlaying()) {
            this.stop();
        } else if (this.statusP.isStopped()) {
            this.play();
        }
    },


    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.statusP.isPlaying()) return; //если игра не идет клавиши не будут реагировать
        //в другом случае получаем направление код клавиши
        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) { //проверяем возможность сделать ход не на себя,
            //получив последний шаг направления
            this.snake.setDirection(direction); //ставим направление змеи
        }
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) { //проверяем возможность сделать ход не на себя
        const lastStepDirection = this.snake.getLastStepDirection(); //получить последний шаг направления

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    }
};

game.init({
    speed: 4
});