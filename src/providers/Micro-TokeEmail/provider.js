import { tokenEmailAPI } from "./config";


export const sendEmailProvider = async (data) => {

	try {
		const response = await tokenEmailAPI.post("email/validation/send_token", data);
		console.log(response)
		return { ok: true, data: " response.data", errorMessage: "" };
	} catch (error) {
		console.log(error.message);
		return { ok: false };
	}
};

export const sendEmailMasivoProvider = async (data) => {
	console.log("DEsde el provides:::",data)

	try {
		 const response = await tokenEmailAPI.post("email/validation/send_token_masv/", data);
		console.log(response)  
		return { ok: true, data: " response.data", errorMessage: "" };
	} catch (error) {
		console.log(error.message);
		return { ok: false };
	}
};




