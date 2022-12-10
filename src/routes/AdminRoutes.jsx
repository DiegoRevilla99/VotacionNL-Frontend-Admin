import { Alert, Button, IconButton, Slide, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUiStore } from "../hooks/useUiStore";
import { EmpadronamientoRoutes } from "../module-empadronamiento/routes/EmpadronamientoRoutes";
import { JornadaRoutes } from "../module-jornada/routes/JornadaRoutes";
import { PreparacionRoutes } from "../module-preparacion/routes/PreparacionRoutes";
import { SidebarCustom } from "../ui/components/SidebarCustom";
import { Topbar } from "../ui/components/Topbar";

let toastId = null;

export const AdminRoutes = () => {
	const {
		status,
		toastCheckingMessage,
		toastErrorMessage,
		toastSuccessMessage,
		toastOffOperation,
	} = useUiStore();

	console.log("MENSAJE: ", toastSuccessMessage);
	console.log("STATUS: ", status);

	useEffect(() => {
		if (status === "success") {
			setTimeout(() => toastOffOperation(), 1000);
		}
	}, [status]);

	const [messageInfo, setMessageInfo] = useState(undefined);

	const handleExited = () => {
		setMessageInfo(undefined);
	};

	return (
		<>
			<Snackbar
				open={status === "success"}
				autoHideDuration={4000}
				TransitionProps={{ onExited: handleExited }}
				TransitionComponent={Slide}
			>
				<Alert severity="success" sx={{ width: "100%" }}>
					{toastSuccessMessage}
				</Alert>
			</Snackbar>
			<Snackbar
				open={status === "checking"}
				autoHideDuration={1000}
				TransitionProps={{ onExited: handleExited }}
				TransitionComponent={Slide}
			>
				<Alert severity="info">{toastCheckingMessage}</Alert>
			</Snackbar>
			<div className="app">
				<SidebarCustom></SidebarCustom>

				<main
					className="content"
					style={{
						display: "flex",
						flexDirection: "column",
						backgroundColor: "#f8f7f3",
					}}
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
