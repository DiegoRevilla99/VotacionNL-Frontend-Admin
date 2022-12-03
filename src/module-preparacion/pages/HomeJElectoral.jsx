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
      <Box ml={3}>
      <h3>JORNADA ELECTORAL</h3></Box>
      <hr/>
    </div>
    <div>
    <Box ml={5} p={7}>
        <Button sx={{   
                   backgroundColor: '#511079',
                   borderRadius: '0px 25px 25px 25px',
                   color: '#fff',
                   fontSize: '1.3rem',
                   fontWeight: '700',
                   letterSpacing: '0.01rem',
                   lineHeight: '1.5rem',
                   textAlign: 'center',
                    boxShadow: '9px 10px 4px rgba(0, 0, 0, 0.37)',
                    width: 220,
                    height: 110,
                    '&:hover': {
                        background: 'linear-gradient(45deg, #C9A9CE 30%, #C9A9CE 90%)',
                    },}}>REGISTRO DE LA JORNADA ELECTORAL</Button>
    </Box>
    <Box p={2}>
        <TableContainer component = {Paper} sx={{maxHeight:'300px'}}>
            <Table aria-label = 'simple table' stickyHeader>
                <TableHead>
                <TableRow>
                    <TableCell><h3>JORNADAS ELECTORALES</h3></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Elección Estatal 2022 Ordinaria</TableCell>
                        <TableCell align='center'>
                            <Button sx={{   
                                backgroundColor: '#511079',
                                borderRadius: 10,
                                color: '#fff',
                                boxShadow: 5,
                                width: 170,
                                height: 50,
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #C9A9CE 30%, #C9A9CE 90%)',
                                },}}>
                                CONFIGURACIÓN
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>   
    </Box>
    </div>
    
    </>
  );
};
