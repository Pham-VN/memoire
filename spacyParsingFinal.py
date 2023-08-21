import spacy
from spacy import displacy
from pathlib import Path

nlp = spacy.load("fr_core_news_md")  # Charger le modèle linguistique pour le français
sent = "Pour garantir une concurrence loyale , il convient que ces mesures soient prises au niveau international."

doc = nlp(sent)
svg = displacy.render(doc, style="dep", jupyter=False)
output_path = Path("sentence.svg")
output_path.open("w", encoding="utf-8").write(svg)