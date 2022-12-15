import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../module-auth/routes/AuthRoutes";

import { AdminRoutes } from "../routes/AdminRoutes";

import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
	// const { status: userStatus } = useSelector((state) => state.auth);
	// const logged = userStatus === "logged" ? true : false;
	const logged = true;
	return (
		<Routes>
			{/* LOGIN Y REGISTRO */}

			<Route path="/auth/*" element={<AuthRoutes logged={logged} />}></Route>

			<Route
				path="/*"
				element={
					<PrivateRoute logged={logged}>
						<AdminRoutes />
					</PrivateRoute>
				}
			></Route>
		</Routes>
	);
};
