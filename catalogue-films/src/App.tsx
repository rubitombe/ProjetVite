import { useState } from "react";
import type { Inscription } from "./lib/inscription";
import { ListeInscription } from "./composants/ListeInscription";
import { FormulaireInscription } from "./composants/FormulaireInscription";


export type InscriptionEnregistree = Omit<Inscription, "motDePasse" | "confirmation"> & {id: number};

export default function App(){
  const [inscriptions, setInscriptions] = useState<InscriptionEnregistree[]>([]);


  const ajouterInscription = (donnees: Inscription)=>{
    const { motDePasse, confirmation, ...rest } = donnees;
    const nouvelleInscription: InscriptionEnregistree = {
      ...rest,
      id: Date.now()
    };
    setInscriptions((liste) => [nouvelleInscription, ...liste]);
  }

  const supprimerInscription = (id: number) => {
    setInscriptions((liste) => liste.filter((item) => item.id !== id));
  };
  return (
    <main className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">Créer un compte</h1>
        <FormulaireInscription onInscription={ajouterInscription} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Inscrits</h2>
        <ListeInscription
          inscriptions={inscriptions}
          onSuppression={supprimerInscription}
        />
      </section>
    </main>
  );

}