import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Typography
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  onGetBoletaData, onGetBoletasNoFormales
} from "../../store/module-preparacion/jornada/ThunksJornadaNoFormal";
import { GeneralTable } from "../components/GeneralTable";
import { useJornadaNoFormalStore } from "../hooks/useJornadaNoFormalStore";

import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { ModalEliminarBoleta } from "../components/ModalEliminarBoleta";

export const CrudJornadaGenerica = () => {
  const navigate = useNavigate();

  // ToDo:AQUI OBTENGAN LAS VARIABLES STATUS Y DATA DE SUS ESTADOS GLOBALES
  const { jornadaNoFormalSelected , status } = useJornadaNoFormalStore();
  const params = useParams();
  const dispatch = useDispatch();

	const [modalDeleteStatus, setModalDeleteStatus] = useState(false);
  const [idBoleta, setIdBoleta] = useState(null);
	const [encabezadoBoleta, setNombreBoleta] = useState(null);
  const columns = [
    // field: Debe de ir la variable que se va a mostrar en la tabla
    {
      field: "encabezadoBoleta",
      headerName: "Título de la boleta no formal",
      flex: 10,
    },
    {
      field: "configuracion",
      headerName: "Configuración",
      flex: 5,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(params.id)}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              onClick={() => handleConfig(params.id)}
            >
              Configuración
            </Button>
            <IconButton
              sx={{ color: "#511079" }}
              onClick={() => handleDelete(params.id, params.row.encabezadoBoleta)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  // USEEFFECT QUE PUEDES USAR PARA HACER UN GET DE LAS JORNADAS AL RENDERIZAR LA PAGINA
  useEffect(() => {
    // dispatch(onGetBoletas(params.id));
    if (jornadaNoFormalSelected.boletasNoFormales.length === 0) dispatch(onGetBoletasNoFormales(params.id));
  }, []);

  // METODO PARA BORRAR UN REGISTRO
  const handleDelete = (id, title) => {
		setIdBoleta(id);
		setNombreBoleta(title);
		openModalDelete();
  };

  // MÉTODO PARA EDITAR UN REGISTRO
  const handleEdit = (id) => {
    dispatch(
      onGetBoletaData(id, () => {
        navigate(
          "/preparacion/jornada/noFormal" + params.id + "/boletanf/" + id
        );
      })
    );
  };

  // MÉTODO PARA IR A LA PAGINA DE CONFIGURACIÓN DEL REGISTRO
  const handleConfig = (id) => {
    navigate("/preparacion/jornadaNoFormal/configboleta/" + id);
    // dispatch(onGetConfig(id));
  };

  const handleAdd = () => {
    // navigate("/preparacion/jornada/boleta/");
    navigate(
      "/preparacion/jornada/noFormal/" +
        params.id +
        "/boletanf/" +
        jornadaNoFormalSelected.boletasNoFormales.listBoletas.length
    );
  };

  const closeModalDelete = () => {
		setModalDeleteStatus(false);
	};

	const openModalDelete = () => {
		setModalDeleteStatus(true);
	};
  if (status === "checking")
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  else
    return (
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ m: "0.5rem", ml: "2rem" }}>
            <Typography variant="h6" align="left" color="initial">
              {jornadaNoFormalSelected.title}
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              m: "2rem",
              mt: "2rem",
            }}
          >
            <Grid container>
              <Grid item lg={3} md={4} sm={12} xs={12}>
                <Button
                  // onClick={handleDelete}
                  onClick={handleAdd}
                  variant="contained"
                  size="large"
                  sx={{
                    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
                    transition: "all 0.5s ease",
                    backgroundColor: "#511079",
                    width: "100%",
                    borderRadius: "2rem 2rem 2rem 2rem",
                    "&:hover": {
                      backgroundColor: "#7E328B !important",
                      transform: "translate(-5px, -5px)",
                      boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  Registrar Boleta No Formal
                </Button>
              </Grid>
            </Grid>

            <Box
              sx={{
                boxShadow: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                mt: "2rem",
                borderRadius: "2rem",
                p: "2rem",
                pt: "1rem",
              }}
            >
              <Typography variant="h5" color="initial" mb="0.5rem">
                Boletas no formales
              </Typography>
              <Divider />
              <Box
                mt={"1rem"}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* TABLA GENERAL, TIENEN QUE PASARLE LA DATA DE LOS REGISTROS Y EL ID DE 
								  CADA REGISTRO SE DEBE LLAMAR "idJornada" o si el id de cada registro 
								  tiene otro nombre, cambien el atributo idName al nombre que quieran */}
                <GeneralTable
                  data={jornadaNoFormalSelected.boletasNoFormales.listBoletas} // DATA DE LOS REGISTROS
                  columns={columns}
                  idName={"idEstructuraBoleta"} // NOMBRE DEL ID DE CADA REGISTRO
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <ModalEliminarBoleta 
					modalDeleteStatus={modalDeleteStatus} 
					closeModalDelete={closeModalDelete} 
					idBoleta={idBoleta}
					encabezadoBoleta={encabezadoBoleta}
				/>	
      </Grid>
    );
};
