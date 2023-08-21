// TODO
// cOMMENT RECONSTRUIRE LA TABLEAU DE VISUALISATION APRÈS RESTART LES JEUX
// Pourquoi quand on restart de de QUIZ Partie du discours; on a le quiz de COD et COI mais n'est pas la partie du discours? 

// • La fonction "startGame()" pour démarrer le Quiz.
// • La fonction "ShowQuestionAndPhrase()" pour afficher le nombre de questions, les phrases et les réponses.
// • La fonction "setNextQuestion()" pour passer à la question suivante.
// • La fonction "checkAnswers()" pour permettre à l'utilisateur de vérifier si sa réponse est correcte ou non.
// • La fonction "showScore()" pour afficher le niveau obtenu par l'étudiant après avoir terminé le Quiz.
// • La fonction "restartQuiz()" pour permettre à l'utilisateur de recommencer le Quiz.
// • La fonction "stopWatch()" pour limiter le temps de réponse pour une liste de question.


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
var chartContainer = document.getElementById('chartcontainer');
var guideChart = document.getElementById('guideChart');
var feedBack = document.getElementById('feedBack');

// Timer
var timer = document.getElementById("timer");
let [seconds, minutes] = [0, 0];
let timerId;
var timeOutMinutes = 10;

var quizEnded = false;

//Button
var partieDuDiscours = document.getElementById('partieDuDiscours-btn');
//START GAME quiz pour trouver les Parties Du_Discours
partieDuDiscours.addEventListener('click', () => { startGame(quiz_Partie_Du_Discours) });
partieDuDiscours.addEventListener('click', start);

var fonctionGrammaticale = document.getElementById('fonctionGrammaticale-btn');
//START GAME de quiz pour trouver la fonctionne COD_COI
fonctionGrammaticale.addEventListener('click',() => { startGame(quiz_COD_COI) }); 
fonctionGrammaticale.addEventListener('click', start);

var nextButton = document.getElementById('next-btn');
var restartButton = document.getElementById('restart-btn');
var validerButton = document.getElementById('valider-btn');

//Restart Button 
restartButton.addEventListener("click", () => {clearScrrenAndRestartGame(quiz_Partie_Du_Discours)});

restartButton.addEventListener("click", () => {clearScrrenAndRestartGame(quiz_COD_COI)})
// Next Button
nextButton.addEventListener('click', () => {
  resetState()
  currentQuestionIndex++
  setNextQuestion()
})

function startGame(arguments) {

  timerId = setInterval(stopWatch, 1000);

  timer.innerHTML = "10:00";

  // console.log(currentQuestionIndex);
  [seconds, minutes] = [0, 0];
  timeOutMinutes = 10;


  // cacher le button Start
  partieDuDiscours.classList.add('hide');
  // fonctionGrammaticale
  fonctionGrammaticale.classList.add('hide');

  // Mélanger des questions
 
  shuffleQuestions = [].slice.call(arguments).sort(() => Math.random() - .5);

  // currentQuestionIndex = 1;
  scoreCount = 0;

  //Faire apparaître question et des réponses
  questionContainerElement.classList.remove('hide');

  setNextQuestion();

}

var showCorrectionButton = document.getElementById("showCorrectionButton");
// var showParsingButton = document.getElementById("showParsingButton");


function setNextQuestion() {

  counter = 0;
  annonce.innerHTML = "";
  attempCurrent = 0;

  nextButton.addEventListener('click', start);


  if (currentQuestionIndex >= shuffleQuestions.length) {

    questionContainerElement.classList.add('hide');
    clearInterval(timerId);

    showScore();

    restartButton.classList.remove('hide');
    showCorrectionButton.style.display = "block";
    // showParsingButton.style.display = "block";
    parsing.style.display = "block";


  } else {
    showQuestionAndPhrase(shuffleQuestions[currentQuestionIndex]);
  }
}

var reponseCorrect;

function showQuestionAndPhrase(question) {

  numbreOfQuestion.innerHTML = "Question " + currentQuestionIndex + "/" + shuffleQuestions.length;

  // // Question
  var text = question.question;
  displayText(text, questionElement)

  //Phrase
  var phrase = question.phrase;
  displayText(phrase, phraseElement)

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

    validerButton.addEventListener('click', checkAnwers);

    answerButtonsElement.appendChild(input)
    answerButtonsElement.appendChild(label)
    validerButton.classList.remove('hide');


  });

}

function checkAnwers() {

  var selectedOption = document.querySelector('input[type="radio"]:checked');
  //Check if there is a radio input checked
  if(!selectedOption) {
      alert("Veuillez sélectionner votre réponse, s'il vous plaît !");
      return;
  }

  for (i = 0; i < inputsReponds.length; i++) {
    if (inputsReponds[i].checked) {
      checkValue = inputsReponds[i].value;
      if (checkValue === "true") {
        attempCurrent++;
        // Augumenter le score
        scoreCount++;
        // Présenter la progression avec le Bar.
        progresseBar.style.width = (scoreCount / shuffleQuestions.length) * 100 + "%";
        progresseBar.classList = "w3-green";
        // Ajouter la coleur correct
        label[i].classList = "correct";
        // Annoncer Bravo
        annonce.innerHTML = "Bravo!";
        questionContainerElement.appendChild(annonce);
        // Faire disparaître le button valider
        validerButton.classList.add('hide');
        // Faire appaître le button Next
        nextButton.classList.remove('hide');
        // previousButton.classList.remove('hide');

        // Stop compter le temps que le joueur a joué pour chaque question
        validerButton.onclick = StudentProgressVisualization();

      }
      else {
        label[i].classList = "incorrect";
        progresseBar.style.width = (scoreCount / shuffleQuestions.length) * 100 + "%";
        progresseBar.classList = "w3-red";
        numbreAttemp();
      }
    }
  }

}

function showScore() {
  // resetState();
  if (scoreCount < shuffleQuestions.length / 3) {
    announceScore.innerText = "Vous êtes au niveau débutant, " + "vous avez eu " + scoreCount + " sur " + shuffleQuestions.length + " bonnes réponses.";
  } else if (scoreCount < shuffleQuestions.length / 2) {
    announceScore.innerText = "Vous êtes au niveau intermédiaire, il faut encore travailler! " + "vous avez eu " + scoreCount + " sur " + shuffleQuestions.length + " bonnes réponses.";
  } else if (scoreCount === shuffleQuestions.length) {
    announceScore.innerText = "Bravo! " + "Vous avez eu " + scoreCount + " sur " + shuffleQuestions.length + " bonnes réponses.";
  } else {
    announceScore.innerText = "Vous êtes au niveau avancé! " + "vous avez eu " + scoreCount + " sur " + shuffleQuestions.length + " bonnes réponses.";
  }
}

// var previousButton = document.getElementById('previous-btn');


//Function to load previous question
// function loadPreviousQuestion() {
//     //Decrement quentions index
//     currentQuestionIndex--;
//     // //remove last array value;
//     // score.pop();
//     //Generate the question
//     showQuestionAndPhrase(currentQuestionIndex);
// }

// previousButton.addEventListener('click',loadPreviousQuestion);


// Clear screen before restart game
function clearScrrenAndRestartGame(test) {

  // clear Ecran avant de remttre le jeu

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
  chartcontainer.innerHTML = ""

  // '<canvas id="myChart"></canvas>';

  // guideChart.innerHTML = "";
  // guideChart.style.display = "none";

  // feedBack.innerHTML = "";
  // feedBack.style.display = "none";
  
  startGame(test);

  // startGame(quiz_COD_COI);

}


function resetState() {
  nextButton.classList.add('hide');
  // previousButton.classList.add('hide');

  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
      (answerButtonsElement.firstChild)
  }
}

// Mettre couleur pour le mot keyWord
function displayText(str, element) {
  var displayQuestion = replaceCharactere("**", "<span class='KeyWord'> ", " </span> ", str)
  element.innerHTML = displayQuestion;
}

var keyWord;

function replaceCharactere(to_replace, firstReplacement, lastReplacement, str) {
  var required_string;

  keyWord = str.substring(str.indexOf('*') + 2, str.lastIndexOf("*") - 1);
  var etoile = str.substring(str.indexOf('**'), str.lastIndexOf("*") + 2);
  var string_after_spliting = etoile.split(to_replace);

  for (let i = 0; i < string_after_spliting.length; i++) {
    if (i === 0) {
      required_string = firstReplacement + keyWord + lastReplacement;
      var finir = str.replace(etoile, required_string)
      return finir;
    }
  }
}

// Lorsque le temps finit, l'utilisateur doit arrêter de jouer, et il va réjour s'il veut.
function stopWatch() {

  seconds--;

  if (seconds === -1) {
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
    // previousButton.classList.add('hide');
    clearInterval(timerId);

    restartButton.classList.remove('hide');

  }
}

// COMPTER DE TEMPS
var counter = 0;
var interval;
var endTime;

// CHART
var ctx = document.getElementById('myChart');
var totalOfTimeAttemps;
Chart.register(ChartDataLabels)
var mixedChart;

mixedChart = new Chart(ctx, {
  data: {
    datasets: [
      {
        type: 'bar',
        plugins: [ChartDataLabels],
        label: 'Nombre essaie',
        data: [],
        backgroundColor: [],
      },
      {
        type: 'bar',
        plugins: [ChartDataLabels],
        label: 'Temps répondu',
        data: [],
        backgroundColor: [],
      }],
    labels: []
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    categoryPercentage: 0.8,
    barPercentage: 0.9,
    scales: {
      x: {
        stacked: true,
        grace: '10%'
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grace: '10%'
      }
    },
    plugins: {
      datalabels: {
        formatter: (val) => (`${val}%`),
        labels: {
          value: {
            color: 'white',
            // textAlign: 'center',
            // fontSize: "14px",
            // fontFamily: "sans-serif"
          }
        }
      }
    },
  }
});


// Faire apparaître le diagramme en cliquant à button valider
validerButton.addEventListener('click', function () {
  chartContainer.style.display = "block";
})


//  Cette fonction a pour but d'incrémenter progressivement la valeur de la barre : nombre d'essais, temps passé, ainsi que le retour d'information.
function StudentProgressVisualization() {

  endTime = counter++;

  if (checkValue === 'true') {
    mixedChart.data.datasets[0].backgroundColor.push('green');

  } else {
    mixedChart.data.datasets[0].backgroundColor.push('red');
  }

  var percentageOfTime = ((endTime / 40) * 100).toFixed(1);
  var percentageOfAttemps = ((attempCurrent / 3) * 100).toFixed(1);
  totalOfTimeAttemps = (percentageOfTime + percentageOfAttemps);

  // mixedChart.data.datasets[0].data.push(totalOfTimeAttemps);
  mixedChart.data.datasets[0].data.push(percentageOfAttemps);
  mixedChart.data.datasets[1].data.push(percentageOfTime);
  mixedChart.data.labels.push("Q " + currentQuestionIndex)
  mixedChart.update();

  // //FEEDBACK
  if (checkValue === "false") {
    let feedBack1 = "Il faut réviser la question "
    let continueFeedBack = " pour retrouver la partie du discours de mot ";

    let span = document.createElement("span");
    let textnode = document.createTextNode(currentQuestionIndex);
    span.setAttribute("class","indexQuestion");
    span.appendChild(textnode);
    span.style.color = "red";
    span.style.fontSize = "18px";


    let spanKeyWord = document.createElement("span");
    let textWord = document.createTextNode(keyWord +".");
    spanKeyWord.setAttribute("class","KeyWord");
    spanKeyWord.appendChild(textWord);
    spanKeyWord.style.color = "red";
    spanKeyWord.style.fontSize = "18px";


   
    let list = document.createElement('li');
    feedBack.appendChild(document.createTextNode(feedBack1));
    feedBack.appendChild(span);
    feedBack.appendChild(document.createTextNode(continueFeedBack));
    feedBack.appendChild(spanKeyWord);

    feedBack.appendChild(list);

  } else if (attempCurrent > 2 && checkValue === 'true' || endTime > 40 && checkValue === 'true') {
    let feedBack2 = "Vous avez trouvé une bonne réponse, mais il faut encore s'entraîner sur la question ";
    let continueFeedBack2 =  " pour répondre plus rapidement la prochaine fois.";

    let span = document.createElement("span");
    let textnode = document.createTextNode(currentQuestionIndex);
    span.setAttribute("class","indexQuestion");
    span.appendChild(textnode);
    span.style.color = "red";
    span.style.fontSize = "18px";

    var list = document.createElement('li');
    feedBack.appendChild(document.createTextNode(feedBack2));
    feedBack.appendChild(span);
    feedBack.appendChild(document.createTextNode(continueFeedBack2));
    feedBack.appendChild(list);
    
  }

  clearInterval(interval);
  partieDuDiscours.disabled = false;
  // fonctionGrammaticale.disabled = false;
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
  partieDuDiscours.disabled = true;
  // fonctionGrammaticale.disabled = true;
  interval = setInterval(function () {
    // ret.innerHTML = "Pour la question " + currentQuestionIndex + ", le temps que vous avez passé est " + convertSec(counter++) + "Vous avez essayé " + nombreEssai; // timer start counting here...
    convertSec(counter++);
  }, 1000);
}

var attempCurrent = 0;

var nombreEssaisRestants;


function numbreAttemp() {

  attempCurrent += 1;
  nombreEssaisRestants = maximumAttemps - attempCurrent;

  if (nombreEssaisRestants > 0) {

    annonce.innerHTML = "Vous avez encore " + nombreEssaisRestants + " essais !";
    questionContainerElement.appendChild(annonce);

  } else {
    // désactivité des buttons

    for (var input of inputsReponds) {
      input.disabled = true;
    }

    annonce.innerHTML = "Désolé(e)! Vous devez passer à d'autre question!";
    validerButton.onclick = StudentProgressVisualization();
    validerButton.classList.add('hide');
    nextButton.classList.remove('hide');
    // previousButton.classList.remove('hide');

  }

}


var quiz_Partie_Du_Discours = [{
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
    correct: true
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
    correct: true
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
    correct: true
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
    correct: true
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
    correct: true
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
    correct: true
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
    correct: true
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
    correct: true
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
    correct: true
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
    correct: true
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
    correct: true
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
    correct: true
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
    correct: true
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
    correct: true
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
    correct: true
  }]
}]


quiz_COD_COI = [
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "Il s\u2019 **en** souvient.",
      reponses: [
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          },
          {
              texte: "COI",
              correct: true
          },
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          },
          {
              texte: "COD",
              correct: false
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          },
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          }
      ]
  },
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "J' **y** pense.",
      reponses: [
          {
              texte: "COI",
              correct: true
          },
          {
              texte: "COD",
              correct: false
          },
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          },
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          }
      ]
  },
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "Je m' **en** moque.",
      reponses: [
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          },
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          },
          {
              texte: "COI",
              correct: true
          },
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          },
          {
              texte: "COD",
              correct: false
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          }
      ]
  },
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "Je **le** mange.",
      reponses: [
          {
              texte: "COD",
              correct: true
          },
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          },
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          },
          {
              texte: "COI",
              correct: false
          },
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          }
      ]
  },
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "Je **t\u2019** ai dit que c\u2019 \u00e9tait urgent.",
      reponses: [
          {
              texte: "COI",
              correct: true
          },
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          },
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          },
          {
              texte: "COD",
              correct: false
          },
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          }
      ]
  },
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "Il **les** prend dans ses bras.",
      reponses: [
          {
              texte: "COI",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          },
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          },
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          },
          {
              texte: "COD",
              correct: true
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          }
      ]
  },
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "Je **me** regarde dans le reflet de l\u2019 eau.",
      reponses: [
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          },
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          },
          {
              texte: "COD",
              correct: true
          },
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          },
          {
              texte: "COI",
              correct: false
          }
      ]
  },
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "J' appelle **Cl\u00e9ment**.",
      reponses: [
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          },
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          },
          {
              texte: "COI",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          },
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          },
          {
              texte: "COD",
              correct: true
          }
      ]
  },
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "J' aime la **musique**.",
      reponses: [
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          },
          {
              texte: "COI",
              correct: false
          },
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          },
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          },
          {
              texte: "COD",
              correct: true
          },
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          }
      ]
  },
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "Pierre **lui** parle.",
      reponses: [
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          },
          {
              texte: "COI",
              correct: true
          },
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          },
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          },
          {
              texte: "COD",
              correct: false
          },
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          }
      ]
  },
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "J' **en** parle.",
      reponses: [
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          },
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          },
          {
              texte: "COD",
              correct: false
          },
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          },
          {
              texte: "COI",
              correct: true
          }
      ]
  },
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "Je **la** connais.",
      reponses: [
          {
              texte: "COD",
              correct: true
          },
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          },
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          },
          {
              texte: "COI",
              correct: false
          },
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          }
      ]
  },
  {
      question: "Donner la fonction de l'\u00e9l\u00e9ment figurant en rouge, dans la phrase:",
      phrase: "Je **te** ressemble.",
      reponses: [
          {
              texte: "Compl\u00e9ment d'agent",
              correct: false
          },
          {
              texte: "Compl\u00e9ment circonstanciel de cause",
              correct: false
          },
          {
              texte: "COI",
              correct: true
          },
          {
              texte: "Compl\u00e9ments du nom",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de lieu",
              correct: false
          },
          {
              texte: "Compl\u00e9ment de l'adjectif",
              correct: false
          },
          {
              texte: "COD",
              correct: false
          }
      ]
  }
]

// chosir couleur de fond
var contenuPrincipal = document.getElementById('contenuPrincipal');

var colorSelect = document.getElementById('background-unchecked');
colorSelect.addEventListener('change', function () {
  var selectedColor = colorSelect.value;
  // document.body.style.backgroundColor = selectedColor;
  contenuPrincipal.style.backgroundColor = selectedColor;

});

// choisir couleur de texte 

var colorText = document.getElementById('color-unchecked');
colorText.addEventListener('change', function () {
  var selectedColorTexte = colorText.value;
  // document.body.style.color = selectedColorTexte;
  contenuPrincipal.style.color = selectedColorTexte;

});



// choisir la taille de police

var decreaseFontSize = document.getElementById('decrease-fontSize');
var increaseFontSize = document.getElementById('increase-fontSize');
var curentFontSize = document.getElementById('curent-fontSize');
var fontSize = 14;


function updateFontSize() {
  document.getElementById('bodySize').style.fontSize = fontSize + 'px';
  curentFontSize.innerHTML = fontSize;
}


increaseFontSize.addEventListener('click', function () {
  fontSize += 1;
  updateFontSize();
});

decreaseFontSize.addEventListener('click', function () {
  fontSize -= 1;
  updateFontSize();
});

// Interline

var increaseInterligne = document.getElementById('increase-interligne');
var decreaseInterligne = document.getElementById('decrease-interligne');
var getCurrentValue = document.getElementById('current-value');
var lineHeight = 1;


function updateLineHeight() {
  questionElement.style.lineHeight = lineHeight;
  phraseElement.style.lineHeight = lineHeight;
  answerButtonsElement.style.lineHeight = lineHeight;
  getCurrentValue.innerHTML = lineHeight;
}

increaseInterligne.addEventListener('click', function () {
  lineHeight += 0.5;
  updateLineHeight();
});

decreaseInterligne.addEventListener('click', function () {
  lineHeight -= 0.5;
  updateLineHeight();
});

// Text align

var leftAlign = document.getElementById('left-align');
var rightAlign = document.getElementById('right-align');

leftAlign.addEventListener('click', function () {
  document.getElementById('bodySize').style.textAlign = 'left';
  answerButtonsElement.style.textAlign = 'left';
  questionContainerElement.style.textAlign = 'left';
});

rightAlign.addEventListener('click', function () {
  questionContainerElement.style.textAlign = 'right';
  answerButtonsElement.style.textAlign = 'right';
  document.getElementById('bodySize').style.textAlign = 'right';
});

//select-font-du-texte
var selectFontDuTexte = document.getElementById('select-font-du-texte');

selectFontDuTexte.addEventListener('click', function () {
  document.getElementById('bodySize').style.fontFamily = selectFontDuTexte.value;
})

//mode jour et nuit
var modeJour = document.getElementById('modeJour');
var modeNuit = document.getElementById('modeNuit');

function appliqueJour() {
  document.getElementById('bodySize').style.backgroundColor = "rgb(255, 255, 255)";
  document.getElementById('bodySize').style.color = "rgb(30, 30, 30)";
}


function appliqueNuit() {
  document.getElementById('bodySize').style.color = "rgb(255, 255, 255)";
  document.getElementById('bodySize').style.backgroundColor = "rgb(30, 30, 30)";
}

modeJour.addEventListener('click', appliqueJour);
modeNuit.addEventListener('click', appliqueNuit);

var accessibilitySettings = document.getElementById('accessibility-settings');
var accessibility = document.getElementById('accessibility');
var hideAccessibilitySettings = document.getElementById('hide-accessibility-setting');


function afficheAccessibility() {
  accessibilitySettings.style.display = "block";
}


function cacheAccessibility() {
  accessibilitySettings.style.display = "none";
}

accessibility.addEventListener('click', afficheAccessibility);
hideAccessibilitySettings.addEventListener('click', cacheAccessibility);


// POUR LA PARTIE DE CORRECTION DE LA FONCTION COD ET COI

const quizQuestions = [
  {
      "sentence": "J'appelle Cl\u00e9ment.",
      "question": "J'appelle QUI? Clément",
      "analyse": {
          "sujet": "J'",
          "verbe": "appelle",
          "obj": "Cl\u00e9ment"
      }
  },
  {
      "sentence": "J'aime la musique.",
      "question": "J'aime QUOI? musique",
      "analyse": {
          "sujet": "J'",
          "verbe": "aime",
          "obj": "musique"
      }
  },
  {
      "sentence": "Je le mange.",
      "question": "Je mange QUOI? Un sandwich",
      "analyse": {
          "sujet": "Je",
          "obj": "le",
          "verbe": "mange"
      }
  },
  {
      "sentence": "Je la connais.",
      "question": "Je connais QUI? Marie",
      "analyse": {
          "sujet": "Je",
          "obj": "la",
          "verbe": "connais"
      }
  },
  {
      "sentence": "Il les prend dans ses bras.",
      "question": "Il prend QUOI dans ses bras? Les enfants",
      "analyse": {
          "sujet": "Il",
          "obj": "les",
          "verbe": "prend"
      }
  },
  {
      "sentence": "Je me regarde dans le reflet de l\u2019eau.",
      "question": "Je regarde QUI? moi-même",
      "analyse": {
          "sujet": "Je",
          "obj": "me",
          "verbe": "regarde"
      }
  },
  {
      "sentence": "Pierre lui parle.",
      "question": "Pirerre parle À QUI? À son ami",
      "analyse": {
          "sujet": "Pierre",
          "iobj": "lui",
          "verbe": "parle"
      }
  },
  {
      "sentence": "J'en parle.",
      "question": "Je parle DE QUOI? De mon voyage en Europe",
      "analyse": {
          "sujet": "J'",
          "iobj": "en",
          "verbe": "parle"
      }
  },
  {
      "sentence": "Je te ressemble.",
      "question": "Je ressemble À QUI ? la personne À QUI je parle (te)",
      "analyse": {
          "sujet": "Je",
          "iobj": "te",
          "verbe": "ressemble"
      }
  },
  {
      "sentence": "J'y pense.",
      "question": "Je pense À QUOI? À ma famille",
      "analyse": {
          "sujet": "J'",
          "iobj": "y",
          "verbe": "pense"
      }
  },
  {
      "sentence": "Je m'en moque.",
      "question": "Je me moque DE QUOI? De la mode",
      "analyse": {
          "sujet": "J'",
          "iobj": "en",
          "verbe": "moque"
      }
  },
  {
      "sentence": "Il s\u2019en souvient.",
      "question": "Il se souvient DE QUOI? De sa vie",
      "analyse": {
          "sujet": "Il",
          "iobj": "en",
          "verbe": "souvient"
      }
  }
];


var quizContainer = document.getElementById("quizContainer");
var correctionTable = document.getElementById("correction");

var codParagraph = document.getElementById('tableauCorrectionCOD');
var coiParagraph = document.getElementById('tableauCorrectionCOI');

var codPhrases = [];
var row;
var phraseCell;
var questionCell;
var sujetCell;
var verbeCell;
var coiCell;
var codCell ;

showCorrectionButton.addEventListener("click", showCorrectionCOD_COI);

function showCorrectionCOD_COI() {
 
  showCorrectionButton.style.display = "none"; 
  contenuPrincipal.style.display = "none"; 
  chartContainer.innerHTML = ""; 

quizQuestions.forEach(question => {

    row = codParagraph.insertRow();

    if ("obj" in question.analyse) {

        questionCell = row.insertCell(0);
        phraseCell = row.insertCell(1);
        sujetCell = row.insertCell(2);
        verbeCell = row.insertCell(3);
        codCell = row.insertCell(4);   
        
        phraseCell.textContent = question.sentence;
        questionCell.textContent = question.question;
        sujetCell.textContent = question.analyse.sujet || "";
        verbeCell.textContent = question.analyse.verbe || "";
        codCell.textContent = question.analyse.obj || "";

    }

    var row2 = coiParagraph.insertRow();

    if ("iobj" in question.analyse) {

        questionCell = row2.insertCell(0);
        phraseCell = row2.insertCell(1);
        sujetCell = row2.insertCell(2);
        coiCell = row2.insertCell(3);   
        verbeCell = row2.insertCell(4);
        
        phraseCell.textContent = question.sentence;
        questionCell.textContent = question.question;
        sujetCell.textContent = question.analyse.sujet || "";
        verbeCell.textContent = question.analyse.verbe || "";
        coiCell.textContent = question.analyse.iobj || "";

    }

    if (question.analyse.sujet) {
        sujetCell.classList.add("yellow-bg");
      }
      if (question.analyse.verbe) {
        verbeCell.classList.add("green-bg");
      }
      if (question.analyse.iobj) {
        coiCell.classList.add("orange-bg");
      }
      if (question.analyse.obj) {
        codCell.classList.add("red-bg");
      }
  });
  correctionTable.style.display = "block";
  quizContainer.style.display = "none";

  
}

var parsing = document.getElementById('parsing');

// showParsingButton.addEventListener("click", function() {
  // parsing.style.display = "block";
// }); 