import {
  votoconsultaAPI,
  votoFormalAPI,
  votoNoFormalAPI,
} from "./configVotoFormal";

export const crearBoletaFormalProvider = async (data) => {
  return votoFormalAPI
    .post(`votos_seguros/crear/boletas`, data)
    .then((response) => {
      return {
        ok: true,
        mensaje: response.data.mensaje,
        data: response.data,
        errorMessage: "",
      };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, data: "", errorMessage: error.message };
    });
};

export const crearBoletasNoFormalProvider = async (data) => {
  return votoNoFormalAPI
    .post(`votos/no/formal/crear/boletas`, data)
    .then((response) => {
      console.log(response.data);
      return {
        ok: true,
        mensaje: response.data.mensaje,
        data: response.data,
        errorMessage: "",
      };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, data: "", errorMessage: error.message };
    });
};

export const crearBoletasConsultaProvider = async (data) => {
  return votoconsultaAPI
    .post(`votos/consulta/crear/boletas`, data)
    .then((response) => {
      console.log(response.data);
      return {
        ok: true,
        mensaje: response.data.mensaje,
        data: response.data,
        errorMessage: "",
      };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, data: "", errorMessage: error.message };
    });
};

export const getFlagBoletasConsultasProvider = async (idBoleta) => {
  return votoconsultaAPI
    .get(`votos/consulta/verificar/boletas/jornada/` + idBoleta)
    .then((response) => {
      return {
        ok: true,
        mensaje: response.data.mensaje,
        data: response.data,
        errorMessage: "",
      };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, data: "", errorMessage: error.message };
    });
};
