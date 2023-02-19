import { ImagesAPI } from "./config";


export const uploadImagesProvider = async (file) => {

	try {
		const formData1 = new FormData();
		formData1.append("file",file);
		const response = await  ImagesAPI.post("file/upload", formData1);
		console.log(response)
		return { ok: true, data: response.data.link, errorMessage: "" };
	} catch (error) {
		console.log(error.message);
		return { ok: false };
	}
};






