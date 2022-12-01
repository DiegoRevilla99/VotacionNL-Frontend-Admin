import React from "react";
import { Button, Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export const HomePreparacion = () => {
  return (
    <>
    <div>
        <Paper>
          <Box p={1}>
            <h2>PREPARACIÓN</h2>
            </Box>
        </Paper>
    </div>
    <div>
    <Box p={8} sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        border: 1,
        boxShadow: 5,
        display: 'grid',
        alignItems: 'center',
        width: 900,
        height: 100,
        }}>
      <h3> ¿Qué tipo de plantilla desea usar?</h3>
      <Stack direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={14}
            >  
        <Button variant="contained" href="HomeJElectoral">PLANTILLA DE LA JORNADA ELECTORAL</Button>
        <Button variant="contained">PLANTILLA DEL COMITÉ</Button>
        <Button variant="contained">PLANTILLA DE LA CONSULTA CIUDADANA</Button>
      </Stack>
    </Box>

    </div>
    
    </>
  );
};
