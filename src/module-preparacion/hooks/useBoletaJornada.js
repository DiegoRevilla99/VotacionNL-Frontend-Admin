import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getBoleta } from "../../../store/module-preparacion/configuracion-boleta/thunksConfigBoleta";
import { getPartidos } from "../../store/module-preparacion/jornada/jornadaThunks";


export const useBoletaJornada = (id) => {
    const dispatch = useDispatch();
    let partidoInfo = {};

    const { boleta, isLoadingBoleta, errorBoleta } = useSelector(
        (state) => state.jornada
    );

    if (boleta) {
        const { nombrePartido } = boleta;
        const { formalidad } = boleta.jornadaModel;
        boletaInfo = {
			nombrePartido,
			siglas
        }
    }


    useEffect(() => {
        dispatch(getPartidos(id));
    }, []);

    return { errorBoleta, boletaInfo, isLoadingBoleta }
}
