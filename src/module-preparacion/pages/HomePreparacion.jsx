import React from "react";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const HomePreparacion = () => {
  return (
    <>
    <div>
      <Box ml={3}>
      <h3>PREPARACIÓN</h3></Box>
      <hr/>
    </div>

    <div align = "center">

      <Box mt={7}>
        <Box p={8} sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          border: 1,
          boxShadow: 5,
          width: 900,
          height: 335,
          }}
          
          >
            <Typography ml={4} variant="h4" align="left" color="initial" paragraph>
              ¿Qué tipo de plantilla desea usar?
            </Typography>
        
        <Stack direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={8}
              
              >  
          <Button href="HomeJElectoral" sx={{   
                    backgroundColor: '#511079',
                    borderRadius: '0px 25px 25px 25px',
                    color: '#fff',
                    boxShadow: '9px 10px 4px rgba(0, 0, 0, 0.37)',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.01rem',
                    lineHeight: '1.5rem',
                    textAlign: 'center',
                    width: 240,
                    height: 270,
                    '&:hover': {
                        background: 'linear-gradient(45deg, #C9A9CE 30%, #C9A9CE 90%)',
                    },}} >PLANTILLA DE LA JORNADA ELECTORAL</Button>
          <Button href="" sx={{   
                    backgroundColor: '#511079',
                    borderRadius: '0px 25px 25px 25px',
                    color: '#fff',
                    boxShadow: '9px 10px 4px rgba(0, 0, 0, 0.37)',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.01rem',
                    lineHeight: '1.5rem',
                    textAlign: 'center',
                    width: 240,
                    height: 270,
                    '&:hover': {
                        background: 'linear-gradient(45deg, #C9A9CE 30%, #C9A9CE 90%)',
                    },}} >PLANTILLA DEL COMITÉ</Button>
          <Button href="" sx={{   
                    backgroundColor: '#511079',
                    borderRadius: '0px 25px 25px 25px',
                    color: '#fff',
                    boxShadow: '9px 10px 4px rgba(0, 0, 0, 0.37)',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.01rem',
                    lineHeight: '1.5rem',
                    textAlign: 'center',
                    width: 240,
                    height: 270,
                    '&:hover': {
                        background: 'linear-gradient(45deg, #C9A9CE 30%, #C9A9CE 90%)',
                    },}} >PLANTILLA DE LA CONSULTA CIUDADANA</Button>
        </Stack>
      </Box>
      </Box>

    </div>
    
    </>
  );
};
