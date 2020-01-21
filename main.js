function getMid(point1, point2) {
  let nextX = point1.x + (point2.x - point1.x) / 2;
  let nextY = point1.y + (point2.y - point1.y) / 2;

  return new Point(nextX, nextY);
}

function getThird(point1, point2) {
  let nextX = point2.x + (point1.x - point2.x) / 3;
  let nextY = point2.y + (point1.y - point2.y) / 3;

  return new Point(nextX, nextY);
}


/**********************************************************************************/
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static random(_canvas) {
    return new Point(Math.round(Math.random() * _canvas.width), Math.round(Math.random() * _canvas.height));
  }
}

/**********************************************************************************/
const mainPointR = 5;
const pointR     = 1;

const range = 2000000;
const distanceFunc = getThird;

let points = [];

/**********************************************************************************/
let canvas = document.getElementById('canvas');
canvas.isDrawingMode = true;
canvas.onclick = function (evt) {
  let x = event.pageX - this.offsetLeft;
  let y = event.pageY - this.offsetTop;

  let p = new Point(x, y);
  points.push(p);

  circle(p, mainPointR, 'red');
}

let ctx = canvas.getContext('2d');
ctx.beginPath();

/**********************************************************************************/
let startBtn = document.getElementById('start-btn');
startBtn.onclick = function () {
  const maxval = points.length * range;

  let currentPoint = Point.random(canvas);
  dot(currentPoint, pointR);

  draw(currentPoint, maxval);
}

/**********************************************************************************/
function circle(point, r, color) {
  ctx.moveTo(point.x, point.y);
  ctx.arc(point.x, point.y, r, 0, Math.PI * 2, true);
  if (color !== void 0) {
    ctx.fillStyle = color;
  } else {
    ctx.fillStyle = 'black';
  }
  ctx.fill();
}

function dot(point, r, color) {
  ctx.moveTo(point.x, point.y);
  if (color !== void 0) {
    ctx.fillStyle = color;
  } else {
    ctx.fillStyle = 'black';
  }
  ctx.fillRect(point.x, point.y, r, r);
}

function draw(currentPoint, maxval) {
  let rnd = Math.round(Math.random() * maxval);
  let moveToPoint;

  for (let i = 0; i < points.length; i++) {
    if (rnd >= i * range && rnd < (i + 1) * range) {
      moveToPoint = points[i];
      break;
    }
  }

  let nextPoint = distanceFunc(currentPoint, moveToPoint);
  dot(nextPoint, pointR);

  setTimeout(() => {
    draw(nextPoint, maxval);
  }, Number(document.getElementById('interval').value));
}