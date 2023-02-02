import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAsociacion } from "../../../store/module-preparacion/configuracion-boletaNF/thunksConfigBoletaNF";


import { ModalAsociacion } from "./ModalAsociación";

export const AddAsociacion = ({
  isOpen = false,
  abrirCerrarModal = () => {},
  idBoleta = null,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enviar = (data) => {
    //console.log("añadiendo asociciaiocn de desde addAsoci");
    dispatch(postAsociacion(data, abrirCerrarModal));
  };
  return (
    <ModalAsociacion
      idBoleta={idBoleta}
      isOpen={isOpen}
      abrirCerrarModal={abrirCerrarModal}
      agregar={enviar}
    ></ModalAsociacion>
  );
};
