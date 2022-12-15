import { loginWithEmailAndPassword } from "../../providers/Micro-Auth/providerAuth";
import { onChecking, onError, onLogin } from "./authSlice";

export const onLoginWithEmailAndPassword = (email, password, navigate = () => {}) => {
	return async (dispatch) => {
		// dispatch(onToastCheckingOperation("Guardando papeleta..."));
		dispatch(onChecking());

		const { ok, uid, name } = await loginWithEmailAndPassword(email, password);

		if (ok) {
			dispatch(onLogin({ uid: uid, displayName: name, email: email }));
			// dispatch(onToastSuccessOperation({ successMessage: "Pepeleta guardada con éxito" }));
			navigate();
		} else {
			dispatch(onError("Error de autenticación. Revisa tus credenciales"));
			// dispatch(onToastErrorOperation({ errorMessage: "La papeleta no se pudo guardar" }));
		}
	};
};
