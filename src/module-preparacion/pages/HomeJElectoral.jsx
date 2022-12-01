import React from "react";
import { Button, Paper } from '@mui/material';
import Box from '@mui/material/Box';

import { 
    TableContainer, 
    Table, 
    TableHead, 
    TableBody, 
    TableCell, 
    TableRow } from '@mui/material';


export const HomeJElectoral = () => {
  return (
    <>
    <div>
        <Paper>
          <Box p={1}>
            <h2>JORNADA ELECTORAL</h2>
            </Box>
        </Paper>
    </div>
    <div>
    <Box p={7}>
        <Button variant="contained">REGISTRO DE LA JORNADA ELECTORAL</Button>
    </Box>
    <Box p={2}>
        <TableContainer component = {Paper} sx={{maxHeight:'300px'}}>
            <Table aria-label = 'simple table' stickyHeader>
                <TableHead>
                <TableRow>
                    <TableCell>JORNADAS ELECTORALES</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Elección Estatal 2022 Ordinaria</TableCell>
                        <TableCell align='center'><Button variant="contained">CONFIGURACIÓN</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>   
    </Box>
    </div>
    
    </>
  );
};
