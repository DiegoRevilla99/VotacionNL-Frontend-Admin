import { Snackbar } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUiStore } from "../hooks/useUiStore";
import { EmpadronamientoRoutes } from "../module-empadronamiento/routes/EmpadronamientoRoutes";
import { JornadaRoutes } from "../module-jornada/routes/JornadaRoutes";
import { PreparacionRoutes } from "../module-preparacion/routes/PreparacionRoutes";
import { SidebarCustom } from "../ui/components/SidebarCustom";
import { Topbar } from "../ui/components/Topbar";
import { Toaster, toast } from "react-hot-toast";

let toastId = null;

export const AdminRoutes = () => {
	const { status, toastCheckingMessage, toastErrorMessage, toastSuccessMessage } = useUiStore();

	console.log("MENSAJE: ", toastSuccessMessage);
	console.log("STATUS: ", status);
	useEffect(() => {
		if (status === "checking") {
			toastId = toast.loading(toastCheckingMessage);
		} else if (status === "success") {
			toast.success(toastSuccessMessage, {
				id: toastId,
			});
		} else if (status === "error") {
			toast.error(toastErrorMessage, {
				id: toastId,
			});
		}
	}, [status]);

	return (
		<>
			<Toaster />
			<div className="app">
				<SidebarCustom></SidebarCustom>

				<main
					className="content"
					style={{ display: "flex", flexDirection: "column", backgroundColor: "#f8f7f3" }}
				>
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
