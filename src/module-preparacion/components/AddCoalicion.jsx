import React from "react";
import { useNavigate } from "react-router-dom";
import { ModalCoalicion } from "./ModalCoalicion";

export const AddCoalicion = ({
  isOpen = false,
  abrirCerrarModal = () => {},
}) => {
  const navigate = useNavigate();

  const enviar = () => {
    navigate("/preparacion/jornada/configboleta");
  };
  return (
    <ModalCoalicion
      titulo="COALICIÓN"
      isOpen={isOpen}
      abrirCerrarModal={abrirCerrarModal}
      enviar={enviar}
    ></ModalCoalicion>
  );
};
