import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putCoalición } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";
import { ModalAsociacion } from "./ModalAsociación";

export const EditAsociacion = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  asociacion = null,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enviar = (data) => {
    console.log();
    dispatch(putCoalición(data, abrirCerrarModal));
  };
  const [asociacions, setAsociacions] = useState(asociacion);
  return (
    <ModalAsociacion
      asociacion={asociacions}
      isOpen={isOpen}
      abrirCerrarModal={abrirCerrarModal}
      actualizar={enviar}
    ></ModalAsociacion>
  );
};
