import axios from "axios";

export const JornadaFormalApi = axios.create({
    baseURL: 'https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/'
})