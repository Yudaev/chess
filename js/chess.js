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
    removeElementsByClass('block dark-block');
    removeElementsByClass('block light-block');
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

    if (firstCoord !== '') secondCoord = currentCoord;
    if (field[currentCoord[0]][currentCoord[1]] !== '') {
        this.classList.toggle("choosen");
        if (firstCoord === '') firstCoord = currentCoord;
    }
    field[secondCoord[0]][secondCoord[1]] = field[firstCoord[0]][firstCoord[1]];
    field[firstCoord[0]][firstCoord[1]] = '';
    if (firstCoord !== '' && secondCoord !== ''){
        firstCoord = '';
        secondCoord = '';
    }
    drawDesk();
}

// let column_count = 8;
// let row_count = 8;
// let field = document.getElementById('field');
// let cells = [];
// for(let i = 0; i < row_count; i++) {
//     for(let j = 0; j < column_count; j++) {
//         let item = document.createElement('div');
//         item.setAttribute('type', 'black'); // bla bla
//         item.setAttribute('isFigure', 'true'); // bla bla
//         item.addEventListener('click', function () { });
//         cells.push(item);
//         fields.appendChild(item);
//     }
// }

drawDesk();