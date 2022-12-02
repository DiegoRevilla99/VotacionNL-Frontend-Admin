import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { EmpadronamientoRoutes } from "../module-empadronamiento/routes/EmpadronamientoRoutes";
import { JornadaRoutes } from "../module-jornada/routes/JornadaRoutes";
import { PreparacionRoutes } from "../module-preparacion/routes/PreparacionRoutes";
import { SidebarCustom } from "../ui/components/SidebarCustom";
import { Topbar } from "../ui/components/Topbar";

export const AdminRoutes = () => {
	return (
		<>
			<div className="app">
				<SidebarCustom></SidebarCustom>

				<main className="content">
					<Topbar></Topbar>
					<Routes>
						{/* EMPADRONAMIENTO*/}
						<Route
							path="/empadronamiento/*"
							element={<EmpadronamientoRoutes />}
						></Route>

						{/*JORNADA */}
						<Route path="/jornada/*" element={<JornadaRoutes />}></Route>

						{/* PREPARACION */}
						<Route path="/preparacion/*" element={<PreparacionRoutes />}></Route>

						{/* RUTA POR DEFAULT */}
						<Route path="/" element={<Navigate to="/preparacion/"></Navigate>}></Route>
					</Routes>
				</main>
				{/* <div className="generalContainer">HOLA MUNDO</div> */}
			</div>
		</>
	);
};
