import { useDispatch, useSelector } from "react-redux";

export const useAddBoletasJornada = (nombre = null) => {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.jornada);
    return (
        {
            status,
        }
    )
}
