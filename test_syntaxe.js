const quizQuestions = [
  {
    "phrase": "J'en parle",
    "questionPourTrouverFonction":"de quoi je parle ?",
    "analyses": {
      "sujet": "J'",
      "verbe": "parle ?",
      "iobj": " de la mer => en"
    }
  },
  {
    "phrase": "J'aime clément",
    "questionPourTrouverFonction":"aime QUI ?",
    "analyses": {
      "sujet": "J'",
      "verbe": "aime",
      "obj": "qui => clément"
    }
  },
  {
    "phrase": "Pierre lui parle.",
    "questionPourTrouverFonction":"à qui Pierre parle ?",
    "analyses": {
      "sujet": "Pierre",
      "verbe": "parle",
      "iobj": "à qui => lui"
  }
  }
  
];


const quizContainer = document.getElementById("quizContainer");
const showCorrectionButton = document.getElementById("showCorrectionButton");
const correctionTable = document.getElementById("correctionTable");

showCorrectionButton.addEventListener("click", showCorrection);

function showCorrection() {
  // correctionTable.innerHTML = ""; // Réinitialise le contenu du tableau de correction
  
  quizQuestions.forEach(question => {
    const row = correctionTable.insertRow();
    
    const phraseCell = row.insertCell(0);
    const questionCell = row.insertCell(1);
    const sujetCell = row.insertCell(2);
    const verbeCell = row.insertCell(3);
    const coiCell = row.insertCell(4);
    const codCell = row.insertCell(5);
    
    phraseCell.textContent = question.phrase;
    questionCell.textContent = question.questionPourTrouverFonction;
    sujetCell.textContent = question.analyses.sujet || "";
    verbeCell.textContent = question.analyses.verbe || "";
    coiCell.textContent = question.analyses.iobj || "";
    codCell.textContent = question.analyses.obj || "";
    
    if (question.analyses.sujet) {
      sujetCell.classList.add("yellow-bg");
    }
    if (question.analyses.verbe) {
      verbeCell.classList.add("green-bg");
    }
    if (question.analyses.iobj) {
      coiCell.classList.add("orange-bg");
    }
    if (question.analyses.obj) {
      codCell.classList.add("red-bg");
    }
  });
  
  correctionTable.style.display = "block";
  quizContainer.style.display = "none";
}
