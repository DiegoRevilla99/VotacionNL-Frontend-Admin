import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putCoalición } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";

import { ModalCoalicion } from "./ModalCoalicion";

export const EditCoalicion = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  coalicion = null,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enviar = (data) => {
    dispatch(putCoalición(data, abrirCerrarModal));
  };
  const [coalicions, setCoalicions] = useState(coalicion);
  return (
    <ModalCoalicion
      coalicion={coalicions}
      isOpen={isOpen}
      abrirCerrarModal={abrirCerrarModal}
      actualizar={enviar}
    ></ModalCoalicion>
  );
};
