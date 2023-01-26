import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        {
          date: '01',
          customerId: 'Partido uno',
          amount: 'PU',
        },
        {
          date: '02',
          customerId: 'Partido dos',
          amount: 'PD',
        },
      ],
    };
  }
  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell>{row.calories}</TableCell>
          <TableCell>{row.fat}</TableCell>
          <TableCell>Ejemplo</TableCell>
          <TableCell>Ejemplo</TableCell>  
          <TableCell>Ejemplo</TableCell> 
          <TableCell>Ejemplo</TableCell>                                        
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Partidos
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell>Date</TableCell> */}
                      <TableCell>Clave</TableCell>
                      {/* <TableCell>Customer</TableCell> */}
                      <TableCell>Nombre</TableCell>
                      {/* <TableCell align="right">Amount</TableCell> */}
                      <TableCell>Sigla</TableCell>
                      {/* <TableCell>IMAGEN:</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell>{historyRow.amount}</TableCell>
                        {/* <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
  

  const rowsCandidate = [
    createData(),
  ];
  const rows = [
    createData('0', 'Ejemplo1', 'Apellido Ejemplo', 24, 4.0, 3.99),
    createData('1', 'Ejemplo1', 'Apellido Ejemplo', 37, 4.3, 4.99),
    createData('2', 'Ejemplo1', 'Apellido Ejemplo', 24, 6.0, 3.79),
    createData('3', 'Ejemplo1', 'Apellido Ejemplo', 67, 4.3, 2.5),
    createData('4', 'Ejemplo1', 'Apellido Ejemplo', 49, 3.9, 1.5),
  ];
export const DataGridRowGrouping = () => {
      return (

        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Clave Electoral</TableCell>
              <TableCell>Nombres Candidato</TableCell>
              <TableCell>Primer Apellido</TableCell>
              <TableCell>Segundo Apellido</TableCell>
              <TableCell>Nombres Suplente</TableCell>
              <TableCell>Primer Apellido</TableCell>
              <TableCell>Segundo Apellido</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }