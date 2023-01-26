import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { consultasSlice } from "./module-empadronamiento/consultas/consultasSlice";
import { empFormalesSlice } from "./module-empadronamiento/formales/EmpFormalesSlice";
import { noFormalesSlice } from "./module-empadronamiento/no-formales/noFormalesSlice";
import { comiteSlice } from "./module-preparacion/comite/comiteSlice";
import { configBoletaSlice } from "./module-preparacion/configuracion-boleta/configBoletaSlice";
import { configJornadaSlice } from "./module-preparacion/configuracion-jornada/configJornadaSlice";
import { consultaCiudadanaSlice } from "./module-preparacion/consulta-ciudadana/consultaCiudadanaSlice";
import { SliceJornada } from "./module-preparacion/jornada/SliceJornada";
import { SliceJornadaNoFormal } from "./module-preparacion/jornada/SliceJornadaNoFormal";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
	reducer: {
		consultaCiudadana: consultaCiudadanaSlice.reducer,
		comite: comiteSlice.reducer,
		configBoleta: configBoletaSlice.reducer,
		jornada: SliceJornada.reducer, // Eliminar despu[es]
		jornadaNoFormal: SliceJornadaNoFormal.reducer,
		configJornada: configJornadaSlice.reducer,
		empFormales: empFormalesSlice.reducer,
		ui: uiSlice.reducer,
		auth: authSlice.reducer,
		noFormalesSlice: noFormalesSlice.reducer,
		consultasSlice: consultasSlice.reducer
	},
});
