

import { useDispatch, useSelector } from "react-redux";




export const useAddBoletasComite = (nombre = null) => {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.comite);


    return (
        {
            status,
        }
    )
}
