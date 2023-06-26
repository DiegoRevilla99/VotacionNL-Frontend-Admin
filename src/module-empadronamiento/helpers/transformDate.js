import dayjs from "dayjs";

export const transformDate = (date) => {
  let newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());

  let day = newDate.getDate();
  let month = newDate.getUTCMonth() + 1;
  let year = newDate.getFullYear();

  let dateString =
    (day < 10 ? "0" + day : day) +
    "/" +
    (month < 10 ? "0" + month : month) +
    "/" +
    year;

  return dateString;
};
