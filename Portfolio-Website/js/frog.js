class frog {
  constructor(frogColor, frogSize, frogX, frogY)
  
}






let frogs = []; // Array to hold multiple frog objects

function setup() {
  createCanvas(600, 600);
  background(255, 255, 255); // Set the background to white
  strokeWeight(7); // Increase the stroke weight for the outline
  
  setInterval(addFrog, random(6000, 10000)); // Add a new frog at a random time interval between 6 and 10 seconds
}

function addFrog() {
  if (frogs.length < 5) {
    let frog = new Frog(); // Create a new Frog object
    
    // Check for overlapping frogs
    let overlapping = false;
    for (let existingFrog of frogs) {
      if (frog.isOverlapping(existingFrog)) {
        overlapping = true;
        break;
      }
    }
    
    if (!overlapping) {
      frogs.push(frog); // Add the frog to the array
    }
  }
  
  setTimeout(removeFrog, random(6000, 10000), frogs[frogs.length - 1]); // Remove the last added frog after a random time interval between 6 and 10 seconds
}

function removeFrog(frog) {
  let index = frogs.indexOf(frog);
  if (index !== -1) {
    frogs.splice(index, 1); // Remove the frog from the array
  }
}

function draw() {
  background(255, 255, 255); // Clear the background
  
  for (let frog of frogs) {
    frog.display(); // Display each frog
  }
}

class Frog {
  constructor() {
    this.frogColor = color(0, 153, 0); // Set the initial fill color to a dark green
    this.frogX = random(width); // Set the initial x position randomly
    this.frogY = random(height); // Set the initial y position randomly
  }

  updateColor() {
    this.frogColor = color(random(255), random(255), random(255)); // Update the frog's color randomly
  }

  display() {
    fill(this.frogColor); // Set the fill color to the frog's color
    circle(this.frogX, this.frogY, 250); // Draw the frog's body using a circle
  
    fill(this.frogColor); // Set the fill color to the frog's color
    ellipse(this.frogX, this.frogY - 175/2, 300, 175); // Draw the frog's head using an ellipse
  
    fill(250, 250, 250); // Set the fill color to white
    circle(this.frogX - 75/2, this.frogY - 250/2, 75); // Draw the left eye
  
    circle(this.frogX + 75/2, this.frogY - 250/2, 75); // Draw the right eye
  
    fill(0, 0, 0); // Set the fill color to black
    circle(this.frogX - 60/2, this.frogY - 225/2, 30); // Draw the left pupil
  
    circle(this.frogX + 60/2, this.frogY - 225/2, 30); // Draw the right pupil
  
    fill(0, 250, 0); // Set the fill color to a lighter green
  }
  
  isOverlapping(otherFrog) {
    let distance = dist(this.frogX, this.frogY, otherFrog.frogX, otherFrog.frogY);
    return distance < 250; // Check if the frogs are overlapping based on the circle radius
  }
}
