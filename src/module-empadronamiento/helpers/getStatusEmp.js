export const getStatusEmp = (inicio, fin) => {
  const newInicio = new Date(inicio);
  const newFin = new Date(fin);
  const now = new Date();

  //   console.log("inicio:", newInicio);
  //   console.log("fin:", newFin);
  //   console.log("now:", now);

  //   console.log("fin<now:", JSON.stringify(newFin < now));

  if (now >= newInicio && now < newFin) {
    return "activo";
  }

  if (now < newInicio) {
    return "noiniciada";
  }

  if (now > newFin) {
    return "terminado";
  }

  return "";
};
