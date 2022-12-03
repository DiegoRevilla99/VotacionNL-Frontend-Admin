import React from "react";
import { Button, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { 
    TableContainer, 
    Table, 
    TableHead, 
    TableBody, 
    TableCell, 
    TableRow } from '@mui/material';

export const PcrudBoleta = () => {
    return (
        <>
        <div>
          <Box ml={3}>
          <h3>REGISTRO</h3></Box>
          <hr/>
        </div>
        <div>
        <Box ml={6} p={3}>
        <Typography variant="h5" align="left" color="initial" paragraph>
              ¿Qué tipo de plantilla desea usar?
            </Typography>
            <Button sx={{   
                       backgroundColor: '#511079',
                       borderRadius: '25px 25px 25px 25px',
                       color: '#fff',
                       fontSize: '1.3rem',
                       fontWeight: '700',
                       letterSpacing: '0.01rem',
                       lineHeight: '1.5rem',
                       textAlign: 'center',
                        boxShadow: '5px 5px 2px rgba(0, 0, 0, 0.37)',
                        width: 320,
                        height: 50,
                        '&:hover': {
                            background: 'linear-gradient(45deg, #C9A9CE 30%, #C9A9CE 90%)',
                        },}}>Agregar boleta</Button>
        </Box>
        <Box m={8}>
            <TableContainer component = {Paper} sx={{maxHeight:'300px'}}>
                <Table aria-label = 'simple table' stickyHeader>
                    <TableHead align="center">
                        <h3> BOLETAS REGISTRADAS</h3>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>BOLETA “[nombre de la candidatura]”</TableCell>
                            <TableCell align='center'>
                            <Stack direction="row"
                                    spacing={1}
                                    justifyContent="flex-end"
                                    >  
                                <Button sx={{   
                                    backgroundColor: '#511079',
                                    borderRadius: 10,
                                    color: '#fff',
                                    boxShadow: 5,
                                    width: 100,
                                    height: 40,
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #C9A9CE 30%, #C9A9CE 90%)',
                                    },}}>
                                    EDITAR
                                </Button>
                                <Button sx={{   
                                    backgroundColor: '#D80808',
                                    borderRadius: 10,
                                    color: '#fff',
                                    boxShadow: 5,
                                    width: 100,
                                    height: 40,
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #D8AA08 30%, #D80808 90%)',
                                    },}}>
                                    ELIMINAR
                                </Button>
                            </Stack>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>BOLETA “[nombre de la candidatura]”</TableCell>
                            <TableCell align='center'>
                            <Stack direction="row"
                                    spacing={1}
                                    justifyContent="flex-end"
                                    >  
                                <Button sx={{   
                                    backgroundColor: '#511079',
                                    borderRadius: 10,
                                    color: '#fff',
                                    boxShadow: 5,
                                    width: 100,
                                    height: 40,
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #C9A9CE 30%, #C9A9CE 90%)',
                                    },}}>
                                    EDITAR
                                </Button>
                                <Button sx={{   
                                    backgroundColor: '#D80808',
                                    borderRadius: 10,
                                    color: '#fff',
                                    boxShadow: 5,
                                    width: 100,
                                    height: 40,
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #D8AA08 30%, #D80808 90%)',
                                    },}}>
                                    ELIMINAR
                                </Button>
                            </Stack>
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
