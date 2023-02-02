// import React from "react";
import jsPDF from "jspdf";

import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";

export const captureScreen = () => {
	const filename = "rtgs-form.pdf";
	const node = document.getElementById("reporteInicialHTML");
	htmlToImage
		.toJpeg(node)
		.then((dataUrl) => {
			let pdf = new jsPDF("p", "pt", "letter");
			var width = pdf.internal.pageSize.getWidth();
			var height = pdf.internal.pageSize.getHeight();
			let img = new Image(width, height);
			img.src = dataUrl;
			// img.clientWidth = "8.5in";
			// img.offsetWidth = "8.5in";
			// img.scrollWidth = "8.5in";
			// img.naturalWidth = "8.5in";

			// pdf.addImage(img, "JPEG", 0, 0, 0, 0);
			pdf.addImage(img, "JPEG", 0, 0, width, height);
			// pdf.addImage(img, "JPEG", 0, 0, pdf.internal.pageSize.width, 791);
			// pdf.addImage(img, "PNG", );
			// pdf.save(filename);
			pdf.output("dataurlnewwindow", { filename: "fichero.pdf" });
			// pdf.text("Holaaaaaaaaaa", 30, 30);
		})
		.catch((error) => {
			console.error("oops, something went wrong!", error);
		});
};

export const captureCanvas = () => {
	// const node = document.getElementById("reporteInicialHTML");
	let doc = new jsPDF("p", "px", "letter"); // using defaults: orientation=portrait, unit=mm, size=A4
	let scale2 = doc.internal.pageSize.width / 200;

	html2canvas(document.getElementById("reporteInicialHTML"), {
		scale: scale2,
		allowTaint: true,
		useCORS: true,
	}).then((canvas) => {
		let image = canvas.toDataURL("image/jpeg", 1.0);
		// let img = new Image();
		// img.src = canvas.toDataURL("image/jpeg", 1.0);
		doc.addImage(image, "JPEG", 0, 0, canvas.width / 4.08, canvas.height / 4.08);
		// doc.save("myPage.pdf"); //Download the rendered PDF.
		doc.output("dataurlnewwindow", { filename: "fichero.pdf" });
	});
};

export const ReporteInicialPDF = () => {
	let doc = new jsPDF("p", "pt", "letter");
	let margin = 1;
	let scale = (doc.internal.pageSize.width - margin * 2) / document.body.scrollWidth;
	let scale2 = doc.internal.pageSize.width / 819;
	doc.html(document.getElementById("reporteInicialHTML"), {
		x: margin,
		y: margin,
		html2canvas: {
			scale: scale2,
			// allowTaint: false,

			// useCORS: true,
		},
		callback: function (doc) {
			doc.save("myPage.pdf"); //Download the rendered PDF.
			// doc.output("dataurlnewwindow", { filename: "fichero.pdf" });
		},
	});
	// doc.html(document.body, {
	// 	x: margin,
	// 	y: margin,
	// 	html2canvas: {
	// 		scale: scale,
	// 	},
	// 	callback: function (doc) {
	// 		doc.output("dataurlnewwindow", { filename: "fichero.pdf" });
	// 	},
	// });
};
