import { getEleccionAPI } from "../../../module-empadronamiento/helpers/FakeAPI";
import { getStatusEmp } from "../../../module-empadronamiento/helpers/getStatusEmp";
import { transformDate } from "../../../module-empadronamiento/helpers/transformDate";
import {
  getEleccionConfigByIdProvider,
  getJornadasNoFormalesProvider,
} from "../../../providers/Micro-NoFormales/providerNoFormales";
import { getVotantesPorJornadaProvider } from "../../../providers/Micro-Votante/providerVotante";
import {
  onToastCheckingOperation,
  onToastErrorOperation,
  onToastSuccessOperation,
} from "../../ui/uiSlice";
import {
  setEleccion,
  setJornadasNoFormales,
  setVotantes,
  startLoadingEleccion,
  startLoadingJornadasNoFormales,
  startLoadingVotantes,
} from "./noFormalesSlice";

export const getJornadasNoFormales = () => {
  return async (dispatch, getState) => {
    dispatch(startLoadingJornadasNoFormales());
    const { ok, data, errorMessage } = await getJornadasNoFormalesProvider();

    if (ok) {
      let newData = data.map((eleccion) => {
        let ne = {
          ...eleccion.eleccionModel,
          ...eleccion.configuracionModel,
        };
        ne.status = getStatusEmp(
          ne.inicioEmpadronamiento,
          ne.finEmpadronamiento
        );
        ne.inicioEmpadronamiento = transformDate(ne.inicioEmpadronamiento);
        ne.finEmpadronamiento = transformDate(ne.finEmpadronamiento);
        return ne;
      });
      dispatch(setJornadasNoFormales({ jornadasNoFormales: newData }));
    }
  };
};

export const getVotantesbyJornada = (idJornada = "") => {
  console.log("get votante en no formales");
  return async (dispatch, getState) => {
    dispatch(setVotantes({ votantes: null }));
    dispatch(startLoadingVotantes());
    const { ok, data, errorMessage } = await getVotantesPorJornadaProvider(
      idJornada
    );
    if (ok) {
      dispatch(setVotantes({ votantes: data }));
    } else {
      dispatch(setVotantes({ votantes: null }));
    }
  };
};

//Cambiar provider
//Get Eleccion con su config
export const getEleccionFormal = (idEleccion) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingEleccion());
    const { ok, data, errorMessage } = await getEleccionConfigByIdProvider(
      idEleccion
    );

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
