// Get the canvas container element
const canvasContainer = document.getElementById('canvas-container');

// Function to start the game
function startGame() {
  // p5.js setup function
  function setup() {
    const canvas = createCanvas(400, 600);
    canvas.parent('canvas-container');
  }

  // p5.js draw function
  function draw() {
    // Your drawing code goes here
    background(255);
  fill(200)
  strokeWeight(3)
  stroke(0)
  beginShape()
  vertex(width/4, height/10)
  vertex(3/8*width, 0)
  vertex(5/8*width, 0)
  vertex(6/8*width, height/10)
  vertex(5/8*width, height/5)
  vertex(3/8*width, height/5)
  vertex(width/4, height/10)
  endShape()
  fill(0, 0, 255)
  beginShape()
  vertex(6/16*width, height/10)
  vertex(13/32*width, 3/40*height)
  vertex(14/32*width, height/10)
  vertex(13/32*width, 5/40*height)
  vertex(6/16*width, height/10)
  endShape()
  beginShape()
  vertex(10/16*width, height/10)
  vertex(19/32*width, 3/40*height)
  vertex(18/32*width, height/10)
  vertex(19/32*width, 5/40*height)
  vertex(10/16*width, height/10)
  endShape()
  fill(200)
  noStroke()
  ellipse(width/2, height/2, width/5, height/20)
  fill(0, 0, 240)
  stroke(0)
  
  rect(4/10*width, height/4, width/5, height/4)
  fill(0, 0, 255)
  ellipse(width/2, height/4, width/5, height/20)
  rect(14/32*width, height/5, 1/8*width, 2/30*width)
  fill(150)
  ellipse(4/10*width, height/2 + width/10, height/20, width/5)
  noStroke()
  rect(4/10*width, height/2, 1/20*width, width/5)
  stroke(0)
  stroke(0)
  fill(200)
  ellipse(9/20*width, height/2 + width/10, height/20, width/5)
  fill(150)
  ellipse(11/20*width, height/2 + width/10, height/20, width/5)
  noStroke()
  rect(11/20*width, height/2, 1/20*width, width/5)
  stroke(0)
  fill(200)
  ellipse(12/20*width, height/2 + width/10, height/20, width/5)
  line(8/20*width, height/2, 9/20*width, height/2)
  line(11/20*width, height/2, 12/20*width, height/2)
  line(8/20*width, height/2+width/5, 9/20*width, height/2+width/5)
  line(11/20*width, height/2+width/5, 12/20*width, height/2+width/5)
  }

  // Initialize p5.js canvas
  setup();
  

  // Set p5.js draw function
  draw();

  // Your game logic goes here
}

// Get the start button element
const startButton = document.getElementById('start-button');

// Event listener for the start button click
startButton.addEventListener('click', startGame);
