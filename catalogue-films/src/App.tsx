

import RechercheFilms from "./composants/RechercheFilms";


export default function App(){
  
  return (
    <main className="max-w-5xl mx-auto p-4">
      <section className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Recherche de Films</h1>
        <p className ="text-gray-500 text-sm mt-1 mb-4"> Données fournies par l'API </p>
        <RechercheFilms />
      </section>
    </main>
  );

}