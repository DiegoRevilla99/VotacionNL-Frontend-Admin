import { tokenEmailAPI } from "./config";


export const sendEmailProvider = async (data) => {

	try {
		console.log(data);
		const response = await tokenEmailAPI.post("email/validation/send_token", data);
		console.log(response)
		return { ok: true, data: " response.data", errorMessage: "" };
	} catch (error) {
		console.log(error.message);
		return { ok: false };
	}
};



