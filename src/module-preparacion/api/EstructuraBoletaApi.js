import axios from "axios";

export const EstructuraBoletaApi = axios.create({
  baseURL:
    "https://ms-jornada-elec-nl-2.herokuapp.com/jornada/electoral/estructuraboleta/",
});
