import {useState} from "react;"

import { valeursInitiales } from "../lib/inscription";

const [donnees, setDonnees] = useState<Inscription>
(valeursInitiales);
const [erreurs, setErreurs] = useState<Erreur>({});
const [envoiEnCours, setEnvoiEnCours] = useState(false);

