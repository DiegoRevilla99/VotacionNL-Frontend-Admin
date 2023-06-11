import { JornadaNoFormalApi } from "../../module-jornada/api/JornadaNoFormalApi";

export const getJornadasNoFormalesProvider = async () => {
  return JornadaNoFormalApi.get(`informacion`)
    .then((response) => {
      console.log("Jornadas no formales: ", response);
      return { ok: true, data: response.data, errorMessage: "" };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, data: "", errorMessage: error.message };
    });
};

export const getEleccionConfigByIdProvider = async (idEleccion) => {
  return JornadaNoFormalApi.get(`${idEleccion}/informacion`)
    .then((response) => {
      return { ok: true, data: response.data, errorMessage: "" };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, data: "", errorMessage: error.message };
    });
};
