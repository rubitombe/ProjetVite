import { Carte } from "./Carte";
import { Badge } from "./Badge";
import type { FilmOmdb } from "../lib/omdb";

export interface CarteFilmProps{
    film: FilmOmdb
}

const LIBELLES_TYPES: Record<string, string> = {
    movie: "Film",
    series: "Série",
    game: "Jeu",
};

export default function CarteFilm({film}: CarteFilmProps){
    const libelleType = LIBELLES_TYPES[film.Type] || film.Type;

    return (
        <Carte titre={film.Title} sousTitre={film.Year}>
            <div style={{ marginBottom: "1rem"}}>
            {film.Poster === "N/A" ? (
                <div
                style={{
              width: "100%",
              height: "300px",
              backgroundColor: "#ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              color: "#666",
            }}
          >
            Pas d'affiche
          </div>
        ) : (
          <img
            src={film.Poster}
            alt={`Affiche de ${film.Title}`}
            style={{ width: "100%", height: "auto", borderRadius: "4px" }}
          />
        )}
      </div>
      <div>
        <Badge texte={libelleType} ton="info"/>
      </div>
    </Carte>
  );
}