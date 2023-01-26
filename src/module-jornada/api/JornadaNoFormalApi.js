import axios from "axios";

export const JornadaNoFormalApi = axios.create({
    baseURL: 'https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/'
})