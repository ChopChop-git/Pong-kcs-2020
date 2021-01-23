window.onload = function () {
    setTimeout(showWrap, 2000);


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
        startMenu = document.getElementById('startMenu'),
        pauseMenu = document.getElementById('pauseMenu'),
        gameOverMenu = document.getElementById('gameOverMenu'),
        gameplay = document.getElementById('gameplay'),
        startBtn = document.getElementById('startBtn'),
        continueBtn = document.getElementById('continueBtn'),
        restartBtn = document.getElementById('restartBtn'),
        exitBtn = document.getElementById('exitBtn'),
        gameMessage = document.getElementById('gameMessage'),
        gamePaused = false,
        gameInProgress = false,
        scoreToWin = 5,
        difficultyLevel = 1,
        gameInterval = window.setInterval(function () {
        });

    resizeCanvas();

    window.addEventListener('resize', windowResize);
    startBtn.addEventListener('click', startGame);
    continueBtn.addEventListener('click', resumeGame);
    restartBtn.addEventListener('click', resetGame);
    exitBtn.addEventListener('click', exit);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    startMenu.className = 'active';

    window.onblur = function () {
        if (gameInProgress) pauseGame();
    }

    function exit() {
        const body =  {
            score: playerOneScore
        };
        const url =  getCurrentHostname() + "/api/saveScore";

        $.ajax({
            type: "POST",
            url: url,
            data: body,
            contentType: "application/x-www-form-urlencoded",
        })
            .done((data) => {
                console.log("Saved player score")
                proceedToPage("/start");
            });
        // proceedToPage("/start");
    }

    function resetElements() {
        paddleOneY = canvas.height / 2 - paddleHeight / 2;
        paddleTwoY = canvas.height / 2 - paddleHeight / 2;
        resetBall();
    }
    function startGame() {
        gameInProgress = true;
        resetElements();
        gamePaused = false;
        startMenu.className = '';
        gameInterval = window.setInterval(function () {
            moveEverything();
            drawEverything();
        }, 1000 / fps);
    }

    function resetGame() {
        playerOneScore = 0;
        playerTwoScore = 0;
        difficultyLevel = 1;
        startMenu.className = '';
        pauseMenu.className = '';
        gameOverMenu.className = '';
        resetElements();
        startGame();
    }

    function togglePause() {
        if (gamePaused) {
            resumeGame();
        } else {
            pauseGame();
        }
    }

    function pauseGame() {
        if (!gamePaused) {
            gamePaused = true;
            changeActiveDiv(gameplay, pauseMenu);
            clearInterval(gameInterval);
        }
    }

    function resumeGame() {
        if (gamePaused) {
            gamePaused = false;
            pauseMenu.className = '';
            startGame();
        }
    }

    function windowResize() {
        if (gamePaused === false) {
            togglePause()
        }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawEverything();
    }

    function keyDown(e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 13:
                if (gameInProgress) togglePause();
                break;
            case 38:
                if (!gamePaused) paddleOneDirectionY = 'up';
                break;
            case 40:
                if (!gamePaused) paddleOneDirectionY = 'down';
                break;
        }
    }

    function keyUp(e) {
        paddleOneDirectionY = null;
    }

    function resetBall() {
        ballVelocityX = -ballVelocityX;
        ballVelocityY = getRandomNumber(-5, 5) * (.25 * difficultyLevel);
        ballPositionX = canvas.width / 2;
        ballPositionY = canvas.height / 2;
    }

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    function randomizeGame() {
        paddleTwoVelocityY = getRandomNumber(10, 20) * (.25 * difficultyLevel);
    }

    function gameOver(playerWon) {
        gameInProgress = false;
        clearInterval(gameInterval);
        gameMessage.textContent = '';
        if (playerWon) {
            gameMessage.textContent = 'You won!';
        } else {
            gameMessage.textContent = `You lost, score: ${playerOneScore}`;
        }
        changeActiveDiv(gameplay, gameOverMenu);
    }

    function moveEverything() {
        ballPositionX = ballPositionX + ballVelocityX;
        if (ballPositionX > canvas.width - paddleWidth * 2 - ballSize / 2) {
            if (ballPositionY >= paddleTwoY &&
                ballPositionY <= paddleTwoY + paddleHeight &&
                ballPositionX < canvas.width - paddleWidth) {
                ballVelocityX = -ballVelocityX;
                if (ballPositionY >= paddleTwoY &&
                    ballPositionY < paddleTwoY + paddleHeight * .2) {
                    ballVelocityY = -15 * (.25 * difficultyLevel);
                } else if (ballPositionY >= paddleTwoY + paddleHeight * .2 &&
                    ballPositionY < paddleTwoY + paddleHeight * .4) {
                    ballVelocityY = -10 * (.25 * difficultyLevel);
                } else if (ballPositionY >= paddleTwoY + paddleHeight * .4 &&
                    ballPositionY < paddleTwoY + paddleHeight * .6) {
                    ballVelocityY = getRandomNumber(-5, 5);

                } else if (ballPositionY >= paddleTwoY + paddleHeight * .6 &&
                    ballPositionY < paddleTwoY + paddleHeight * .8) {
                    ballVelocityY = 10 * (.25 * difficultyLevel);
                } else if (ballPositionY >= paddleTwoY + paddleHeight * .8 &&
                    ballPositionY < paddleTwoY + paddleHeight) {
                    ballVelocityY = 15 * (.25 * difficultyLevel);
                }
            } else if (ballPositionX > canvas.width) {
                resetBall();
                playerOneScore++;
                difficultyLevel = playerOneScore * .5;
                // if (playerOneScore === scoreToWin) gameOver(true);
            }
            randomizeGame();
        } else if (ballPositionX < paddleWidth * 2 + ballSize / 2) {
            if (ballPositionY >= paddleOneY &&
                ballPositionY <= paddleOneY + paddleHeight &&
                ballPositionX > paddleWidth + ballSize / 2) {
                ballVelocityX = -ballVelocityX;
                if (ballPositionY >= paddleOneY &&
                    ballPositionY < paddleOneY + paddleHeight * .2) {
                    ballVelocityY = -20 * (.25 * difficultyLevel);
                } else if (ballPositionY >= paddleOneY + paddleHeight * .2 &&
                    ballPositionY < paddleOneY + paddleHeight * .4) {
                    ballVelocityY = -10 * (.25 * difficultyLevel);
                } else if (ballPositionY >= paddleOneY + paddleHeight * .4 &&
                    ballPositionY < paddleOneY + paddleHeight * .6) {
                    ballVelocityY = 0 * (.25 * difficultyLevel);
                } else if (ballPositionY >= paddleOneY + paddleHeight * .6 &&
                    ballPositionY < paddleOneY + paddleHeight * .8) {
                    ballVelocityY = 10 * (.25 * difficultyLevel);
                } else if (ballPositionY >= paddleOneY + paddleHeight * .8 &&
                    ballPositionY < paddleOneY + paddleHeight) {
                    ballVelocityY = 20 * (.25 * difficultyLevel);
                }
            } else if (ballPositionX <= -ballSize) {
                resetBall();
                playerTwoScore++;
                if (playerTwoScore === scoreToWin) gameOver(false);
            }
            randomizeGame();
        }

        ballPositionY = ballPositionY + ballVelocityY;
        if (ballPositionY > canvas.height - ballSize / 2) {
            ballVelocityY = -ballVelocityY;
            ballPositionY = canvas.height - ballSize / 2;
        } else if (ballPositionY < ballSize / 2) {
            ballVelocityY = -ballVelocityY;
            ballPositionY = ballSize / 2;
        }

        if (paddleOneDirectionY === 'up' && paddleOneY >= 0) {
            paddleOneY -= paddleOneVelocityY;
        } else if (paddleOneDirectionY === 'down' &&
            paddleOneY < (canvas.height - paddleHeight)) {
            paddleOneY += paddleOneVelocityY;
        }

        if (ballPositionY < paddleTwoY) {
            paddleTwoY -= paddleTwoVelocityY;
        } else if (ballPositionY > paddleTwoY + paddleHeight) {
            paddleTwoY += paddleTwoVelocityY;
        }

    }

    function drawEverything() {
        // canvasContext.fillStyle = 'black';
        // canvasContext.fillRect(0,0,canvas.width,canvas.height);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.fillStyle = 'white';
        canvasContext.beginPath();
        canvasContext.arc(ballPositionX, ballPositionY, ballSize / 2, 0, Math.PI * 2, true);
        canvasContext.fill();

        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(paddleWidth, paddleOneY, paddleWidth, paddleHeight); // x, y, w, h

        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(canvas.width - paddleWidth - paddleWidth, paddleTwoY, paddleWidth, paddleHeight); // x, y, w, h

        canvasContext.fillStyle = 'rgba(255,255,255,0.2)';
        canvasContext.font = "200px 'Roboto', Arial";
        canvasContext.textAlign = "center";
        canvasContext.fillText(playerOneScore, canvas.width * .25, canvas.height / 2 + 75);

        canvasContext.fillStyle = 'rgba(255,255,255,0.2)';
        canvasContext.font = "200px 'Roboto', Arial";
        canvasContext.textAlign = "center";
        canvasContext.fillText(playerTwoScore, canvas.width * .75, canvas.height / 2 + 75);

        canvasContext.strokeStyle = 'rgba(255,255,255,0.2)';
        canvasContext.beginPath();
        canvasContext.moveTo(canvas.width / 2, 0);
        canvasContext.lineTo(canvas.width / 2, canvas.height);
        canvasContext.stroke();
    }
}

