/*----- constants -----*/
//1.1
const SYMBOLS = {
    'null': 'white',
    '1': 'teal',
    '-1': 'red'
  };
  
  //1.2
  const winningCombos = [
    [0, 4, 8],
    [6, 4, 2],
    [3, 4, 5],
    [0, 1, 2],
    [1, 4, 7],
    [0, 3, 6],
    [6, 7, 8],
    [2, 5, 8]
  ];
  
  /*----- state variables -----*/
  // 2.1, 2.2, 2.3
  let board;
  let turn;
  let winner;
  
  /*----- cached elements  -----*/
  const messageEl = document.querySelector('h1');
  const resetGameBtn = document.querySelector('button');
  
  /*----- event listeners -----*/
  document.getElementById('board').addEventListener('click', handleDrop)
  resetGameBtn.addEventListener('click', init);
  
  
  /*----- functions -----*/
  // 4.1
  init();
  
  
  // 3.1, 4.1.2, 4.1.3
  function init() {
  board = [null,null,null,null,null,null,null,null,null];
    turn = 1;
    winner = null;
    render();
  }
  
  // 5.1.1, 5.1.2, 5.2, 5.3, 5.4, 5.5
  function handleDrop(evt) {
    const colIdx = parseInt(evt.target.id.replace('c', ''));
    if (isNaN(colIdx) || board[colIdx] || winner) return;
    board[colIdx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
  }
  
  // 5.6.1, 5.6.2, 5.6.3, 5.6.4, 5.7.1
  function getWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
      if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
      if (Math.abs(board[6] + board[4] + board[2]) === 3) return board[2];
      if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
      if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
      if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
      if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
      if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
      if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
    }
    if (board.includes(null)) return null;
    return 'T';
  }
  
  
  // 5.8, 6.1
  function render() {
    renderBoard();
    renderMessage();
    resetGameBtn.disabled = !winner;
  }
  
  // 4.2.1, 4.2.1.1, 4.2.1.1.2, 4.3.1.1.3
  function renderBoard() {
    board.forEach(function(colVal, colIdx){
        const colId = document.getElementById(`c${colIdx}`);
        colId.style.backgroundColor = SYMBOLS[colVal];
      resetGameBtn.style.visibility = winner ? 'visible' : 'hidden';
      });
    }
  
  // 4.2.2.1, 4.2.2.2, 4.2.2.3
  function renderMessage() {
    if (winner === 'T') {
      messageEl.innerText = "It's a Tie!!!";
    }else if (winner) {
      messageEl.innerHTML = `Congrats <span style="symbols: ${SYMBOLS[winner]}">${SYMBOLS[winner].toUpperCase()}</span> Wins!`;
    }else {
      messageEl.innerHTML = `<span style="symbols: ${SYMBOLS[turn]}">${SYMBOLS[turn].toUpperCase()}</span>'s Turn`;
    }
  }