import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postCoalición } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";
import { ModalCoalicion } from "./ModalCoalicion";

export const AddCoalicion = memo(({
  isOpen = false,
  abrirCerrarModal = () => {},
  idBoleta = null,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enviar = (idboleta,idcandidato,data) => {
    dispatch(postCoalición(idboleta,idcandidato,data, abrirCerrarModal));
  };

  useEffect(() => {
    console.log("desdeAdd")
  }, [])
  
  return (
    <ModalCoalicion
      idBoleta={idBoleta}
      isOpen={isOpen}
      coalicion={null}
      abrirCerrarModal={abrirCerrarModal}
      agregar={enviar}
    ></ModalCoalicion>
  );
});
