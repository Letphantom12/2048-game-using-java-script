let board = [];
let hasMerged = [];
let isGameOver = false;

const startGame = () => {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    hasMerged = [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
    ];
    isGameOver = false;
    addRandomTile();
    addRandomTile();
    updateBoard();
};

const addRandomTile = () => {
    const emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                emptyCells.push([row, col]);
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const value = Math.random() < 0.9 ? 2 : 4;
        board[randomCell[0]][randomCell[1]] = value;
    }
};

const updateBoard = () => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const tile = document.getElementById(`tile-${i * 4 + j}`);
            const value = board[i][j];
            tile.textContent = value === 0 ? "" : value;
            tile.style.backgroundColor = getTileColor(value);
        }
    }
};

const getTileColor = (value) => {
    switch (value) {
        case 2: return "#eee4da";
        case 4: return "#ede0c8";
        case 8: return "#f2b179";
        case 16: return "#f59563";
        case 32: return "#f67c5f";
        case 64: return "#f65e3b";
        case 128: return "#edcf72";
        case 256: return "#edcc61";
        case 512: return "#edc850";
        case 1024: return "#edc53f";
        case 2048: return "#edc22e";
        default: return "#3c3a32";
    }
};

const moveLeft = () => {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        const row = board[i];
        const newRow = slideAndMerge(row);
        if (newRow.join(",") !== row.join(",")) moved = true;
        board[i] = newRow;
    }
    if (moved) {
        addRandomTile();
        updateBoard();
    }
};

const moveRight = () => {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        const row = board[i];
        row.reverse();
        const newRow = slideAndMerge(row);
        if (newRow.join(",") !== row.join(",")) moved = true;
        board[i] = newRow.reverse();
    }
    if (moved) {
        addRandomTile();
        updateBoard();
    }
};

const moveUp = () => {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        const column = [board[0][j], board[1][j], board[2][j], board[3][j]];
        const newColumn = slideAndMerge(column);
        for (let i = 0; i < 4; i++) {
            if (board[i][j] !== newColumn[i]) moved = true;
            board[i][j] = newColumn[i];
        }
    }
    if (moved) {
        addRandomTile();
        updateBoard();
    }
};

const moveDown = () => {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        const column = [board[0][j], board[1][j], board[2][j], board[3][j]];
        column.reverse();
        const newColumn = slideAndMerge(column);
        for (let i = 0; i < 4; i++) {
            if (board[i][j] !== newColumn[3 - i]) moved = true;
            board[i][j] = newColumn[3 - i];
        }
    }
    if (moved) {
        addRandomTile();
        updateBoard();
    }
};

const slideAndMerge = (row) => {
    let newRow = row.filter(val => val !== 0); // Remove zeros
    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            newRow.splice(i + 1, 1);
        }
    }
    while (newRow.length < 4) newRow.push(0); // Add zeros to the end
    return newRow;
};

// Start the game on load
startGame();

