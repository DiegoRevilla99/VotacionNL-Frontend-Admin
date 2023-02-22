import { createSlice } from "@reduxjs/toolkit";

export const noFormalesSlice = createSlice({
  name: "noFormalesSlice",
  initialState: {
    jornadasNoFormales: [],
    eleccion: {},
    votantes: [],
    type: "noformales",
    isLoadingJornadasNoFormales: false,
    isLoadingVotantes: false,
    status: "off",
    errorMessage: "",
    successMessage: "",
  },

  reducers: {
    startLoadingJornadasNoFormales: (state /* action */) => {
      state.isLoadingJornadasNoFormales = true;
    },
    setJornadasNoFormales: (state, action) => {
      state.isLoadingJornadasNoFormales = false;
      state.jornadasNoFormales = action.payload.jornadasNoFormales;
    },

    startLoadingEleccion: (state /* action */) => {
      state.isLoadingEleccion = true;
    },
    setEleccion: (state, action) => {
      state.isLoadingEleccion = false;
      state.eleccion = action.payload.eleccion;
    },

    startLoadingVotantes: (state /* action */) => {
      state.isLoadingVotantes = true;
    },

    setVotantes: (state, action) => {
      state.isLoadingVotantes = false;
      state.votantes = action.payload.votantes;
    },
    //Transacciones
    onCheckingOperation: (state) => {
      state.status = "checking";
    },
    onSuccessOperation: (state, { payload }) => {
      state.status = "success";
      state.okMessage =
        payload?.successMessage || "Operación realizada con éxito";
    },
    onErrorOperation: (state, { payload }) => {
      state.status = "error";
      state.errorMessage = payload?.errorMessage;
    },
    onOffOperation: (state) => {
      state.status = "off";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setEleccion,
  startLoadingEleccion,
  startLoadingJornadasNoFormales,
  setJornadasNoFormales,
  startLoadingVotantes,
  setVotantes,
  onCheckingOperation,
  onSuccessOperation,
  onErrorOperation,
  onOffOperation,
} = noFormalesSlice.actions;
