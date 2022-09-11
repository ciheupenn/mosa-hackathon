console.log('javascript connected')



const questions = [
    {
      "question": "Which of these MCIT core classes did you like the most (or are the most excited about)?",
      "answer1": "CIT 5910 Intro to Software Development",
      "answer1Total": ['frontend', 'backend', 'security'],
      "answer2": "CIT 5920 Mathematical Foundations of Computer Science",
      "answer2Total": ['data', 'machine', 'backend'],    
    },
    {
        "question": "Which of these MCIT core classes did you like the most (or are the most excited about)?",
        "answer1": "CIT 5930 Introduction to Computer Systems",
        "answer1Total": ['security', 'embedded', 'backend'],
        "answer2": "CIT 5940 Data Structures & Software Design",
        "answer2Total": ['backend, frontend'],    
      },
      {
        "question": "Which of these MCIT core classes did you like the most (or are the most excited about)?",
        "answer1": "CIT 5950 Computer Systems Programming",
        "answer1Total": ['security', 'embedded', 'qa'],
        "answer2": "CIT 5960 Algorithms & Computation",
        "answer2Total": ['backend', 'machine', 'data'],    
      },

]

let scoreTracker = {
    frontend: 0,
    backend: 0,
    data: 0,
    qa: 0,
    machine: 0,
    embedded:0,
    security: 0
}



let currentQuestion = 0;
let score = [];

const totalQuestions = questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');

const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    
    console.log(option1Total)
    console.log(option2Total)

    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }

    // Get the array of possible roles from the radio button
    let answersStr = selectedOption.nextElementSibling.getAttribute('data-total')
    console.log('answersStr!!!', answersStr, typeof answersStr)
    let newArr = answersStr.split(',')
    console.log('newArr', newArr)

    // based on the roles in the array, update the matching roles in the scoreTracker object

    console.log(scoreTracker)
    
    for (let i = 0; i < newArr.length; i++) {                
        if (scoreTracker[newArr[i]] !== undefined) {
            scoreTracker[newArr[i]]++
        }
    }
    
    console.log(scoreTracker)



    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        console.log('final score loading')
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your score: ${5+6}</h1>
         <div class="summary">
            <h1>Summary</h1>
            <p>Possible - Personality Traits, see below for a summary based on your results:</p>
            <p>15 - 21- You Need Help</p>
            <p>10 - 15 - Good Soul</p>
            <p>5 - 10 - Meh </p>
            <p>5 - Are You Even Real</p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);