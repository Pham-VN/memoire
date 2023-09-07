import re
import json

#Open and read file
fichier = open("Sequoia-subset-quiz.txt",'rt')
# fichier = open("ccomp_Sequoia-checked.txt",'rt')
lignes = fichier.readlines()

expressionOfPhrases = re.compile("[A-Za-z]")
expressionOfQuestions = re.compile("^[::]")

listeDeReponse = False

questions = list()
phrases = list()
reponse = list()

for line in lignes:
    
    #extraire des phrases
    if expressionOfPhrases.match(line):
        phrases.append(re.sub(r'\n', '', line))

    #extraire des questions
    if expressionOfQuestions.match(line):
        questions.append(re.sub(r'\n', '', line))

    #extraire des réponses
    if "}" in line:
        listeDeReponse = False   
    
    if listeDeReponse == True:
        reponse.append(re.sub(r'\s', '', line))
    
    if "{" in line :
        listeDeReponse = True 
  
#diviser une liste en mutiple listes
def divide_chunks(l, n):
     
    for i in range(0, len(l), n):
        yield l[i:i + n]

#chaque reponse et chaque phrase ont des ensembles de réponses 
listOfquestion = list(divide_chunks(questions, 1))
listOfphrase = list(divide_chunks(phrases, 1))
listOfReponse = list(divide_chunks(reponse, 6))


listOfQuiz = []
trueCorrect = True
falseCorrect = False

for i in range(0,len(listOfquestion)):
    listOfReponses = []
    dictOfQuiz= {}

    # convertir une liste de réponse en string
    question = ' '.join(listOfquestion[i])
    phrase = ' '.join(listOfphrase[i])

   
    # extraire des réponses pour chaque question et montrer une bonne réponse ou une mauvais réponse
    for j in range(0,6):
        dictOfReponses = {}
        reponse = listOfReponse[i][j]
        dictOfReponses["texte"] = reponse
        if '~' in reponse:
            dictOfReponses["correct"] = falseCorrect
        else:
            dictOfReponses["correct"] = trueCorrect

        listOfReponses.append(dictOfReponses)

    #Pour chaque question, on ajouter une question, une phrase et des ensembles de réponses dans un dictionnaire.
    dictOfQuiz["question"] = question
    dictOfQuiz["phrase"] = phrase
    dictOfQuiz["reponses"] = listOfReponses

    #Ajouter chaque dictionnaire dans une liste de Quiz
    listOfQuiz.append(dictOfQuiz)

nom_fichier_json = "quiz_partie_du_discours.json"

with open(nom_fichier_json, "w") as fichier:
    json.dump(listOfQuiz, fichier, indent=4)  # indent pour une mise en forme lisible

print("Résultats enregistrés au format JSON dans", nom_fichier_json)

fichier.close()
