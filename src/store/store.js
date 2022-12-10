import { configureStore } from "@reduxjs/toolkit";
import { comiteSlice } from "./module-preparacion/comite/comiteSlice";
import { consultaCiudadanaSlice } from "./module-preparacion/consulta-ciudadana/consultaCiudadanaSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
	reducer: {
		consultaCiudadana: consultaCiudadanaSlice.reducer,
		comite: comiteSlice.reducer,
		// jornada: jornadaSlice.reducer,
		ui: uiSlice.reducer,
	},
});
