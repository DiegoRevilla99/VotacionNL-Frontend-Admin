import { authAPI, REFRESH_TOKEN_KEY } from "./configAuth";

export const loginWithEmailAndPassword = async (email, password) => {
	try {
		// await timeout(1000);

		const { data } = await authAPI.post("api/auth/signin", {
			curp: email,
			password: password,
		});
		console.log("DATA LOGIN", data);
		// return { ok: true, uid: "123456", name: "Usuario" };
		return {
			ok: true,
			accessToken: data.accessToken,
			username: data.username,
			refreshToken: data.refreshToken,
		};
	} catch (error) {
		return { ok: false };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const refreshToken = async (refreshToken) => {
	try {
		const { data } = await authAPI.post("api/auth/refreshtoken", {
			refreshToken: sessionStorage.getItem(REFRESH_TOKEN_KEY),
		});

		// console.log("DATA REFRESH: ", data);
		return { ok: true, refreshResponse: data.refreshResponse, user: data.user };
	} catch (error) {
		console.log("ERROR REFRESH", error);
		return { ok: false };
	}
};
