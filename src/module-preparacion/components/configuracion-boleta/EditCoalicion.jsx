import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putCoalición } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";

import { ModalCoalicion } from "./ModalCoalicion";

export const EditCoalicion = memo(
  ({ isOpen = false, abrirCerrarModal = () => {}, coalicion = null }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const enviar = (id, data, funcion) => {
      dispatch(putCoalición(id, data, funcion));
    };

    useEffect(() => {
     console.log("desdeEdit")
    }, [])
     

    // const [coalicions, setCoalicions] = useState(coalicion);
    return (
      <ModalCoalicion
        coalicion={coalicion}
        isOpen={isOpen}
        abrirCerrarModal={abrirCerrarModal}
        actualizar={enviar}
      ></ModalCoalicion>
    );
  }
);
