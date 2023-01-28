
export const getStatusEmp = (inicio, fin) => {

    const newInicio = new Date(inicio);
    const newFin = new Date(fin);
    const now = new Date();


    if (now >= newInicio && now < newFin) {
        return "activo"
    }

    if (now < newInicio) {
        return "noiniciada"
    }

    if (now >= newFin) {
        return "terminado"
    }


    return "";

}