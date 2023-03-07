// Initialize canvas
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Initialize ball position and speed
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballSpeedX = 5;
var ballSpeedY = 5;

// Initialize paddle positions
var paddle1Y = 150;
var paddle2Y = 150;
var paddleHeight = 100;
var paddleWidth = 10;

// Initialize player scores
var player1Score = 0;
var player2Score = 0;

// Set up key listeners for paddle movement
canvas.addEventListener("mousemove", function(event) {
    var mousePos = calculateMousePos(event);
    paddle1Y = mousePos.y - (paddleHeight / 2);
});

// Calculate mouse position on canvas
function calculateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

// Reset ball position and speed after a goal
function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 5;
}

// Update ball position and speed
function moveEverything() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle1Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++;
            ballReset();
        }
    }
    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle2Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++;
            ballReset();
        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

// Draw ball, paddles, and scores
function drawEverything() {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
    context.beginPath();
    context.arc(ballX, ballY, 10, 0, Math.PI * 2);
    context.fill();
    context.font = "30px Arial";
    context.fillText(player1Score, 100, 100);
    context.fillText(player2Score, canvas.width - 100, 100);
    }

// Main game loop
setInterval(function() {
moveEverything();
drawEverything();
}, 30);