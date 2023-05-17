//Button
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var restartButton = document.getElementById('restart-btn');
var validerButton = document.getElementById('valider-btn');

// var displayContainer = document.getElementB
// Question, answer, score

var questionContainerElement = document.getElementById('question-container');
var shuffleQuestions, scoreCount;
var questionElement = document.getElementById('question');
var numbreOfQuestion = document.getElementById('numbreOfQuestion');
var scoreCurrent = document.getElementById('score');
var progresseBar = document.getElementById('myBar');
var phraseElement = document.getElementById('phrase');
var answerButtonsElement = document.getElementById('reponses-buttons');
var gameOver = document.getElementById('game-over');
var annonce = document.createElement('p');
var nombreEssai = 3;
var inputs = document.getElementsByTagName('input');
var label = document.getElementsByTagName('label');
var checkValue;
var currentQuestionIndex = 1;
var tableBody = document.getElementById('tableBody');
var myTable = document.getElementById('myTable');

// Timer
var timer = document.getElementById("timer");
let [seconds, minutes] = [0,0];
let timerId;
var timeOutMinutes = 10;

//START GAME
startButton.addEventListener('click',startGame);
startButton.addEventListener('click',start);

//Restart Button 
restartButton.addEventListener("click", () => {
  startGame();
})

//Start a timer
startButton.addEventListener('click',function() {
    timerId = setInterval(stopWatch,1000);
});

// Next Button
nextButton.addEventListener('click', () => {
  resetState()
  currentQuestionIndex++
  setNextQuestion()
})


function startGame() {

    // console.log(currentQuestionIndex);
    
    // cacher le button Start
    startButton.classList.add('hide');

    // Mélanger des questions
    shuffleQuestions = questions.sort(() => Math.random() -.5);
    //
    // currentQuestionIndex = 1;
    scoreCount = 0;

    //Faire apparaître question et des réponses
    questionContainerElement.classList.remove('hide');
    setNextQuestion();    

}

function setNextQuestion() {
  // ret.innerHTML = "00:00:00";
  counter = 0; 
  nombreEssai = 3;
  annonce.innerHTML = "";

  nextButton.addEventListener('click',start);


    if(currentQuestionIndex >= shuffleQuestions.length) { 
      // showScore() ;      
      restartQuiz();
    } else {
      showQuestionAndPhrase(shuffleQuestions[currentQuestionIndex]);
    }
}

function showQuestionAndPhrase(question) {
    
  numbreOfQuestion.innerHTML = "Question " + currentQuestionIndex + "/" + shuffleQuestions.length;

  // // Question
  var text =  question.question;
  displayText(text,questionElement)

  //Phrase
  var phrase = question.phrase;
  displayText(phrase,phraseElement)

  question.reponses.forEach(reponse => {

    var reponseText = reponse.texte;
    var reponseCorrect = reponse.correct;

    var input = document.createElement('input');
    var label = document.createElement('label');
    input.setAttribute("type", "radio"); 
    input.setAttribute("name", "answer"); 
    input.setAttribute("value", reponseCorrect); 

    // input.classList.add('btn');
    label.innerHTML = reponseText;

    validerButton.addEventListener('click',checkAnwers);

    answerButtonsElement.appendChild(input)
    answerButtonsElement.appendChild(label)
    validerButton.classList.remove('hide');


    });

}

function checkAnwers() {
        
  for (i = 0; i < inputs.length; i++) {
    if(inputs[i].checked){
      checkValue = inputs[i].value;
      if(checkValue === "true") {
        // Augumenter le score
        scoreCount++;
        // Présenter la progression avec le Bar.
        progresseBar.style.width = (scoreCount/shuffleQuestions.length)*100 + "%"; 
        // Ajouter la coleur correct
        label[i].style.backgroundColor = "#83c25f";
        // Annoncer Bravo
        annonce.innerHTML = "Bravo!";
        questionContainerElement.appendChild(annonce);
        // Faire disparaître le button valider
        validerButton.classList.add('hide');
        // Faire appaître le button Next
        nextButton.classList.remove('hide');
        // Stop compter le temps que le joueur a joué pour chaque question
        validerButton.onclick = stop();
        }
      else {
        label[i].style.backgroundColor = "red";
        numbreAttemp();
      }
  }
    }

}

function showScore() {
  resetState();
  if(scoreCount < shuffleQuestions.length/3) {
    questionContainerElement.innerText = "Vous êtes au niveau débutant, " + "vous avez obtenu "+ scoreCount +" sur " + shuffleQuestions.length + " questions.";
  } else if (scoreCount < shuffleQuestions.length/2) {
    questionContainerElement.innerText = "Vous êtes au niveau intermédiaire, il faut encore travailler! " + "vous avez obtenu "+ scoreCount +" sur " + shuffleQuestions.length + " questions.";
  } else if(scoreCount === shuffleQuestions.length){
    questionContainerElement.innerText = "Bravo! " + "Vous avez obtenu "+ scoreCount +" sur " + shuffleQuestions.length + " questions.";
  } else {
    questionContainerElement.innerText = "Vous êtes au niveau avancé! " + "vous avez obtenu "+ scoreCount +" sur " + shuffleQuestions.length + " questions.";
  } 
}

function restartQuiz() {
  if(currentQuestionIndex >= shuffleQuestions.length) { 
    showScore();

    currentQuestionIndex = 0;
    scoreCount = 0;

    restartButton.classList.remove('hide');

    restartButton.addEventListener("click", () => {
    startGame();
  });

  }
}

function resetState() {
  nextButton.classList.add('hide');
  while(answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
    (answerButtonsElement.firstChild)
  }
}

function displayText(str,element) {
  var displayQuestion = replaceCharactere("**","<span class='KeyWord'> "," </span> ",str)
  element.innerHTML = displayQuestion;
}

function replaceCharactere(to_replace,firstReplacement,lastReplacement,str) {
  var required_string;

  var keyWord = str.substring(str.indexOf('*')+2,str.lastIndexOf("*")-1);
  var etoile = str.substring(str.indexOf('**'),str.lastIndexOf("*")+2);
  var string_after_spliting = etoile.split(to_replace);

  for (let i = 0; i < string_after_spliting.length; i++) {
    if(i === 0) {
      required_string = firstReplacement + keyWord+lastReplacement;
      var finir = str.replace(etoile,required_string)
      return finir;
    }
  }
}

function stopWatch() {
  seconds--;
  if(seconds === -1) {
    minutes = timeOutMinutes - 1;
    seconds = 59;
    timeOutMinutes = minutes;
  } 
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  timer.innerHTML = m + ":" + s; 

  if (m <= 0) {
    questionContainerElement.classList.add('hide');
    gameOver.classList.remove('hide');
    restartButton.classList.remove('hide');
  }

}

// COMPTER DE TEMPS
// var ret = document.getElementById("timer2");
var counter = 0;
var interval;
var endTime; 
var arrayTimeQuestionAttemp = [];
var listTimeQuestionAttemp = [];

function stop() {

  listTimeQuestionAttemp = [];

  endTime = convertSec(counter++);

  listTimeQuestionAttemp.push(currentQuestionIndex);
  listTimeQuestionAttemp.push(endTime);
  listTimeQuestionAttemp.push(nombreEssai);

  arrayTimeQuestionAttemp.push(listTimeQuestionAttemp);

  creatTable(arrayTimeQuestionAttemp,listTimeQuestionAttemp);

  clearInterval(interval);
  startButton.disabled = false;
}

function creatTable(array, list) {

  myTable.classList.remove("hide");

  for (var i = 0; i < array.length; i++) {

    var tr = document.createElement('TR');
    // tr.classList.add('grid-container')


    for (var j = 0; j < list.length; j++) {

      var td = document.createElement('TD');
      td.classList.add('grid-item')
      td.appendChild(document.createTextNode(array[i][j]));
      tr.appendChild(td);

    }
  }

  tableBody.appendChild(tr);

}


function convertSec(cnt) {
  let sec = cnt % 60;
  let min = Math.floor(cnt / 60);
  if (sec < 10) {
    if (min < 10) {
      return "0" + min + ":0" + sec;
    } else {
      return min + ":0" + sec;
    }
  } else if ((min < 10) && (sec >= 10)) {
    return "0" + min + ":" + sec;
  } else {
    return min + ":" + sec;
  }
}

function start() {
  startButton.disabled = true;
  interval = setInterval(function() {
    // ret.innerHTML = "Pour la question " + currentQuestionIndex + ", le temps que vous avez passé est " + convertSec(counter++) + "Vous avez essayé " + nombreEssai; // timer start counting here...
    convertSec(counter++);
  }, 1000);
}


 
function numbreAttemp() {

    nombreEssai -= 1;
    
    if(nombreEssai > 0) {
      annonce.innerHTML = "Vous avez encore " + nombreEssai +" essais !";
      questionContainerElement.appendChild(annonce);

    } else {

    // désactivité des buttons
    
    for (var input of inputs) {
      input.disabled = true; 
    }
    
      annonce.innerHTML = "Désolé(e)! Vous duvez passer à d'autre question!";
      validerButton.onclick = stop();
      validerButton.classList.add('hide');
      nextButton.classList.remove('hide');

    }

}


var questions = [{
    question: "Donner la partie du discours du mot **garantir** dans la phrase:",
    phrase: "Pour **garantir** une concurrence loyale , il convient que ces mesures soient prises au niveau international . ",
   reponses: [{
      texte: "ADV_Int",
      correct: false
    }, {
      texte: "ADV",
      correct: false
    }, {
      texte: "ADJ_Excl/Int",
      correct: false
    }, {
      texte: "V_Inf",
      correct:true
    }, {
      texte: "ADJ",
      correct: false
    }, {
      texte: "Conj_de_Coord",
      correct: false
    }]
  }, {
    question: "Donner la partie du discours du mot **loyale** dans la phrase:",
    phrase: "Pour garantir une concurrence **loyale** , il convient que ces mesures soient prises au niveau international . ",
   reponses: [{
      texte: "DET",
      correct: false
    }, {
      texte: "PRO_Int",
      correct: false
    }, {
      texte: "ADJ",
      correct:true
    }, {
      texte: "V_Part_Pr\u00e9s",
      correct: false
    }, {
      texte: "NC",
      correct: false
    }, {
      texte: "DET_Int",
      correct: false
    }]
  }, {
    question: "Donner la partie du discours du mot **il** dans la phrase:",
    phrase: "Pour garantir une concurrence loyale , **il** convient que ces mesures soient prises au niveau international . ",
   reponses: [{
      texte: "PRO_Suj",
      correct:true
    }, {
      texte: "DET_Int",
      correct: false
    }, {
      texte: "PRO_Rel",
      correct: false
    }, {
      texte: "V_Subj",
      correct: false
    }, {
      texte: "V_Imp",
      correct: false
    }, {
      texte: "PRO_Obj",
      correct: false
    }]
  }, {
    question: "Donner la partie du discours du mot **convient** dans la phrase:",
    phrase: "Pour garantir une concurrence loyale , il **convient** que ces mesures soient prises au niveau international . ",
   reponses: [{
      texte: "Conj_de_Sub",
      correct: false
    }, {
      texte: "V",
      correct:true
    }, {
      texte: "PRO_Int",
      correct: false
    }, {
      texte: "Mot_\u00e9tranger",
      correct: false
    }, {
      texte: "Conj_de_Coord",
      correct: false
    }, {
      texte: "DET",
      correct: false
    }]
  }, {
    question: "Donner la partie du discours du mot **que** dans la phrase:",
    phrase: "Pour garantir une concurrence loyale , il convient **que** ces mesures soient prises au niveau international . ",
   reponses: [{
      texte: "PREP_+_DET",
      correct: false
    }, {
      texte: "Conj_de_Sub",
      correct:true
    }, {
      texte: "Interj",
      correct: false
    }, {
      texte: "PRO_Obj",
      correct: false
    }, {
      texte: "ADV",
      correct: false
    }, {
      texte: "Conj_de_Coord",
      correct: false
    }]
  }, {
    question: "Donner la partie du discours du mot **prises** dans la phrase:",
    phrase: "Pour garantir une concurrence loyale , il convient que ces mesures soient **prises** au niveau international . ",
   reponses: [{
      texte: "Interj",
      correct: false
    }, {
      texte: "Pr\u00e9f",
      correct: false
    }, {
      texte: "ADV_Int",
      correct: false
    }, {
      texte: "PREP_+_DET",
      correct: false
    }, {
      texte: "DET_Int",
      correct: false
    }, {
      texte: "V_Part_Pass\u00e9",
      correct:true
    }]
  }, {
    question: "Donner la partie du discours du mot **au** dans la phrase:",
    phrase: "Pour garantir une concurrence loyale , il convient que ces mesures soient prises **au** niveau international . ",
   reponses: [{
      texte: "V_Imp",
      correct: false
    }, {
      texte: "V_Inf",
      correct: false
    }, {
      texte: "ADV",
      correct: false
    }, {
      texte: "PREP_+_DET",
      correct:true
    }, {
      texte: "Conj_de_Sub",
      correct: false
    }, {
      texte: "Conj_de_Coord",
      correct: false
    }]
  }, {
    question: "Donner la partie du discours du mot **international** dans la phrase:",
    phrase: "Pour garantir une concurrence loyale , il convient que ces mesures soient prises au niveau **international** . ",
   reponses: [{
      texte: "ADJ",
      correct:true
    }, {
      texte: "ADV",
      correct: false
    }, {
      texte: "V_Subj",
      correct: false
    }, {
      texte: "DET_Int",
      correct: false
    }, {
      texte: "PRO_R\u00e9fl",
      correct: false
    }, {
      texte: "ADJ_Excl/Int",
      correct: false
    }]
  }, {
    question: "Donner la partie du discours du mot **qui** dans la phrase:",
    phrase: "La proposition de r\u00e9solution , **qui** insiste , entre autres , pour que le niveau des nuisances acoustiques \u00e0 proximit\u00e9 des divers a\u00e9roports soit divulgu\u00e9 , constitue un pas en avant dans la bonne direction . ",
   reponses: [{
      texte: "PRO_Rel",
      correct:true
    }, {
      texte: "PRO",
      correct: false
    }, {
      texte: "PRO_R\u00e9fl",
      correct: false
    }, {
      texte: "V_Imp",
      correct: false
    }, {
      texte: "Interj",
      correct: false
    }, {
      texte: "PREP",
      correct: false
    }]
  }, {
    question: "Donner la partie du discours du mot **insiste** dans la phrase:",
    phrase: "La proposition de r\u00e9solution , qui **insiste** , entre autres , pour que le niveau des nuisances acoustiques \u00e0 proximit\u00e9 des divers a\u00e9roports soit divulgu\u00e9 , constitue un pas en avant dans la bonne direction . ",
   reponses: [{
      texte: "ADV_Int",
      correct: false
    }, {
      texte: "PRO_Rel",
      correct: false
    }, {
      texte: "V_Part_Pass\u00e9",
      correct: false
    }, {
      texte: "V",
      correct:true
    }, {
      texte: "PREP",
      correct: false
    }, {
      texte: "PRO_R\u00e9fl",
      correct: false
    }]
  }, {
    question: "Donner la partie du discours du mot **autres** dans la phrase:",
    phrase: "La proposition de r\u00e9solution , qui insiste , entre **autres** , pour que le niveau des nuisances acoustiques \u00e0 proximit\u00e9 des divers a\u00e9roports soit divulgu\u00e9 , constitue un pas en avant dans la bonne direction . ",
   reponses: [{
      texte: "PRO",
      correct:true
    }, {
      texte: "V_Imp",
      correct: false
    }, {
      texte: "Mot_\u00e9tranger",
      correct: false
    }, {
      texte: "Pr\u00e9f",
      correct: false
    }, {
      texte: "Conj_de_Sub",
      correct: false
    }, {
      texte: "DET_Int",
      correct: false
    }]
  }, {
    question: "Donner la partie du discours du mot **que** dans la phrase:",
    phrase: "La proposition de r\u00e9solution , qui insiste , entre autres , pour **que** le niveau des nuisances acoustiques \u00e0 proximit\u00e9 des divers a\u00e9roports soit divulgu\u00e9 , constitue un pas en avant dans la bonne direction . ",
   reponses: [{
      texte: "PRO_Rel",
      correct: false
    }, {
      texte: "V_Part_Pr\u00e9s",
      correct: false
    }, {
      texte: "NPr",
      correct: false
    }, {
      texte: "DET_Int",
      correct: false
    }, {
      texte: "ADJ_Excl/Int",
      correct: false
    }, {
      texte: "Conj_de_Sub",
      correct:true
    }]
  }, {
    question: "Donner la partie du discours du mot **des** dans la phrase:",
    phrase: "La proposition de r\u00e9solution , qui insiste , entre autres , pour que le niveau **des** nuisances acoustiques \u00e0 proximit\u00e9 des divers a\u00e9roports soit divulgu\u00e9 , constitue un pas en avant dans la bonne direction . ",
   reponses: [{
      texte: "ADJ_Excl/Int",
      correct: false
    }, {
      texte: "V_Subj",
      correct: false
    }, {
      texte: "PREP_+_DET",
      correct:true
    }, {
      texte: "PRO_Obj",
      correct: false
    }, {
      texte: "PRO_Int",
      correct: false
    }, {
      texte: "V_Part_Pass\u00e9",
      correct: false
    }]
  }, {
    question: "Donner la partie du discours du mot **acoustiques** dans la phrase:",
    phrase: "La proposition de r\u00e9solution , qui insiste , entre autres , pour que le niveau des nuisances **acoustiques** \u00e0 proximit\u00e9 des divers a\u00e9roports soit divulgu\u00e9 , constitue un pas en avant dans la bonne direction . ",
   reponses: [{
      texte: "Mot_\u00e9tranger",
      correct: false
    }, {
      texte: "ADJ",
      correct:true
    }, {
      texte: "PRO_Suj",
      correct: false
    }, {
      texte: "V_Imp",
      correct: false
    }, {
      texte: "V_Part_Pass\u00e9",
      correct: false
    }, {
      texte: "PRO_Obj",
      correct: false
    }]
  }, {
    question: "Donner la partie du discours du mot **des** dans la phrase:",
    phrase: "La proposition de r\u00e9solution , qui insiste , entre autres , pour que le niveau des nuisances acoustiques \u00e0 proximit\u00e9 **des** divers a\u00e9roports soit divulgu\u00e9 , constitue un pas en avant dans la bonne direction . ",
   reponses: [{
      texte: "DET_Int",
      correct: false
    }, {
      texte: "V",
      correct: false
    }, {
      texte: "PRO_R\u00e9fl",
      correct: false
    }, {
      texte: "Conj_de_Coord",
      correct: false
    }, {
      texte: "ADJ_Excl/Int",
      correct: false
    }, {
      texte: "PREP_+_DET",
      correct:true
    }]
  }]


