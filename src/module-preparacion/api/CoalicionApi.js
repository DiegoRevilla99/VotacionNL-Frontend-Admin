import axios from "axios";

export const CoalicionApi = axios.create({
    baseURL: 'https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/coalicion'
})