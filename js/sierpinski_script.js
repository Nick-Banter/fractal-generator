function sierpinskiTriangle(t, order, size, baseShape) {
  if (order === 0) {
    for (let i = 0; i < baseShape; i++) {
      t.forward(size);
      t.left(360 / baseShape);
    }
  } else {
    for (let i = 0; i < baseShape; i++) {
      sierpinskiTriangle(t, order - 1, size / 2, baseShape);
      t.forward(size / 2);
      t.left(360 / baseShape);
    }
  }
}

let orderSlider, sizeSlider, xPositionSlider, yPositionSlider;

function setup() {
  let canvas = createCanvas(1000, 1000);
  canvas.parent("canvas-container");
  background(200);

  orderSlider = createSlider(0, 4, 2);
  orderSlider.parent("order-slider");
  orderSlider.style("position", "relative");

  sizeSlider = createSlider(10, 700, 300);
  sizeSlider.parent("size-slider");
  sizeSlider.style("position", "relative");

  xPositionSlider = createSlider(0, width, width / 2);
  xPositionSlider.parent("x-position-slider");
  xPositionSlider.style("position", "relative");

  yPositionSlider = createSlider(0, height, height / 3);
  yPositionSlider.parent("y-position-slider");
  yPositionSlider.style("position", "relative");

  baseShapeSlider = createSlider(3, 10, 3);
  baseShapeSlider.parent("base-shape-slider");
  baseShapeSlider.style("position", "relative");

  angleSlider = createSlider(1, 10, 1);
  angleSlider.parent("angle-slider");
  angleSlider.style("position", "relative");

  document.getElementById("order-value").innerHTML = orderSlider.value();
  orderSlider.input(() =>
    (document.getElementById("order-value").innerHTML = orderSlider.value())
  );

  document.getElementById("size-value").innerHTML = sizeSlider.value();
  sizeSlider.input(() =>
    (document.getElementById("size-value").innerHTML = sizeSlider.value())
  );

  document.getElementById("x-position-value").innerHTML = xPositionSlider.value();
  xPositionSlider.input(() => document.getElementById("x-position-value").innerHTML = xPositionSlider.value());

  document.getElementById("y-position-value").innerHTML = yPositionSlider.value();
  yPositionSlider.input(() => document.getElementById("y-position-value").innerHTML = yPositionSlider.value());

  document.getElementById("base-shape-value").innerHTML = baseShapeSlider.value();
  baseShapeSlider.input(() =>
    (document.getElementById("base-shape-value").innerHTML = baseShapeSlider.value())
  );

  document.getElementById("angle-value").innerHTML = angleSlider.value();
  angleSlider.input(() =>
    (document.getElementById("angle-value").innerHTML = angleSlider.value())
  );
}

function draw() {
  background(0);
  stroke(255);
  let order = orderSlider.value();
  let size = sizeSlider.value();
  let xPos = xPositionSlider.value();
  let yPos = yPositionSlider.value();
  let baseShape = baseShapeSlider.value();
  let angle = angleSlider.value();

  let t = new Turtle(xPos - size / 2, yPos - size / 3, this);
  sierpinskiTriangle(t, order, size, baseShape, angle);
}


function sierpinskiTriangle(t, order, size, baseShape, angle) {
  if (order === 0) {
    for (let i = 0; i < baseShape; i++) {
      t.forward(size);
      t.left(360 / baseShape * angle);
    }
  } else {
    for (let i = 0; i < baseShape; i++) {
      sierpinskiTriangle(t, order - 1, size / 2, baseShape, angle);
      t.forward(size / 2);
      t.left(360 / baseShape * angle);
    }
  }
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
  let size = sizeSlider.value();
  let xPos = xPositionSlider.value();
  let yPos = yPositionSlider.value();
  let baseShape = baseShapeSlider.value();
  let angle = angleSlider.value();

  let t = new Turtle(xPos - size / 2, yPos - size / 3, renderer);
  sierpinskiTriangle(t, order, size, baseShape, angle);

  if (saveAsSVG) {
    save(renderer, "sierpinski_triangle.svg");
  }
}


window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("download-svg").addEventListener("click", () => {
    let svgRenderer = createGraphics(width, height, SVG);
    drawFractal(svgRenderer, true);
  });
});
