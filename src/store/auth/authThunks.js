import { setRefreshToken, setToken } from "../../providers/Micro-Auth/configAuth";
import { loginWithEmailAndPassword, refreshToken } from "../../providers/Micro-Auth/providerAuth";
import { onChecking, onError, onLogin } from "./authSlice";

export const onLoginWithEmailAndPassword = (email, password, navigate = () => {}) => {
	return async (dispatch) => {
		// dispatch(onToastCheckingOperation("Guardando papeleta..."));
		dispatch(onChecking());

		const { ok, accessToken, username, refreshToken } = await loginWithEmailAndPassword(
			email,
			password
		);

		if (ok) {
			// dispatch(onLogin({ uid: uid, displayName: name, email: email }));
			dispatch(onLogin({ accessToken, username, refreshToken, email }));

			console.log("Setea toke login", accessToken);
			setToken(accessToken);
			setRefreshToken(refreshToken);
			// navigate();
		} else {
			dispatch(onError("Error de autenticación. Revisa tus credenciales"));
			// dispatch(onToastErrorOperation({ errorMessage: "La papeleta no se pudo guardar" }));
		}
	};
};

export const onRefreshSession = () => {
	return async (dispatch) => {
		dispatch(onChecking());

		const { ok, refreshResponse, user } = await refreshToken();

		if (ok) {
			dispatch(
				onLogin({
					accessToken: refreshResponse.accessToken,
					username: user.curp,
					refreshToken: refreshResponse.refreshToken,
					email: user.email,
				})
			);
			console.log("Setea el token");
			setToken(refreshResponse.accessToken);
			setRefreshToken(refreshResponse.refreshToken);
		} else {
			dispatch(onError("Error"));
		}
	};
};
