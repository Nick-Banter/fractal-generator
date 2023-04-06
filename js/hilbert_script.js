function hilbertCurve(t, order, size, angle) {
  if (order === 0) {
    return;
  }

  t.right(angle);
  hilbertCurve(t, order - 1, size, -angle);
  t.forward(size);
  t.left(angle);
  hilbertCurve(t, order - 1, size, angle);
  t.forward(size);
  hilbertCurve(t, order - 1, size, angle);
  t.left(angle);
  t.forward(size);
  hilbertCurve(t, order - 1, size, -angle);
  t.right(angle);
}

function drawFlowerCurve(t, order, length, angle) {
  for (let i = 0; i < 4; i++) {
    hilbertCurve(t, order, length, angle);
    t.left(90);
  }
}

let orderSlider, sizeSlider, angleSlider, xPositionSlider, yPositionSlider;

function setup() {
  let canvas = createCanvas(1000, 1000);
  canvas.parent("canvas-container");
  background(200);

  orderSlider = createSlider(1, 4, 2);
  orderSlider.parent("order-slider");
  orderSlider.style("position", "relative");

  sizeSlider = createSlider(10, 700, 50);
  sizeSlider.parent("size-slider");
  sizeSlider.style("position", "relative");

  angleSlider = createSlider(1, 360, 90);
  angleSlider.parent("angle-slider");
  angleSlider.style("position", "relative");

  xPositionSlider = createSlider(0, width, width / 2);
  xPositionSlider.parent('x-position-slider');
  xPositionSlider.style('position', 'relative');

  yPositionSlider = createSlider(0, height, height / 2);
  yPositionSlider.parent('y-position-slider');
  yPositionSlider.style('position', 'relative');

  document.getElementById("order-value").innerHTML = orderSlider.value();
  orderSlider.input(() =>
    (document.getElementById("order-value").innerHTML = orderSlider.value())
  );

  document.getElementById("size-value").innerHTML = sizeSlider.value();
  sizeSlider.input(() =>
    (document.getElementById("size-value").innerHTML = sizeSlider.value())
  );

  document.getElementById("angle-value").innerHTML = angleSlider.value();
  angleSlider.input(() =>
    (document.getElementById("angle-value").innerHTML = angleSlider.value())
  );

  document.getElementById("x-position-value").innerHTML = xPositionSlider.value();
  xPositionSlider.input(() => document.getElementById("x-position-value").innerHTML = xPositionSlider.value());

  document.getElementById("y-position-value").innerHTML = yPositionSlider.value();
  yPositionSlider.input(() => document.getElementById("y-position-value").innerHTML = yPositionSlider.value());
}

function draw() {
  background(0); // Set the background color to black
  stroke(255); // Set the stroke color to white
  let order = orderSlider.value();
  let length = sizeSlider.value();
  let angle = angleSlider.value();
  let xPos = xPositionSlider.value();
  let yPos = yPositionSlider.value();

  let t = new Turtle(xPos - length / 2, yPos - length / 2, this);
  drawFlowerCurve(t, order, length, angle);
}

class Turtle {
  constructor(x, y, sketch) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.sketch = sketch;
  }

  forward(length) {
    const newX = this.x + length * Math.cos(this.sketch.radians(this.angle));
    const newY = this.y + length * Math.sin(this.sketch.radians(this.angle));
    this.sketch.line(this.x, this.y, newX, newY);
    this.x = newX;
    this.y = newY;
  }

  right(angle) {
    this.angle += angle;
  }

  left(angle) {
    this.angle -= angle;
  }
}

function drawFractal(renderer, saveAsSVG = false) {
  if (saveAsSVG) {
    renderer.background(255);
    renderer.stroke(0);
  } else {
    renderer.background(0);
    renderer.stroke(255);
  }

  let order = orderSlider.value();
  let length = sizeSlider.value();
  let angle = angleSlider.value();

  let t = new Turtle(width / 2 - length / 2, height / 2 - length / 2, renderer);
  drawFlowerCurve(t, order, length, angle);

  if (saveAsSVG) {
    save(renderer, "hilbert_curve.svg");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("download-svg").addEventListener("click", () => {
    let svgRenderer = createGraphics(width, height, SVG);
    drawFractal(svgRenderer, true);
  });
});
