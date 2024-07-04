//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 15;
let countdown;

//Questions and Options array

const quizArray = [
    {
      id: "0",
      question: "Qual foi o nome dado à primeira imagem real de um buraco negro capturada por cientistas em 2019?",
      options: ["Sagittarius A*", "M87*", "Centaurus A*", "Cygnus X-1*"],
      correct: "M87*",
    },
    {
      id: "1",
      question: "Em 2024, cientistas anunciaram a criação de um novo material promissor para armazenamento de energia, que pode revolucionar as baterias de dispositivos eletrônicos. Qual é o nome desse material?",
      options: ["Graphene", "Lithium-Sulfur", "Sodium-ion", "Solid-state electrolyte"],
      correct: "Lithium-Sulfur",
    },
    {
      id: "2",
      question: "Qual foi a descoberta científica de 2021 que revelou a existência de um novo tipo de matéria chamado 'fluido de elétrons'?",
      options: ["Supercondutividade a alta temperatura", "Efeito Hall quântico", "Ferromagnetismo de spins quânticos", "Suprafluidez de elétrons"],
      correct: "Suprafluidez de elétrons",
    },
    {
      id: "3",
      question: "Em 2022, cientistas anunciaram a criação de um novo tipo de material ultraleve e resistente chamado aerogel, que pode ser usado em diversas aplicações. Qual é a principal característica desse material?",
      options: ["É transparente e supercondutor", "É composto por grafeno e silício", "É feito de ar e gel", "É um superisolante térmico"],
      correct: "É feito de ar e gel",
    },
    {
      id: "4",
      question: "Em 2023, cientistas anunciaram a descoberta de um exoplaneta potencialmente habitável orbitando uma estrela parecida com o Sol. Qual é o nome dado a esse exoplaneta?",
      options: ["Kepler-452b", "Proxima Centauri b", "TOI-700d", "LHS 1140b"],
      correct: "Kepler-452b",
    },
  ];
  

//Restart Quiz
restart.addEventListener("click", () => {
    initial(); // Reinicia o quiz
    scoreContainer.classList.add("hide"); // Esconde o contêiner de pontuação
    startScreen.classList.remove("hide"); // Mostra a tela inicial
  });
  

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 15;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 15;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};