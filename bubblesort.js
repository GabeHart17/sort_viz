const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var values = [];
for (var i = 0; i < 10; i++) {
  values.push(i+1);
}
var sorted = true;

var bubble_idx = 0;
var bubble_sorted = true;
var compares = 0;

function shuffleValues() {
  let tmp = [];
  for (var i = 0; i < 10; i++) {
    let idx = Math.floor(Math.random() * values.length);
    tmp.push(values.splice(idx,1)[0]);
  }
  values = tmp;
  sorted = false;
}

function renderRects() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,700,600);
  ctx.fillStyle = 'black';
  let idx = 0;
  for (var v of values) {
    ctx.fillRect(50 + 60 * idx, 600 - 50 * v, 50, 50 * v);
    idx++;
  }
}

function renderCompare(a,b) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0,600,700,100);
  ctx.lineCap = 'butt';
  ctx.strokeStyle = 'black';
  ctx.strokeWidth = 5;
  let xa = 75 + 60 * a;
  let xb = 75 + 60 * b;
  ctx.beginPath();
  ctx.moveTo(xa, 625);
  ctx.lineTo(xa, 675);
  ctx.moveTo(xb, 625);
  ctx.lineTo(xb, 675);
  ctx.moveTo(xa, 650);
  ctx.lineTo(xb, 650);
  ctx.stroke();
}

function bubble() {
  if (bubble_idx >= 9) {
    bubble_idx = 0;
    sorted = bubble_sorted;
    bubble_sorted = true;
  }
  if (!sorted) {
    if (values[bubble_idx] > values[bubble_idx+1]) {
      tmp = values[bubble_idx];
      values[bubble_idx] = values[bubble_idx+1];
      values[bubble_idx+1] = tmp;
      bubble_sorted = false;
    }
    renderCompare(bubble_idx, bubble_idx+1);
    bubble_idx++;
    compares++;
    document.getElementById('compares').textContent = 'Compares: ' + compares.toString();
    setTimeout(renderRects, 500);
    setTimeout(bubble, 1000);
  }
}

function run() {
  bubble_idx = 0;
  bubble_sorted = true;
  compares = 0;
  shuffleValues();
  renderRects();
  bubble();
}

renderRects();
