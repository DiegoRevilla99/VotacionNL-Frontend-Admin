import { CoalicionApi } from "../../../module-preparacion/api/CoalicionApi";
import { EstructuraBoletaApi } from "../../../module-preparacion/api/EstructuraBoletaApi";
import {
  addBoletaApi,
  addComiteApi,
  addPlanillaApi,
  editBoletaApi,
  getBoletasApi,
} from "../../../module-preparacion/helpers/ApiComite";
import {
  deleteCoalicionAPI,
  getAsociacionesAPI,
  getBoletaAPI,
  getCandidatosAPI,
  getCoalicionesAPI,
  postAsociacionAPI,
  putComiteAPI,
  putPlanillaAPI,
} from "../../../module-preparacion/helpers/ApiConfigBoletas";
import { JornadaApi } from "../../../module-preparacion/api/JornadaApi.js";
import {
  onToastCheckingOperation,
  onToastErrorOperation,
  onToastOffOperation,
  onToastSuccessOperation,
} from "../../ui/uiSlice";

import {
  getBoletaProvider,
  putCandVotoNFProvider,
  putMaxMinNFProvider,
} from "../../../providers/Micro-NoFormales/providerBoletas";
import {
  endLoadingBoleta,
  onCheckingOperation,
  onErrorOperation,
  onSuccessOperation,
  setAsociaciones,
  setBoleta,
  setCandidatos,
  startLoadingAsociaciones,
  startLoadingBoleta,
  startLoadingCandidatos,
} from "./configBoletaNFSlice";
import { getCandidatosProviderNF } from "../../../providers/Micro-NoFormales/providerCandidatos";
import { getConfigEleccionNFProvider } from "../../../providers/Micro-NoFormales/providerConfiguracion";
import { setConfigJornada } from "../configuracion-jornada/configJornadaSlice";

export const getBoletaNF = (idBoleta) => {
  console.log("entre getBoletaNF");
  return async (dispatch, getState) => {
    dispatch(startLoadingBoleta());
    const { ok, data, errorMessage } = await getBoletaProvider(idBoleta);

    if (ok) {
      if (errorMessage === "NOT_FOUND") {
        dispatch(setErrorBoleta({ errorBoleta: "No se encontro" }));
      } else {
        dispatch(setBoleta({ boleta: data }));
        console.log("desde thunks ", data);
      }
    } else dispatch(endLoadingBoleta());
  };
};

//EDIT cand y voto nullo
export const putMaxMinNF = (idBoleta, datasend, funcion = () => {}) => {
  console.log("entre MaxMinNF");
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Editando..."));
    dispatch(onCheckingOperation());
    // dispatch(startLoadingBoleta());
    const { ok, data, errorMessage } = await putMaxMinNFProvider(
      idBoleta,
      datasend
    );

    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(onToastSuccessOperation({ successMessage: "Se  actualizó" }));
      funcion();
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "No se actualizó" }));
    }
  };
};

export const putCandRegNF = (idBoleta, datasend, error = () => {}) => {
  console.log("putCandRegNF");
  return async (dispatch, getState) => {
    dispatch(onToastCheckingOperation("Editando..."));
    dispatch(onCheckingOperation());
    // dispatch(startLoadingBoleta());
    const { ok, data, errorMessage } = await putCandVotoNFProvider(
      idBoleta,
      datasend
    );

    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(onToastSuccessOperation({ successMessage: "Se  actualizó" }));
    } else {
      error();
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "No se actualizó" }));
    }
  };
};

export const postAsociacion = (idBoleta, datasend, error = () => {}) => {};

export const getAsociaciones = (idBoleta, datasend, error = () => {}) => {};

export const putPlanilla = (idBoleta, datasend, error = () => {}) => {};

export const getCandidatosNF = (idBoleta) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingCandidatos());
    const { ok, data, errorMessage } = await getCandidatosProviderNF(idBoleta);
    if (ok) {
      dispatch(setCandidatos({ candidatos: data.candidatoModels }));
    }
  };
};

export const getConfigJornadaNF = (idJornada) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingConfigJornada());
    const { ok, data, errorMessage } = await getConfigEleccionNFProvider(
      idJornada
    );
    if (ok) {
      dispatch(setConfigJornada({ configJornada: data }));
    }
  };
};
