const question = document.getElementById('question');
const answer = Array.from(document.getElementsByClassName("answer"));
const resultDiv = document.getElementById("result");
const showTimer = document.getElementById("timer");


var currentQuestion = {};
var openQuiz = false;
var score = 0;
var progressTracker = 0;
var allQuestions = [];
var timer;
var timerCount = 75;

const namesubmit = document.getElementById("namesubmit");
const nameboxInput = document.getElementById("name");
const submit = document.getElementById("submit");

namesubmit.style.display = 'none';


var quizquestions = [
    {
        question: "Commonly used data types DO NOT include...",
        answer: [
            { answer1: "strings"},
            { answr2: "booleans"},
            { answer3: "alerts"},
            { answer4: "numbers"},
        ],
        valid: 2  
    },
    {
        question: "The condition in an if/else statement is enclosed with...",
        answer: [
            { answer1: "quotes"},
            { answer2: "curly brackets"},
            { answer3: "paraenthesis"},
            { answer4: "square brackets"},
        ],
        valid: 2
    },
    {
        question: "Arrays in JavaScript can be used to store...",
        answer: [
            { answer1: "numbers and strings"},
            { answer2: "other arrays"},
            { answer3: "booleans"},
            { answer4: "all of the above"},
        ],
        valid: 4
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables...",
        answer: [
            { answer1: "commas"},
            { answer2: "curly brackets"},
            { answer3: "quotes"},
            { answer4: "parenthesis"},
        ],
        valid: 1
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is...",
        answer: [
            { answer1: "JavaScript"},
            { answer2: "terminal/bash"},
            { answer3: "for loops"},
            { answer4: "console.log"},
        ],
        valid: 1
    }
];

function startGame() {
    progressTracker = 0;
    score = 0;
    allQuestions = [...quizquestions];
    console.log(allQuestions);
    newQuestion();

    timerCount = 75;
    startTimer();
};

function startTimer(seconds) {
    var timer = seconds;

    timeout = setInterval(function() {
        if (timerCount <= 0) {
            clearInterval(timer);
            endQuiz();
        } else {
            showTimer.textContent = `Time: ${timerCount}`;
            timerCount--;
        }
    }, 1000);
};

startGame();

function newQuestion() {
    resultDiv.textContent = '';
    progressTracker++;
    const questionIndex = Math.floor(Math.random() * allQuestions.length);
    currentQuestion = allQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    answer.forEach(function(answerEl, index) {
        const answerText = currentQuestion.answer[index]["answer" + (index +1)];
        answerEl.innerHTML = answerText;
    });
}

function answerClickHandler(index) {
    return function() {
        if (index + 1 === currentQuestion.valid) {
            resultDiv.textContent = 'Correct!';
            score++;
        } else {
            resultDiv.textContent = 'Wrong!';
        }

        answer[index].removeEventListener('click', answerClickHandler(index));
        const questionIndex = Math.floor(Math.random() * allQuestions.length);

        allQuestions.splice(questionIndex, 1);
        if (progressTracker < quizquestions.length) {
            setTimeout(function() {
                newQuestion();
            }, 400); 
        } else {
            question.innerHTML = `All Done! Score: ${score}`;
        }
    };
}


answer.forEach(function(answerEl, index) {
    const answerText = currentQuestion.answer[index]["answer" + (index + 1)];
    answerEl.innerHTML = answerText;

    answerEl.addEventListener('click', answerClickHandler(index));
});

function endQuiz() {
    document.getElementById("quiz").style.display = none;

    namesubmit.style.display= block;

    submit.addEventListener('click', function() {
        const namebox = document.getElementById("namebox").value;

        if (namebox.trim() !== '') {
            localStorage.setItem('namebox', namebox);
            localStorage.setItem('score', score);
            nameboxInput.value = '';
        } else {
            alert("Please enter a name.")
        }
    });
}