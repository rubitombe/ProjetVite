


export interface Inscription {
  prenom: string;
  email: string;
  motDePasse: string;
  confirmation: string;
  cgv: boolean;
}

export const valeursInitiales: Inscription = {
    prenom
};

export type Erreurs = Partial<Record<keyof Inscription,string>>;

export function valider(donnees:Inscription): Erreurs{

}