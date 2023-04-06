// Cesàro curve functions
function cesaroCurve(t, order, size, angle) {
  if (order === 0) {
    t.forward(size);
  } else {
    [angle / 2, 180 - angle, angle / 2, 0].forEach((a) => {
      cesaroCurve(t, order - 1, size / 2, angle);
      t.left(a);
    });
  }
}

function drawCesaroFractal(t, order, size, angle, baseShape) {
  for (let i = 0; i < baseShape; i++) {
    cesaroCurve(t, order, size, angle);
    t.right(360 / baseShape);
  }
}

class Turtle {
  constructor(x, y, renderer) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.renderer = renderer;
  }

  forward(distance) {
    let newX = this.x + distance * cos(this.angle);
    let newY = this.y + distance * sin(this.angle);

    this.renderer.line(this.x, this.y, newX, newY);
    this.x = newX;
    this.y = newY;
  }

  left(angle) {
    this.angle += radians(angle);
  }

  right(angle) {
    this.angle -= radians(angle);
  }
}

let orderSlider, sizeSlider, angleSlider, baseShapeSlider, xPositionSlider, yPositionSlider;

function setup() {
  let canvas = createCanvas(1000, 1000);
  canvas.parent('canvas-container');
  background(200);

  // Create sliders
  orderSlider = createSlider(1, 5, 1);
  orderSlider.parent('order-slider');
  orderSlider.style('position', 'relative');

  sizeSlider = createSlider(10, 700, 100);
  sizeSlider.parent('size-slider');
  sizeSlider.style('position', 'relative');

  angleSlider = createSlider(1, 360, 120);
  angleSlider.parent('angle-slider');
  angleSlider.style('position', 'relative');

  baseShapeSlider = createSlider(1, 12, 4);
  baseShapeSlider.parent('base-shape-slider');
  baseShapeSlider.style('position', 'relative');

  xPositionSlider = createSlider(0, width, width / 2);
  xPositionSlider.parent('x-position-slider');
  xPositionSlider.style('position', 'relative');

  yPositionSlider = createSlider(0, height, height / 2);
  yPositionSlider.parent('y-position-slider');
  yPositionSlider.style('position', 'relative');

  // Display slider values
  document.getElementById("order-value").innerHTML = orderSlider.value();
  orderSlider.input(() => document.getElementById("order-value").innerHTML = orderSlider.value());

  document.getElementById("size-value").innerHTML = sizeSlider.value();
  sizeSlider.input(() => document.getElementById("size-value").innerHTML = sizeSlider.value());

  document.getElementById("angle-value").innerHTML = angleSlider.value();
  angleSlider.input(() => document.getElementById("angle-value").innerHTML = angleSlider.value());

  document.getElementById("base-shape-value").innerHTML = baseShapeSlider.value();
  baseShapeSlider.input(() => document.getElementById("base-shape-value").innerHTML = baseShapeSlider.value());

  document.getElementById("x-position-value").innerHTML = xPositionSlider.value();
  xPositionSlider.input(() => document.getElementById("x-position-value").innerHTML = xPositionSlider.value());

  document.getElementById("y-position-value").innerHTML = yPositionSlider.value();
  yPositionSlider.input(() => document.getElementById("y-position-value").innerHTML = yPositionSlider.value());
}

function drawFractal(renderer, saveAsSVG = false) {
  if (saveAsSVG) {
    renderer.background(255);
  } else {
    renderer.background(0);
  }

  if (saveAsSVG) {
    renderer.stroke(0);
  } else {
    renderer.stroke(255);
  }

  let order = orderSlider.value();
  let size = sizeSlider.value();
  let angle = angleSlider.value();
  let baseShape = baseShapeSlider.value();
  let xPos = xPositionSlider.value();
  let yPos = yPositionSlider.value();

  let t = new Turtle(xPos - size / 2, yPos - size / 3, renderer);
  drawCesaroFractal(t, order, size, angle, baseShape);

  if (saveAsSVG) {
    save(renderer, 'cesaro_curve.svg');
  }
}

function draw() {
  background(0);
  drawFractal(this);
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("download-svg").addEventListener("click", () => {
    let svgRenderer = createGraphics(width, height, SVG);
    drawFractal(svgRenderer, true);
  });
});
