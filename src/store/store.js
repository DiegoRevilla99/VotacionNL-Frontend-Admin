import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { comiteSlice } from "./module-preparacion/comite/comiteSlice";
import { configBoletaSlice } from "./module-preparacion/configuracion-boleta/configBoletaSlice";
import { consultaCiudadanaSlice } from "./module-preparacion/consulta-ciudadana/consultaCiudadanaSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
	reducer: {
		consultaCiudadana: consultaCiudadanaSlice.reducer,
		comite: comiteSlice.reducer,
		configBoleta: configBoletaSlice.reducer,
		// jornada: jornadaSlice.reducer,
		ui: uiSlice.reducer,
		auth: authSlice.reducer,
	},
});
