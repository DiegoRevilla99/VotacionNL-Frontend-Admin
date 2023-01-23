
export const getStatusEmp = (inicio, fin) => {

    let newInicio = new Date(inicio);
    let newFin = new Date(fin);
    let now = new Date();


    if (now > newInicio && now < newFin) {
        return "activo"
    }

    if (now < newInicio) {
        return "noiniciada"
    }

    if (now > newFin) {
        return "terminado"
    }


    return true;

}