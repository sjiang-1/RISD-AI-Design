let letters = []; // Array to store letter positions
let fontSize = 16;
let message = "AIGENERATED";
let mouseRadius = 110; // Mouse radius to create a dispersion effect
let dispersionFactor = 19; // Dispersion factor for stronger effect

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textSize(fontSize);
  textAlign(CENTER, CENTER);

  // Store positions of each small letter
  for (let x = 0; x < width; x += fontSize) {
    for (let y = 0; y < height; y += fontSize) {
      let letter = message[int(random(message.length))];
      letters.push({ x, y, letter });
    }
  }

  noCursor(); // Hide default cursor
}

function draw() {
  background(255);
  fill(0);
  noStroke();

  // Draw each letter
  for (let i = 0; i < letters.length; i++) {
    let dx = mouseX - letters[i].x;
    let dy = mouseY - letters[i].y;
    let d = dist(mouseX, mouseY, letters[i].x, letters[i].y);

    if (d < mouseRadius) {
      // Calculate the angle between the mouse and letter
      let angle = atan2(dy, dx);
      // Calculate the dispersion force based on the distance from the border
      let dispersionForce = map(d, 0, mouseRadius, 0, dispersionFactor);
      // Disperse letters based on the angle and dispersion force
      let newX = letters[i].x + cos(angle) * dispersionForce;
      let newY = letters[i].y + sin(angle) * dispersionForce;

      push();
      translate(newX, newY);
      rotate(random(-PI, PI));
      text(letters[i].letter, 0, 0);
      pop();
    } else {
      // Regular letter position
      text(letters[i].letter, letters[i].x, letters[i].y);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
