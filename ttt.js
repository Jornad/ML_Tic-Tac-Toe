var canvas = document.getElementById('ttt');
var ctx = canvas.getContext('2d');
var msg = document.getElementById('message');
var cellSize = 100;

canvas.width = 3*cellSize;
canvas.height = 3*cellSize;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();

  function drawBoard() {
    ctx.strokeStyle = 'white';
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
    ctx.moveTo(cellSize, 0);
    ctx.lineTo(cellSize, canvas.height);
    ctx.stroke();
  }

  function fillBoard() {

  }

  requestAnimationFrame(draw);
}

draw();
