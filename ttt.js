var canvas = document.getElementById('ttt');
var ctx = canvas.getContext('2d');
var msg = document.getElementById('message');
var cellSize = 100;
var map = [
  0, 1, 0,
  1, -1, 1,
  0, 0, -1,
];
var winPatterns = [
  0b111000000, 0b000111000, 0b000000111,
  0b100100100, 0b010010010, 0b001001001,
  0b100010001, 0b001010100,
];
var BLANK = 0;
var X = 1;
var O = -1;

canvas.width = 3 * cellSize;
canvas.height = 3 * cellSize;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  fillBoard();

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

    for(var i = 0; i < map.length; i++) {
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
  var x = (cell%3)*cellSize;
  var y = Math.floor(cell/3)*cellSize
  return{
    "x": x,
    "y": y,
  };
}

draw();
