import { createTheme } from '@mui/material/styles';


export const purpleTheme = createTheme({

    typography: {
        button: {
            textTransform: "none"
        }
    },
    palette: {
        primary: {
            main: '#511079'
        },
        secondary: {
            main: '#9E9E9E'
        },
        error: {
            main: '#D80808'
        }
    }
})