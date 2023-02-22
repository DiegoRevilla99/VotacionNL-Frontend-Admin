import {
  envioLinkAPI,
  getEleccionAPI,
} from "../../../module-empadronamiento/helpers/FakeAPI";
import { getStatusEmp } from "../../../module-empadronamiento/helpers/getStatusEmp";
import { transformDate } from "../../../module-empadronamiento/helpers/transformDate";
import {
  getEleccionFormalProvider,
  getJornadasFormalesProvider,
} from "../../../providers/Micro-JornadasElectorales/providerFormales";
import {
  crearBoletaFormalProvider,
  crearBoletasConsultaProvider,
  crearBoletasNoFormalProvider,
} from "../../../providers/Micro-VotoFormal/providerVotoSeguro";

import {
  onToastCheckingOperation,
  onToastErrorOperation,
  onToastSuccessOperation,
} from "../../ui/uiSlice";
import { setErrorPost } from "../votantes/empVotantesSlice";
import {
  onCheckingOperation,
  onErrorOperation,
  onSuccessOperation,
  setEleccion,
  setJornadasFormales,
  startLoadingEleccion,
  startLoadingFormales,
} from "./EmpFormalesSlice";

//Cambiar provider
export const getJornadasFormales = () => {
  return async (dispatch, getState) => {
    dispatch(startLoadingFormales());
    const { ok, data, errorMessage } = await getJornadasFormalesProvider();
    let newData = data.map((eleccion) => {
      let ne = {
        ...eleccion.eleccionModel,
        ...eleccion.configuracionModel,
      };
      ne.status = getStatusEmp(ne.inicioEmpadronamiento, ne.finEmpadronamiento);
      ne.inicioEmpadronamiento = transformDate(ne.inicioEmpadronamiento);
      ne.finEmpadronamiento = transformDate(ne.finEmpadronamiento);
      return ne;
    });

    if (ok) {
      dispatch(setJornadasFormales({ jornadasFormales: newData }));
    }
  };
};

//Cambiar provider
//Get Eleccion con su config
export const getEleccionFormal = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingEleccion());
    const { ok, data, errorMessage } = await getEleccionFormalProvider(id);

    let newData = {
      ...data.eleccionModel,
      ...data.configuracionModel,
    };
    newData.status = getStatusEmp(
      newData.inicioEmpadronamiento,
      newData.finEmpadronamiento
    );
    newData.inicioEmpadronamiento = transformDate(
      newData.inicioEmpadronamiento
    );
    newData.finEmpadronamiento = transformDate(newData.finEmpadronamiento);

    if (ok) {
      dispatch(setEleccion({ eleccion: newData }));
    }
  };
};

export const crearBoletasTh = (info, funcion = () => {}) => {
  console.log(info);
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Creando boletas..."));
    dispatch(onCheckingOperation());

    const { mensaje, ok, data, errorMessage } = await crearBoletaFormalProvider(
      info
    );
    //const res = await envioLinkAPI(info);

    if (ok) {
      if (data.includes("No hay boletas registrados")) {
        console.log("entre a error");
        dispatch(setErrorPost({ errorPost: data }));
        dispatch(onErrorOperation());
        dispatch(onToastErrorOperation({ errorMessage: "Algo salió mal" }));
      } else {
        dispatch(onSuccessOperation());
        dispatch(
          onToastSuccessOperation({
            successMessage: "Se han creado las boletas exitosamente",
          })
        );
        dispatch(setErrorPost({ errorPost: "" }));
        funcion();
      }
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "Algo salió mal" }));
    }

    return { mensaje, ok, data, errorMessage };
  };
};

export const crearBoletasNoFormal = (info, funcion = () => {}) => {
  console.log(info);
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Creando boletas..."));
    dispatch(onCheckingOperation());

    const { mensaje, ok, data, errorMessage } =
      await crearBoletasNoFormalProvider(info);

    if (ok) {
      if (data.includes("No hay boletas registrados")) {
        console.log("entre a error");
        dispatch(setErrorPost({ errorPost: data }));
        dispatch(onErrorOperation());
        dispatch(onToastErrorOperation({ errorMessage: "Algo salió mal" }));
      } else {
        dispatch(onSuccessOperation());
        dispatch(
          onToastSuccessOperation({
            successMessage: "Se han creado las boletas exitosamente",
          })
        );
        dispatch(setErrorPost({ errorPost: "" }));
        funcion();
      }
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "Algo salió mal" }));
    }

    return { mensaje, ok, data, errorMessage };
  };
};

export const crearBoletasConsulta = (info, funcion = () => {}) => {
  console.log(info);
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Creando boletas..."));
    dispatch(onCheckingOperation());

    const { mensaje, ok, data, errorMessage } =
      await crearBoletasConsultaProvider(info);

    if (ok) {
      if (data.includes("No hay boletas registrados")) {
        console.log("entre a error");
        dispatch(setErrorPost({ errorPost: data }));
        dispatch(onErrorOperation());
        dispatch(onToastErrorOperation({ errorMessage: "Algo salió mal" }));
      } else {
        dispatch(onSuccessOperation());
        dispatch(
          onToastSuccessOperation({
            successMessage: "Se han creado las boletas exitosamente",
          })
        );
        dispatch(setErrorPost({ errorPost: "" }));
        funcion();
      }
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "Algo salió mal" }));
    }

    return { mensaje, ok, data, errorMessage };
  };
};
