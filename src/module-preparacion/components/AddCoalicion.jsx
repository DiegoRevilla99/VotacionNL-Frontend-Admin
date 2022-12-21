import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postCoalición } from "../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";
import { ModalCoalicion } from "./ModalCoalicion";

export const AddCoalicion = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  idBoleta = null,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enviar = (data) => {
    dispatch(postCoalición(data, abrirCerrarModal));
  };
  return (
    <ModalCoalicion
      idBoleta={idBoleta}
      isOpen={isOpen}
      abrirCerrarModal={abrirCerrarModal}
      enviar={enviar}
    ></ModalCoalicion>
  );
};
