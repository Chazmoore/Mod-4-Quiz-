var quizQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    options: ["Strings", "Booleans", "Alerts", "Numbers"],
    correctAnswer: "Alerts"
  },
  {
    question: "Arrays in JavaScript can be used to store:",
    options: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
    correctAnswer: "All of the above"
  },
  {
    question: "The condition in an if/else statement is enclosed within:",
    options: ["Quotes", "Curly brackets", "Parenthesis", "Square brackets"],
    correctAnswer: "Parenthesis"
  },
  {
    question: "String values must be enclosed within ______ when being assigned to variables.",
    options: ["Commas", "Curly brackets", "Quotes", "Parenthesis"],
    correctAnswer: "Quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: ["JavaScript", "Terminal/Bash", "For loops", "console.log"],
    correctAnswer: "console.log"
  }
];

var questionTitleElement = document.getElementById("question-title");
var timerElement = document.getElementById("time");
var optionsElement = document.getElementById("options");
var submitButton = document.getElementById("submit");
var startButton = document.getElementById("start");
var initialsInput = document.getElementById("initials");
var validationElement = document.getElementById("validation");
var introElement = document.getElementById("intro");
var doneScreenElement = document.getElementById("done-screen");
var finalScoreElement = document.getElementById("final-score");
var questionsElement = document.getElementById("questions");

var currentQuestionIndex = 0;
var time = 60;
var score = 0;
var timerId;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  introElement.style.display = "none";
  startButton.style.display = "none";
  doneScreenElement.style.display = "none";
  questionsElement.style.display = "block";

  currentQuestionIndex = 0;
  score = 0;
  time = 60;
  timerId = setInterval(countDown, 1000);

  getQuestion();
}

function getQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    endQuiz();
    return;
  }

  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionTitleElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";

  currentQuestion.options.forEach(function(option, i) {
    var optionButton = document.createElement("button");
    optionButton.setAttribute("class", "option");
    optionButton.setAttribute("value", option);
    optionButton.textContent = option;

    optionButton.addEventListener("click", questionSelect);

    optionsElement.appendChild(optionButton);
  });
}

function questionSelect() {
  if (this.value !== quizQuestions[currentQuestionIndex].correctAnswer) {
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    validationElement.textContent = "Incorrect!";
    validationElement.style.color = "red";
  } else {
    score += 20;
    validationElement.textContent = "Correct!";
    validationElement.style.color = "green";
  }

  validationElement.classList.remove("hide");
  setTimeout(function() {
    validationElement.classList.add("hide");
  }, 1000);

  currentQuestionIndex++;
  getQuestion();
}

function endQuiz() {
  clearInterval(timerId);

  questionTitleElement.style.display = "none";
  optionsElement.style.display = "none";
  validationElement.style.display = "none";

  doneScreenElement.style.display = "block";
  finalScoreElement.textContent = score;

  submitButton.addEventListener("click", saveScore);
}

function countDown() {
  time--;
  timerElement.textContent = time;

  if (time <= 0 || currentQuestionIndex >= quizQuestions.length) {
    endQuiz();
  }
}

function saveScore() {
  var userInitials = initialsInput.value.trim();

  if (userInitials !== "") {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    var newScore = {
      score: score,
      initials: userInitials
    };

    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscore.html";
  }
}





