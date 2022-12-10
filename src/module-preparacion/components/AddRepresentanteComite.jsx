import React, { useState } from "react";
import { AddModal } from "../layout/AddModal";

export const AddRepresentanteComite = ({
  isOpen = false,
  abrirCerrarModal = () => {},
}) => {
  return (
    <>
      <AddModal
        titulo="REGISTRO REPESENTANTE INDEPENDIENTE"
        isOpen={isOpen}
        abrirCerrarModal={abrirCerrarModal}
      ></AddModal>
    </>
  );
};
