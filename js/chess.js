// 1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны
// нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
// 2. Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру, например К – король, Ф – ферзь и т.п.,
// причем все фигуры должны стоять на своих местах и быть соответственно черными и белыми.
// 3. *Заменить буквы, обозначающие фигуры картинками.
let white = {
    king: '&#9812;',
    queen: '&#9813;',
    rook: '&#9815;',
    elephant: '&#9814;',
    horse: '&#9816;',
    pawn: '&#9817;'
}, black = {
    king: '&#9818;',
    queen: '&#9819;',
    rook: '&#9821;',
    elephant: '&#9820;',
    horse: '&#9822;',
    pawn: '&#9823;'
};

let field = {
    0: [black.elephant, black.horse, black.rook, black.queen, black.king, black.rook, black.horse, black.elephant],
    1: [black.pawn, black.pawn, black.pawn, black.pawn, black.pawn, black.pawn, black.pawn, black.pawn],
    2: ['', '', '', '', '', '', '', ''],
    3: ['', '', '', '', '', '', '', ''],
    4: ['', '', '', '', '', '', '', ''],
    5: ['', '', '', '', '', '', '', ''],
    6: [white.pawn, white.pawn, white.pawn, white.pawn, white.pawn, white.pawn, white.pawn, white.pawn],
    7: [white.elephant, white.horse, white.rook, white.queen, white.king, white.rook, white.horse, white.elephant]
};

let firstCoord = '';
let secondCoord = '';

function drawDesk() {
    let desk = document.querySelector('.desk'),
        block,
        color = true;

    removeElementsByClass('block');
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            if (j == 0) color = !color;
            block = document.createElement('div');

            block.setAttribute('id', i+''+j);

            if (color) block.className = 'block dark-block';
            else block.className = 'block light-block';

            block.addEventListener('click', chooseFigure);
            if (field[i][j] != '') block.innerHTML = field[i][j];

            desk.appendChild(block);
            color = !color;
        }
    }
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}


function chooseFigure(){
    console.log(this.id.split(''));
    let currentCoord = this.id.split('');

    if (firstCoord !== '') {
        secondCoord = currentCoord;
        field[secondCoord[0]][secondCoord[1]] = field[firstCoord[0]][firstCoord[1]];
        field[firstCoord[0]][firstCoord[1]] = '';
    }

    if (field[currentCoord[0]][currentCoord[1]] !== '') {

        this.classList.toggle("choosen");
        console.log(this);
        if (firstCoord === '') firstCoord = currentCoord;
    }

    if (firstCoord !== '' && secondCoord !== ''){
        firstCoord = '';
        secondCoord = '';
    }
    drawDesk();
}

function drawFullDesk() {
    let container = document.querySelector('.container'),
        borders = ['top-border', 'left-border', 'right-border', 'bottom-border'],
        words = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    for (let i = 0; i < borders.length; i++){
        let border = document.createElement('div');
        if (i < 2) {
            border.className = borders[i];
            container.insertBefore(border, container.children[i]);
        } else {
            container.appendChild(border);
            border.className = borders[i];
        }

        if(i === 1) drawDesk();

        for(let j = 0; j < words.length; j++) {
            let word = document.createElement('div');
            if (i === 0 || i === 3) word.innerText = words[j];
            else word.innerText = j + 1;
            border.appendChild(word);
        }
    }
}

drawFullDesk();