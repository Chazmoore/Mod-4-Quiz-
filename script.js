var quizQuestions = [
    {
        questions: "Commonly used data types DO Not Include:",
        options: ["Strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },

    {
        questions: "Arrays in JavaScripts can be used to store _______.",
        options: ["numbers and strings","other arrays","booleans","all of the above"],
        correctAnswer: "all of the above"
    },

    {
        questions: "The condition in an if/else statement is enclosed with _______.",
        options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnswer: "curly brackets"
    },

    {
        questions: "Strings values must be enclosed within ______ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "quotes",
    },

    {
        questions: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log",
    }
];

var questionsTitle = document.getElementById("questions");
var timerElement = document.getElementById("time");
var optionsElement = document.getElementById("options");
var submitButton = document.getElementById("submit");
var startButton = document.getElementById("start");
var initialsInput = document.getElementById("initials");
var validationElement = document.getElementById("validation");
var questionContainerElement = document.getElementById("question-container");
var doneScreenElement = document.getElementById("done-screen");
var finalScoreElement = document.getElementById("final-score");

var currentQuestionIndex = 0;
var time = quizQuestions.length * 15;
var timerId;

// start.onclick = startQuiz;
startButton.addEventListener("click",startQuiz);

function startQuiz() {
    var introElement = document.getElementById("intro");
    introElement.classList.add("hide");

    questionContainerElement.classList.remove("hide");

    timerId = setInterval(countDown, 1000);

    timerElement.textContent = time;

    getQuestion();
}




function getQuestion() {
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsTitle.textContent = currentQuestion.question;
  
    options.innerHTML = "";

    currentQuestion.options.forEach(function(option, i) {
        var optionButton = document.createElement("button");
        optionButton.setAttribute("class", "option");
        optionButton.setAttribute("value", option);

        optionButton.textContent = option;

        optionButton.addEventListener("click",questionSelect);

        optionsElement.appendChild(quizButton);
    });
}

function questionSelect() {
    if (this.value !== questions[currentQuestionIndex].correctAnswer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timerElement.textContent = time;
        validationElement.textContent = "Incorrect!";
        validationElement.style.color = "grey";
        validationElement.style.fontSize = "15px";
    }else {
        validationElement.textContent = "Correct!";
        validationElement.style.color = "grey";
        validationElement.style.fontSize = "15px";
    }

    validationElement.classList.remove("hide");
    setTimeout(function() {
        validationElement.classList.add("hide");
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === quizQuestions.length) {
        endQuiz();
    }else {
        getQuestion();
    }
    
}

function endQuiz() {
    clearInterval(timerId);

    questionContainerElement.classList.add("hide");
  doneScreenElement.classList.remove("hide");

  finalScoreElement.textContent = time;

    // var endScreenEl = document.getElementById("done-screen");
    // endScreenEl.classList.remove("hide");

    // var score = document.getElementById("final-score");
    // score.textContent = time;

    // questionsTitle.classList.add("hide");

}

function countDown() {
    time--;
    timerElement.textContent = time;

    if (time <= 0) {
        endQuiz();
    }
}

function saveScore() {
    var userInitials = initialsInput.value.trim();

    if (initials !== "") {
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
        score: time,
        initials: userInitials
    };
    
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscore.html";
    }

}

initialsInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        saveScore();
}
});

submitButton.addEventListener("click", saveScore);


// function checkForEnter(event) {
//     if (event.key === "Enter") {
//         saveScore();
//     }

//     submit.onclick = saveScore;
// }





