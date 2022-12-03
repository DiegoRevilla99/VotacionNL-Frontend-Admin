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
        <Box p={6} sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          border: 1,
          boxShadow: 5,
          width: 900,
          height: 340,
          }}
          
          >
            <Typography ml={4} variant="h5" align="left" paragraph>
              ¿QUÉ TIPO DE PLANTILLA DESEA USAR?
            </Typography>
        
        <Stack direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={8}
              
              >  
          <Button href="" sx={{   
                    backgroundColor: '#511079',
                    borderRadius: '0px 25px 25px 25px',
                    color: '#fff',
                    
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.01rem',
                    lineHeight: '1.5rem',
                    textAlign: 'center',
                    width: 240,
                    height: 270,
                    '&:hover': {
                        background: 'linear-gradient(45deg, #C9A9CE 30%, #C9A9CE 90%)',
                        boxShadow: '9px 10px 4px rgba(0, 0, 0, 0.37)',
                    },}} >PLANTILLA DE LA JORNADA ELECTORAL</Button>
          <Button href="" sx={{   
                    backgroundColor: '#511079',
                    borderRadius: '0px 25px 25px 25px',
                    color: '#fff',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.01rem',
                    lineHeight: '1.5rem',
                    textAlign: 'center',
                    width: 240,
                    height: 270,
                    '&:hover': {
                        background: 'linear-gradient(45deg, #C9A9CE 30%, #C9A9CE 90%)',
                        boxShadow: '9px 10px 4px rgba(0, 0, 0, 0.37)',
                    },}} >PLANTILLA DEL COMITÉ</Button>
          <Button href="" sx={{   
                    backgroundColor: '#511079',
                    borderRadius: '0px 25px 25px 25px',
                    color: '#fff',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.01rem',
                    lineHeight: '1.5rem',
                    textAlign: 'center',
                    width: 240,
                    height: 270,
                    '&:hover': {
                        background: 'linear-gradient(45deg, #C9A9CE 30%, #C9A9CE 90%)',
                        boxShadow: '9px 10px 4px rgba(0, 0, 0, 0.37)',
                    },}} >PLANTILLA DE LA CONSULTA CIUDADANA</Button>
        </Stack>
      </Box>
      </Box>

    </div>
    
    </>
  );
};
