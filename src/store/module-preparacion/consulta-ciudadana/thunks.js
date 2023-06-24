import { useNavigate } from "react-router-dom";
import {
  createConsultaCiudadana,
  createPapeleta,
  deleteBallot,
  deleteConsultaCiudadana,
  getBallotData,
  getConfig,
  getConsultasCiudadanas,
  getConsultasCiudadanasJornada,
  getPapeletas,
  saveConfig,
  updateBallotData,
} from "../../../providers/Micro-Consultas/provider";
import { simulacionFetch } from "../../../providers/Micro-Preparacion/providerPreparacion";
import {
  onToastCheckingOperation,
  onToastErrorOperation,
  onToastOffOperation,
  onToastSuccessOperation,
} from "../../ui/uiSlice";
import {
  onAddBallot,
  onAddConsultaCiudadana,
  onAddQuestion,
  onCheckingOperation,
  onDeleteBallotData,
  onDeleteConsultaCiudadanaData,
  onEditBallot,
  onErrorOperation,
  onFillBallots,
  onFillConsultasData,
  onOffOperation,
  onSetBallotSelectedNull,
  onSetConfigSelected,
  onSetConfigSelectedNull,
  onSetConsultaSelected,
  onSetQuestionsNull,
  onSetQuestionsSelectedNull,
  onSuccessOperation,
  onUpdateBallot,
} from "./consultaCiudadanaSlice";

export const saveConsultaPrueba = () => {
  return async (dispatch) => {
    dispatch(onToastCheckingOperation("Guardando consulta..."));
    dispatch(onCheckingOperation());

    const result = await simulacionFetch();

    if (result) {
      dispatch(onSuccessOperation());
      dispatch(onToastSuccessOperation({ successMessage: "Consulta guardada con éxito" }));
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "La consulta no se pudo guardar" }));
    }
  };
};

export const onGetConsultasCiudadanas = () => {
  return async (dispatch) => {
    dispatch(onCheckingOperation());

    const { ok, data, errorMessage } = await getConsultasCiudadanas();

    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(onFillConsultasData(data));
    } else {
      dispatch(onErrorOperation());
      dispatch(
        onToastErrorOperation({
          errorMessage: errorMessage || "La consulta no se pudo guardar",
        })
      );
    }
  };
};
export const onGetConsultasCiudadanasJornada = () => {
  return async (dispatch) => {
    dispatch(onCheckingOperation());

    const { ok, data, errorMessage } = await getConsultasCiudadanasJornada();

    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(onFillConsultasData(data));
    } else {
      dispatch(onErrorOperation());
      dispatch(
        onToastErrorOperation({
          errorMessage: errorMessage || "La consulta no se pudo guardar",
        })
      );
    }
  };
};

export const onCreateConsultaCiudadana = (titulo, entidad, navigate = (id) => {}) => {
  return async (dispatch) => {
    dispatch(onToastCheckingOperation("Guardando consulta..."));
    dispatch(onCheckingOperation());

    const { ok, id } = await createConsultaCiudadana(titulo, entidad);

    console.log("ENTRA");

    console.log("CREACION DE CONSULTA", id);

    if (ok) {
      dispatch(onAddConsultaCiudadana({ idJornada: id, nombreJornada: titulo }));
      dispatch(onSuccessOperation());
      dispatch(onToastSuccessOperation({ successMessage: "Consulta guardada con éxito" }));
      dispatch(onSetConsultaSelected({ id, titulo, ballots: [] }));
      navigate(id);
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "La consulta no se pudo guardar" }));
    }
  };
};

export const onDeleteConsultaCiudadana = (id) => {
  return async (dispatch) => {
    dispatch(onToastCheckingOperation("Eliminando consulta ciudadana..."));
    dispatch(onCheckingOperation());

    const { ok } = await deleteConsultaCiudadana(id);

    if (ok) {
      dispatch(onDeleteConsultaCiudadanaData(id));
      console.log("ENTRÓ A BORRAR LA CONSULTA");
      dispatch(onSuccessOperation());
      dispatch(onToastSuccessOperation({ successMessage: "Consulta eliminada con éxito" }));
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "La consulta no se pudo eliminar" }));
    }
  };
};

export const onGetPapeletas = (idConsulta, navigate = () => {}) => {
  return async (dispatch) => {
    // dispatch(onToastCheckingOperation("Guardando papeleta..."));
    dispatch(onCheckingOperation());

    const { ok, data } = await getPapeletas(idConsulta);

    if (ok) {
      dispatch(onSuccessOperation());
      // dispatch(onToastSuccessOperation({ successMessage: "Pepeleta guardada con éxito" }));
      dispatch(onSetBallotSelectedNull());
      dispatch(onSetQuestionsSelectedNull());
      dispatch(onSetQuestionsNull());
      dispatch(onFillBallots(data));
      // navigate();
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "No se pudo obtener las papeletas" }));
    }
  };
};

export const onCreatePapeleta = (data, idConsulta, questions, funcion = () => {}) => {
  return async (dispatch) => {
    dispatch(onToastCheckingOperation("Guardando papeleta..."));
    dispatch(onCheckingOperation());

    const { ok, idPapeleta } = await createPapeleta(data, idConsulta, questions);

    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(onToastSuccessOperation({ successMessage: "Pepeleta guardada con éxito" }));
      dispatch(onAddBallot({ idPapeleta, encabezado: data.encabezadoConsulta }));
      funcion();
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "La papeleta no se pudo guardar" }));
    }
  };
};

export const onGetBallotData = (idBallot, navigate = () => {}) => {
  return async (dispatch) => {
    // dispatch(onToastCheckingOperation("Guardando papeleta..."));
    dispatch(onCheckingOperation());

    const { ok, data, dataQuestion } = await getBallotData(idBallot);
    // const { ok1, questions } = await getQuestions(idBallot);

    if (ok) {
      dispatch(onSuccessOperation());
      // dispatch(onToastSuccessOperation({ successMessage: "Pepeleta guardada con éxito" }));
      dispatch(onEditBallot({ idBallot, ...data }));
      dispatch(onAddQuestion(dataQuestion));
      navigate();
    } else {
      dispatch(onErrorOperation());
      // dispatch(onToastErrorOperation({ errorMessage: "La papeleta no se pudo guardar" }));
    }
  };
};

export const onUpdateBallotData = (
  values,
  questions,
  idConsulta,
  idPapeleta,
  navigate = () => {}
) => {
  return async (dispatch) => {
    // dispatch(onToastCheckingOperation("Guardando papeleta..."));
    dispatch(onCheckingOperation());

    const { ok } = await updateBallotData(values, questions, idConsulta, idPapeleta);

    if (ok) {
      dispatch(onSuccessOperation());
      // dispatch(onToastSuccessOperation({ successMessage: "Pepeleta guardada con éxito" }));
      // dispatch(onEditBallot({ id, encabezadoConsulta }));
      // dispatch(onUpdateBallot());
      console.log("PAPELETA ACTUALIZADA");
      navigate();
    } else {
      dispatch(onErrorOperation());
      // dispatch(onToastErrorOperation({ errorMessage: "La papeleta no se pudo guardar" }));
    }
  };
};

export const onDeleteBallot = (id) => {
  return async (dispatch) => {
    dispatch(onToastCheckingOperation("Eliminando papeleta..."));
    // dispatch(onCheckingOperation());

    const { ok } = await deleteBallot(id);

    if (ok) {
      dispatch(onDeleteBallotData(id));
      // console.log("ENTRÓ A BORRAR LA CONSULTA");
      // dispatch(onSuccessOperation());
      dispatch(onToastSuccessOperation({ successMessage: "Papeleta eliminada con éxito" }));
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "La papeleta no se pudo eliminar" }));
    }
  };
};

export const onSaveConfig = (id, data, navigate = () => {}) => {
  return async (dispatch) => {
    dispatch(onToastCheckingOperation("Guardando configuracion..."));
    dispatch(onCheckingOperation());

    const { ok } = await saveConfig(id, data);

    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(onToastSuccessOperation({ successMessage: "Configuración guardada con éxito" }));
      navigate();
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "La configuración no se pudo guardar" }));
    }
  };
};
export const onGetConfig = (id, titulo) => {
  return async (dispatch) => {
    // dispatch(onToastCheckingOperation("Guardando configuracion..."));
    dispatch(onCheckingOperation());

    const { ok, data } = await getConfig(id);

    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(onSetConfigSelected(data));
      dispatch(onSetConsultaSelected({ id, title: titulo }));
      // navigate();
    } else {
      dispatch(onErrorOperation());
      // dispatch(
      // 	onToastErrorOperation({ errorMessage: "La configuración no se pudo guardar" })
      // );
    }
  };
};

export const onGetPapeletasParaJornada = (idJornada, title, navigate = () => {}) => {
  return async (dispatch) => {
    dispatch(onCheckingOperation());
    const { ok, data } = await getPapeletas(idJornada);
    if (ok) {
      dispatch(onSuccessOperation());
      dispatch(onSetBallotSelectedNull());
      dispatch(onSetConsultaSelected({ id: idJornada, idJornada, title, ballots: [] }));
      dispatch(onFillBallots(data));
      navigate();
    } else {
      dispatch(onErrorOperation());
      dispatch(onToastErrorOperation({ errorMessage: "No se pudo obtener las boletas" }));
    }
  };
};
