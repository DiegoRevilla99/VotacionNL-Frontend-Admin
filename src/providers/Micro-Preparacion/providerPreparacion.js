export const simulacionFetch = async () => {
	try {
		await timeout(3000);
		return true;
	} catch (error) {
		return false;
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
