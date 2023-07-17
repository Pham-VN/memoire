import csv
# import json

dicOfToken = {}
listOfToken = []

# Ouvrir le fichier CSV en mode lecture
with open('phrase2', 'r') as file:
    # Créer un lecteur CSV
    reader = csv.reader(file)

    # Parcourir chaque ligne du fichier CSV
    for row in reader:
        # Accéder aux données de chaque colonne
        col1 = row[0]  # Première colonne
        col2 = row[1]  # Deuxième colonne
        col3 = row[6]  # Troisième colonne

        # Faire quelque chose avec les données extraites
        dicOfToken["key"] = int(col1)
        dicOfToken["text"] = col2
        dicOfToken["fill"] = "#f8f8f8"
        dicOfToken['stroke'] = "#4d90fe"
        dicOfToken['parent'] = col3
        
        print(dicOfToken)