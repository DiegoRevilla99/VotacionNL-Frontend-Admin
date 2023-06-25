import React, { useRef, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useParams } from "react-router-dom";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
// import { ReporteInicialPDF } from "../components/ReporteInicialPDF";
// import jsPDF from "jspdf";
import { jsPDF } from "jspdf";
// import { ReporteInicialPDF } from "../components/ReporteInicialPDF";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";
import { captureCanvas, captureScreen, ReporteInicialPDF } from "../components/ReporteInicialPDF";
import { ReporteInicialHTML } from "../components/ReporteInicialHTML";
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

import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

export const JornadaFormalChart = ({ chartData = { resultados: [] }, tipoReporte }) => {
  console.log("DATA CHAR QUE OCUPARE", chartData);
  const total = parseInt(
    chartData.resultados.reduce((acc, cur) => acc + cur.resultados, 0),
    10
  );

  const votosNormales =
    chartData?.resultados
      ?.map((resul) => {
        if (resul.id !== 99999 && resul.id !== 99998) return resul.resultados;
        return 0;
      })
      ?.reduce((a, b) => {
        return a + b;
      }, 0) || 0;

  const labelsAdjusted = chartData.resultados.map((label) => label.candiato.split(" "));
  const { jornadaSelected } = useJornadaStore();
  const chartRef = useRef(null);
  console.log("model", jornadaSelected);
  const [data, setData] = useState({
    // labels: chartData.map((data) => data.nombre),
    // labels: chartData.resultados.map((resultado) => resultado.candiato),
    labels: labelsAdjusted,
    datasets: [
      {
        label: "Votos",
        data: chartData.resultados.map((data) => data.resultados),
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
        image: chartData.resultados.map((resultado) => resultado.fotos || "none"),
      },
      {
        label: "Votos",

        data: total === 0 ? 10 : chartData.resultados.map((data) => total),
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
        imageLink.forEach((imagen, index2) => {
          const logo = new Image();
          logo.src = imagen;
          ctx.drawImage(
            logo,
            // x.getPixelForValue(index) - 90 + 90 / (imageLink.length + (1 / 2) * index2),
            x.getPixelForValue(index) -
              90 +
              (75 /
                (imageLink.length === 1
                  ? 1
                  : imageLink.length === 2
                  ? 1.5
                  : imageLink.length === 3
                  ? 2
                  : imageLink.length === 4
                  ? 2.5
                  : imageLink.length === 5
                  ? 3
                  : 1)) *
                (index2 + 1),
            // x.getPixelForValue(index) - 80 + 80 / (index2 * index2 + 1),
            y.getPixelForValue(0) + 90,
            30,
            30
          );
        });
      });
    },
  };

  const tooltipLabels = {
    id: "tooltipLabels",
    beforeEvent(chart, args, pluginOptions) {
      const {
        ctx,
        options,
        data,
        scales: { x, y },
      } = chart;

      const event = args.event;

      if (event.type === "mousemove") {
        // if (
        // 	event.x >= x.getPixelForValue(0) - 20 &&
        // 	event.x <= x.getPixelForValue(0) + 20 &&
        // 	event.y >= y.getPixelForValue(0) &&
        // 	event.y <= y.getPixelForValue(0) + 40
        // ) {
        const tooltip = chart.tooltip;

        // console.log("ENTRA AL EVENTO");
        const chartArea = chart.chartArea;
        // console.log("area", chartArea);
        tooltip.setActiveElements(
          [
            {
              datasetIndex: 0,
              index: 0,
            },
            {
              datasetIndex: 1,
              index: 0,
            },
          ],
          {
            x: (chartArea.left + chartArea.right) / 2,
            y: (chartArea.top + chartArea.bottom) / 2,
          }
        );
        chart.update();
        // }
        // }
      }
    },
  };

  const handlePDF = () => {
    captureCanvas(tipoReporte);
  };

  if (
    (chartData.configDates !== undefined || chartData.configDates !== null) &&
    (chartData.resultados.length === 0 ||
      !chartData.resultados ||
      chartData.boleta === null ||
      chartData.boleta === undefined)
  )
    return (
      <Box>
        {tipoReporte === "reporteInicialHTML" ? (
          <Typography variant="h6" color="initial">
            Reporte no disponible
            {/* Reporte no disponible hasta el{" "} */}
            {/* {dayjs(chartData?.configDates?.inicioRecepVoto).format(
              "DD [de] MMMM [de] YYYY [a las] HH[:]mm [horas]"
            )} */}
          </Typography>
        ) : (
          <Typography variant="h6" color="initial">
            Reporte no disponible
            {/* Reporte no disponible hasta el{" "} */}
            {/* {dayjs(chartData?.configDates?.finRecepVoto).format(
              "DD [de] MMMM [de] YYYY [a las] HH[:]mm [horas]"
            )} */}
          </Typography>
        )}
      </Box>
    );
  else {
    if (
      new Date(chartData?.configDates?.finRecepVoto) > new Date() &&
      tipoReporte === "reporteFinalHTML"
    )
      return (
        <Typography variant="h6" color="initial">
          Reporte final no disponible hasta el{" "}
          {dayjs(chartData?.configDates?.finRecepVoto).format(
            "DD [de] MMMM [de] YYYY [a las] HH[:]mm [horas]"
          )}
        </Typography>
      );

    if (
      new Date(chartData?.configDates?.inicioRecepVoto) > new Date() &&
      tipoReporte === "reporteInicialHTML"
    )
      return (
        <Typography variant="h6" color="initial">
          Reporte inicial no disponible hasta el{" "}
          {dayjs(chartData?.configDates?.inicioRecepVoto).format(
            "DD [de] MMMM [de] YYYY [a las] HH[:]mm [horas]"
          )}
        </Typography>
      );
    return (
      <>
        <Grid container spacing={2} id="ejemplo23">
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
            ></Grid>
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
              xs={4}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography variant="body1" color="initial" align="center">
                Participación ciudadana
              </Typography>
              <Typography variant="body1" color="initial" fontWeight="bold" align="center">
                {(
                  (chartData.participacion.cantidadVotaron * 100) /
                  chartData.participacion.totalEmpadronados
                ).toFixed(2)}
                %
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography variant="body1" color="initial" align="center">
                Inicio
              </Typography>
              <Typography variant="body2" color="initial" fontWeight="bold" align="center">
                {dayjs(chartData.configDates.inicioRecepVoto).format("DD [de] MMMM YYYY")}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <Typography variant="body1" color="initial" align="center">
                Fin
              </Typography>
              <Typography variant="body2" color="initial" fontWeight="bold" align="center">
                {dayjs(chartData.configDates.finRecepVoto).format("DD [de] MMMM YYYY")}
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
                  <Typography variant="caption" color="initial" sx={{ wordBreak: "break-word" }}>
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

                <Grid item xs={3} display="flex" flexDirection="column" alignItems="center">
                  <Box display="flex" flexDirection="column">
                    <Typography
                      variant="body1"
                      color="initial"
                      fontWeight="bold"
                      // sx={{ fontSize: "1rem" }}
                    >
                      {votosNormales ||
                        0 -
                          chartData?.resultados?.find((resul) => resul.id === 99999)?.resultados ||
                        0 -
                          chartData?.resultados?.find((resul) => resul.id === 99998)?.resultados ||
                        0}
                      {/* 0 */}
                    </Typography>
                    <Typography variant="caption" color="initial" fontWeight="bold">
                      {/* {(
												((total -
													chartData.resultados.find(
														(resul) => resul.id === 99999
													).resultados -
													chartData.resultados.find(
														(resul) => resul.id === 99998
													).resultados) *
													100) /
												total
											).toFixed(2)} */}
                      {(
                        ((votosNormales ||
                          0 -
                            chartData?.resultados?.find((resul) => resul.id === 99999)
                              ?.resultados ||
                          0 -
                            chartData?.resultados?.find((resul) => resul.id === 99998)
                              ?.resultados ||
                          0) *
                          100) /
                          total || 0
                      ).toFixed(2)}
                      %
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
                <Grid item xs={3} display="flex" flexDirection="column" alignItems="center">
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body1" color="initial" fontWeight="bold">
                      {chartData?.resultados?.find((resul) => resul.id === 99998)?.resultados || 0}
                    </Typography>
                    <Typography variant="caption" color="initial" fontWeight="bold">
                      {(
                        ((chartData?.resultados?.find((resul) => resul.id === 99998)?.resultados ||
                          0) *
                          100) /
                          total || 0
                      ).toFixed(2)}
                      %
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={1} display="flex" flexDirection="column" alignItems="center">
                  <Typography
                    variant="caption"
                    color="initial"
                    sx={{ fontSize: "2rem" }}
                    fontWeight="bold"
                  >
                    +
                  </Typography>
                </Grid>
                <Grid item xs={3} display="flex" flexDirection="column" alignItems="center">
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body1" color="initial" fontWeight="bold">
                      {chartData?.resultados?.find((resul) => resul.id === 99999)?.resultados || 0}
                    </Typography>
                    <Typography variant="caption" color="initial" fontWeight="bold">
                      {(
                        ((chartData?.resultados?.find((resul) => resul.id === 99999)?.resultados ||
                          0) *
                          100) /
                          total || 0
                      ).toFixed(2)}
                      %
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={1} display="flex" flexDirection="column" alignItems="center">
                  <Typography
                    variant="caption"
                    color="initial"
                    sx={{ fontSize: "2rem" }}
                    fontWeight="bold"
                  >
                    =
                  </Typography>
                </Grid>
                <Grid item xs={3} display="flex" flexDirection="column" alignItems="center">
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body1" color="initial" fontWeight="bold">
                      {total}
                    </Typography>
                    <Typography variant="caption" color="initial" fontWeight="bold">
                      100%
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Chart
            type="bar"
            ref={chartRef}
            data={data}
            plugins={[ChartDataLabels, imageItems]}
            options={{
              layout: {
                padding: {
                  bottom: 90,
                },
              },

              interaction: {
                intersect: false,
                mode: "index",
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
                    // console.log("TOOLTIPITEM", tooltipItem);
                    return tooltipItem.datasetIndex === 0;
                  },
                  // usePointStyle: true,
                  // callbacks: {
                  // 	labelPointStyle: (context) => {
                  // 		console.log(context);
                  // 		console.log(
                  // 			"Imagen",
                  // 			context.dataset.image[context.dataIndex]
                  // 		);
                  // 		const image = new Image(15, 15);
                  // 		image.src = context.dataset.image[context.dataIndex];
                  // 		return {
                  // 			pointStyle: image,
                  // 		};
                  // 	},
                  // 	beforeTitle: (context) => {
                  // 		return context[0].dataset.labels[context[0].dataIndex];
                  // 	},
                  // },
                },
                legend: {
                  display: false,
                },
                datalabels: {
                  display: function (data) {
                    return data.datasetIndex === 0;
                  },
                  labels: {
                    // events: ["mousemove"],
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
                        return total !== 0 ? ((value * 100) / total).toFixed(2) + "%" : "0.00%";
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
        </Box>
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
            id="nodoespecifico"
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
        {/* <ReporteInicialHTML /> */}
      </>
    );
  }
};
