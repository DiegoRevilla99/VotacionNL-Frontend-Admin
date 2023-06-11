import { consultasAPI } from "./config";

let idConsultas = 0;
let idPapeleta = 0;

export const getConsultasCiudadanas = async () => {
  try {
    const { data } = await consultasAPI.get("jornada/consulta/");
    return { ok: true, data: data.data, errorMessage: "" };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error.message };
  }
};

export const getConsultasCiudadanasConfig = async () => {
  try {
    const { data } = await consultasAPI.get("jornada/consulta/informacion");
    console.log("DATA: ", data);
    return { ok: true, data: data, errorMessage: "" };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error.message };
  }
};

export const getConsultaConfigbyID = async (idJornada) => {
  try {
    const { data } = await consultasAPI.get(
      `jornada/consulta/${idJornada}/informacion`
    );

    return { ok: true, data: data, errorMessage: "" };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error.message };
  }
};

export const createConsultaCiudadana = async (titulo, entidad) => {
  // const id = "JEO-JUN23-GOB" + Math.floor(Math.random() * 10000);
  try {
    console.log(titulo, entidad);
    const { data } = await consultasAPI.post("jornada/consulta/", {
      nombreJornada: titulo,
      dateTimeCreation: "2019-07-04T20:38:38.604+00:00",
      entidad: entidad,
      userCreation: "DEFAULT",
    });

    // console.log("RESP CREACIÓN CONSULTA: ", resp);
    // await timeout(1000);
    // idConsultas++;
    return { ok: true, id: data.data.idJornada };
  } catch (error) {
    console.log(error.message);
    return { ok: false };
  }
};

export const deleteConsultaCiudadana = async (id) => {
  try {
    const resp = await consultasAPI.delete("jornada/consulta/" + id);
    return { ok: true };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const getPapeletas = async (idConsulta) => {
  try {
    // **FETCH
    const { data } = await consultasAPI.get(
      "jornada/consulta/jornada/" + idConsulta + "/papeletas"
    );

    // console.log("RESPUESTA PAPELETAS: ", resp);

    return { ok: true, data: data.data };
  } catch (error) {
    return { ok: false };
  }
};

export const saveConfig = async (id, data) => {
  try {
    const resp = await consultasAPI.post(
      "jornada/consulta/" + id + "/configuracion",
      {
        inicioDisponibilidad: data.inicioDisponibilidad,
        inicioEmpadronamiento: data.inicioEmpadronamiento,
        inicioRecepVoto: data.inicioRecepcionVotos,
        inicioAssignPass: data.inicioAsignacionContrasenia,
        finDisponibilidad: data.finDisponibilidad,
        finEmpadronamiento: data.finEmpadronamiento,
        finRecepVoto: data.finRecepcionVotos,
        finAssignPass: data.finAsignacionContrasenia,
        idJornada: id,
      }
    );
    const resp1 = await consultasAPI.post(
      "jornada/consulta/" + id + "/configuracionvoto",
      {
        tiempoDuracionVoto: data.tiempoDuracionRespuesta,
        tiempoExtraVoto: data.tiempoExtra,
        dispVerificacion: data.habilitarVerificacion,
        jornadaModel: {
          idJornada: id,
        },
      }
    );

    console.log("RESPUESTA PAPELETAS: ", resp, resp1);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error.message };
  }
};
export const getConfig = async (id) => {
  try {
    const { data } = await consultasAPI.get(
      "jornada/consulta/consulta/" + id + "/data"
    );
    let dataFull = {};
    const data1 = data.data[1];
    const data2 = data.data[2];
    dataFull = { ...data1, ...data2 };
    console.log("DATA FULL", dataFull);

    return { ok: true, data: dataFull.idConfig === null ? {} : dataFull };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const getBallotData = async (idBallot) => {
  try {
    // **FETCH

    const { data } = await consultasAPI.get(
      "jornada/consulta/estructurapapeleta/" + idBallot
    );

    // **Fetch de preguntas
    const { data: data1 } = await consultasAPI.get(
      "jornada/consulta/papeleta/" + idBallot + "/pregunta"
    );

    console.log("DATA PREGUNTA1", data1);

    const formatQuestion = {
      id: data1.data.idPregunta,
      pregunta: data1.data.descPregunta,
      tipoDeRespuesta: data1.data.tipoRespuesta,
      tipoCerrada: "",
      respuesta1: data1.data.opcion1,
      respuesta2: data1.data.opcion2,
      respuesta3: data1.data.opcion3,
      respuesta4: data1.data.opcion4,
      respuesta5: data1.data.opcion5,
    };

    const format = {
      encabezadoConsulta: data.data.nombre,
      distritoElectoral: data.data.distrito,
      municipio: data.data.municipio,
      nombrePrimerFirmante: data.data.primerFirmanteNombre,
      cargoPrimerFirmante: data.data.primerFirmanteCargo,
      nombreSegundoFirmante: data.data.segundoFirmanteNombre,
      cargoSegundoFirmante: data.data.segundoFirmanteCargo,
    };

    return { ok: true, data: format, dataQuestion: formatQuestion };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const createPapeleta = async (data, idConsulta, questions) => {
  try {
    console.log("DATA QUE LLEGA", questions);
    const { data: data1 } = await consultasAPI.post(
      "jornada/consulta/estructurapapeleta",
      {
        nombre: data.encabezadoConsulta,
        distrito: data.distritoElectoral,
        municipio: data.municipio,
        primerFirmanteNombre: data.nombrePrimerFirmante,
        primerFirmanteCargo: data.cargoPrimerFirmante,
        segundoFirmanteNombre: data.nombreSegundoFirmante,
        segundoFirmanteCargo: data.cargoSegundoFirmante,
        jornadaModel: {
          idJornada: idConsulta,
        },
      }
    );

    const { data: questionRespData } = await consultasAPI.post(
      "jornada/consulta/papeleta/" + data1.data.idPapeleta + "/pregunta",
      {
        descPregunta: questions[0].pregunta,
        tipoRespuesta: questions[0].tipoDeRespuesta,
        subtipo: questions[0].subtipo,
        opcion1: questions[0].respuesta1,
        opcion2: questions[0].respuesta2,
        opcion3: questions[0].respuesta3,
        opcion4: questions[0].respuesta4,
        opcion5: questions[0].respuesta5,
      }
    );

    console.log("Data de respuesta", questionRespData);

    return { ok: true, idPapeleta: data1.data.idPapeleta };
  } catch (error) {
    console.log("ERROR", error);
    return { ok: false, errorMessage: error.message };
  }
};

export const updateBallotData = async (
  data,
  questions,
  idConsulta,
  idPapeleta
) => {
  try {
    console.log("DATA QUE LLEGA UPDATE", questions);
    const { data: data1 } = await consultasAPI.put(
      "jornada/consulta/estructurapapeleta/" + idPapeleta,
      {
        nombre: data.encabezadoConsulta,
        distrito: data.distritoElectoral,
        municipio: data.municipio,
        primerFirmanteNombre: data.nombrePrimerFirmante,
        primerFirmanteCargo: data.cargoPrimerFirmante,
        segundoFirmanteNombre: data.nombreSegundoFirmante,
        segundoFirmanteCargo: data.cargoSegundoFirmante,
        jornadaModel: {
          idJornada: idConsulta,
        },
      }
    );

    const { data: questionRespData } = await consultasAPI.put(
      "jornada/consulta/pregunta/" + questions[0].id,
      {
        descPregunta: questions[0].pregunta,
        tipoRespuesta: questions[0].tipoDeRespuesta,
        subtipo: questions[0].subtipo,
        opcion1: questions[0].respuesta1,
        opcion2: questions[0].respuesta2,
        opcion3: questions[0].respuesta3,
        opcion4: questions[0].respuesta4,
        opcion5: questions[0].respuesta5,
        estructuraPapeletaModel: {
          idPapeleta: idPapeleta,
        },
      }
    );

    console.log("Data de respuesta", questionRespData);

    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const deleteBallot = async (id) => {
  try {
    const resp = await consultasAPI.delete(
      "jornada/consulta/estructurapapeleta/" + id
    );
    return { ok: true };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
