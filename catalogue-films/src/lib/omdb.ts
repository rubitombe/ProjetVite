//http://www.omdbapi.com/?apikey=7953c567&s=batman

export interface FilmOmdb {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;      // "movie" | "series" | "game" — l'API n'est pas plus précise
  Poster: string;    // une URL, ou la chaîne "N/A"
}

export interface ReponseRecherche {
  Search?: FilmOmdb[];       // absent quand la recherche échoue
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

function getUrlRecherche(titre: string): string {
  const url = new URL("http://www.omdbapi.com/");
  url.searchParams.set("apikey", "7953c567");
  url.searchParams.set("s", titre);
  return url.toString();
}
