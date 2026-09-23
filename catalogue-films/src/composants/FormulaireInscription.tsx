import {useState} from "react";
import type { ChangeEvent, FormEvent } from "react";
import { valeursInitiales, valider } from "../lib/inscription";
import type { Inscription, Erreurs } from "../lib/inscription";
import { ChampTexte } from "./ChampTexte";
import { Bouton } from "./Bouton";

export interface FormulaireInscriptionProps {
    onInscription: (donnees: Inscription)=> void;
}
export function FormulaireInscription({onInscription}: FormulaireInscriptionProps){
const [donnees, setDonnees] = useState<Inscription>
(valeursInitiales);
const [erreurs, setErreurs] = useState<Erreurs>({});
const [envoiEnCours, setEnvoiEnCours] = useState(false);

const gererSaisie = (e: ChangeEvent<HTMLInputElement>) => {
 const { name, value, type, checked } = e.target;
 const valeur = type === "checkbox" ? checked : value;
 setDonnees((d) => ({ ...d, [name]: valeur }));   // clé dynamique
};

const gererEnvoi = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const trouvees = valider(donnees);
  setErreurs(trouvees);
  if (Object.keys(trouvees).length > 0) return;
  
  setEnvoiEnCours(true);
  window.setTimeout(() =>{
    onInscription(donnees);
    setDonnees(valeursInitiales);
    setErreurs({});
    setEnvoiEnCours(false);
  }, 400);
};

  return (
    <form onSubmit={gererEnvoi} noValidate className="flex flex-col gap-4">
      <ChampTexte
        nom="prenom"
        label="Prénom"
        valeur={donnees.prenom}
        onChange={gererSaisie}
        erreur={erreurs.prenom}
      />
      <ChampTexte
        nom="email"
        label="Email"
        type="email"
        valeur={donnees.email}
        onChange={gererSaisie}
        erreur={erreurs.email}
      />
      <ChampTexte
        nom="motDePasse"
        label="Mot de passe"
        type="password"
        valeur={donnees.motDePasse}
        onChange={gererSaisie}
        erreur={erreurs.motDePasse}
      />
      <ChampTexte
        nom="confirmation"
        label="Confirmation"
        type="password"
        valeur={donnees.confirmation}
        onChange={gererSaisie}
        erreur={erreurs.confirmation}
      />

      <div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="cgv"
            checked={donnees.cgv}
            onChange={gererSaisie}
          />
          J'accepte les CGV
        </label>
        {erreurs.cgv && <p className="text-sm text-red-600">{erreurs.cgv}</p>}
      </div>

      <Bouton
        libelle={envoiEnCours ? "Envoi en cours…" : "S'inscrire"}
        type="submit"
        desactive={envoiEnCours}
      />
    </form>
  );
}
