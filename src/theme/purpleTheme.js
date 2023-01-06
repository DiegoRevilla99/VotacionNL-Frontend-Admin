import { createTheme } from "@mui/material/styles";

export const purpleTheme = createTheme({
	typography: {
		fontFamily: [
			'Roboto',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
			'Raleway, Arial',
		].join(','),
	},
	palette: {
		primary: {
			main: "#511079",
		},
		secondary: {
			main: "#9E9E9E",

		},
		error: {
			main: "#791010",
		},
	},
});
