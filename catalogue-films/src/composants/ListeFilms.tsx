import type { Film, StatutFilm } from "../lib/utils";
import { Carte } from "./Carte";
import { Badge } from "./Badge";
import type { TonBadge } from "./Badge";
import { Bouton } from "./Bouton";

export interface ListeFilmsProps {
  films: Film[];
  messageVide?: string;
  onSelection?: (film: Film) => void;
}

const statutAffichage: Record<StatutFilm, { libelle: string; ton: TonBadge }> = {
  vu: { libelle: "Déjà vu", ton: "succes" },
  a_voir: { libelle: "À voir", ton: "info" },
  abandonne: { libelle: "Abandonné", ton: "neutre" },
};

export function ListeFilms({ films, messageVide = "Aucun film.", onSelection }: ListeFilmsProps) {
  if (films.length === 0) {
    return <p className="rounded-lg bg-slate-100 p-6 text-center text-slate-500">{messageVide}</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {films.map((film) => {
        const { libelle, ton } = statutAffichage[film.statut];
        return (
          <li key={film.id}>
            <Carte
              titre={film.titre}
              sousTitre={`${film.annee} — ${film.note}/10`}
              actions={
                onSelection ? (
                  <Bouton libelle="Détails" onClick={() => onSelection(film)} />
                ) : undefined
              }
            >
              <div className="flex flex-wrap gap-1">
                <Badge texte={libelle} ton={ton} />
                {film.genres.map((genre) => (
                  <Badge key={genre} texte={genre} />
                ))}
              </div>
            </Carte>
          </li>
        );
      })}
    </ul>
  );
}
