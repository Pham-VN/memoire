import spacy
from spacy import displacy
from pathlib import Path
nlp = spacy.load("fr_core_news_md")
doc = nlp("Il s'en souvient.")
svg = displacy.render(doc, style="dep", jupyter=False)
output_path = Path("sentence.svg")
output_path.open("w", encoding="utf-8").write(svg)
