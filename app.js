class Challenge{
    constructor(question,correctIndex,...options){
        this.question = question;
        this.correctIndex = correctIndex;
        this.options = [...options];
        // [this.opt1,this.opt2,this.opt3,this.opt4] = options;
    }
}

// let challenge = new Challenge("Is web development fun?",1,"Kinda","YES!!!","Um no","IDK");

let challenges = [
    new Challenge("Is web development fun?",1,"Kinda","YES!!!","Um no","IDK"),
    new Challenge("What is 2 + 2?",0,"4","22"),
    new Challenge("What is 4 * 2?",1,"6","8"),
    new Challenge("What is the capital of France?",2,"Berlin","London","Paris","Madrid")
];

    let index = -1;
    let answered = false;

    const startBtn = document.querySelector('#Start-btn');
    const nextBtn = document.querySelector('#Next-btn');
    const restartBtn = document.querySelector('#Restart-btn');
    const questionDisplay = document.querySelector('#question');
    const answerContainer = document.querySelector('.answer-container');
    
    addEventListeners();




function addEventListeners(){
    startBtn.addEventListener('click',start);
    nextBtn.addEventListener('click',nextChallenge);
    restartBtn.addEventListener('click',restart);
}

function start(){
    
    questionDisplay.classList.remove("hidden");
    answerContainer.classList.remove("hidden");
    showButton(nextBtn);
    challenges = shuffle(challenges);

    nextChallenge();
}

function showError(correctIndex){
    let btns = Array.from(document.querySelectorAll(".answer"));

    const correctBtn = btns.find((btn) => btn.dataset.id == correctIndex);
    const wrongBtns = btns.filter((btn) => btn.dataset != correctIndex);

    correctBtn.classList.add('correct');
    wrongBtns.forEach((btn) => btn.classList.add("wrong"));

    document.body.classList.add("wrong");
}

function showSuccess(correctIndex){
    let btns = Array.from(document.querySelectorAll(".answer"));

    const correctBtn = btns.find((btn) => btn.dataset.id == correctIndex);
    const wrongBtns = btns.filter((btn) => btn.dataset != correctIndex);

    correctBtn.classList.add('correct');
    wrongBtns.forEach((btn) => btn.classList.add("wrong"));

    document.body.classList.add("correct");
}


function validateAnswer(event){

    if(answered){
        alert("Already answered!");
        return;
    }
    answered = true;
    let target = event.target;

    let id = target.dataset.id;

    if(challenges[index].correctIndex == id){
        showSuccess(id);
    }
    else{
        showError(challenges[index].correctIndex);
    }

    if(index == (challenges.length - 1)){
        restartBtn.classList.remove("hidden");
        nextBtn.classList.add("hidden");
    }
}

function addOptionBtnEventListeners(){
    let btns = document.querySelectorAll(".answer");

    btns.forEach((btn) => {
        btn.addEventListener('click',validateAnswer);
    });
}

function resetState(){
    document.body.classList.remove("wrong");
    document.body.classList.remove("correct");
    answered = false;
}

function nextChallenge(){
    index++;
    resetState();
    //Make html elements visible
    questionDisplay.textContent = challenges[index].question;

    const options = challenges[index].options;

   const optionBtns =  options.map((opt,index) => {
        return `<button class="answer" data-id="${index}">${opt}</button>`;
    }).join('');

    answerContainer.innerHTML = optionBtns;
    addOptionBtnEventListeners();
}

function restart(){
    challenges = shuffle(challenges);
    index=-1;
    showButton(nextBtn);
    // restartBtn.classList.add("hidden");
    // nextBtn.classList.remove("hidden");
    document.body.classList.remove("wrong");
    document.body.classList.remove("correct");

    nextChallenge();
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function showButton(button){
    let btns = [startBtn,nextBtn,restartBtn];

    button.classList.remove("hidden");

    btns.forEach((btn) => {
        if(!(btn === button)) btn.classList.add("hidden");
    })
  }






