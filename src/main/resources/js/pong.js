let canvas = document.getElementById('gameCanvas'),
    canvasContext = canvas.getContext('2d'),
    ballPositionX = canvas.width / 2,
    ballPositionY = canvas.height / 2,
    ballSize = 20,
    ballVelocityX = 8,
    ballVelocityY = 0,
    fps = 60,
    paddleWidth = 10,
    paddleHeight = 100,
    paddleOneY = 250,
    paddleOneDirectionY = null,
    paddleOneVelocityY = 15,
    paddleTwoY = 250,
    paddleTwoDirectionY = null,
    paddleTwoVelocityY = 10,
    playerOneScore = 0,
    playerTwoScore = 0,
    welcomeMenu = document.getElementById('welcomeMenu'),
    registerMenu = document.getElementById('registerMenu'),
    loginMenu = document.getElementById('loginMenu'),
    startMenu = document.getElementById('startMenu'),
    pauseMenu = document.getElementById('pauseMenu'),
    gameOverMenu = document.getElementById('gameOverMenu'),
    gameplay = document.getElementById('gameplay'),
    startBtn = document.getElementById('startBtn'),
    continueBtn = document.getElementById('continueBtn'),
    restartBtn = document.getElementById('restartBtn'),
    againBtn = document.getElementById('againBtn'),
    registerBtn = document.getElementById('registerBtn'),
    loginBtn = document.getElementById('loginBtn'),
    welcomeRegisterBtn = document.getElementById('welcomeRegisterBtn'),
    welcomeLoginBtn = document.getElementById('welcomeLoginBtn'),
    gameMessxage = document.getElementById('gameMessage'),
    gamePaused = false,
    gameInProgress = false,
    scoreToWin = 2,
    difficultyLevel = 1,
    gameInterval = window.setInterval(function () {
    });

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ballPositionY = canvas.height/2 - ballSize/2
paddleOneY = canvas.height/2 - paddleHeight/2;
paddleTwoY = canvas.height/2 - paddleHeight/2;
ballVelocityY = getRandomNumber(-5,5) * (.25 * difficultyLevel);

welcomeLoginBtn.addEventListener('click', function() {
   loginMenu.className = 'active';
    welcomeMenu.className = '';
});
welcomeRegisterBtn.addEventListener('click', function () {
    registerMenu.className = 'active';
    welcomeMenu.className = '';
})
loginBtn.addEventListener('click', login);
registerBtn.addEventListener('click', register);
window.addEventListener('resize', windowResize);
startBtn.addEventListener('click', startGame);
continueBtn.addEventListener('click', resumeGame);
restartBtn.addEventListener('click', resetGame);
againBtn.addEventListener('click', resetGame);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

draw();
welcomeMenu.className = 'active';
loginMenu.className = '';
registerMenu.className = '';
startMenu.className = '';
pauseMenu.className = '';
gameplay.className = '';
gameOverMenu.className = '';

window.onblur = function() {
    if(gameInProgress) pauseGame();
}

function login() {
    loginMenu.className = '';
    startMenu.className = 'active';
}
function register() {
    registerMenu.className = '';
    startMenu.className = 'active';
}

function startGame() {
    gameInProgress = true;
    gameplay.className = '';
    startMenu.className = '';
    gameOverMenu.className = '';
    pauseMenu.className = '';
    gamePaused = false;
   /* gameInterval = window.setInterval(function() {
        move();
        draw();
    }, 1000/fps);*/
}


function togglePause() {
    if(gamePaused) {
        resumeGame();
    } else {
        pauseGame();
    }
}

function pauseGame() {
    if(!gamePaused) {
        gamePaused = true;
        gameplay.className = '';
        pauseMenu.className = 'active';
        clearInterval(gameInterval);
    }
}

function resumeGame() {
    if(gamePaused) {
        gamePaused = false;
        gameplay.className = '';
        pauseMenu.className = '';
        startGame();
    }
}
function resetGame() {

}
function windowResize() {
    resetBall();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}

function keyDown(e) {
    e.preventDefault();
    switch(e.keyCode) {
        case 13:
            if(gameInProgress) togglePause();
            break;
        case 38:
            if(!gamePaused) paddleOneDirectionY = 'up';
            break;
        case 40:
            if(!gamePaused) paddleOneDirectionY = 'down';
            break;
    }
}

function keyUp(e) {
    paddleOneDirectionY = null;
}

function resetBall() {
    ballPositionX = canvas.width/2;
    ballPositionY = canvas.height/2;
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function draw() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'white';
    canvasContext.beginPath();
    canvasContext.arc(ballPositionX, ballPositionY, ballSize/2, 0, Math.PI*2, true);
    canvasContext.fill();

    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(paddleWidth,paddleOneY,paddleWidth,paddleHeight);
    canvasContext.fillStyle = 'white';

    canvasContext.fillRect(canvas.width - paddleWidth - paddleWidth,paddleTwoY,paddleWidth,paddleHeight);
    canvasContext.fillStyle = 'rgba(255,255,255,0.2)';
    canvasContext.font = "200px 'Roboto', Arial";
    canvasContext.textAlign = "center";
    canvasContext.fillText(playerOneScore,canvas.width*.25,canvas.height/2 + 75);

    canvasContext.fillStyle = 'rgba(255,255,255,0.2)';
    canvasContext.font = "200px 'Roboto', Arial";
    canvasContext.textAlign = "center";
    canvasContext.fillText(playerTwoScore,canvas.width*.75,canvas.height/2 + 75);

    canvasContext.strokeStyle = 'rgba(255,255,255,0.2)';
    canvasContext.beginPath();
    canvasContext.moveTo(canvas.width/2,0);
    canvasContext.lineTo(canvas.width/2,canvas.height);
    canvasContext.stroke();
}