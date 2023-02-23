import { tokenEmailAPI } from "./config";

export const sendEmailProvider = async (data) => {
  try {
    const response = await tokenEmailAPI.post(
      "email/validation/send_token",
      data
    );
    console.log(response);
    return { ok: true, data: " response.data", errorMessage: "" };
  } catch (error) {
    console.log(error.message);
    return { ok: false };
  }
};

export const sendEmailNoFormalProvider = async (data) => {
  try {
    const response = await tokenEmailAPI.post(
      "email/validation/send_token/eleccion",
      data
    );
    console.log(response);
    return { ok: true, data: " response.data", errorMessage: "" };
  } catch (error) {
    console.log(error.message);
    return { ok: false };
  }
};

export const sendEmailConsultasProvider = async (data) => {
  try {
    const response = await tokenEmailAPI.post(
      "email/validation/send_token/consulta",
      data
    );
    console.log(response);
    return { ok: true, data: " response.data", errorMessage: "" };
  } catch (error) {
    console.log(error.message);
    return { ok: false };
  }
};

export const sendEmailMasivoProvider = async (data) => {
  console.log("DEsde el provides:::", data);

  try {
    const response = await tokenEmailAPI.post(
      "email/validation/send_token_masv/",
      data
    );
    console.log(response);
    return { ok: true, data: " response.data", errorMessage: "" };
  } catch (error) {
    console.log(error.message);
    return { ok: false };
  }
};

export const sendEmailMasivoNoFormalProvider = async (data) => {
  console.log("DEsde el provides:::", data);

  try {
    const response = await tokenEmailAPI.post(
      "email/validation/send_token_masv/eleccion",
      data
    );
    console.log(response);
    return { ok: true, data: " response.data", errorMessage: "" };
  } catch (error) {
    console.log(error.message);
    return { ok: false };
  }
};

export const sendEmailMasivoConsultasProvider = async (data) => {
  console.log("DEsde el provides:::", data);

  try {
    const response = await tokenEmailAPI.post(
      "email/validation/send_token_masv/consulta",
      data
    );
    console.log(response);
    return { ok: true, data: " response.data", errorMessage: "" };
  } catch (error) {
    console.log(error.message);
    return { ok: false };
  }
};
