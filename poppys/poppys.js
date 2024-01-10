let poppies = [];
let maxPoppySize = 50; // Maximum size of poppies
let colorPalette; // We will store the iridescent colors here

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(30);

  // Define an iridescent color palette inspired by the uploaded image
  colorPalette = [
    color(238, 130, 238), // Violet
    color(75, 0, 130),    // Indigo
    color(0, 0, 255),     // Blue
    color(0, 255, 0),     // Green
    color(255, 255, 0),   // Yellow
    color(255, 127, 80),  // Coral
    color(255, 0, 0)      // Red
  ];
}

function draw() {
  background(255); // White background
  orbitControl(); // Allows camera movement with mouse
  ambientLight(255);
  directionalLight(255, 255, 255, 0.25, 0.25, -1);

  // Draw each poppy
  for (let poppy of poppies) {
    drawPoppy(poppy);
  }
}

function mousePressed() {
  // Map 2D mouse position to 3D space
  let posX = map(mouseX, 0, width, -width / 2, width / 2);
  let posZ = map(mouseY, 0, height, 0, -height);
  let posY = height / 2;
  poppies.push({ x: posX, y: posY, z: posZ, size: 0, color: random(colorPalette) });
}

function drawPoppy(poppy) {
  if (poppy.size < maxPoppySize) {
    poppy.size += 0.2; // Speed of growth
  }

  push();
  translate(poppy.x, poppy.y - poppy.size, poppy.z); // Adjust poppy position based on size

  // Stem
  stroke(155, 233, 168); // Pastel green
  strokeWeight(2);
  line(0, 50, 0, 0, -poppy.size, 0); // Stem grows with the flower

  // Leaves
  noStroke();
  fill(155, 233, 168, 200); // Semi-transparent pastel green for leaves

  // Petals
  fill(poppy.color); // Use the color from the palette
  for (let i = 0; i < TAU; i += TAU / 5) {
    push();
    rotateY(i);
    translate(0, 0, 10);
    ellipse(0, 0, poppy.size / 2, poppy.size); // Petal
    pop();
  }

  // Center of the poppy
  fill(255, 222, 173); // Pastel orange for center
  sphere(poppy.size / 4); // Center of the flower
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
