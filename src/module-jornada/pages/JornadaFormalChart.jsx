import React, { useRef, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useParams } from "react-router-dom";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
// import { ReporteInicialPDF } from "../components/ReporteInicialPDF";
// import jsPDF from "jspdf";
import { jsPDF } from "jspdf";
import { ReporteInicialPDF } from "../components/ReporteInicialPDF";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";
// import ReactPDF from "@react-pdf/renderer";
// import {
// 	Chart as ChartJS,
// 	CategoryScale,
// 	LinearScale,
// 	BarElement,
// 	Title,
// 	Tooltip,
// 	Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const JornadaFormalChart = ({ chartData }) => {
	const total = chartData.reduce((acc, cur) => acc + cur.votos, 0);
	const { jornadaSelected } = useJornadaStore();
	const chartRef = useRef(null);
	const params = useParams();
	const [data, setData] = useState({
		// labels: chartData.map((data) => data.nombre),
		labels: chartData.map((data) => ""),
		datasets: [
			{
				label: "Votos",
				data: chartData.map((data) => data.votos),
				backgroundColor: [
					"#8B3232",
					"#8B5232",
					"#8B7D32",
					"#598B32",
					"#328B70",
					"#32768B",
					"#32468B",
					"#59328B",
					"#89328B",
					"#8B3252",
				],
				image: [
					"https://www.chartjs.org/img/chartjs-logo.svg",
					"https://www.chartjs.org/img/chartjs-logo.svg",
					"https://www.chartjs.org/img/chartjs-logo.svg",
					"https://www.chartjs.org/img/chartjs-logo.svg",
					"https://www.chartjs.org/img/chartjs-logo.svg",
					"https://www.chartjs.org/img/chartjs-logo.svg",
					"https://www.chartjs.org/img/chartjs-logo.svg",
					"https://www.chartjs.org/img/chartjs-logo.svg",
					"https://www.chartjs.org/img/chartjs-logo.svg",
					"https://www.chartjs.org/img/chartjs-logo.svg",
					"https://www.chartjs.org/img/chartjs-logo.svg",
					"https://www.chartjs.org/img/chartjs-logo.svg",
					"https://www.chartjs.org/img/chartjs-logo.svg",
				],
			},
			{
				label: "Votos",

				data: chartData.map((data) => 600),
				backgroundColor: ["#ededed"],
				grouped: false,
				order: 1,
				hoverBackgroundColor: "#ededed",
			},
		],
	});

	const imageItems = {
		id: "imageItems",
		beforeDatasetsDraw(chart, args, pluginOptions) {
			const {
				ctx,
				options,
				data,
				scales: { x, y },
			} = chart;
			ctx.save();
			const imageSize = options.layout.padding.bottom;
			data.datasets[0].image.forEach((imageLink, index) => {
				const logo = new Image();
				logo.src = imageLink;
				ctx.drawImage(
					logo,
					x.getPixelForValue(index) - 40 / 2,
					y.getPixelForValue(0) + 5,
					40,
					40
				);
			});
		},
	};

	const handlePDF = () => {
		const boleta = jornadaSelected.boletas.find(
			(boleta) => boleta.idEstructuraBoleta === parseInt(params.idBoleta, 10)
		);

		console.log("bolll", boleta);
		ReporteInicialPDF({
			nombreJornada: jornadaSelected.title,
			nombreBoleta: boleta.nombreEleccion,
		});
	};

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={3}></Grid>
				<Grid item container xs={6}>
					<Grid
						item
						xs={4}
						display="flex"
						justifyContent="center"
						alignContent="center"
						alignItems="center"
					>
						<Typography
							variant="h6"
							color="initial"
							align="center"
							sx={{ wordBreak: "break-word" }}
						>
							Nuevo León
						</Typography>
					</Grid>
					<Grid
						item
						xs={3}
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignContent="center"
						alignItems="center"
					>
						<Box borderRight="1px solid" pr={4} display="flex" flexDirection="column">
							<Typography
								variant="body1"
								color="initial"
								align="center"
								fontWeight="bold"
							>
								Presidente
							</Typography>
							<Typography variant="body2" color="initial" align="center">
								Mayoría relativa
							</Typography>
						</Box>
					</Grid>
					<Grid
						item
						xs={5}
						display="flex"
						justifyContent="center"
						alignContent="center"
						alignItems="center"
					>
						<Typography
							variant="body2"
							color="initial"
							// fontWeight="bold"
							align="center"
						>
							Voto por partido político y Candidatura independiente
						</Typography>
					</Grid>
				</Grid>
				<Grid item xs={3}></Grid>
			</Grid>
			<Divider sx={{ paddingTop: "1.5rem" }} />
			<Grid container spacing={2} pb={3}>
				<Grid item container xs={12} md={6}>
					<Grid
						item
						xs={6}
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignContent="center"
						alignItems="center"
					>
						<Typography variant="body1" color="initial" align="center">
							Participación ciudadana
						</Typography>
						<Typography
							variant="body1"
							color="initial"
							fontWeight="bold"
							align="center"
						>
							0.0%
						</Typography>
					</Grid>
					<Grid
						item
						xs={6}
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignContent="center"
						alignItems="center"
					>
						<Typography variant="body1" color="initial" align="center">
							Inicio
						</Typography>
						<Typography
							variant="body2"
							color="initial"
							fontWeight="bold"
							align="center"
						>
							20 Enero 2023
						</Typography>
					</Grid>
				</Grid>
				<Grid item container xs={12} md={6}>
					<Box bgcolor="#f2f2f2" border="1px solid" width="100%" p={1}>
						<Typography variant="h6" color="#543884" sx={{ fontSize: "1rem" }}>
							Resumen de la votación
						</Typography>
						<Grid container spacing={1} columns={15}>
							<Grid
								item
								xs={3}
								display="flex"
								flexDirection="column"
								alignItems="center"
								justifyContent="center"
							>
								<Typography
									variant="caption"
									color="initial"
									sx={{ wordBreak: "break-word" }}
								>
									Votos acumulados
								</Typography>
							</Grid>
							<Grid
								item
								xs={1}
								display="flex"
								flexDirection="column"
								alignItems="center"
								justifyContent="center"
							></Grid>
							<Grid
								item
								xs={3}
								display="flex"
								flexDirection="column"
								alignItems="center"
								justifyContent="center"
							>
								<Typography
									variant="caption"
									color="initial"
									sx={{ wordBreak: "break-word" }}
									align="center"
								>
									Candidaturas no registradas
								</Typography>
							</Grid>
							<Grid
								item
								xs={1}
								display="flex"
								flexDirection="column"
								alignItems="center"
								justifyContent="center"
							></Grid>
							<Grid
								item
								xs={3}
								display="flex"
								flexDirection="column"
								alignItems="center"
								justifyContent="center"
							>
								<Typography
									variant="caption"
									color="initial"
									sx={{ wordBreak: "break-word" }}
									align="center"
								>
									Votos nulos
								</Typography>
							</Grid>
							<Grid
								item
								xs={1}
								display="flex"
								flexDirection="column"
								alignItems="center"
								justifyContent="center"
							></Grid>
							<Grid
								item
								xs={3}
								display="flex"
								flexDirection="column"
								alignItems="center"
								justifyContent="center"
							>
								<Typography
									variant="caption"
									color="initial"
									sx={{
										wordBreak: "break-word",
										textDecoration: "underline",
									}}
									align="center"
									fontWeight="bold"
								>
									Total de votos
								</Typography>
							</Grid>

							<Grid
								item
								xs={3}
								display="flex"
								flexDirection="column"
								alignItems="center"
							>
								<Box display="flex" flexDirection="column">
									<Typography
										variant="body1"
										color="initial"
										fontWeight="bold"
										// sx={{ fontSize: "1rem" }}
									>
										0
									</Typography>
									<Typography variant="caption" color="initial" fontWeight="bold">
										0.00%
									</Typography>
								</Box>
							</Grid>
							<Grid
								item
								xs={1}
								display="flex"
								flexDirection="column"
								alignItems="center"
								justifyItems="center"
							>
								<Typography
									variant="caption"
									color="initial"
									sx={{ fontSize: "2rem" }}
									fontWeight="bold"
								>
									+
								</Typography>
							</Grid>
							<Grid
								item
								xs={3}
								display="flex"
								flexDirection="column"
								alignItems="center"
							>
								<Box display="flex" flexDirection="column">
									<Typography variant="body1" color="initial" fontWeight="bold">
										0
									</Typography>
									<Typography variant="caption" color="initial" fontWeight="bold">
										0.00%
									</Typography>
								</Box>
							</Grid>
							<Grid
								item
								xs={1}
								display="flex"
								flexDirection="column"
								alignItems="center"
							>
								<Typography
									variant="caption"
									color="initial"
									sx={{ fontSize: "2rem" }}
									fontWeight="bold"
								>
									+
								</Typography>
							</Grid>
							<Grid
								item
								xs={3}
								display="flex"
								flexDirection="column"
								alignItems="center"
							>
								<Box display="flex" flexDirection="column">
									<Typography variant="body1" color="initial" fontWeight="bold">
										0
									</Typography>
									<Typography variant="caption" color="initial" fontWeight="bold">
										0.00%
									</Typography>
								</Box>
							</Grid>
							<Grid
								item
								xs={1}
								display="flex"
								flexDirection="column"
								alignItems="center"
							>
								<Typography
									variant="caption"
									color="initial"
									sx={{ fontSize: "2rem" }}
									fontWeight="bold"
								>
									=
								</Typography>
							</Grid>
							<Grid
								item
								xs={3}
								display="flex"
								flexDirection="column"
								alignItems="center"
							>
								<Box display="flex" flexDirection="column">
									<Typography variant="body1" color="initial" fontWeight="bold">
										0
									</Typography>
									<Typography variant="caption" color="initial" fontWeight="bold">
										0.00%
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
			<Chart
				type="bar"
				ref={chartRef}
				data={data}
				plugins={[ChartDataLabels, imageItems]}
				options={{
					layout: {
						padding: {
							bottom: 30,
						},
					},
					indexAxis: "x",
					responsive: true,
					plugins: {
						title: {
							display: true,
							padding: {
								top: 10,
								bottom: 30,
							},
							text: "Porcentaje de votos",
						},
						tooltip: {
							filter: function (tooltipItem) {
								return tooltipItem.datasetIndex === 0;
							},
						},
						legend: {
							display: false,
						},
						datalabels: {
							display: function (data) {
								return data.datasetIndex === 0;
							},
							// color: "#000000",
							labels: {
								title: {
									display: function (data) {
										return data.datasetIndex === 0;
									},
									formatter: function (value, context) {
										return value + "\nvotos";
									},
									textAlign: "center",
									color: "white",
								},
								value: {
									// display: function (data) {
									// 	return data.datasetIndex === 0;
									// },
									formatter: function (value, context) {
										return ((value * 100) / total).toFixed(2) + "%";
									},
									anchor: "end",
									align: "top",
									color: "black",
								},
							},
						},
					},
					aspectRatio: 3,
					scales: {
						y: {
							grid: {
								display: false,
							},
						},
						x: {
							grid: {
								display: false,
							},
						},
					},
				}}
			/>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					pt: 5,
				}}
			>
				{/* <Button color="base">Regresar</Button> */}
				<Box sx={{ flex: "1 1 auto" }} />

				<Button
					variant="contained"
					size="large"
					onClick={handlePDF}
					sx={{
						boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
						transition: "all 0.5s ease",
						backgroundColor: "#511079",
						width: "25%",
						// borderRadius: "25px 25px 25px 25px",
						"&:hover": {
							backgroundColor: "#7E328B !important",
							transform: "translate(-5px, -5px)",
							boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
						},
					}}
				>
					DESCARGAR REPORTE
				</Button>
			</Box>
		</>
	);
};
