import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { AuthRoutes } from "../module-auth/routes/AuthRoutes";
// import { VisualizadorDePDF } from "../module-jornada/pages/VisualizadorDePDF";

import { AdminRoutes } from "../routes/AdminRoutes";

import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
	// const { status: userStatus } = useSelector((state) => state.auth);
	// const logged = userStatus === "logged" ? true : false;

	// const { status } = useCheckAuth();

	// console.log("STATUS LOGIN", status);

	// const location = useLocation();
	// console.log(location);
	// sessionStorage.setItem("Location", location.pathname);
	const logged = true;
	// if (status === "checking") return <>Cargando</>;
	// else
	return (
		<Routes>
			{/* LOGIN Y REGISTRO */}

			<Route path="/auth/*" element={<AuthRoutes />}></Route>

			<Route
				path="/*"
				element={
					<PrivateRoute>
						<AdminRoutes />
					</PrivateRoute>
				}
			></Route>

			{/* <Route path={"/verPDF/reporteInicial/*"} element={<VisualizadorDePDF />} /> */}
		</Routes>
	);
};
