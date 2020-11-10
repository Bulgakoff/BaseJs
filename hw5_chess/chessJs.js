function drawCh() {
    let containerAll = document.querySelector('.container_main');
    let cell;
    let nums;
    let charss = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let flag = true;


    let block2 = document.createElement('div');
    let container2 = document.querySelector('.container_nnn');
    container2.appendChild(block2);

    //раскрашиваем клетки
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {

            if (j == 0) flag = !flag;


            cell = document.createElement('div');

            if (i == 1) cell.textContent = 'п';
            if (i == 6) cell.textContent = 'п';

            if (j == 0 && i == 0) cell.textContent = 'л';
            if (j == 7 && i == 0) cell.textContent = 'л';
            if (i == 0 && j == 6) cell.textContent = 'к';
            if (i == 0 && j == 1) cell.textContent = 'к';
            if (i == 0 && j == 2) cell.textContent = 'c';
            if (i == 0 && j == 5) cell.textContent = 'c';
            if (i == 0 && j == 4) cell.textContent = 'Ф';
            if (i == 0 && j == 3) cell.textContent = 'Ц';

            if (j == 0 && i == 7) cell.textContent = 'л';
            if (j == 7 && i == 7) cell.textContent = 'л';
            if (j == 1 && i == 7) cell.textContent = 'k';
            if (j == 6 && i == 7) cell.textContent = 'k';
            if (j == 2 && i == 7) cell.textContent = 'c';
            if (j == 5 && i == 7) cell.textContent = 'c';
            if (j == 3 && i == 7) cell.textContent = 'Ц';
            if (j == 4 && i == 7) cell.textContent = 'Ф';




            if (flag) cell.className = 'cell black';
            else cell.className = 'cell white';


            containerAll.appendChild(cell);
            flag = !flag

        }
        //ставим цифры
        nums = document.createElement('div');
        nums.textContent = `${i+1}`;
        nums.className = 'numbers';
        block2.appendChild(nums);

    };
    //ставим буквы
    for (let i = 0; i < 8; i++) {
        chars = document.createElement('div');
        chars.textContent = `${charss[i]}`;
        chars.className = 'cell chars';
        containerAll.appendChild(chars);
    };



}
window.addEventListener('load', () => drawCh());