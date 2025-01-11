// Valide le champ du nom de l'animal
function validerNom() {
  const nom = document.getElementById("nom");
  return !estVide(nom) && !contientVirgule(nom) && validerTexteNom(nom, 3, 20);
}

// Affiche l'erreur liée au nom de l'animal
function afficherErrNom() {
  const nom = document.getElementById("nom");
  verifierVide(nom);
  verifierVirgule(nom);
  verifierTexteNom(nom, 3, 20);
}

// Crée un message d'erreur lorsqu'un champ du formulaire ne respecte pas le format requis
const setErreur = (element, message) => {
  const inputControl = element.parentElement;
  const control = inputControl.parentElement;
  const afficherErreur = control.querySelector(".erreur");
  afficherErreur.innerHTML += message;
};

// Retire le message d'erreur lorsque l'entrée est dans le format attendu
const setSucces = (element, message) => {
  const inputControl = element.parentElement;
  const control = inputControl.parentElement;
  const afficherErreur = control.querySelector(".erreur");
  afficherErreur.innerHTML = afficherErreur.innerHTML.replace(message, "");
};

// Valide le champ de l'espèce de l'animal
function validerEspece() {
  const espece = document.getElementById("espece");
  return !(
    estVide(espece) ||
    contientVirgule(espece) ||
    !validerTexteLongueur(espece, 25)
  );
}

// Affiche l'erreur liée à l'espèce de l'animal
function afficherErrEspece() {
  const espece = document.getElementById("espece");
  verifierVide(espece);
  verifierVirgule(espece);
  verifierTexteLongueur(espece, 25);
}

// Valide le champ de la race de l'animal
function validerRace() {
  const race = document.getElementById("race");
  return !(
    estVide(race) ||
    contientVirgule(race) ||
    !validerTexteLongueur(race, 25)
  );
}

// Affiche l'erreur liée à la race de l'animal
function afficherErrRace() {
  const race = document.getElementById("race");
  verifierVide(race);
  verifierVirgule(race);
  verifierTexteLongueur(race, 25);
}

// Valide le champ de l'âge de l'animal
function validerAge() {
  const age = document.getElementById("age");
  return !(estVide(age) || !validerValeurAge(age));
}

// Affiche l'erreur liée à l'âge de l'animal
function afficherErrAge() {
  const age = document.getElementById("age");
  verifierVide(age);
  verifierValeurAge(age);
}

// Valide le champ de la description de l'animal
function validerDescription() {
  const description = document.getElementById("description");
  return !(estVide(description) || !validerTexteLongueur(description, 500));
}

// Affiche l'erreur liée de la description
function afficherErrDesc() {
  const description = document.getElementById("description");
  verifierVide(description);
  verifierTexteLongueur(description, 500);
}

// Valide le champ de l'adresse courriel
function validerCourriel() {
  const courriel = document.getElementById("email");
  return !(
    estVide(courriel) ||
    !validerFormatCourriel(courriel) ||
    !validerTexteLongueur(courriel, 80)
  );
}

// Affiche l'erreur liée au courriel
function afficherErrCourriel() {
  const courriel = document.getElementById("email");
  verifierVide(courriel);
  verifierTexteLongueur(courriel, 80);
  verifierFormatCourriel(courriel);
}

// Valide le format de l'adresse courriel
function verifierFormatCourriel(champ) {
  if (validerFormatCourriel(champ)) {
    setErreur(
      champ,
      "<li>L'adresse courriel doit avoir un format valide.</li>"
    );
  } else {
    setSucces(
      champ,
      "<li>L'adresse courriel doit avoir un format valide.</li>"
    );
  }
}

// Valide le format du courriel
function validerFormatCourriel(champ) {
  const regexCourriel = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return !regexCourriel.test(champ.value);
}

// Valide le champ de l'adresse civique
function validerAdresseCivique() {
  const adresse = document.getElementById("adresse");
  return !(
    estVide(adresse) ||
    contientVirgule(adresse) ||
    !validerTexteLongueur(adresse, 75)
  );
}

// Affiche l'erreur liée à l'adresse civique
function afficherErrAdresse() {
  const adresse = document.getElementById("adresse");
  verifierVide(adresse);
  verifierVirgule(adresse);
  verifierTexteLongueur(adresse, 75);
}

// Valide le champ de la ville
function validerVille() {
  const ville = document.getElementById("ville");
  return !(
    estVide(ville) ||
    contientVirgule(ville) ||
    !validerTexteLongueur(ville, 75)
  );
}

// Affiche l'erreur liée à la ville
function afficherErrVille() {
  const ville = document.getElementById("ville");
  verifierVide(ville);
  verifierVirgule(ville);
  verifierTexteLongueur(ville, 75);
}

// Valide le champ du code postal
function validerCodePostal() {
  const codepostal = document.getElementById("codepostal");
  return !(estVide(codepostal) || !validerCodePostalCanadien(codepostal));
}

// Affiche l'erreur liée au code postal
function afficherErrCodePostal() {
  const codepostal = document.getElementById("codepostal");
  verifierVide(codepostal);
  verifierCodePostalCanadien(codepostal);
}

// Vérifie que le code postal a un format canadien
function verifierCodePostalCanadien(champ) {
  if (validerCodePostalCanadien(champ)) {
    setErreur(champ, "<li>Doit avoir un format canadien. (ex: H2H 2L8)</li>");
  } else {
    setSucces(champ, "<li>Doit avoir un format canadien. (ex: H2H 2L8)</li>");
  }
}

// Valide si le code postal a un format canadien
function validerCodePostalCanadien(champ) {
  const regexCodePostal = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
  return !regexCodePostal.test(champ.value);
}

// Valide le formulaire
function validerFormulaire() {
  afficherErreurs();
  return (
    validerNom() &&
    validerEspece() &&
    validerRace() &&
    validerAge() &&
    validerDescription() &&
    validerCourriel() &&
    validerAdresseCivique() &&
    validerVille() &&
    validerCodePostal()
  );
}

// Affiche les erreurs
function afficherErreurs() {
  reinitialiserErr();
  afficherErrNom();
  afficherErrEspece();
  afficherErrRace();
  afficherErrAge();
  afficherErrDesc();
  afficherErrCourriel();
  afficherErrAdresse();
  afficherErrVille();
  afficherErrCodePostal();
}

// Réinitialise les erreurs
function reinitialiserErr() {
  const forms = document.querySelectorAll("form");
  const form = forms[0];

  Array.from(form.elements).forEach((input) => {
    const inputControl = input.parentElement;
    const control = inputControl.parentElement;
    const afficherErreur = control.querySelector(".erreur");
    afficherErreur.innerHTML = "";
  });
}

// Vérifie la longueur du nom
function verifierTexteNom(champ, longueurMin, longueurMax) {
  if (validerTexteNom(champ, longueurMin, longueurMax)) {
    setErreur(
      champ,
      "<li>Doit avoir entre " +
        longueurMin +
        " et " +
        longueurMax +
        " caractères.</li>"
    );
  } else {
    setSucces(
      champ,
      "<li>Doit avoir entre " +
        longueurMin +
        " et " +
        longueurMax +
        " caractères.</li>"
    );
  }
}

// Valide la longueur du nom
function validerTexteNom(champ, longueurMin, longueurMax) {
  return !(
    champ.value.length >= longueurMin && champ.value.length <= longueurMax
  );
}

// Valide la longueur du texte
function validerTexteLongueur(champ, longueurMax) {
  return champ.value.length > longueurMax;
}

// Vérifie la longueur du texte
function verifierTexteLongueur(champ, longueurMax) {
  if (validerTexteLongueur(champ, longueurMax)) {
    setErreur(
      champ,
      "<li>Vous avez dépassé la limite de caractères autorisée pour ce champ. (" +
        longueurMax +
        " caractères)</li>"
    );
  } else {
    setSucces(
      champ,
      "<li>Vous avez dépassé la limite de caractères autorisée pour ce champ. (" +
        longueurMax +
        " caractères)</li>"
    );
  }
}

// Valide la longueur du texte
function verifierTexte(champ, longueurMin) {
  if (validerTexte(champ, longueurMin)) {
    setErreur(
      champ,
      "<li>Vous devez entrer minimum " + longueurMin + " caractères</li>"
    );
  } else {
    setSucces(
      champ,
      "<li>Vous devez entrer minimum " + longueurMin + " caractères</li>"
    );
  }
}

// Valide la longueur du texte
function validerTexte(champ, longueurMin) {
  return champ.value.length < longueurMin;
}

//valide l'entree de la recherche par l'utilisateur
function validerRecherche() {
  reinitialiserErr();
  const recherche = document.getElementById("recherche");
  verifierVide(recherche);
  verifierTexte(recherche, 3);
  return !estVide(recherche) && !validerTexte(recherche, 3);
}

// Vérifie si le texte contient une virgule
function verifierVirgule(champ) {
  if (champ.value.includes(",")) {
    setErreur(champ, "<li>Aucun champ ne peut contenir de virgule.</li>");
  } else {
    setSucces(champ, "<li>Aucun champ ne peut contenir de virgule.</li>");
  }
}

// Vérifie si le champ contient une virgule
function contientVirgule(champ) {
  return champ.value.includes(",");
}

// Vérifie si l'élément est vide
function verifierVide(champ) {
  if (estVide(champ)) {
    setErreur(champ, "<li>Veuillez remplir ce champ</li>");
  } else {
    setSucces(champ, "<li>Veuillez remplir ce champ</li>");
  }
}

// Vérifie si le champ est vide
function estVide(champ) {
  return champ.value.trim() === "";
}

// Valide la valeur de l'âge
function validerValeurAge(champ) {
  const age = parseInt(champ.value);
  return isNaN(age) || age < 0 || age > 30;
}

// Vérifie la valeur de l'âge
function verifierValeurAge(champ) {
  if (validerValeurAge(champ)) {
    setErreur(champ, "<li>Doit avoir entre 0 et 30 ans.</li>");
  } else {
    setSucces(champ, "<li>Doit avoir entre 0 et 30 ans.</li>");
  }
}
