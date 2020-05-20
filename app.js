var scores, roundScore, activePlayer, gamePlay;

init();

// Rolling dice
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlay) {
    var dice = Math.floor(Math.random() * 6) + 1;

    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    if (dice !== 1) {
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

// Holding and adding the scoreboard
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlay) {
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlay = false;
    } else {
      nextPlayer();
    }
  }
});

// Restarting the game
document.querySelector(".btn-new").addEventListener("click", init);

// D-R-Y application
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlay = true;

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("Winner!");
  document.querySelector(".player-1-panel").classList.remove("Winner!");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

// Here I have used an anonymous function in the event listener
// In an anonymous function we can use it only once and it has no name, we can also use callback function instead
// document.querySelector("#current-" + activePlayer).textContent = dice;

// document.querySelector("#current-1").innerHTML = "<b>" + dice + "</b>";

// document.querySelector(".dice").style.display = "none";
