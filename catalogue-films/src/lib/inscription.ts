


export interface Inscription {
  prenom: string;
  email: string;
  motDePasse: string;
  confirmation: string;
  cgv: boolean;
}

export const valeursInitiales: Inscription = {
  prenom : "",
  email: "",
  motDePasse:"",
  confirmation:"",
  cgv:false,
};

export type Erreurs = Partial<Record<keyof Inscription,string>>;

export function valider(donnees:Inscription): Erreurs{
  const erreurs: Erreurs= {};
  if (donnees.prenom.trim().length < 2) {
    erreurs.prenom = "Le prénom doit contenir au moins 2 caractères";
  }
  if (!donnees.email.includes("@")) {
    erreurs.email = "L'email n'est pas valide";
  }
  if (donnees.motDePasse.length < 8) {
    erreurs.motDePasse = "Le mot de passe doit contenir au moins 8 caractères";
  }
  if (donnees.motDePasse !== donnees.confirmation) {
    erreurs.confirmation = "Les mots de passe ne correspondent pas";
  }
  if (!donnees.cgv) {
    erreurs.cgv = "Vous devez accepter les conditions générales";
  }
  return erreurs;
}

