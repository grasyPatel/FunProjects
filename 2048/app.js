const gridContainer = document.getElementById('grid-container');
const restartButton = document.getElementById('restart-btn');
let grid = [];

function initGrid() {
    grid = Array.from({ length: 4 }, () => Array(4).fill(0));
    addNewTile();
    addNewTile();
    renderGrid();
}

function addNewTile() {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) emptyCells.push({ x: i, y: j });
        }
    }
    if (emptyCells.length === 0) return;

    const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[x][y] = Math.random() < 0.9 ? 2 : 4;
}

function renderGrid() {
    gridContainer.innerHTML = '';
    grid.forEach(row => {
        row.forEach(cell => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (cell > 0) {
                tile.textContent = cell;
                tile.classList.add(`tile-${cell}`);
            }
            gridContainer.appendChild(tile);
        });
    });
}

function slide(row) {
    const filteredRow = row.filter(num => num > 0);
    const mergedRow = [];
    for (let i = 0; i < filteredRow.length; i++) {
        if (filteredRow[i] === filteredRow[i + 1]) {
            mergedRow.push(filteredRow[i] * 2);
            i++;
        } else {
            mergedRow.push(filteredRow[i]);
        }
    }
    while (mergedRow.length < 4) mergedRow.push(0);
    return mergedRow;
}

function moveLeft() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        const newRow = slide(grid[i]);
        if (newRow.toString() !== grid[i].toString()) moved = true;
        grid[i] = newRow;
    }
    if (moved) addNewTile();
}

function moveRight() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        const reversedRow = slide(grid[i].slice().reverse()).reverse();
        if (reversedRow.toString() !== grid[i].toString()) moved = true;
        grid[i] = reversedRow;
    }
    if (moved) addNewTile();
}

function moveUp() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        const column = grid.map(row => row[j]);
        const newColumn = slide(column);
        if (newColumn.toString() !== column.toString()) moved = true;
        newColumn.forEach((num, i) => grid[i][j] = num);
    }
    if (moved) addNewTile();
}

function moveDown() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        const column = grid.map(row => row[j]);
        const reversedColumn = slide(column.reverse()).reverse();
        if (reversedColumn.toString() !== column.toString()) moved = true;
        reversedColumn.forEach((num, i) => grid[i][j] = num);
    }
    if (moved) addNewTile();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
    }
    renderGrid();
});

restartButton.addEventListener('click', initGrid);

initGrid();
