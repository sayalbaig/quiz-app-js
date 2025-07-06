// Quiz questions array
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: [
      "Charles Dickens",
      "Jane Austen",
      "William Shakespeare",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
  },
];

// DOM elements
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices-list");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

// Start quiz
startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
});

// Show question
function showQuestion() {
  clearChoices();
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  currentQuestion.choices.forEach((choice) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => selectAnswer(choice));
    li.appendChild(button);
    choicesList.appendChild(li);
  });
}

// Clear previous choices
function clearChoices() {
  choicesList.innerHTML = "";
  nextBtn.classList.add("hidden");
}

// Select answer
function selectAnswer(selectedChoice) {
  const correctAnswer = questions[currentQuestionIndex].answer;
  const buttons = choicesList.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.style.backgroundColor = "green";
    } else if (button.textContent === selectedChoice) {
      button.style.backgroundColor = "red";
    }
  });

  if (selectedChoice === correctAnswer) {
    score++;
  }

  nextBtn.classList.remove("hidden");
}

// Next question
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Show result
function showResult() {
  questionContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreText.textContent = `${score} out of ${questions.length}`;
}

// Restart quiz
restartBtn.addEventListener("click", () => {
  resultContainer.classList.add("hidden");
  startBtn.classList.remove("hidden");
});
