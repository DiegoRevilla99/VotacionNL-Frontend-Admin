import { ImagesAPI } from "./configImage";
import { jornadasNoFormalesAPI } from "./configNoFormales";
let idEleccion = 0;
let idBoleta = 0;

export const getJornadasNoFormales = async () => {
  try {
    const { data } = await jornadasNoFormalesAPI.get("jornada/no_formal/elecciones");
    console.log("data del provider", data);
    return { ok: true, data: data, errorMessage: "" };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const createJornada = async (title, tipoEleccion) => {
  // const id = "JEO-JUN23-GOB" + Math.floor(Math.random() * 10000);
  try {
    const { data } = await jornadasNoFormalesAPI.post("jornada/no_formal/", {
      // idEleccion: id,
      nombreEleccion: title,
      dateTimeCreation: "2019-07-04T20:38:38.604+00:00",
      userCreation: "DEFAULT",
      tipoEleccion: tipoEleccion,
    });
    return { ok: true, id: data.idEleccion };
  } catch (error) {
    return { ok: false };
  }
};

export const deleteJornada = async (id) => {
  try {
    const resp = await jornadasNoFormalesAPI.delete("jornada/no_formal/" + id);
    return { ok: true };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const getBoletasJornadaNoFormal = async (idJornadaElectoral) => {
  try {
    // **FETCH
    const { data } = await jornadasNoFormalesAPI.get(
      `jornada/no_formal/${idJornadaElectoral}/boletas`
    );
    return { ok: true, data: data, errorMessage: "" };
  } catch (error) {
    console.log("Error al obtener las boletas: ", error);
    return { ok: false };
  }
};


export const getModalidades = async () => {
  try {
    // **FETCH
    const { data } = await jornadasNoFormalesAPI.get(
      `jornada/no_formal/modalidades`
      // `jornada/no_formal/${idJornadaElectoral}/boletas`
      // https://ms-jornada-no-formal-2.herokuapp.com/jornada/no_formal/modalidades
    );
    return { ok: true, data: data, errorMessage: "" };
  } catch (error) {
    console.log("Error al obtener las modalidades: ", error);
    return { ok: false };
  }
};

export const getCandidatoBoletaNoFormal = async (idJornadaElectoral) => {
  try {
    // **FETCH
    const { data } = await jornadasNoFormalesAPI.get(
      `jornada/no_formal/candidato/estructura_boleta/${idJornadaElectoral}/candidatos`
    );
    console.log("Data candidatos: ", data);
    return { ok: true, data: data };
  } catch (error) {
    console.log("Error al obtener las boletas: ", error);
    return { ok: false };
  }
};

export const postImage = async (file) => {
  try {
    const formData1 = new FormData();
    formData1.append("file", file);
    const response = await ImagesAPI.post("file/upload", formData1);
    console.log(response);
    return { ok: true, data: response.data.link, errorMessage: "" };
  } catch (error) {
    console.log("Error la imagen: ", error);
    return { ok: false };
  }
};

export const getBoletaData = async (idBoleta) => {
  try {
    // console.log("ID BOLETA: ", idBoleta);
    // **FETCH
    const { data } = await jornadasNoFormalesAPI.get(
      `jornada/no_formal/estructura_boleta/${idBoleta}`
    );
    // **Fetch de candidatos
    const { data: data1 } = await jornadasNoFormalesAPI.get(
      `jornada/no_formal/estructura_boleta/${idBoleta}/candidatos`
    );
    // **Fetch de asociaciones
    const { data: data2 } = await jornadasNoFormalesAPI.get(
      `jornada/no_formal/estructura_boleta/${idBoleta}/asociaciones_candidatos`
    );
    //asociaciones
    const { data: data3 } = await jornadasNoFormalesAPI.get(
      `jornada/no_formal/estructuras/boleta/${idBoleta}/modalidad`
    );
    // console.log("Data boleta: ", data);
    // console.log("Data boleta y candidato: ", data1);
    // // console.log("Data models todos los candidatos: ", data1.candidatoModels);
    console.log("Data asociacion: ", data2);
    // console.log("Data modalidad: ", data3.modalidadVotacionModel.idModalidadVotacion);
    const format = {
      // MY FORMAT || API FORMAT
      id: data.idEstructuraBoleta,
      encabezado: data.encabezadoBoleta,
      entidadFederativa: data.entidadFederativa,
      municipio: data.municipio,
      primerFirmante: data.primerFirmanteNombre,
      cargoPrimerFirmante: data.primerFirmanteCargo,
      segundoFirmante: data.segundoFirmanteNombre,
      cargoSegundoFirmante: data.segundoFirmanteCargo,
      modalidadVotacion: data3.modalidadVotacionModel.idModalidadVotacion,
    };
    console.log("Format boleta: ", format);
    const formatCandidato = data1.candidatoModels.map((candidato) => {
      return {
        id: "",
        claveCandidato: candidato.claveCandidato,
        apellidoPCandidato: candidato.apellidoPCandidato,
        apellidoMCandidato: candidato.apellidoMCandidato,
        nombreCandidato: candidato.nombreCandidato,
        fotografiaCandidato: candidato.fotoCandidato,
        seudonimoCandidato: candidato.seudonimoCandidato,
        fechaNacimientoCandidato: candidato.fechaNacimiento,
        generoCandidato: candidato.genero,
      };
    });
    //   console.log("format candidato: ", formatCandidato);
    // console.log("format candidato: ", formatCandidato);
    // Formatear datos de asociaciones y candidatos
    const formatAsociaciones = data2.map((asociacion) => {
      // console.log("formatAsociaciones: ", asociacion.asociacionModel);
      const formatCandidatos = asociacion.candidatos.map((candidato) => {
        return {
          id: "",
          claveCandidato: candidato.claveCandidato,
          apellidoPCandidato: candidato.apellidoPCandidato,
          apellidoMCandidato: candidato.apellidoMCandidato,
          nombreCandidato: candidato.nombreCandidato,
          fotografiaCandidato: candidato.fotoCandidato,
          seudonimoCandidato: candidato.seudonimoCandidato,
          fechaNacimientoCandidato: candidato.fechaNacimiento,
          generoCandidato: candidato.genero,
        };
      });
      return {
        id: asociacion.asociacionModel.idAsociacion,
        nombreAsociacion: asociacion.asociacionModel.nombreAsociacion,
        emblema: asociacion.asociacionModel.emblema,
        logo: asociacion.asociacionModel.logo,
        candidatosAsociacion: formatCandidatos,
      };
    });
    // console.log("format asociaciones: ", formatAsociaciones);

    return {
      ok: true,
      data: format,
      dataCandidato: formatCandidato,
      dataAsociacion: formatAsociaciones,
    };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const createBoleta = async (data, idJornadaElectoral, candidatos) => {
  try {
    console.log("data PROVIDER: ", data);
    console.log("idJornadaElectoral PROVIDER: ", idJornadaElectoral);
    console.log("candidatos PROVIDER: ", candidatos);
    // console.log("asociaciones PROVIDER: ", asociaciones);
    const { data: data1 } = await jornadasNoFormalesAPI.post("jornada/no_formal/estructuraboleta", {
      encabezadoBoleta: data.encabezado,
      entidadFederativa: data.entidadFederativa,
      municipio: data.municipio,
      primerFirmanteNombre: data.primerFirmante,
      primerFirmanteCargo: data.cargoPrimerFirmante,
      segundoFirmanteNombre: data.segundoFirmante,
      segundoFirmanteCargo: data.cargoSegundoFirmante,
      modalidadVotacionModel: {
        // idModalidadVotacion: 1,
        idModalidadVotacion: data.modalidadVotacion,
      },
      eleccionModel: {
        idEleccion: idJornadaElectoral,
      },
    });

    console.log("hjaber la peticion", data1);
      // const candidatoDatos = {
      //   // id: candidatos[0].id,
      //   claveCandidato: candidatos[0].claveCandidato,
      //   apellidoPCandidato: candidatos[0].apellidoPCandidato,
      //   apellidoMCandidato: candidatos[0].apellidoMCandidato,
      //   nombreCandidato: candidatos[0].nombreCandidato,
      //   fotoCandidato: candidatos[0].fotografiaCandidato,
      //   seudonimoCandidato: candidatos[0].seudonimoCandidato,
      //   fechaNacimiento: candidatos[0].fechaNacimientoCandidato,
      //   genero: candidatos[0].generoCandidato,
      // };

      // const candidatoData = await jornadasNoFormalesAPI.post(
      //   "jornada/no_formal/" + data1.idEstructuraBoleta + "/registrar_candidato",
      //   candidatoDatos
      // );


      for (const candidato of candidatos) {
        const candidatoDatos = {
          claveCandidato: candidato.claveCandidato,
          apellidoPCandidato: candidato.apellidoPCandidato,
          apellidoMCandidato: candidato.apellidoMCandidato,
          nombreCandidato: candidato.nombreCandidato,
          fotoCandidato: candidato.fotografiaCandidato,
          seudonimoCandidato: candidato.seudonimoCandidato,
          fechaNacimiento: candidato.fechaNacimientoCandidato,
          genero: candidato.generoCandidato,
        };
    
        const candidatoData = await jornadasNoFormalesAPI.post(
          "jornada/no_formal/" + data1.idEstructuraBoleta + "/registrar_candidato",
          candidatoDatos
        );
      }
    



    return { ok: true, idEstructuraBoleta: data1.idEstructuraBoleta };
  } catch (error) {
    console.log("ERROR", error);
    return { ok: false, errorMessage: error.message };
  }
};

export const createBoletaAsociaciones = async (
  data,
  idJornadaElectoral,
  candidatos,
  asociaciones
) => {
  try {
    console.log("data PROVIDER: ", data);
    console.log("idJornadaElectoral PROVIDER: ", idJornadaElectoral);
    console.log("candidatos PROVIDER: ", candidatos);
    console.log("asociaciones PROVIDER: ", asociaciones);

    const boletaAsosiaciones = {
      estructuraBoletaModel: {
        encabezadoBoleta: data.encabezado,
        entidadFederativa: data.entidadFederativa,
        municipio: data.municipio,
        primerFirmanteNombre: data.primerFirmante,
        primerFirmanteCargo: data.cargoPrimerFirmante,
        segundoFirmanteNombre: data.segundoFirmante,
        segundoFirmanteCargo: data.cargoSegundoFirmante,
        modalidadVotacionModel: {
          idModalidadVotacion: data.modalidadVotacion,
        },
        eleccionModel: {
          idEleccion: idJornadaElectoral,
        },
      },
      asociaciones: [],
    };

    // Recorre la lista de asociaciones
    for (const asociacion of asociaciones) {
      const boletaAsociacion = {
        asociacionModel: {
          nombreAsociacion: asociacion.nombreAsociacion,
          emblema: asociacion.emblema,
          logo: asociacion.logo,
        },
        candidatos: [],
      };

      // Recorre la lista de candidatos de la asociación actual
      for (const candidato of asociacion.candidatosAsociacion) {
        const candidatoObject = {
          claveCandidato: candidato.claveCandidato,
          apellidoPCandidato: candidato.apellidoPCandidato,
          apellidoMCandidato: candidato.apellidoMCandidato,
          nombreCandidato: candidato.nombreCandidato,
          fotoCandidato: candidato.fotografiaCandidato,
          seudonimoCandidato: candidato.seudonimoCandidato,
          fechaNacimiento: candidato.fechaNacimientoCandidato,
          genero: candidato.generoCandidato,
        };

        boletaAsociacion.candidatos.push(candidatoObject);
      }

      boletaAsosiaciones.asociaciones.push(boletaAsociacion);
    }

    //   console.log("boletaAsosiaciones cuerpo", boletaAsosiaciones);
    const asociacionData = await jornadasNoFormalesAPI.post(
      "jornada/no_formal/boletaasociaciones",
      // "jornada/no_formal/boletaasociaciones",
      boletaAsosiaciones
    );
    console.log("asociacionData regreso de la peticion", asociacionData);
    // console.log("id de la boleta de la peticion", asociacionData.data.data.estructuraBoletaModel.idEstructuraBoleta);

    return {
      ok: true,
      idEstructuraBoleta: asociacionData.data.data.estructuraBoletaModel.idEstructuraBoleta,
    };
  } catch (error) {
    console.log("ERROR", error);
    return { ok: false, errorMessage: error.message };
  }
};

export const updateBoletaData = async (
  data,
  idJornadaElectoral,
  candidatos,
  idBoleta
) => {
  try {
    console.log("data provider", data);
    const { data: data1 } = await jornadasNoFormalesAPI.put(
      "jornada/no_formal/estructura_boleta/" + idBoleta,
      {
        encabezadoBoleta: data.encabezado,
        // modalidadVotacion: data.modalidadVotacion,
        entidadFederativa: data.entidadFederativa,
        municipio: data.municipio,
        primerFirmanteNombre: data.primerFirmante,
        primerFirmanteCargo: data.cargoPrimerFirmante,
        segundoFirmanteNombre: data.segundoFirmante,
        segundoFirmanteCargo: data.cargoSegundoFirmante,
        modalidadVotacionModel: {
          idModalidadVotacion: data.modalidadVotacion,
        },
        eleccionModel: {
          idEleccion: idJornadaElectoral,
        },
      }
    );

    // Candidato
    candidatos.forEach(async (candidato) => {

      const { data: candidateRespData } = await jornadasNoFormalesAPI.put(
        "jornada/no_formal/candidato/" + candidato.claveCandidato,
        {
         claveCandidato: candidato.curp,
         apellidoPCandidato: candidato.apellidoPCandidato,
         apellidoMCandidato: candidato.apellidoMCandidato,
         nombreCandidato: candidato.nombreCandidato,
         fotoCandidato: candidato.fotografiaCandidato,
         seudonimoCandidato: candidato.seudonimoCandidato,
         fechaNacimiento: candidato.fechaNacimientoCandidato,
         // fechaNacimiento: "2019-07-04T20:38:38.604+00:00",
         genero: candidato.generoCandidato,
       }
      );
      console.log("Data candidato de respuesta", candidateRespData);
    });
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};
export const updateBoletaAsociacionData = async (
  data,
  idJornadaElectoral,
  candidatos,
  asociaciones,
  idBoleta
) => {
  try {
    console.log("data provider", data);
    console.log("idJornadaElectoral provider", idJornadaElectoral);
    console.log("candidatos provider", candidatos);
    console.log("asociaciones provider", asociaciones);
    // console.log("idBoleta provider",idBoleta.listBoletas[0].idEstructuraBoleta);
    console.log("idBoleta provider", idBoleta);

    
    const { data: data1 } = await jornadasNoFormalesAPI.put(
      "jornada/no_formal/estructura_boleta/" + idBoleta,
      {
        encabezadoBoleta: data.encabezado,
        // modalidadVotacion: data.modalidadVotacion,
        entidadFederativa: data.entidadFederativa,
        municipio: data.municipio,
        primerFirmanteNombre: data.primerFirmante,
        primerFirmanteCargo: data.cargoPrimerFirmante,
        segundoFirmanteNombre: data.segundoFirmante,
        segundoFirmanteCargo: data.cargoSegundoFirmante,
        modalidadVotacionModel: {
          idModalidadVotacion: data.modalidadVotacion,
        },
        eleccionModel: {
          idEleccion: idJornadaElectoral,
        },
      }
    );

    candidatos.forEach(async (candidato) => {

      const { data: candidateRespData } = await jornadasNoFormalesAPI.put(
        "jornada/no_formal/candidato/" + candidato.claveCandidato,
        {
         claveCandidato: candidato.curp,
         apellidoPCandidato: candidato.apellidoPCandidato,
         apellidoMCandidato: candidato.apellidoMCandidato,
         nombreCandidato: candidato.nombreCandidato,
         fotoCandidato: candidato.fotografiaCandidato,
         seudonimoCandidato: candidato.seudonimoCandidato,
         fechaNacimiento: candidato.fechaNacimientoCandidato,
         // fechaNacimiento: "2019-07-04T20:38:38.604+00:00",
         genero: candidato.generoCandidato,
       }
      );
      console.log("Data candidato de respuesta", candidateRespData);
    });
        // Asociaciones
      asociaciones.forEach(async (asociacion) => {
          const { data: asociacionRespData } = await jornadasNoFormalesAPI.put(
            "jornada/no_formal/asociacion/" + asociacion.id,
            {
              nombreAsociacion: asociacion.nombreAsociacion,
              emblema: asociacion.emblema,
              logo: asociacion.logo,
            }
          );
        console.log("Data asociacion de respuesta", asociacionRespData);
      });

    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const deleteBoleta = async (id) => {
  try {
    const resp = await jornadasNoFormalesAPI.delete("jornada/no_formal/estructura_boleta/" + id);
    return { ok: true };
  } catch (error) {
    // return { ok: false, errorMessage: error.message };
    console.log("Intentelo nuevamente en unos minutos, por favor.: ", error);
    return { ok: false };
  }
};

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
