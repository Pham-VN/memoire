import stanza
import json

# Téléchargement des modèles pour la langue française (ou une autre langue de votre choix)
stanza.download('fr')

# Initialisation du pipeline
nlp = stanza.Pipeline(lang='fr', processors='tokenize,pos,lemma,depparse')

# Corpus annoté (liste de phrases)
corpus_COD_COI = [
    "J'appelle Clément.",
    "J'aime la musique.",
    "Je le mange.",
    "Je la connais.",
    "Il les prend dans ses bras.",
    "Je me regarde dans le reflet de l’eau.",
    "Pierre lui parle.",
    "J'en parle.",
    "Marie te ressemble.",
    "J'y pense.",
    "Je m'en moque.",
    "Il s’en souvient.",
    "Je t’ai dit que c’était urgent."
]

listAnalyseSentence = []

# Traitement de chaque phrase du corpus
def analysePhrase(corpus):
    for text in corpus:
        doc = nlp(text)
        for sent in doc.sentences:
            dic_analyse_sentence = {}
            dic_sujet_verbe_obj = {}
            dic_analyse_sentence['sentence'] = sent.text
            # print(f"Phrase : {sent.text}")
            for word in sent.words:
                #print(f"{word.id} \t Mot : {word.text}\tLemme : {word.lemma}\tPos : {word.pos}\tHead : {word.head}\tRelation : {word.deprel}")
                if(word.deprel == "nsubj" and  word.id == 1):
                    dic_sujet_verbe_obj["sujet"] = word.text
                if(word.deprel == "root"):
                    dic_sujet_verbe_obj["verbe"] = word.text
                if(word.deprel == "obj"):
                    dic_sujet_verbe_obj["obj"] = word.text
                if(word.deprel == "iobj"):
                    dic_sujet_verbe_obj["iobj"] = word.text
            dic_analyse_sentence['sentence'] = sent.text
            dic_analyse_sentence['analyse'] = dic_sujet_verbe_obj

            listAnalyseSentence.append(dic_analyse_sentence)   
    return listAnalyseSentence


listCorrectionCOD_COI = analysePhrase(corpus_COD_COI)
nom_fichier_json = "correctionCOD_COI.json"

with open(nom_fichier_json, "w") as fichier:
    json.dump(listCorrectionCOD_COI, fichier, indent=4)  # indent pour une mise en forme lisible

print("Résultats enregistrés au format JSON dans", nom_fichier_json)