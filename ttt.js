var canvas = document.getElementById('ttt');
var ctx = canvas.getContext('2d');
var msg = document.getElementById('message');
var cellSize = 100;
var map = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];
var winPatterns = [
  0b111000000,
  0b000111000,
  0b000000111,
  0b100100100,
  0b010010010,
  0b001001001,
  0b100010001,
  0b001010100
];
var BLANK = 0;
var X = 1;
var O = -1;
var mouse = {
  x: -1,
  y: -1
};
var currentPlayer = X;
var gameOver = false;
var winCells = [];

canvas.width = 3 * cellSize;
canvas.height = 3 * cellSize;

canvas.addEventListener("mouseout", function(e) {
  mouse.x = -1;
  mouse.y = -1;
});

canvas.addEventListener("mousemove", function(e) {
  var x = e.pageX - canvas.offsetLeft;
  var y = e.pageY - canvas.offsetTop;
  mouse.x = x;
  mouse.y = y;
});

canvas.addEventListener("click", function(e) {
  play(getCellByCoords(mouse.x, mouse.y));
});

displayTurn();

function displayTurn() {
  msg.textContent = (
    (currentPlayer == X)
    ? "X"
    : "O") + "'s Turn"
}

function play(cell) {
  if (gameOver)
    return;
  if (map[cell] != BLANK) {
    msg.textContent = "Position Taken"
    return;
  }
  map[cell] = currentPlayer;
  var winCheck = checkWin(currentPlayer);

  if (winCheck != 0) {
    gameOver = true;
    msg.textContent = (
      (currentPlayer == X)
      ? "X"
      : "O") + " Wins"

    var bit = 1;
    for (var i = map.length - 1; i >= 0; i--) {
      if ((bit & winCheck) == bit) {
        winCells.push(i);
      }
      bit <<= 1;
    }

    return;
  } else if (map.indexOf(BLANK) == -1) {
    gameOver = true;
    msg.textContent = "Tie"
    return;
  }
  currentPlayer *= -1;
  displayTurn();
}

function checkWin(player) {
  var playerMapBitMask = 0;
  for (var i = 0; i < map.length; i++) {
    playerMapBitMask <<= 1;
    if (map[i] == player) {
      playerMapBitMask += 1;
    }
  }

  for (var i = 0; i < winPatterns.length; i++) {
    if ((playerMapBitMask & winPatterns[i]) == winPatterns[i]) {
      return winPatterns[i];
    }
  }
  return 0;
}

function getCellByCoords(x, y) {
  return Math.floor((x / cellSize) % 3) + Math.floor(y / cellSize) * 3;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMouseHighlight();
  drawWinHighlight();
  drawBoard();
  fillBoard();

  function drawWinHighlight() {
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 255, 0, 0.3)"
      winCells.forEach(function(i) {
        var cellCoords = getCellCoords(i);
        ctx.fillRect(cellCoords.x, cellCoords.y, cellSize, cellSize);
      })
    }
  }

  function drawMouseHighlight() {
    if (gameOver)
      return;
    var cellNum = getCellByCoords(mouse.x, mouse.y);
    var cellCoords = getCellCoords(cellNum);

    if (map[cellNum] == BLANK) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.fillRect(cellCoords.x, cellCoords.y, cellSize, cellSize);
      ctx.save();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
      ctx.translate(cellCoords.x + cellSize / 2, cellCoords.y + cellSize / 2);

      if (currentPlayer == X) {
        drawX();
      } else {
        drawO();
      }

      ctx.restore();
    } else {
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
      ctx.fillRect(cellCoords.x, cellCoords.y, cellSize, cellSize);
    }
  }

  function drawBoard() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;

    ctx.beginPath();
    ctx.moveTo(cellSize, 0);
    ctx.lineTo(cellSize, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cellSize * 2, 0);
    ctx.lineTo(cellSize * 2, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, cellSize);
    ctx.lineTo(canvas.width, cellSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, cellSize * 2);
    ctx.lineTo(canvas.width, cellSize * 2);
    ctx.stroke();
  }

  function fillBoard() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;

    for (var i = 0; i < map.length; i++) {
      var coords = getCellCoords(i);

      ctx.save();
      ctx.translate(coords.x + cellSize / 2, coords.y + cellSize / 2);
      if (map[i] == X) {
        drawX();
      } else if (map[i] == O) {
        drawO();
      }
      ctx.restore();
    }
  }

  function drawX() {
    ctx.beginPath();
    ctx.moveTo(-cellSize / 3, -cellSize / 3);
    ctx.lineTo(cellSize / 3, cellSize / 3);
    ctx.moveTo(cellSize / 3, -cellSize / 3);
    ctx.lineTo(-cellSize / 3, cellSize / 3);
    ctx.stroke();
  }

  function drawO() {
    ctx.beginPath();
    ctx.arc(0, 0, cellSize / 3, 0, Math.PI * 2);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

function getCellCoords(cell) {
  var x = (cell % 3) * cellSize;
  var y = Math.floor(cell / 3) * cellSize
  return {"x": x, "y": y};
}

draw();
