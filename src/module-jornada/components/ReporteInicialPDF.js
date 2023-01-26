// import React from "react";
import jsPDF from "jspdf";

// var headers = createHeaders([
// 	"Partido",
// 	"coin",
// 	"game_group",
// 	"game_name",
// 	"game_version",
// 	"machine",
// 	"vlt",
// ]);

let saltoDeLinea = 10;

const agregarSalto = (espaciado = 1, tamanoFuente = 12) => {
	const comienzo = 80;

	const nuevo = comienzo + saltoDeLinea + 10 * espaciado + tamanoFuente;
	saltoDeLinea += 10;
	return nuevo;
};

export const ReporteInicialPDF = ({ nombreJornada, nombreBoleta }) => {
	let doc = new jsPDF("p", "pt", "letter");
	let marginLeft = 50;

	let imagen =
		"data:image/png;base64,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6I03Rsg/Zf4jRw67VmedNi1HYZ/tiy8+V2ZYt26tH39lrdWW+V4KgKqIwvhX/TGUyq/1mKf0woTqHoSVpLCwUDJPLrLR0VEJCQllvg5fjX78mpaZmXH27NmoqEgJP6lieh6PvnqSjDx37px5/uVLQ5m3cwGg9NfqYKPjwAql4JVawmt6ftClOoJf8UMEAFSsUvhKhboCj+6mF567hPtPEAIAKqbgjDFItW9BGNFSzzt+aXefIAQAVLhSmP6JFvjXco8yFnm/nr3jku88QQgA8EMUGgOqBP7Zuwj8tTEqWcIgPedgddh1ghAA4JcozDPG4Ay52nlg5Ju06O5afD89+R1jVLKitGqy4wQhAMBfWViopS3WYntqwf9rtAU1738G/E4LrasnDNQy1uj5AVU00CZBCAC4ZArOaKkfaknvaInjtKTxxrjTGav0wpRqu78EIQDgskYQAgAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAAQQgAAEEIAABBCAAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAgCAEAIAgBACAIAQAEIacAAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAEAQAgBAEAIAQBACAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAAAIQgAACEIAAAhCAACqwv8H2GsmHz5nuBAAAAAASUVORK5CYII=";

	doc.addImage(imagen, 50, -40, 180, 180);
	doc.line(50, 80, 560, 80);

	let textoTitutlo = `Reporte inicial`;
	let lineasTitutlo = doc.setFontSize(12);

	let textoTitutloJornada = `${nombreJornada}: ${nombreBoleta}`;
	let lineasTituloJornada = doc.setFontSize(12);

	// let lineasDeTexto = doc.setFont("Arial").setFontSize(12).splitTextToSize(texto, 1);
	let verticalOffset = 0.5;
	// doc.text(16.5, verticalOffset + 600 / 80, lineasDeTexto);
	doc.text(textoTitutlo, marginLeft, agregarSalto(1, lineasTitutlo.getFontSize()), {
		align: "justify",
		maxWidth: 510,
	});
	doc.text(textoTitutloJornada, marginLeft, agregarSalto(1, lineasTituloJornada.getFontSize()), {
		align: "justify",
		maxWidth: 510,
	});
	// verticalOffset += ((lineasDeTexto.length + 0.5) * 12) / 72;

	doc.output("dataurlnewwindow", { filename: "fichero.pdf" });
};
