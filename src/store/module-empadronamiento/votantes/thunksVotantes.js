import { envioLinkAPI } from "../../../module-empadronamiento/helpers/FakeAPI";
import { getStatusEmp } from "../../../module-empadronamiento/helpers/getStatusEmp";
import { transformDate } from "../../../module-empadronamiento/helpers/transformDate";
import { uploadImagesProvider } from "../../../providers/Micro-Images/provider";
import { getJornadasNoFormalesProvider } from "../../../providers/Micro-NoFormales/providerNoFormales";
import {
  sendEmailConsultasProvider,
  sendEmailMasivoConsultasProvider,
  sendEmailMasivoNoFormalProvider,
  sendEmailMasivoProvider,
  sendEmailNoFormalProvider,
  sendEmailProvider,
} from "../../../providers/Micro-TokeEmail/provider";
import {
  getVotanteDireccionProvider,
  getVotantesPorJornadaProvider,
  getVotantesProvider,
  postCSVProvider,
  postVotanteJornadaGranelProvider,
  postVotanteJornadaProvider,
  postVotanteProvider,
  putVotanteProvider,
} from "../../../providers/Micro-Votante/providerVotante";
import {
  onToastCheckingOperation,
  onToastErrorOperation,
  onToastSuccessOperation,
} from "../../ui/uiSlice";
import {
  endLoadingVotantes,
  onCheckingOperation,
  onErrorOperation,
  onSuccessOperation,
  setErrorPost,
  setVotantes,
  setVotanteSelected,
  startLoadingVotantes,
} from "./empVotantesSlice";

export const uploadCSV = (file, funcion = () => {}) => {
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Subiendo votantes..."));
    dispatch(onCheckingOperation());

    const { ok, data, errorMessage } = await postCSVProvider(file);
    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(
        onToastSuccessOperation({
          successMessage: "Los votantes se han subido con éxito",
        })
      );
      setTimeout(() => {
        funcion();
      }, 800);
    } else {
      dispatch(onErrorOperation());
      dispatch(
        onToastErrorOperation({ errorMessage: "No se pudo subir el archivo" })
      );
    }

    return { ok, data, errorMessage };
  };
};

export const postVotante = (info) => {
  return async (dispatch, getState) => {
    // dispatch(onToastCheckingOperation("Subiendo votante..."));
    // dispatch(onCheckingOperation());

    const { mensaje, ok, data, errorMessage } = await postVotanteProvider(info);

    dispatch(setErrorPost({ errorPost: mensaje }));

    if (ok) {
      // dispatch(onSuccessOperation());
      // dispatch(onToastSuccessOperation({ successMessage: "El votante se han subido con éxito" }));
      // funcion();
    } else {
      dispatch(onErrorOperation());
      dispatch(
        onToastErrorOperation({ errorMessage: "No se pudo subir el votante" })
      );
    }

    return { mensaje, ok, data, errorMessage };
  };
};

export const postJornadaVotante = (info, funcion = () => {}) => {
  console.log("postJornadaVotante: ", info);
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Subiendo votante..."));
    dispatch(onCheckingOperation());

    const { ok, data, errorMessage } = await postVotanteJornadaProvider(info);
    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(
        onToastSuccessOperation({
          successMessage: "El votante se han subido con éxito",
        })
      );

      getVotantesbyJornada();
      setTimeout(() => {
        funcion();
      }, 800);
    } else {
      dispatch(onErrorOperation());
      dispatch(
        onToastErrorOperation({ errorMessage: "No se pudo subir el votante" })
      );
    }
  };
};

export const postJornadaVotanteGranel = (info, funcion = () => {}) => {
  console.log("postJornadaVotanteGranel: ", info);
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Subiendo votante..."));
    dispatch(onCheckingOperation());

    const { ok, data, errorMessage } = await postVotanteJornadaGranelProvider(
      info
    );
    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(
        onToastSuccessOperation({
          successMessage: "Los votantes se han subido con éxito",
        })
      );

      getVotantesbyJornada();
      setTimeout(() => {
        funcion();
      }, 800);
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "No se pudo subir" }));
    }
  };
};

export const postImage = (info, funcion = () => {}) => {
  console.log("Post image: ", info);
  return async (dispatch, getState) => {
    const { ok, data, errorMessage } = await uploadImagesProvider(info);
    if (ok) {
      setTimeout(() => {
        funcion();
      }, 800);
      return data;
    } else {
      return false;
    }
  };
};

export const putVotante = (curp, info, funcion = () => {}) => {
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Editando votante..."));
    dispatch(onCheckingOperation());

    const { ok, data, errorMessage } = await putVotanteProvider(curp, info);
    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(
        onToastSuccessOperation({
          successMessage: "El votante se han editado con éxito",
        })
      );
      // console.log("Actualizando votante");
      // getVotantesbyJornada();
      setTimeout(() => {
        funcion();
      }, 800);
    } else {
      dispatch(onErrorOperation());
      dispatch(
        onToastErrorOperation({ errorMessage: "No se pudo editar el votante" })
      );
    }
  };
};

export const getVotantesbyJornada = (idJornada = "") => {
  return async (dispatch, getState) => {
    dispatch(setVotantes({ votantes: [] }));
    dispatch(startLoadingVotantes());
    const { ok, data, errorMessage } = await getVotantesPorJornadaProvider(
      idJornada
    );

    try {
      if (ok) {
        if (data.votantes) {
          dispatch(setVotantes({ votantes: data.votantes }));
        }
      } else {
        dispatch(setVotantes({ votantes: [] }));
      }
    } catch (error) {
      dispatch(setVotantes({ votantes: [] }));
    }
  };
};

export const getVotantes = () => {
  return async (dispatch, getState) => {
    const { ok, data, errorMessage } = await getVotantesProvider();
    console.log("All votantes:", data);
    if (!ok) {
      return false;
    }

    return data;
  };
};

//CAMBIAR LA FAKEAPI POR PROVIDER

export const envioLink = (datan, funcion = () => {}) => {
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Eviando enlaces..."));
    dispatch(onCheckingOperation());

    const { ok, data, errorMessage } = await sendEmailMasivoProvider(datan);
    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(
        onToastSuccessOperation({ successMessage: "Se han enviado con exito" })
      );

      setTimeout(() => {
        funcion();
      }, 500);
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "No se pudo enviar" }));
    }
  };
};

export const envioLinkNoFormal = (datan, funcion = () => {}) => {
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Eviando enlaces..."));
    dispatch(onCheckingOperation());

    const { ok, data, errorMessage } = await sendEmailMasivoNoFormalProvider(
      datan
    );
    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(
        onToastSuccessOperation({ successMessage: "Se han enviado con exito" })
      );

      setTimeout(() => {
        funcion();
      }, 500);
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "No se pudo enviar" }));
    }
  };
};

export const envioLinkConsultas = (datan, funcion = () => {}) => {
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Eviando enlaces..."));
    dispatch(onCheckingOperation());

    const { ok, data, errorMessage } = await sendEmailMasivoConsultasProvider(
      datan
    );
    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(
        onToastSuccessOperation({ successMessage: "Se han enviado con exito" })
      );

      setTimeout(() => {
        funcion();
      }, 500);
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "No se pudo enviar" }));
    }
  };
};

export const envioLinkPersonal = (senddata, funcion = () => {}) => {
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Eviando enlace..."));
    dispatch(onCheckingOperation());

    const { ok, data, errorMessage } = await sendEmailProvider(senddata);

    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(
        onToastSuccessOperation({ successMessage: "Se han enviado con exito" })
      );

      setTimeout(() => {
        funcion();
      }, 500);
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "No se pudo enviar" }));
    }
  };
};

//cambiar link
export const envioLinkPersonalNoFormal = (senddata, funcion = () => {}) => {
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Eviando enlace..."));
    dispatch(onCheckingOperation());

    const { ok, data, errorMessage } = await sendEmailNoFormalProvider(
      senddata
    );

    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(
        onToastSuccessOperation({ successMessage: "Se han enviado con exito" })
      );

      setTimeout(() => {
        funcion();
      }, 500);
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "No se pudo enviar" }));
    }
  };
};

//cambiar link
export const envioLinkPersonalConsultas = (senddata, funcion = () => {}) => {
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Eviando enlace..."));
    dispatch(onCheckingOperation());

    const { ok, data, errorMessage } = await sendEmailConsultasProvider(
      senddata
    );

    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(
        onToastSuccessOperation({ successMessage: "Se han enviado con exito" })
      );

      setTimeout(() => {
        funcion();
      }, 500);
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "No se pudo enviar" }));
    }
  };
};

export const getVotanteDireccion = (idVotante) => {
  return async (dispatch, getState) => {
    dispatch(setVotanteSelected({ votanteSelected: null }));
    const { ok, data, errorMessage } = await getVotanteDireccionProvider(
      idVotante
    );
    let newData = { ...data.votanteModel, ...data.direccionModel };
    if (ok) {
      dispatch(setVotanteSelected({ votanteSelected: newData }));
      return data;
    } else {
      dispatch(setVotanteSelected({ votanteSelected: null }));
      return false;
    }
  };
};
