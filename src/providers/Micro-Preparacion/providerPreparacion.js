export const simulacionFetch = async () => {
	try {
		await fetch("https://pokeapi.co/api/v2/pokemon-species/aegislash");
		return true;
	} catch (error) {
		return false;
	}
};
