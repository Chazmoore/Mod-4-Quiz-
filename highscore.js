var scoreListElement = document.getElementById("score-list");

// Retrieve scores from local storage
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

// Sort scores in descending order
highscores.sort(function(a, b) {
  return b.score - a.score;
});

// Display scores on the highscore page
highscores.forEach(function(scoreObj) {
  var liElement = document.createElement("li");
  liElement.textContent = scoreObj.initials + " - " + scoreObj.score;
  scoreListElement.appendChild(liElement);
});

var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearScores);

function clearScores() {
  // Clear the scores from local storage
  localStorage.removeItem("highscores");
  
  // Clear the score list on the page
  scoreListElement.innerHTML = "";
}
