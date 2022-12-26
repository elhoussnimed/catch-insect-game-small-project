const playGameBtn = document.querySelector(".play_game button");
const mainContainer = document.querySelector(".container");
const insects = document.querySelectorAll(".insect");
const gameField = document.querySelector(".game .playing_field");
const scoreContainer = document.querySelector(".game_score");
const timeCounter = document.querySelector(".counter");
const clickSound = document.querySelector(".click");
let score = 0;
let seconds = 0;
let minutes = 0;

// start game and move to next page to choose insect
playGameBtn.addEventListener("click", () => {
  mainContainer.style.cssText = `top: -100vh`;
});

// choose insect and move to next page to start playing
insects.forEach((insect) => {
  insect.addEventListener("click", () => {
    mainContainer.style.cssText = `top: -200vh`;
    insect.classList.add("selected");
    addFirstInsectToGameField();
  });
});

function addFirstInsectToGameField() {
  addInsect();

  setInterval(() => {
    updateTimeCounter();
  }, 1000);
}

function removeInsectsOnClick() {
  gameField.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      clickSound.play();
      e.target.remove();
      clickSound.currentTime = 0;
      setTimeout(() => {
        addInsect();
        setTimeout(() => {
          addInsect();
        }, 500);
      }, 500);
      score++;
      if (score < 10) {
        score = `0${score}`;
      }
      updateScore();
    }
  });
}

removeInsectsOnClick();

function addInsect() {
  const randomXPosition = Math.floor(
    Math.random() * (gameField.clientWidth - 200)
  );
  const randomYPosition = Math.floor(
    Math.random() * (gameField.clientHeight - 200)
  );
  const randomRotate = Math.floor(Math.random() * 360);

  const insectSelected = document.querySelector(".insect.selected");
  const insect = document.createElement("img");
  insect.src = insectSelected.children[1].src;
  insect.classList.add("insect");
  insect.style.cssText = `max-width: 80px; cursor: pointer; position: absolute; top: ${randomYPosition}px; left: ${randomXPosition}px; rotate: ${randomRotate}deg`;
  gameField.appendChild(insect);
}

function updateScore() {
  scoreContainer.innerHTML = score || "00";
}

function updateTimeCounter() {
  const minutesContainer = timeCounter.querySelector(".minutes");
  const secondsContainer = timeCounter.querySelector(".seconds");
  secondsContainer.innerHTML = seconds || "00";
  minutesContainer.innerHTML = minutes || "00";

  seconds++;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (seconds >= 60) {
    minutes++;
    seconds = 0;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  }
}
