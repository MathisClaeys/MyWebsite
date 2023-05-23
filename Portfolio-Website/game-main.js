// Get the start button element
const startButton = document.getElementById('start-button');

// Function to start the game
function startGame() {
    console.log('Game started!');
    // Your game logic goes here
    function setup() {
      createCanvas(400, 400);
    }
    
    function draw() {
      background(220);
      
      if (isCursorOverCanvas()) {
        cursor('media/target.png');
      } else {
        cursor(ARROW);
      }
    }
    
    function isCursorOverCanvas() {
      return (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height);
    }
}

// Event listener for the start button click
startButton.addEventListener('click', startGame);





