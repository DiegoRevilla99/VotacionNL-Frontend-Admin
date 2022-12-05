import { configureStore } from "@reduxjs/toolkit";
import { consultaCiudadanaSlice } from "./module-preparacion/consulta-ciudadana/consultaCiudadanaSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
	reducer: {
		consultaCiudadana: consultaCiudadanaSlice.reducer,
		ui: uiSlice.reducer,
	},
});
