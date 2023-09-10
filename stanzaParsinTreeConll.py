import stanza
from stanza.utils.conll import CoNLL

nlp = stanza.Pipeline(lang='fr', processors='tokenize,mwt,pos,lemma,depparse')
doc = nlp("Il s'en souvient.")
CoNLL.write_doc2conll(doc, "output.conllu")

