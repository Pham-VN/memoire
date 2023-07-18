//Button
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var restartButton = document.getElementById('restart-btn');
var validerButton = document.getElementById('valider-btn');


// var displayContainer = document.getElementB
// Question, answer, score
var modifie_fontCouleur_fontSize = document.getElementById('modifie_fontCouleur_fontSize');
var questionContainerElement = document.getElementById('question-container');
var shuffleQuestions, scoreCount;
var questionElement = document.getElementById('question');
var numbreOfQuestion = document.getElementById('numbreOfQuestion');
var scoreCurrent = document.getElementById('score');
var announceScore = document.getElementById('announceScore');
var progresseBar = document.getElementById('myBar');
var phraseElement = document.getElementById('phrase');
var answerButtonsElement = document.getElementById('reponses-buttons');
// var gameOver = document.getElementById('game-over');
var annonce = document.createElement('p');
var maximumAttemps = 3;
var inputsReponds = document.getElementsByClassName('inputReponses');
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

var quizEnded = false;

//START GAME
startButton.addEventListener('click',startGame);
startButton.addEventListener('click',start);
// startButton.addEventListener("click", function(){
//   modifie_fontCouleur_fontSize.style.display = "block";
// }); 

//Restart Button 
restartButton.addEventListener("click",clearScrrenAndRestartGame);

// Next Button
nextButton.addEventListener('click', () => {
  resetState()
  currentQuestionIndex++
  setNextQuestion()
})


function startGame() {

    timerId = setInterval(stopWatch,1000);

    timer.innerHTML = "10:00"; 

    // console.log(currentQuestionIndex);
    [seconds, minutes] = [0,0];
    timeOutMinutes = 10;

    
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

  counter = 0; 
  annonce.innerHTML = "";
  attempCurrent = 0;

  nextButton.addEventListener('click',start);


    if(currentQuestionIndex >= shuffleQuestions.length) { 
      
      questionContainerElement.classList.add('hide');
      clearInterval(timerId);

      showScore();
    
      restartButton.classList.remove('hide');


    } else {
      showQuestionAndPhrase(shuffleQuestions[currentQuestionIndex]);
    }
}

var reponseCorrect;

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
    reponseCorrect = reponse.correct;

    var input = document.createElement('input');
    var label = document.createElement('label');
    input.setAttribute("type", "radio"); 
    input.setAttribute("name", "answer"); 
    input.setAttribute("class", "inputReponses");
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
        
  for (i = 0; i < inputsReponds.length; i++) {
    if(inputsReponds[i].checked){
      checkValue = inputsReponds[i].value;
      if(checkValue === "true") {
        attempCurrent++;
        // Augumenter le score
        scoreCount++;
        // Présenter la progression avec le Bar.
        progresseBar.style.width = (scoreCount/shuffleQuestions.length)*100 + "%"; 
        progresseBar.classList = "w3-green";
        // Ajouter la coleur correct
        label[i].classList= "correct";
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
        label[i].classList= "incorrect";
        progresseBar.style.width = (scoreCount/shuffleQuestions.length)*100 + "%"; 
        progresseBar.classList = "w3-red";
        numbreAttemp();
      }
  }
    }

}

function showScore() {
  // resetState();
  if(scoreCount < shuffleQuestions.length/3) {
    announceScore.innerText = "Vous êtes au niveau débutant, " + "vous avez eu "+ scoreCount +" sur " + shuffleQuestions.length + " bonnes réponses.";
  } else if (scoreCount < shuffleQuestions.length/2) {
    announceScore.innerText = "Vous êtes au niveau intermédiaire, il faut encore travailler! " + "vous avez eu "+ scoreCount +" sur " + shuffleQuestions.length + " bonnes réponses.";
  } else if(scoreCount === shuffleQuestions.length){
    announceScore.innerText = "Bravo! " + "Vous avez eu "+ scoreCount +" sur " + shuffleQuestions.length + " bonnes réponses.";
  } else {
    announceScore.innerText = "Vous êtes au niveau avancé! " + "vous avez eu "+ scoreCount +" sur " + shuffleQuestions.length + " bonnes réponses.";
  } 
}


// Clear screen before restart game
function clearScrrenAndRestartGame() {
  
    // clear Ecran avant de remttre le jeu
  
    myTable.innerHTML = "";
    questionElement.innerHTML = "";
    phraseElement.innerHTML = "";
    answerButtonsElement.innerHTML = "";
    announceScore.innerHTML = "";

    progresseBar.style.width = "0%";  
  
    validerButton.classList.add('hide');
    restartButton.classList.add('hide');
    

    currentQuestionIndex = 1;
    scoreCount = 0;
  

    // restart game
    startGame();
}


function resetState() {
  nextButton.classList.add('hide');
  while(answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
    (answerButtonsElement.firstChild)
  }
}

// Mettre couleur pour le mot keyWord
function displayText(str,element) {
  var displayQuestion = replaceCharactere("**","<span class='KeyWord'> "," </span> ",str)
  element.innerHTML = displayQuestion;
}

var keyWord;

function replaceCharactere(to_replace,firstReplacement,lastReplacement,str) {
  var required_string;

  keyWord = str.substring(str.indexOf('*')+2,str.lastIndexOf("*")-1);
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

// Lorsque le temps finit, l'utilisateur doit arrêter de jouer, et il va réjour s'il veut.
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

  if (m < 0) {

     // quand le temps s'arrête, on cache les questions le bouton valider et le bouton next
    
    showScore();

    questionContainerElement.classList.add('hide');

    validerButton.classList.add('hide');  
    nextButton.classList.add('hide');
    clearInterval(timerId);
    
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
  listTimeQuestionAttemp.push(attempCurrent);
  listTimeQuestionAttemp.push(keyWord);
  listTimeQuestionAttemp.push(checkValue);

  arrayTimeQuestionAttemp.push(listTimeQuestionAttemp);

  creatTable(arrayTimeQuestionAttemp,listTimeQuestionAttemp);

  clearInterval(interval);
  startButton.disabled = false;
}

function creatTable(array, list) {

  myTable.classList.remove("hide");

  for (var i = 0; i < array.length; i++) {

    var tr = document.createElement('TR');


    for (var j = 0; j < list.length; j++) {

      var td = document.createElement('TD');
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

var attempCurrent = 0;

var nombreEssaisRestants;


function numbreAttemp() {

  attempCurrent += 1;
  nombreEssaisRestants = maximumAttemps - attempCurrent;

  if(nombreEssaisRestants > 0) {
     
      annonce.innerHTML = "Vous avez encore " + nombreEssaisRestants +" essais !";
      questionContainerElement.appendChild(annonce);

    } else {
    // désactivité des buttons
    
    for (var input of inputsReponds) {
      input.disabled = true; 
    }
    
      annonce.innerHTML = "Désolé(e)! Vous devez passer à d'autre question!";
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


// chosir couleur de fond
var contenuPrincipal = document.getElementById('contenuPrincipal');

var colorSelect = document.getElementById('background-unchecked');
colorSelect.addEventListener('change', function() {
  var selectedColor = colorSelect.value;
  // document.body.style.backgroundColor = selectedColor;
  contenuPrincipal.style.backgroundColor = selectedColor;

});

// choisir couleur de texte 

var colorText = document.getElementById('color-unchecked');
colorText.addEventListener('change', function() {
  var selectedColorTexte = colorText.value;
  // document.body.style.color = selectedColorTexte;
  contenuPrincipal.style.color = selectedColorTexte;

});

// choisir la taille de police

var fontSize = document.getElementById('fontSize');


fontSize.addEventListener('change', function() {
  var selectedFontSize = fontSize.value;
  document.getElementById('valueSize').innerHTML = selectedFontSize;
  document.getElementById('bodySize').style.fontSize = selectedFontSize + 'px';
});

