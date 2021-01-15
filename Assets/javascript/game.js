const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progresText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const startingMinutes = 2
let time = startingMinutes * 60;

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [

    {
        question: "What is H1 in an html document?",
        choice1: "value",
        choice2: "object",
        choice3: "element",
        answer: 3,

    },
    {
        question: "What does the # represent",
        // options: ["class", "id", "object"],
        choice1: "class",
        choice2: "id",
        choice3: "object",
        answer: 2,
    },
    {
        question: "What does one use to generate a random number?",
        // options: ["number.random", "math.random", "math.guess"],
        choice1: "number.random",
        choice2: "math.random",
        choice3: "math.guess",
        answer: 2,
    },
    {
        question: "What is a jumbotron?",
        // options: ["boostrap-component", "boottraps", "element"],
        choice1: "bootstrap-component",
        choice2: "boottraps",
        choice3: "element",
        answer: 1,
    },
    {
        question: "What is it called when you fix up code to make it more readable?",
        // options: ["debugging", "restructuring", "refactoring"],
        choice1: "debugging",
        choice2: "restructuring",
        choice3: "refactoring",
        answer: 3,
    },
    {
        question: "The design of elements is typically called the?",
        // options: ["style", "script", "mature"],
        choice1: "style",
        choice2: "script",
        choice3: "preface",
        answer: 1,
    }


]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progresText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${questionCounter / MAX_QUESTIONS * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
        

    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

const countdownEL = document.getElementById('time-left');

setInterval(updateCountdown, 1000);

function updateCountdown() {
    if(time <= 0) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEL.innerHTML = `${minutes}: ${seconds}`;
    time--;

  
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
       
        let applyingClass = selectedAnswer == currentQuestion.answer? 'correct' : 'incorrect'

        if (applyingClass === 'correct') {
            incrementScore(SCORE_POINTS)
        } else{
            time = time -15
            
        }
        

        selectedChoice.parentElement.classList.add(applyingClass)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(applyingClass)
            getNewQuestion()

        }, 1000)
    })
})


incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()