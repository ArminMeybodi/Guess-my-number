// "use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 10;
let highscore = 0;
let guess;

const bodyElement = document.querySelector("body");
const messageElement = document.querySelector(".message");
const numberElement = document.querySelector(".number");
const guessElement = document.querySelector(".guess");
const checkElement = document.querySelector(".check");
const dotsElement = document.querySelector(".dots");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".highscore");
const againElement = document.querySelector(".again");

const checkKey = function (e) {
  if (e.key === "Enter" && !score == 0) {
    document.removeEventListener("keydown", againKey);
    check();
  }
};
const againKey = function (e) {
  if (e.key === "Enter" && (guess == secretNumber || score == 0)) {
    document.removeEventListener("keydown", checkKey);
    again();
  }
};
document.addEventListener("keydown", checkKey);

const displayMessage = function (message) {
  messageElement.textContent = message;
};
const displayscore = function (score) {
  scoreElement.textContent = score;
};
document.addEventListener("DOMContentLoaded", function () {
  guessElement.focus();
});

const check = function () {
  guess = Number(guessElement.value);
  dotsElement.classList.remove("move-in-right");

  // When there is no input
  if (!guess) {
    displayMessage("⛔️ No number!");
  }

  //when guess is in right range
  if (guess >= 1 && guess <= 20) {
    // When player wins
    if (guess === secretNumber) {
      displayMessage("🎉 Correct Number!");
      numberElement.textContent = secretNumber;

      bodyElement.style.backgroundColor = "#60b347";
      numberElement.style.width = "30rem";

      checkElement.classList.remove("pulsate");
      againElement.classList.add("pulsate");

      document.removeEventListener("keydown", checkKey);
      document.addEventListener("keydown", againKey);
      checkElement.removeEventListener("click", check);

      if (score > highscore) {
        highscore = score;
        highscoreElement.textContent = highscore;
      }
    }

    // When guess is wrong
    else if (guess !== secretNumber) {
      if (score > 1) {
        if (guess - secretNumber > 3) {
          displayMessage("📈 Too high!");
        } else if (guess - secretNumber < -3) {
          displayMessage("📉 Too low!");
        } else if (guess - secretNumber <= 3 || guess - secretNumber >= -3) {
          displayMessage("😃 You are close!");
        }
        score--;
        displayscore(score);
      }
      //when player lose
      else {
        displayMessage("💥 You lost the game!");
        score = 0;
        displayscore(score);

        document.removeEventListener("keydown", checkKey);
        document.addEventListener("keydown", againKey);

        bodyElement.style.backgroundColor = "#bf0026";
        checkElement.classList.remove("pulsate");
        againElement.classList.add("pulsate");
      }
    }
  }

  //when guess is in wrong range
  else {
    messageElement.textContent = "Number should be between 1 and 20!";
  }
};
checkElement.addEventListener("click", check);

//play again (reset) button
const again = function () {
  score = 10;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage("Start guessing");

  dotsElement.classList.add("move-in-right");
  againElement.classList.remove("pulsate");
  checkElement.classList.add("pulsate");

  displayscore(score);
  numberElement.textContent = "?";
  guessElement.value = "";
  guessElement.focus();

  bodyElement.style.backgroundColor = "#222";
  numberElement.style.width = "15rem";

  document.addEventListener("keydown", checkKey);
  checkElement.addEventListener("click", check);
};
againElement.addEventListener("click", again);
