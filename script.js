"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 10;
let highscore = 0;
let guess;
let end;

const bodyEl = document.querySelector("body");
const messageEl = document.querySelector(".message");
const numberEl = document.querySelector(".number");
const guessEl = document.querySelector(".guess");
const checkEl = document.querySelector(".check");
const scoreEl = document.querySelector(".score");
const highscoreEl = document.querySelector(".highscore");
const againEl = document.querySelector(".again");

const playAudio = function (src) {
  let audio = new Audio(`${src}`);
  audio.play();
};

const checkKey = function (e) {
  if (e.key === "Enter" && !score == 0) {
    document.removeEventListener("keydown", againKey);
    check();
  }
};

const againKey = function (e) {
  if (e.key === "Enter" && end) {
    end = false;
    document.removeEventListener("keydown", checkKey);
    again();
  }
};
document.addEventListener("keydown", checkKey);

const displayMessage = function (message) {
  messageEl.textContent = message;
};
const displayscore = function (score) {
  scoreEl.textContent = score;
};

document.addEventListener("DOMContentLoaded", function () {
  guessEl.focus();
});

const check = function () {
  guess = Number(guessEl.value);
  messageEl.classList.remove("move-in-right");

  playAudio("sounds/check.mp3");

  // When there is no input
  if (!guess) {
    displayMessage("⛔️ No number!");
  }

  //when guess is in right range
  if (guess >= 1 && guess <= 20) {
    // When player wins
    if (guess === secretNumber) {
      displayMessage("🎉 Correct Number!");
      numberEl.textContent = secretNumber;
      end = true;

      bodyEl.style.backgroundColor = "#60b347";
      numberEl.style.width = "30rem";

      checkEl.classList.toggle("pulsate");
      againEl.classList.toggle("pulsate");

      document.removeEventListener("keydown", checkKey);
      document.addEventListener("keydown", againKey);
      checkEl.removeEventListener("click", check);

      if (score > highscore) {
        highscore = score;
        highscoreEl.textContent = highscore;

        playAudio("sounds/score-up.mp3");
      } else {
        playAudio("sounds/win.mp3");
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
        end = true;

        playAudio("sounds/lose.mp3");

        document.removeEventListener("keydown", checkKey);
        document.addEventListener("keydown", againKey);

        bodyEl.style.backgroundColor = "#bf0026";

        checkEl.classList.toggle("pulsate");
        againEl.classList.toggle("pulsate");
      }
    }
  }
  //when guess is in wrong range
  else {
    messageEl.textContent = "Number should be between 1 and 20!";
  }
};
checkEl.addEventListener("click", check);

//play again (reset) button
const again = function () {
  score = 10;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage("Start guessing...");
  playAudio("sounds/try-again.mp3");

  messageEl.classList.add("move-in-right");
  againEl.classList.remove("pulsate");
  checkEl.classList.add("pulsate");

  displayscore(score);
  numberEl.textContent = "?";
  guessEl.value = "";
  guessEl.focus();

  bodyEl.style.backgroundColor = "#222";
  numberEl.style.width = "15rem";

  document.addEventListener("keydown", checkKey);
  checkEl.addEventListener("click", check);
};
againEl.addEventListener("click", again);
