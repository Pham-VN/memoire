import stanza
import random
import json

# Initialiser le modèle de traitement de la langue française
nlp = stanza.Pipeline('fr')

# Corpus de phrases à annoter
corpus_COD = [
    "J'appelle Clément.",
    "J'aime la musique.",
    "Je le mange.",
    "Je la connais.",
    "Il les prend dans ses bras.",
]

corpus_COI = [
    "Pierre lui parle.",
    "J'en parle.",
]


function_grammaticale = ["COD","COI", "Complément circonstanciel", "Attribut du Sujet", "Complément d'agent"]
# # Mélanger des éléments dans la functionne grammaticale pour avoir des résultat différent
reponseRandom = random.shuffle(function_grammaticale)
# #Créer une liste de Quiz qui contient consigne, phrase et réponse
quiz = []
consigne = "Donner la fonction de l'élément figurant en gras, dans la phrase:"
phrase = ''
reponse = ''

# créer la clé pour le dictionnaire Réponses
correct = ''
   
fonction_COD = "obj"
fonction_COI = "iobj"

# # Parcourir chaque phrase dans le corpus et annoterdeprel
def createSentenceWithClue(corpus,fonction):
    list_sentence_exercice = []
    for sentence in corpus:
        # dict_consigne_phrase_reponse = {}
        doc = nlp(sentence)
        sentences = doc.sentences
        # Access words in the first sentence
        words_in_first_sentence = doc.sentences[0].words
        #liste de phrase dans les exercices avec **word** pour les étudiants savent quel mot qu'il doit trouver la fonction
        for sentence in sentences:
            sentence_for_exercice = ''
            for token in words_in_first_sentence:
                idWord = token.id
                if(token.deprel == fonction):
                    sentence_for_exercice += " " + "**" + token.text + "**"
                elif(idWord == 1 or token.text == "."):
                    sentence_for_exercice += token.text
                else:
                    sentence_for_exercice += " " + token.text  
            list_sentence_exercice.append(sentence_for_exercice)
    return list_sentence_exercice

sentence_exercice_COD = createSentenceWithClue(corpus_COD,fonction_COD)
sentence_exercice_COI = createSentenceWithClue(corpus_COI,fonction_COI)

def createReponsePossible(fonction):
    reponses = []
    for reponseRandom in function_grammaticale:
        dic_reponse = {}
        if(reponseRandom == fonction):
            reponse = fonction
            correct = "true"
            dic_reponse.update({"texte":reponse, "correct":correct})
            reponses.append(dic_reponse)
        else:
            reponse = reponseRandom
            correct = "false"
            dic_reponse.update({"texte":reponse, "correct":correct})
            reponses.append(dic_reponse)
    return reponses

listFonctionCOD = createReponsePossible("COD")
listFonctionCOI = createReponsePossible("COI")


# # créer un fichier JSON
def createDictConPhraseReponse(list_sentence_exercice,consigne,listFonction):
    for sentence_exercice in list_sentence_exercice:
        dict_consigne_phrase_reponse = {}
        dict_consigne_phrase_reponse["question"] = consigne
        dict_consigne_phrase_reponse["phrase"] = sentence_exercice
        dict_consigne_phrase_reponse["reponses"] = listFonction
        quiz.append(dict_consigne_phrase_reponse)
        
    return quiz

createDictConPhraseReponse(sentence_exercice_COD,consigne,listFonctionCOD)
createDictConPhraseReponse(sentence_exercice_COI,consigne,listFonctionCOI)

random.shuffle(quiz)

nom_fichier_json = "quiz_COD_COI.json"

with open(nom_fichier_json, "w") as fichier:
    json.dump(quiz, fichier, indent=4)  # indent pour une mise en forme lisible

print("Résultats enregistrés au format JSON dans", nom_fichier_json)

