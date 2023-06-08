import axios from "axios";

export const jornadasNoFormalesAPI = axios.create({
  baseURL: "https://ms-jornada-no-formal-2.herokuapp.com/",
});
