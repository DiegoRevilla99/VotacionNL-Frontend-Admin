import axios from "axios";

export const TOKEN_KEY = "VOTACION_TOKEN";
export const REFRESH_TOKEN_KEY = "VOTACION_REFRESH_TOKEN";

export const authAPI = axios.create({
	baseURL: "https://ms-jornada-auth-nl.herokuapp.com/",
});

export const setToken = (token) => {
	sessionStorage.setItem(TOKEN_KEY, token);
};

export const setRefreshToken = (refreshToken) => {
	sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getToken = () => {
	return sessionStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = () => {
	return sessionStorage.getItem(REFRESH_TOKEN_KEY);
};

export const deleteToken = () => {
	sessionStorage.removeItem(TOKEN_KEY);
};

export const deleteRefreshToken = () => {
	sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};
