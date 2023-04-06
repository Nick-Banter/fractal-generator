// Koch Snowflake functions
function kochCurve(t, order, size, angle) {
  if (order === 0) {
    t.forward(size);
  } else {
    [angle, -2 * angle, angle, 0].forEach((a) => {
      kochCurve(t, order - 1, size / 3, angle);
      t.left(a);
    });
  }
}

function drawKochSnowflake(t, order, size, angle, baseShape) {
  for (let i = 0; i < baseShape; i++) {
    kochCurve(t, order, size, angle);
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

let orderSlider, sizeSlider, angleSlider, baseShapeSlider;

function setup() {
  let canvas = createCanvas(1000, 1000);
  canvas.parent('canvas-container');
  background(200);

  // Create sliders
  orderSlider = createSlider(1, 5, 2);
  orderSlider.parent('order-slider');
  orderSlider.style('position', 'relative');

  sizeSlider = createSlider(10, 700, 100);
  sizeSlider.parent('size-slider');
  sizeSlider.style('position', 'relative');

  angleSlider = createSlider(1, 360, 60);
  angleSlider.parent('angle-slider');
  angleSlider.style('position', 'relative');

  baseShapeSlider = createSlider(1, 12, 3);
  baseShapeSlider.parent('base-shape-slider');
  baseShapeSlider.style('position', 'relative');

  xPositionSlider = createSlider(0, width, width / 2);
  xPositionSlider.parent('x-position-slider');
  xPositionSlider.style('position', 'relative');

  yPositionSlider = createSlider(0, height, height / 2);
  yPositionSlider.parent('y-position-slider');
  yPositionSlider.style('position', 'relative');

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
  // Set the background color
  if (saveAsSVG) {
    renderer.background(255); // Set the background color to white for SVG download
  } else {
    renderer.background(0); // Set the background color to black for display
  }
  
  // Set the stroke color of the fractal
  if (saveAsSVG) {
    renderer.stroke(0); // Set the stroke color to black for SVG download
  } else {
    renderer.stroke(255); // Set the stroke color to white for display
  }


  let order = orderSlider.value();
  let size = sizeSlider.value();
  let angle = angleSlider.value();
  let baseShape = baseShapeSlider.value();

  // Get the X and Y position values from the sliders
  let xPos = xPositionSlider.value();
  let yPos = yPositionSlider.value();

  // Pass the X and Y position values to the Turtle constructor
  let t = new Turtle(xPos - size / 2, yPos - size / 3, renderer);
  drawKochSnowflake(t, order, size, angle, baseShape);

  // Save the SVG file if the saveAsSVG parameter is true
  if (saveAsSVG) {
    save(renderer, 'koch_snowflake.svg');
  }
}


// Update the draw function to call the drawFractal function with the default renderer
function draw() {
  background(0);
  drawFractal(this);
}

// Wrap the event listener code in a DOMContentLoaded event listener
window.addEventListener('DOMContentLoaded', () => {
  // Add an event listener for the download button
  document.getElementById("download-svg").addEventListener("click", () => {
    let svgRenderer = createGraphics(width, height, SVG);
    drawFractal(svgRenderer, true);
  });
});