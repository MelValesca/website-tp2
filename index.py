# Copyright 2022 Melissa Valesca Vallée VALM22549307 et Neil Ridene RIDN30129504
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask
from flask import render_template
from flask import g
from .database import Database
import random
from flask import request
import re
from flask import redirect, url_for


app = Flask(__name__, static_url_path="", static_folder="static")

# Retourne la base de données
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database


# Ferme la connexion à la base de données à la fin de chaque requête
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()


# Route pour la page d'accueil
@app.route('/')
def accueil():
    database = get_db()
    animaux = random.sample(database.get_animaux(),5)
    return render_template('accueil.html',
                           title='Accueil',
                           description='Quelques animaux à adopter',
                           animals=animaux)

# Route pour la page d'adoption des animaux
@app.route('/adopter',methods=["POST","GET"])
def adopter():
    erreurs={}
    if request.method == 'POST':
        database = get_db()
        mot_cle = request.form.get("recherche")
        animaux = database.get_animaux()
        resultat = chercher(animaux, mot_cle)
        erreurs = valider_recherche(mot_cle)
        if not any(erreurs.values()):
            return render_template('resultat.html', animals = resultat, nombre=len(resultat),mot = mot_cle)
        else:
            return render_template('adopter.html',
                           title="Il y a "+ str(len(animaux)) +" animaux à adopter",
                           animaux=animaux,
                           erreurs = erreurs)
    else:    
        database = get_db()
        animaux = database.get_animaux()
        return render_template('adopter.html',
                           title="Il y a "+ str(len(animaux)) +" animaux à adopter",
                           animaux=animaux,
                           erreurs = erreurs)


# Route pour la page de détails de l'animal
@app.route('/animal<animal_id>', methods=["GET"])
def animal(animal_id):
    database = get_db()
    animal = database.get_animal(animal_id)
    return render_template('animal.html', animal = animal)


# Route pour contacter le propriétaire de l'animal par courriel
@app.route('/contacter/<courriel>/<nom>',methods=["POST"])
def contacter(courriel,nom):
    return redirect('mailto:' + courriel + "?subject=Adopter " + nom)


# Route pour le formulaire de mise en adoption d'un animal
@app.route('/formulaire',methods=["POST","GET"])
def formulaire():
    if request.method == 'POST':
        errors = trouver_erreurs()
        if not any(errors.values()):
            database=get_db()
            animal_id = database.add_animal(
            request.form.get("nom"),
            request.form.get("espece"),
            request.form.get("race"),
            request.form.get("age"),
            request.form.get("description"),
            request.form.get("email"),
            request.form.get("adresse"),
            request.form.get("ville"),
            request.form.get("codepostal"))
            return redirect(url_for('nouveau',animal_id = animal_id))
        else:
            return render_template('abandonnez.html',errors = errors, title = "Mise en adoption",
                                    description = "Des erreurs se sont glissé dans votre formulaire lors de l'envoie")
    else:
        errors = {}
        return render_template('abandonnez.html',errors = errors, title = "Mise en adoption",
                               description = "Remplissez le fomulaire ci-dessous pour mettre votre animal en adoption")    

# Route pour la page du nouvel animal ajouté
@app.route('/nouveau/<animal_id>')
def nouveau(animal_id):
    database=get_db()
    animal = database.get_animal(animal_id)
    return render_template('animal.html', animal = animal)

# Trouve les erreurs dans le formulaire de mise en adoption
def trouver_erreurs():
    errors = {}
    errors = valider_nom(request.form.get("nom"), errors)
    errors = valider_espece(request.form.get("espece"), errors, 25)
    errors = valider_race(request.form.get("race"), errors, 25)
    errors = valider_age(request.form.get("age"), errors)
    errors = valider_description(request.form.get("description"), errors, 500)
    errors = valider_courriel(request.form.get("email"), errors, 80)
    errors = valider_adresse(request.form.get("adresse"), errors, 75)
    errors = valider_ville(request.form.get("ville"), errors, 75)
    errors = valider_cp(request.form.get("codepostal"), errors)
    return errors


# Cherche une liste d'animaux en fonction d'un mot clé
def chercher(animaux, mot_cle):
    animaux_trouve = []
    for animal in animaux:
        animal_minus = {k:str(v).lower() for k,v in animal.items()}
        animal_minus.pop('id')
        for i in animal_minus.values():
            if(i.find(mot_cle.lower()) != -1):
                animaux_trouve.append(animal)
    return list({
    dictionaire['id']: dictionaire
    for dictionaire in animaux_trouve
    }.values())

# Valide la recherche
def valider_recherche(recherche):
    erreurs = {}
    erreurs.setdefault("recherche", [])
    if recherche == "":
        erreurs["recherche"].append("Veuillez remplir ce champ.")
    if len(recherche) < 3 :
        erreurs["recherche"].append("Vous devez entrer minimum 3 caractères")
    return erreurs

# Valide le nom de l'animal
def valider_nom(nom, errors):
    errors.setdefault("nom", [])
    if nom == "":
        errors["nom"].append("Veuillez remplir ce champ.")
    if ',' in nom:
        errors["nom"].append("Aucun champ ne peut contenir de virgule.")
    if len(nom) > 20 or len(nom) < 3 :
        errors["nom"].append("Doit avoir entre 3 et 20 caractères.")
    return errors

# Valide l'espèce de l'animal
def valider_espece(espece, errors, max):
    errors.setdefault("espece", [])
    if espece == "":
        errors["espece"].append("Veuillez remplir ce champ")
    if len(espece) > 25 :
        errors["espece"].append("Vous avez dépassé la limite de caractères autorisée pour ce champ. (" +
        str(max) + " caractères)")
    if ',' in espece:
        errors["espece"].append("Aucun champ ne peut contenir de virgule.")  
    return errors

# Valide la race de l'animal
def valider_race(race, errors, max):
    errors.setdefault("race", [])
    if race == "":
        errors["race"].append("Veuillez remplir ce champ.")
    if len(race) > 25 :
        errors["race"].append("Vous avez dépassé la limite de caractères autorisée pour ce champ. (" +
        str(max) + " caractères)")
    if ',' in race:
        errors["race"].append("Aucun champ ne peut contenir de virgule.")    
    return errors

# Valide l'âge de l'animal
def valider_age(age,errors):
    errors.setdefault("age", [])
    if age != "":
        age = int(age)
        if age > 30 or age < 0:
            errors["age"].append("Doit avoir entre 0 et 30 ans.")
    if age == "":
        errors["age"].append("Veuillez remplir ce champ.")
        errors["age"].append("Doit avoir entre 0 et 30 ans.")
    return errors

# Fonction pour valider la description de l'animal
def valider_description(description, errors, max):
    if len(description) > max:
        errors["description"] = ["Vous avez dépassé la limite de caractères autorisée pour ce champ. (" +
        str(max) + " caractères)"]
    if description == "":
        errors["description"] = ["Veuillez remplir ce champ."]  
    return errors

# Valide l'adresse courriel du propriétaire
def valider_courriel(email, errors, max):
    regexp = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    errors.setdefault("email", [])
    if email == "":
        errors["email"].append("Veuillez remplir ce champ.")
    if not (re.fullmatch(regexp, email)):
        errors["email"].append("L'adresse courriel doit avoir un format valide.")
    if len(email) > max:
        errors["email"].append("Vous avez dépassé la limite de caractères autorisée pour ce champ. (" +
        str(max) + " caractères)")
    return errors

# Valide l'adresse du propriétaire
def valider_adresse(adresse, errors, max):
    errors.setdefault("adresse", [])
    if adresse == "":
        errors["adresse"].append("Veuillez remplir ce champ.") 
    if len(adresse) > max:
        errors["adresse"].append("Vous avez dépassé la limite de caractères autorisée pour ce champ. (" +
        str(max) + " caractères)")
    if ',' in adresse:
        errors["adresse"].append("Aucun champ ne peut contenir de virgule.")
    return errors

# Valide la ville du propriétaire
def valider_ville(ville, errors, max):
    errors.setdefault("ville", [])
    if ville == "":
        errors["ville"].append("Veuillez remplir ce champ.")  
    if len(ville) > max:
        errors["ville"].append("Vous avez dépassé la limite de caractères autorisée pour ce champ. (" +
        str(max) + " caractères)")
    if ',' in ville:
        errors["ville"].append("Aucun champ ne peut contenir de virgule.")
    return errors

# Valide le code postal du propriétaire
def valider_cp(codepostal, errors):
    regexp = r"^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$"
    errors.setdefault("codepostal", [])
    if codepostal == "":
        errors["codepostal"].append("Veuillez remplir ce champ.")
    if not (re.fullmatch(regexp, codepostal)):
        errors["codepostal"].append("Doit avoir un format canadien. (ex: H2H 2L8).")
    return errors


# Gestionnaire d'erreur pour les routes invalides (404)
@app.errorhandler(404) 
def invalid_route(e): 
    return render_template('404.html')