

export const transformDate = (date) => {

    let newDate = new Date(date);
    let day = newDate.getUTCDate();
    let month = newDate.getUTCMonth() + 1;
    let anio = newDate.getFullYear();

    let dateString = (day < 10 ? ("0" + day) : (day)) + "/" + (month < 10 ? ("0" + month) : (month)) + "/" + anio

    return dateString;

}
