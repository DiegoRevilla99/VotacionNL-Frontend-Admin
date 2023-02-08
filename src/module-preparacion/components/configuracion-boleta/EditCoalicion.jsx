import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putCoalición } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";

import { ModalCoalicion } from "./ModalCoalicion";

export const EditCoalicion = memo(
  ({ isOpen = false, abrirCerrarModal = () => {}, coalicion = null,actualizar }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const enviar = (idBoleta,idCandidato,idC, data, funcion) => {
      dispatch(putCoalición(idBoleta,idCandidato, idC,data, funcion));
    };

    /* useEffect(() => {
     console.log("Coalicion Edit: ",coalicion)
    }, [isOpen]) */
     

    // const [coalicions, setCoalicions] = useState(coalicion);
    return (
      <ModalCoalicion
        coalicion={coalicion}
        isOpen={isOpen}
        abrirCerrarModal={abrirCerrarModal}
        actualizar={enviar}
        actualizarC={actualizar}
      ></ModalCoalicion>
    );
  }
);
