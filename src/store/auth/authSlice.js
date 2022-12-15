import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		status: "notLogged", //logged, checking, notLogged
		uid: "",
		email: "",
		displayName: "",
		errorMessage: "",
	},
	reducers: {
		onChecking: (state, { payload }) => {
			state.status = "checking";
		},
		onLogin: (state, { payload }) => {
			state.status = "logged";
			state.uid = payload.uid;
			state.displayName = payload.displayName;
			state.email = payload.email;
		},
		onLogout: (state, { payload }) => {
			state.status = "notLogged";
			state.uid = "";
			state.displayName = "";
			state.email = "";
		},
		onError: (state, { payload }) => {
			state.errorMessage = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, onError } = authSlice.actions;

// export default consultaCiudadanaSlice.reducer;
