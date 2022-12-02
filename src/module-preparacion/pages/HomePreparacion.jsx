import React from "react";
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const useStyle = makeStyles({
  boton: {
    background: 'linear-gradient(45deg, #511079 30%, #511079 90%)',
    borderRadius: '1px 19px 19px',
    border: 1,
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .23)",
    color: "white",
    padding: "0 30px",
    width: 230,
    height: 270,
    '&:hover': {
      background: 'linear-gradient(45deg, #C9A9CE 30%, #C9A9CE 90%)',
  },
  },
});

export const HomePreparacion = () => {
  const classes = useStyle();
  return (
    <>
    <div>
      <Box ml={3}>
      <h3>PREPARACIÓN</h3></Box>
      <hr/>
    </div>

    <div align = "center">

      <Box mt={5}>
        <Box p={8} sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          border: 1,
          boxShadow: 5,
          width: 900,
          height: 320,
          }}
          
          >
            <Typography variant="h5" align="left" color="initial" paragraph>
              ¿Qué tipo de plantilla desea usar?
            </Typography>
        
        <Stack direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={10}
              
              >  
          <Button variant="contained" href="HomeJElectoral" className={classes.boton} >PLANTILLA DE LA JORNADA ELECTORAL</Button>
          <Button variant="contained" className={classes.boton}>PLANTILLA DEL COMITÉ</Button>
          <Button variant="contained" className={classes.boton}>PLANTILLA DE LA CONSULTA CIUDADANA</Button>
        </Stack>
      </Box>
      </Box>

    </div>
    
    </>
  );
};
