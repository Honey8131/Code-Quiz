document.addEventListener('DOMContentLoaded', function () {

  let answer = document.getElementById("answer");
  if (!answer) {
    console.error("Answer element not found in HTML document");
    return;
  }

  // Set answer text content
  answer.textContent = "Correct!";

  //Timer 
  const timeElement = document.getElementById("time");

  function startTimer(duration, callback) {
    let timeLeft = duration;

    const intervalId = setInterval(() => {
      timeLeft--;
      timeElement.textContent = timeLeft;

      if (timeLeft === 0) {
        clearInterval(intervalId);
        callback();
      }
    }, 1000);
  }

  startTimer(60, function () {

  });

  var timeLimit = 60;
  var timeLeftSpan = document.getElementById("time-left");
  var timer = setInterval(function () {
    timeLeftSpan.textContent = timeLimit--;

    if (timeLimit < 0) {
      clearInterval(timer);
      timeLeftSpan.textContent = "Time's Up!"
    }
  }, 1000);

  //Quiz Questions
  const quizQuestions = [
    {
      question: "What does the typeof operator do?",
      choices: [
        "It returns the data type of a variable.",
        "It returns the length of a string.",
        "It returns the index of an element in an array.",
        "It returns the first character of a string."
      ],

      correctAnswer: 0
    },
    {
      question: "What is the result of the following expression: 5 + '3'?",
      choices: [
        "'53'",
        "8",
        "'8'",
        "53"
      ],

      correctAnswer: 0
    },
    {
      question: "Which of the following is not a JavaScript data type?",
      choices: [
        "Boolean",
        "String",
        "Number",
        "Float"
      ],

      correctAnswer: 3
    },
    {
      question: "What is the correct way to call a function in JavaScript?",
      choices: [
        "functionName();",
        "call functionName();",
        "functionName{};",
        "functionName();{}"
      ],

      correctAnswer: 0
    }
  ];

  //Global variables for tracking quiz progress
  let questionNumber = 0;
  let score = 0;
  let timeLeft = 60;

  function displayQuestion() {
    //get reference to HTML elements
    const questionText = document.getElementById("question-text");
    if (!questionText) {
      console.error('Question element not found');
      return;
    }
    questionText.textContent = quizQuestions[questionNumber].question;

    const choiceList = document.getElementById("choice-list");

    // Update HTML with current questions and choices
    choiceList.innerHTML = "";

    for (let i = 0; i < quizQuestions[questionNumber].choices.length; i++) {
      const choice = quizQuestions[questionNumber].choices[i];
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("name", "answer");
      input.setAttribute("value", i);
      li.appendChild(input);
      li.appendChild(document.createTextNode(choice));
      choiceList.appendChild(li);
    }

    if (questionNumber >= quizQuestions.length) {
      console.error("Invalid question number or missing choices array");
    }
  }

  //Function to check user's answer and update score
  function checkAnswer() {
    const userAnswer = document.querySelector("input[name=answer]:checked");
    if (userAnswer === null) {
      return; //user didn't select an answer
    }
    const userAnswerIndex = parseInt(userAnswer.value);
    if (userAnswerIndex === quizQuestions[questionNumber].correctAnswer) {
      score++;
    }
  }

  //function to move to the next question or the end of the quiz
  function nextQuestion() {
    checkAnswer();
    questionNumber++;
    if (questionNumber === quizQuestions.length) {
      const submitButton = document.getElementById("submit-button");
      submitButton.style.display = "block";
      endQuiz();
    } else {
      displayQuestion();
    }
  }

  // Submit quiz when submit button is clicked
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", endQuiz);

  function endQuiz() {
    clearInterval(timer); //stop the timer
    checkAnswer(); //Check the last answer
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "<h1>Quiz complete, great work!</h1>" + "<p>You scored " + score + "out of " + quizQuestions.length + ".</p>";
    const submitButton = document.getElementById("submit-button");
    submitButton.style.display = "none";
  }

  displayQuestion();
});