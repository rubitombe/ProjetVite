import type { InscriptionEnregistree } from "../App";
import { Badge } from "./Badge";
import { Carte } from "./Carte";
import { Bouton } from "./Bouton";


export interface ListeInscriptionProps{
    inscriptions: InscriptionEnregistree[];
    onSuppression?: (id: number) => void;
}

export function ListeInscription({inscriptions, onSuppression}: ListeInscriptionProps){
    if(inscriptions.length === 0){
        return <p className="text-slate-500 italic text-center py-8">Aucune inscription pour le moment.</p>
    ;
}
return (
    <ul className="grid grid-cols-1 gap-4">
      {inscriptions.map((inscription) => (
        <li key={inscription.id}>
          <Carte
            titre={inscription.prenom}
            sousTitre={inscription.email}
            actions={
              onSuppression ? (
                <Bouton
                  libelle="Supprimer"
                  variante="danger"
                  onClick={() => onSuppression(inscription.id)}
                />
              ) : undefined
            }
          >
            {inscription.cgv && (
              <Badge texte="CGV acceptées" ton="succes" />
            )}
          </Carte>
        </li>
      ))}
    </ul>
  );
}
