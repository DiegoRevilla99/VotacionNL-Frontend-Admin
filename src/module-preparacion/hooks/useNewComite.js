import React from 'react'
import { useDispatch, useSelector } from "react-redux";
export const useNewComite = () => {
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.comite);

    return (
        {
            status,
        }
    )
}
