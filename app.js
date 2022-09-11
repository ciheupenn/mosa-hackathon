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


      {
        "question": "Which of these MCIT electives did you enjoy the most (or are the most excited about?",
        "answer1": "CIS 5470 Software Analysis",
        "answer1Total": ['security', 'qa'],
        "answer2": "CIS 5500 Database & Information Systems",
        "answer2Total": ['backend', 'frontend'],    
      },
      {
        "question": "Which of these MCIT electives did you enjoy the most (or are the most excited about?",
        "answer1": "CIS 5510 Computer & Network Security",
        "answer1Total": ['security', 'qa'],
        "answer2": "CIS 5530 Networked Systems",
        "answer2Total": ['backend', 'embedded'],    
      },

      {
        "question": "Which of these MCIT electives did you enjoy the most (or are the most excited about?",
        "answer1": "CIS 5550 Internet & Web Systems",
        "answer1Total": ['embedded', 'backend'],
        "answer2": "CIS 5150 Fundamentals of Linear Algebra & Optimization: Math for Machine Learning",
        "answer2Total": ['machine', 'data'],    
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
        console.log(scoreTracker)

        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your score: ${'test'}</h1>
         <h1>frontend score: ${scoreTracker['frontend']}</h1>
         <h1>backend score: ${scoreTracker['backend']}</h1>
         <h1>data score: ${scoreTracker['data']}</h1>
         <h1>qa score: ${scoreTracker['qa']}</h1>
         <h1>machine score: ${scoreTracker['machine']}</h1>
         <h1>embedded score: ${scoreTracker['embedded']}</h1>
         <h1>security score: ${scoreTracker['security']}</h1>
         
         
         
         <div class="summary">
      
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