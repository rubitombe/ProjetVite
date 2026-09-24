import type { FilmOmdb, ReponseRecherche } from "../lib/omdb";
import { getUrlRecherche} from "../lib/omdb";
import {useEffect, useState} from "react";
import CarteFilm from "./CarteFilm";

export default function RechercheFilms(){
const [films, setFilms] = useState<FilmOmdb[]>([]);
const [chargement, setChargement] = useState(false);
const [erreur, setErreur] = useState<string | null>(null);
const [terme, setTerme] = useState("");
useEffect(()=>{
    if (!terme.trim()) {
        setFilms([]);
        setChargement(false);
        setErreur(null);
        return;
    }
    const controleur = new AbortController();

    async function effectuerRecherche() {
      setChargement(true);
      setErreur(null);

      try {
        const reponse = await fetch(getUrlRecherche(terme), {
          signal: controleur.signal,
        });

        if (!reponse.ok) {
          throw new Error(`Erreur HTTP : ${reponse.status}`);
        }

        const donnees: ReponseRecherche = await reponse.json();

        if (donnees.Response === "False") {
          setFilms([]);
          if (donnees.Error === "Movie not found!") {
            setErreur(null);
          } else {
            setErreur(donnees.Error || "Une erreur est survenue");
          }
        } else {
          setFilms(donnees.Search || []);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setErreur(
          err instanceof Error ? err.message : "Une erreur inconnue est survenue"
        );
      } finally {
        setChargement(false);
      }
    }

    effectuerRecherche();

    return () => {
      controleur.abort();
    };
  }, [terme]);

  function rendreContenu() {
    if (!terme.trim()) {
      return <p>Tapez un titre pour lancer la recherche.</p>;
    }

    if (chargement) {
      return <p>Chargement…</p>;
    }

    if (erreur) {
      return <p style={{ color: "red" }}>{erreur}</p>;
    }

    if (films.length === 0) {
      return <p>Aucun film ne correspond à « {terme} ».</p>;
    }

    return (
      <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", listStyle: "none", padding: 0 }}>
        {films.map((film) => (
          <li key={film.imdbID}>
            <CarteFilm film={film} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1rem" }}>
      <input
        type="text"
        value={terme}
        onChange={(e) => setTerme(e.target.value)}
        placeholder="Rechercher un film..."
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1.5rem" }}
      />
      <div>{rendreContenu()}</div>
    </div>
  );
}
