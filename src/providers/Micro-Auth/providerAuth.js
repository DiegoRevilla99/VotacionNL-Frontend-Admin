export const loginWithEmailAndPassword = async (email, password) => {
	try {
		await timeout(1000);
		return { ok: true, uid: "123456", name: "Usuario" };
	} catch (error) {
		return { ok: false };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
