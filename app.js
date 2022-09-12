console.log('javascript connected')


const questions = [
  {
    "question": "Which of these MCIT core classes did you like the most (or are the most excited about taking)?",
    "answer1": "CIT 5910 Intro to Software Development",
    "answer1Total": ['frontend', 'backend', 'security'],
    "answer2": "CIT 5920 Mathematical Foundations of Computer Science",
    "answer2Total": ['data', 'machine', 'backend'],
  },
  {
    "question": "Which of these MCIT core classes did you like the most (or are the most excited about taking)?",
    "answer1": "CIT 5930 Introduction to Computer Systems",
    "answer1Total": ['security', 'embedded', 'backend'],
    "answer2": "CIT 5940 Data Structures & Software Design",
    "answer2Total": ['backend, frontend'],
  },
  {
    "question": "Which of these MCIT core classes did you like the most (or are the most excited about taking)?",
    "answer1": "CIT 5950 Computer Systems Programming",
    "answer1Total": ['security', 'embedded', 'qa'],
    "answer2": "CIT 5960 Algorithms & Computation",
    "answer2Total": ['backend', 'machine', 'data'],
  },
  {
    "question": "Which of these MCIT electives did you enjoy the most (or are the most excited about taking)?",
    "answer1": "CIS 5470 Software Analysis",
    "answer1Total": ['security', 'qa'],
    "answer2": "CIS 5500 Database & Information Systems",
    "answer2Total": ['backend', 'frontend'],
  },
  {
    "question": "Which of these MCIT electives did you enjoy the most (or are the most excited about taking)?",
    "answer1": "CIS 5510 Computer & Network Security",
    "answer1Total": ['security', 'qa'],
    "answer2": "CIS 5530 Networked Systems",
    "answer2Total": ['backend', 'embedded'],
  },
  {
    "question": "Which of these MCIT electives did you enjoy the most (or are the most excited about taking)?",
    "answer1": "CIS 5550 Internet & Web Systems",
    "answer1Total": ['embedded', 'backend'],
    "answer2": "CIS 5150 Fundamentals of Linear Algebra & Optimization: Math for Machine Learning",
    "answer2Total": ['machine', 'data'],
  },
  {
    "question": "I’m interested in robots and hardware.",
    "answer1": "Disagree",
    "answer1Total": ['frontend', 'backend'],
    "answer2": "Agree",
    "answer2Total": ['embedded', 'machine', 'data', 'security'],
  },
  {
    "question": "I’m ok with there not being a solid structure or “right answer” when solving a problem.",
    "answer1": "Disagree",
    "answer1Total": ['security', 'backend', 'qa', 'machine', 'embedded'],
    "answer2": "Agree",
    "answer2Total": ['frontend', 'data'],
  },
  {
    "question": "I have an eye for how things should look and should be laid out from a user perspective.",
    "answer1": "Disagree",
    "answer1Total": ['backend'],
    "answer2": "Agree",
    "answer2Total": ['frontend'],
  },
  {
    "question": "I really like writing test scripts and testing different parts of an application to see how it works.",
    "answer1": "Disagree",
    "answer1Total": ['frontend', 'machine'],
    "answer2": "Agree",
    "answer2Total": ['backend', 'qa', 'security'],
  },
  {
    "question": "I like learning about new technologies and having a tech stack that constantly changes.",
    "answer1": "Disagree",
    "answer1Total": ['backend', 'qa', 'security', 'embedded'],
    "answer2": "Agree",
    "answer2Total": ['frontend', 'data', 'machine'],
  },
  {
    "question": "I like working with datasets and statistics to make recommendations and business insights.",
    "answer1": "Disagree",
    "answer1Total": ['frontend', 'qa', 'security', 'embedded'],
    "answer2": "Agree",
    "answer2Total": ['data', 'machine'],
  },
  {
    "question": "It’s very important for me to have clarity and a detailed, structure approach when solving problems.",
    "answer1": "Disagree",
    "answer1Total": ['frontend', 'data', 'machine'],
    "answer2": "Agree",
    "answer2Total": ['qa', 'security'],
  },
  {
    "question": "I like pineapple on pizza.",
    "answer1": "Disagree",
    "answer1Total": ['backend', 'data', 'qa', 'embedded', 'security'],
    "answer2": "Agree",
    "answer2Total": ['frontend', 'machine'],
  },
  {
    "question": "I could see myself pursuing academia in computer science and exploring more niche topics.",
    "answer1": "Disagree",
    "answer1Total": ['frontend', 'qa', 'security', 'embedded'],
    "answer2": "Agree",
    "answer2Total": ['backend', 'machine'],
  },
  {
    "question": "I’m ok with my work resulting in recommendations for the business/leadership to consider, rather than working directly on a product or tool.",
    "answer1": "Disagree",
    "answer1Total": ['backend', 'frontend', 'qa', 'embedded', 'security'],
    "answer2": "Agree",
    "answer2Total": ['machine', 'data'],
  },
]

// track the points based on the quiz taker's answers
let scoreTracker = {
  frontend: 0,
  backend: 0,
  data: 0,
  qa: 0,
  machine: 0,
  embedded: 0,
  security: 0
}

// maximum number of points that each category can gain
let scoreMax = {
  frontend: 13.0,
  backend: 16.0,
  data: 10.0,
  qa: 11.0,
  machine: 12.0,
  embedded: 11.0,
  security: 14.0
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
function generateQuestions(index) {
  //Select each question by passing it a particular index
  const question = questions[index];
  const option1Total = questions[index].answer1Total;
  const option2Total = questions[index].answer2Total;

  //Populate html elements 
  questionEl.innerHTML = `${index + 1}. ${question.question}`
  option1.setAttribute('data-total', `${option1Total}`);
  option2.setAttribute('data-total', `${option2Total}`);

  option1.innerHTML = `${question.answer1}`
  option2.innerHTML = `${question.answer2}`
}


function loadNextQuestion() {
  const selectedOption = document.querySelector('input[type="radio"]:checked');
  //Check if there is a radio input checked
  if (!selectedOption) {
    alert('Please select your answer!');
    return;
  }

  // Get the array of possible roles from the radio button
  let answersStr = selectedOption.nextElementSibling.getAttribute('data-total')
  score.push(answersStr)

  let newArr = answersStr.split(',')

  // based on the roles in the array, update the matching roles in the scoreTracker object
  for (let i = 0; i < newArr.length; i++) {
    if (scoreTracker[newArr[i]] !== undefined) {
      scoreTracker[newArr[i]]++
    }
  }

  //Finally we increment the current question number ( to be used as the index for each array)
  currentQuestion++;

  //once finished clear checked
  selectedOption.checked = false;

  //If quiz is on the final question
  if (currentQuestion == totalQuestions - 1) {
    nextButton.textContent = 'Finish';
  }

  //If the quiz is finished then we hide the questions container and show the results 
  if (currentQuestion == totalQuestions) {
    console.log('final score loading')
    console.log(scoreTracker)

    // find which category is selected the most proportional to its total possible points
    let maxScoreProportional = -1;
    let maxRole = ''

    for (let item in scoreTracker) {
      let scoreProportional = scoreTracker[item] / scoreMax[item]
      console.log(item, scoreProportional)
      if (scoreProportional > maxScoreProportional) {
        maxScoreProportional = scoreProportional
        maxRole = item
      }

      // when there is a tie, randomly pick one category
      if (scoreProportional == maxScoreProportional) {
        if (Math.random() > 0.49) {
          maxScoreProportional = scoreProportional
          maxRole = item
        }
      }
    }

    console.log('maxScoreProportional:', maxScoreProportional)
    console.log('maxRole:', maxRole)

    let format = {
      frontend: ["Front-end Software Engineer", 'You are creative and like UI and design, and like ever-changing tech stacks and new technology'],
      backend: ["Back-end Software Engineer", ' You like working with APIs and servers, and enjoy building and maintain the mechanisms that process data and perform actions on websites'],
      data: ["Data Scientist", 'You like working with data and models. You enjoy the process of gathering and analyzing data, using various types of analytics and reporting tools to detect patterns, trends and relationships in data sets'],
      qa: ["QA Engineer", 'You like testing and identifying bugs in software product/project.'],
      machine: ["Machine Learning Engineer", 'You like building prediction models and enjoy designing the AI algorithms capable of learning and making predictions that define machine learning'],
      embedded: ["Embedded Software Engineer", "You like hardware and robots, and have a general idea of the embedded system and its limits."],
      security: ["Security Software Engineer", 'You like testing security and protecting computer networks from cyberattacks and unauthorized access.']
    }
    console.log('format', format)
    console.log(format[maxRole])

    container.style.display = 'none';
    result.innerHTML =
      `
        <div class="outcome">Your best fit software engineering role is: ${format[maxRole][0]}!</div>
         
         <div class="summary">${format[maxRole][1]}</div>

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
  //Deduct applicable points from score tracker and remove last array value
  let answersStr = score.pop()
  let answersList = answersStr.split(',')
  for (let i = 0; i < answersList.length; i++) {
    if (scoreTracker[answersList[i]] !== undefined) {
      scoreTracker[answersList[i]]--
    }
  }
  //Generate the question
  generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
  if (e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
  }
}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click', loadPreviousQuestion);
result.addEventListener('click', restartQuiz);
