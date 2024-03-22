"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".guess").focus();
});

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  document.querySelector(".dots").style.animation = "none";

  // When there is no input
  if (!guess) {
    displayMessage("⛔️ No number!");
  }

  //when guess is in right range
  if (guess >= 1 && guess <= 20) {
    // When player wins
    if (guess === secretNumber) {
      displayMessage("🎉 Correct Number!");
      document.querySelector(".number").textContent = secretNumber;

      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".number").style.width = "30rem";
      document.querySelector(".check").style.animation = "none";
      document.querySelector(".again").style.animation =
        "pulsate 0.5s infinite";

      if (score > highscore) {
        highscore = score;
        document.querySelector(".highscore").textContent = highscore;
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
        document.querySelector(".score").textContent = score;
      } else {
        displayMessage("💥 You lost the game!");
        document.querySelector(".score").textContent = 0;

        document.querySelector("body").style.backgroundColor = "#bf0026";
        document.querySelector(".check").style.animation = "none";
        document.querySelector(".again").style.animation =
          "pulsate 0.5s infinite";
      }
    }
  }

  //when guess is in wrong range
  else {
    document.querySelector(".message").textContent =
      "Number should be between 1 and 20!";
  }
});

//play again (reset) button
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage("Start guessing");

  document.querySelector(".dots").style.animation = "moveInRight 3s infinite";
  document.querySelector(".again").style.animation = "none";
  document.querySelector(".check").style.animation = "pulsate 0.5s infinite";

  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector(".guess").focus();

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
