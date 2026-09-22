


export interface ChampTexteProps {
  nom: string;                                     // sert d'id ET de name
  label: string;
  valeur: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";            // "text" par défaut
  erreur?: string;
  placeholder?: string;
}