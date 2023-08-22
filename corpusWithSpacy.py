import spacy

# Charger le modèle linguistique de SpaCy
nlp = spacy.load("fr_core_news_sm")

# Corpus de phrases à annoter
corpus = [
    "Je me regarde dans le reflet de l'eau.",
    "Je te ressemble.",
    "Il s’en souvient ",
    "Je m'en moque.",
    "Je t'ai dit que c'était urgent.",
    "J'y pense."
]

# Boucler à travers chaque phrase dans le corpus
for phrase in corpus:
    # Traiter la phrase avec SpaCy
    doc = nlp(phrase)
    
    # Afficher les annotations pour chaque token
    for token in doc:
        print( f"""
        ID: {(token.i)}   TOKEN: {(token.text):10}  TAG: {spacy.explain(token.tag_):15} Head: {(token.head.i)}   DEPREL: {(token.dep_):10}""")
    
    print("\n")
