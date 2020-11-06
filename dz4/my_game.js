const config = {
    rowCount: 10,
    colCount: 10,
    startPositionX: 0,
    startPositionY: 0,
};
/**
 * описание поведения игрока
 */
const player = {
    x: null,
    y: null,


    init(startX, startY) {
        this.x = startX;
        this.y = startY;
    },
    isCanDoStep() {
        return this.x >= 0 && this.x < config.colCount && this.y > 0 && this.y < config.rowCount;
    },
    /**
     * метод перемещающий игрока
     */
    move(direction) {

        switch (direction) {
            case 2:
                this.y++;
                break;
            case 4:
                this.x--;
                break;
            case 6:
                this.x++;
                break;
            case 8:
                this.y--;
                break;
        }

    },
};
/**
 * Объект игры
 */
const game = {
    config,
    player,
    map: "",



    /**
     * Логика игры
     */
    run() {
        this.player.init(this.config.startPositionX, this.config.startPositionY);
        this.render();

        while (true) {

            const direction = this.getDirection();
            if (direction === null) return alert('GAME OVER!');

            if (direction === -1) return alert('До свидания!');
            if (player.isCanDoStep()) { // тут прописать возможность шага
                //чистим консоль 
                console.clear();
                //чистим map
                this.map = "";
                // прописываем новые координаты
                // this.player.setNewPos();
                this.render();
            }
            if (this.player.x < 0) {
                this.player.x = 1;
            }
            if (this.player.x > config.colCount) {
                this.player.x = config.colCount - 2;
            }
            if (this.player.y < 0) {
                this.player.y = 0;
            }
            if (this.player.y > config.rowCount) {
                this.player.y = config.rowCount;
            }

            this.player.move(direction);

        }

    },
    /**
     * отрисовка
     */
    render() {
        // let map = '';

        for (let row = 0; row < this.config.rowCount; row++) {
            for (let col = 0; col < this.config.colCount; col++) {
                if (this.player.y === row && this.player.x === col) {
                    this.map += '0 ';
                } else {
                    this.map += 'X '
                }
            }
            this.map += '\n';
        }

        console.clear();
        console.log(this.map);
    },
    /**
     * получение направления
     */
    getDirection() {
        const availableDirections = [-1, 2, 4, 6, 8];
        //запрос координат
        while (true) {
            const direction = parseInt(prompt('Введите число куда хотите переместиться, -1 и "отмена" для выхода '));
            if (isNaN(direction)) {
                return null;
            }

            if (!availableDirections.includes(direction)) {
                alert(`Для перемещения необходимо ввести одно из чисел: ${availableDirections.join(', ')}.`);
                continue;
            }

            return direction;
        }
    },
}

game.run();