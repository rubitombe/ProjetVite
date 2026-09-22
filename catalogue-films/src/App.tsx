import { FILMS, trierPar, filtrerParGenre } from "./lib/utils";
import { ListeFilms } from "./composants/ListeFilms";
import type { genres } from "./lib/utils";
 
 
function App() {
  const filmsTries = trierPar(FILMS, "titre");
  const documentaires = filtrerParGenre(FILMS, "Documentaire" as genres);
 
  return (
    <main className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Catalogue de films</h1>
 
      <section>
        <h2 className="text-xl font-semibold mb-4">Tous les films</h2>
        <ListeFilms films={filmsTries} messageVide="Aucun film trouvé" />
      </section>
 
      <section>
        <h2 className="text-xl font-semibold mb-4">Documentaires</h2>
        <ListeFilms
          films={documentaires}
          messageVide="Aucun documentaire dans le catalogue pour le moment."
        />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Les quatre états du composant bouton</h2>
 
        <div className="flex gap-4 flex-wrap">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Action principale</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded">Action secondaire</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded">Supprimer</button>
          <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed">
            Indisponible
          </button>
        </div>
      </section>
    </main>
  );
}
 
export default App;
 