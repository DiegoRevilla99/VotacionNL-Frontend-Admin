import React from "react";
import { useDispatch } from "react-redux";
import { ModalVotante } from "./ModalVotante";

export const AddVotante = ({ isOpen = false, abrirCerrarModal = () => {} }) => {
  const dispatch = useDispatch();
  const enviar = (data) => {
    console.log("Añadiendo votante");
    // dispatch(postCoalición(data, abrirCerrarModal));
  };
  return (
    <ModalVotante
      isOpen={isOpen}
      abrirCerrarModal={abrirCerrarModal}
      agregar={enviar}
    ></ModalVotante>
  );
};
