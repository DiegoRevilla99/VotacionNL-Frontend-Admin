import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ErrorMessage, Form, Formik, useField, useFormikContext } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import { ErrorField } from "../../module-preparacion/components/ErrorField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  DateTimePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import es from "date-fns/locale/es";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { DateField } from "./DateField";
import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";
import { useDispatch, useSelector } from "react-redux";
import { setVotanteFound } from "../../store/module-empadronamiento/votantes/empVotantesSlice";
import { useState } from "react";
import {
  getVotanteDireccion,
  getVotantes,
} from "../../store/module-empadronamiento/votantes/thunksVotantes";
import { getVotanteDireccionProvider } from "../../providers/Micro-Votante/providerVotante";
import { TroubleshootTwoTone } from "@mui/icons-material";
import { Stack } from "@mui/system";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

let schema = yup.object().shape({
  curp: yup.string().required("CURP del votante es necesario"),
  nombreVotante: yup.string().required("Nombre del votante es necesario"),
  apellidoMVotante: yup
    .string()
    .required("Segundo apellido del votante es necesario"),
  apellidoPVotante: yup
    .string()
    .required("Primer apellido del votante es necesario"),
  fechaNacimiento: yup.string().required("Fecha de nacimiento es necesario"),
  genero: yup.string().required("Genero necesario"),
});

const useStyles = makeStyles({
  textField: {
    width: "100%",
    p: 2,
  },
  fomi: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  contenedor: {
    borderRadius: "20px",
    backgroundColor: "black",
  },
});

const isFirstVocal = (name, vocalC) => {
  const tam = name.length;
  let bandera = false;
  let vocal = "";
  for (let i = 1; i < tam; i++) {
    const letra = name.charAt(i);
    const voacles = "aAáÁeEéÉiIíÍoOóÓuUúÚ";
    if (!bandera) {
      if (voacles.includes(letra)) {
        bandera = true;
        vocal = letra;
      }
    }
  }

  if (bandera && vocal.toUpperCase() === vocalC) {
    return true;
  } else {
    return false;
  }
};

const isSecondCons = (name, consonanteC) => {
  // console.log("Curp:",consonanteC)
  const tam = name.length;
  const vowels = "aeiou";
  let bandera = false;
  let consonante = "";
  let consonantRegex = new RegExp(`(?![${vowels}])[a-z]`, "gi");
  // let conta=0;
  for (let ic = 1; ic < tam; ic++) {
    const letra = name.charAt(ic);
    if (!bandera && consonantRegex.test(letra)) {
      // conta=conta+1;
      // if(conta===2){
      bandera = true;
      consonante = letra;
      // }
    }
  }

  // console.log(bandera ? "bander: true":"bandera:false")
  // console.log("consonante:",consonante)
  if (bandera && consonante.toUpperCase() === consonanteC) {
    return true;
  } else {
    return false;
  }
};

const isSecondApPCons = (name, consonanteC) => {
  // console.log("isSecondApPCons")
  // console.log("-----------------APELLIDO:",name)
  // console.log("Curp:",consonanteC)
  const tam = name.length;
  const vowels = "aeiouAEIOU";
  const consonantess = "BCDFGHJKLMNPQRSTVWXYZ";
  let bandera = false;
  let consonante = "";
  let consonantRegex = new RegExp(`(?![${vowels}])[a-z]`);

  for (let ic = 1; ic < tam; ic++) {
    const letra = name.charAt(ic);
    // console.log("letra en turno:",letra)
    if (consonantess.includes(letra.toUpperCase())) {
      // console.log("entreeee:",letra)
      if (!bandera) {
        // console.log("cond2:")
        consonante = letra;
        bandera = true;
      }
    }
  }

  // console.log(bandera ? "bander: true":"bandera:false")
  // console.log("consonante:",consonante.toUpperCase())
  // console.log("consonante:",consonanteC)
  if (bandera && consonante.toUpperCase() === consonanteC) {
    return true;
  } else {
    return false;
  }
};

const isSecondAMCons = (name, consonanteC) => {
  // console.log("isSecondApPCons")
  // console.log("-----------------APELLIDO:",name)
  // console.log("Curp:",consonanteC)
  const tam = name.length;
  const vowels = "aeiouAEIOU";
  const consonantess = "BCDFGHJKLMNPQRSTVWXYZ";
  let bandera = false;
  let consonante = "";
  let consonantRegex = new RegExp(`(?![${vowels}])[a-z]`);

  for (let ic = 1; ic < tam; ic++) {
    const letra = name.charAt(ic);
    // console.log("letra en turno:",letra)
    if (consonantess.includes(letra.toUpperCase())) {
      // console.log("entreeee:",letra)
      if (!bandera) {
        // console.log("cond2:")
        consonante = letra;
        bandera = true;
      }
    }
  }

  // console.log(bandera ? "bander: true":"bandera:false")
  // console.log("consonante:",consonante.toUpperCase())
  // console.log("consonante:",consonanteC)
  if (bandera && consonante.toUpperCase() === consonanteC) {
    return true;
  } else {
    return false;
  }
};

const valiMariaJose = (name) => {
  const nombress = name.trim().split(" ");
  if (nombress.length > 1) {
    if (
      (nombress[0] === "JOSÉ") |
      (nombress[0] === "JOSE") |
      (nombress[0] === "MARIA") |
      (nombress[0] === "MARÍA")
    ) {
      return true;
    }
  }
  return false;
};

const errorNombreInitFuntion = (name, val1) => {
  if (valiMariaJose(name)) {
    const nombress = name.trim().split(" ");
    const name2 = nombress[1];
    console.log(name2);
    if (name2.charAt(0) !== val1) return true;
  } else {
    if (name.toUpperCase().charAt(0) !== val1) return true;
  }
  return false;
};

const errorNombreCFuntion = (name, val2) => {
  if (valiMariaJose(name.toUpperCase())) {
    const nombress = name.trim().split(" ");
    const name2 = nombress[1];
    if (!isSecondCons(name2.toUpperCase(), val2)) {
      return true;
    }
  } else {
    if (!isSecondCons(name.toUpperCase(), val2)) {
      return true;
    }
  }
  return false;
};

let validationCurp =
  /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;

const validando = (values, type) => {
  // console.log(values.curp);

  const errors = {};
  if (!validationCurp.test(values.curp.toUpperCase())) {
    errors.curp = "Esta curp no es valida";
  }

  if (values.fechaNacimiento !== "") {
    if (type === "formales") {
      const fecha = new Date(values.fechaNacimiento);
      const edad = getAge(fecha);
      console.log("edad", edad);
      if (edad < 18)
        errors.edad =
          "Esta persona no puede ser registrada a esta jornada ya que es menor de edad";
    }
  }

  /* if(validationCurp.test(values.curp.toUpperCase())&& values.nombreVotante.trim().length>0){
      if(values.nombreVotante.toUpperCase().charAt(0)!==values.curp.charAt(3)) errors.nombreVotante = "La inical debe ser '"+values.curp.charAt(3)+"'";
  }
  
  if(validationCurp.test(values.curp.toUpperCase())&& values.nombreVotante.trim().length>0){
      if(!isSecondCons(values.nombreVotante,values.curp.charAt(15))){
        errors.nombreVotante = "La segunda consonante debe ser '"+values.curp.charAt(15)+"'";
      }
  } */

  if (
    validationCurp.test(values.curp.toUpperCase()) &&
    values.nombreVotante.trim().length > 0
  ) {
    if (
      errorNombreCFuntion(
        values.nombreVotante.trim().toUpperCase(),
        values.curp.toUpperCase().charAt(15)
      )
    ) {
      errors.nombreVotante =
        "La segunda consonante debe ser '" +
        values.curp.toUpperCase().charAt(15) +
        "'";
    }
  }

  if (
    validationCurp.test(values.curp.toUpperCase()) &&
    values.nombreVotante.trim().length > 0
  ) {
    if (
      errorNombreInitFuntion(
        values.nombreVotante.trim().toUpperCase(),
        values.curp.toUpperCase().charAt(3)
      )
    )
      errors.nombreVotante =
        "La inical debe ser '" + values.curp.charAt(3) + "'";
  }

  if (
    validationCurp.test(values.curp.toUpperCase()) &&
    values.apellidoPVotante.trim().length > 0
  ) {
    if (
      !isSecondApPCons(
        values.apellidoPVotante,
        values.curp.toUpperCase().charAt(13)
      )
    ) {
      errors.apellidoPVotante =
        "La segunda consonante debe ser '" + values.curp.charAt(13) + "'";
    }
  }

  if (
    validationCurp.test(values.curp.toUpperCase()) &&
    values.apellidoPVotante.trim().length > 0
  ) {
    if (
      !isFirstVocal(
        values.apellidoPVotante,
        values.curp.toUpperCase().charAt(1)
      )
    ) {
      errors.apellidoPVotante =
        "La siguiente vocal debe ser '" + values.curp.charAt(1) + "'";
    }
  }

  if (
    validationCurp.test(values.curp.toUpperCase()) &&
    values.apellidoPVotante.trim().length > 0
  ) {
    if (
      values.apellidoPVotante.toUpperCase().charAt(0) !== values.curp.charAt(0)
    )
      errors.apellidoPVotante =
        "La inical debe ser '" + values.curp.charAt(0) + "'";
  }

  if (
    validationCurp.test(values.curp.toUpperCase()) &&
    values.apellidoMVotante.trim().length > 0
  ) {
    if (
      !isSecondAMCons(
        values.apellidoMVotante,
        values.curp.toUpperCase().charAt(14)
      )
    ) {
      errors.apellidoMVotante =
        "La segunda consonante debe ser '" + values.curp.charAt(14) + "'";
    }
  }

  if (
    validationCurp.test(values.curp.toUpperCase()) &&
    values.apellidoMVotante.trim().length > 0
  ) {
    if (
      values.apellidoMVotante.toUpperCase().charAt(0) !== values.curp.charAt(2)
    )
      errors.apellidoMVotante =
        "La inicial debe ser '" + values.curp.charAt(2) + "'";
  }

  return errors;
};

const getDateBirth = (curp = "") => {
  const fechaActual = new Date();
  if (validationCurp.test(curp.toUpperCase())) {
    let anio = parseInt(curp.substring(4, 6), 10);
    let mes = parseInt(curp.substring(6, 8), 10);
    let dia = parseInt(curp.substring(8, 10), 10);

    const anioActual = fechaActual.getFullYear() - 2005;
    console.log(anioActual);
    if (anio > anioActual) {
      anio = anio + 1900;
    } else {
      anio = anio + 2000;
    }
    const fechaN = new Date(anio, mes - 1, dia);
    return fechaN;
  }
  return false;
};

const getGender = (curp = "") => {
  if (validationCurp.test(curp.toUpperCase())) {
    let genero = curp.substring(10, 11);
    console.log(genero);
    return genero;
  }
  return false;
};

const getAge = (fecha) => {
  const birth = new Date(fecha);
  const current = new Date();
  let anios =
    parseInt(current.getFullYear(), 10) - parseInt(birth.getFullYear(), 10);
  const difmonths =
    parseInt(current.getMonth(), 10) - parseInt(birth.getMonth(), 10);
  // console.log("dif",difmonths)
  if (difmonths < 0) {
    anios = anios - 1;
  } else {
    if (difmonths === 0) {
      const difdays =
        parseInt(current.getDate(), 10) - parseInt(birth.getDate(), 10);
      if (difdays < 0) anios = anios - 1;
    }
  }
  return anios;
};

const FechaNacimientoField = ({ name }) => {
  const {
    values: {
      curp,
      nombreVotante,
      apellidoMVotante,
      apellidoPVotante,
      fechaNacimiento,
    },
    genero,
    touched,
    setFieldValue,
  } = useFormikContext();

  const [field, meta] = useField({ name });

  useEffect(() => {
    // set the value of textC, based on textA and textB
    if (validationCurp.test(curp)) {
      const fecha = getDateBirth(curp);
      setFieldValue(name, fecha);
    }
  }, [curp, touched.curp, setFieldValue, name]);

  return (
    <>
      <Typography>FECHA NACIMIENTO</Typography>
      <DateField
        name="fechaNacimiento"
        value={fechaNacimiento}
        // onChange={handleChange}
        disabled={true}
      ></DateField>
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

const NombreField = ({ name }) => {
  const {
    values: {
      curp,
      nombreVotante,
      apellidoMVotante,
      apellidoPVotante,
      fechaNacimiento,
    },
    genero,
    touched,
    setFieldValue,
  } = useFormikContext();

  const [field, meta] = useField({ name });

  useEffect(() => {
    // set the value of textC, based on textA and textB
    if (curp) {
      const fecha = getDateBirth(curp);
      setFieldValue(name, fecha);
    }
  }, [curp, touched.curp, setFieldValue, name]);

  return (
    <>
      <Typography>FECHA NACIMIENTO</Typography>
      <DateField
        name="fechaNacimiento"
        value={fechaNacimiento}
        // onChange={handleChange}
        disabled={true}
      ></DateField>
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
};

export const FormInfo = ({
  data = {},
  onNext = () => {},
  limpiar = () => {},
}) => {
  const fecha = new Date();
  const styles = useStyles();
  const dispatch = useDispatch();
  const [isFound, setIsFound] = useState("");
  const [loading, setLoading] = useState(false);
  const { votanteFound, type } = useSelector((state) => state.empVotantesSlice);

  useEffect(() => {
    console.log(votanteFound);
  }, [votanteFound]);

  const getAllVotantes = async () => {
    return dispatch(getVotantes());
  };

  const getDireccionVotante = async (id) => {
    return getVotanteDireccionProvider(id);
  };

  const getType = () => {
    return type;
  };

  const SearchV = ({ curp2 }) => {
    const {
      values: {
        curp,
        nombreVotante,
        apellidoMVotante,
        apellidoPVotante,
        fechaNacimiento,
      },
      genero,
      touched,
      setFieldValue,
    } = useFormikContext();

    useEffect(() => {
      if (!data.votanteModel) {
        setFieldValue(
          "nombreVotante",
          votanteFound.find === "si" ? votanteFound.nombreVotante : ""
        );
        setFieldValue(
          "apellidoMVotante",
          votanteFound.find === "si" ? votanteFound.apellidoMVotante : ""
        );
        setFieldValue(
          "apellidoPVotante",
          votanteFound.find === "si" ? votanteFound.apellidoPVotante : ""
        );
        setFieldValue(
          "genero",
          votanteFound.find === "si" ? votanteFound.genero : ""
        );
      }
      // setFieldValue("fechaNacimiento", votanteFound.find==="si"?new Date(votanteFound.fechaNacimiento).toISOString():"");
      //setFieldValue("genero", votanteFound?votanteFound.genero:"");
    }, [votanteFound]);

    return <></>;
  };

  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };
  const handleChangeD = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(data);
  }, []);

  const onBuscar = async (curp) => {
    console.log("ente;", curp);
    if (validationCurp.test(curp)) {
      setLoading(true);
      const respu = await getAllVotantes();
      const vot = respu.find((v) => {
        if (v.curp === curp) return v;
      });
      if (vot === undefined) {
        setIsFound(
          "Este votante nunca ha sido registrado, favor de rellenar a mano"
        );
        dispatch(setVotanteFound({ votanteFound: { find: "no" } }));
        setLoading(false);
        limpiar();
      } else {
        limpiar();
        const direc = await getDireccionVotante(vot.curp);
        console.log("direct: ", direc);
        dispatch(
          setVotanteFound({
            votanteFound: { ...vot, ...direc.data.direccionModel, find: "si" },
          })
        );
        setIsFound("");
        setLoading(false);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        curp: data.votanteModel?.curp ? data.votanteModel.curp : "",
        nombreVotante: data.votanteModel?.nombreVotante
          ? data.votanteModel.nombreVotante
          : "",
        apellidoMVotante: data.votanteModel?.apellidoMVotante
          ? data.votanteModel.apellidoMVotante
          : "",
        apellidoPVotante: data.votanteModel?.apellidoPVotante
          ? data.votanteModel.apellidoPVotante
          : "",
        fechaNacimiento: data.votanteModel?.fechaNacimiento
          ? new Date(data.votanteModel.fechaNacimiento).toISOString()
          : "",
        genero: data.votanteModel?.genero ? data.votanteModel.genero : "",
      }}
      validate={(values) => validando(values, type)}
      validationSchema={schema}
      onSubmit={(valores) => {
        const info = { ...valores };
        info.fechaNacimiento = new Date(valores.fechaNacimiento).toISOString();
        info.nombreVotante = info.nombreVotante.trim().toUpperCase();
        info.apellidoMVotante = info.apellidoMVotante.trim().toUpperCase();
        info.apellidoPVotante = info.apellidoPVotante.trim().toUpperCase();
        info.validacion = false;

        onNext({ votanteModel: info });
      }}
    >
      {({ touched, errors, handleBlur, handleChange, values }) => (
        //autoComplete="off"
        <Form autoComplete="off" className={styles.fomi}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <br />
            <br />
            <div aling="left">
              <Typography textAlign="center" sx={{ fontWeight: "bold", mb: 3 }}>
                INFORMACIÓN DEL VOTANTE
              </Typography>
            </div>
            {errors.edad && (
              <Alert sx={{ mb: 3 }} severity="error">
                {errors.edad}
              </Alert>
            )}
            <Box
              width="100%"
              height="50px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box width="90%">
                <Box display={"flex"}>
                  <Typography>CURP</Typography>
                  <Typography sx={{ ml: 1, color: "#D80F0F" }}>*</Typography>
                </Box>

                <TextField
                  required
                  label=""
                  variant="filled"
                  name="curp"
                  id="curp"
                  className={styles.textField}
                  value={values.curp.toUpperCase()}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim().toUpperCase();
                    handleChange(e);
                  }}
                  onPaste={handleChangeD}
                  onBlur={handleBlur}
                ></TextField>
              </Box>

              <Button
                disabled={errors.edad}
                sx={{ height: "50px", mt: 3, ml: 2 }}
                onClick={() => onBuscar(values.curp.toUpperCase())}
                variant="contained"
              >
                Buscar votante
                <PersonSearchIcon />
              </Button>
              {loading && (
                <Stack
                  justifyContent="center"
                  sx={{ color: "grey.500" }}
                  spacing={2}
                  direction="row"
                >
                  <CircularProgress color="primary" />
                </Stack>
              )}

              <SearchV curp2={votanteFound?.curp} />
            </Box>

            <br />
            <ErrorMessage
              name="curp"
              component={() => <ErrorField>{errors.curp}</ErrorField>}
            />
            {isFound ===
              "Este votante nunca ha sido registrado, favor de rellenar a mano" && (
              <Alert severity="warning">{isFound}</Alert>
            )}
            {votanteFound?.find === "si" && (
              <Alert severity="success">Se encontró el votante</Alert>
            )}

            <br />
            <Box display={"flex"}>
              <Typography>NOMBRE DEL VOTANTE</Typography>
              <Typography sx={{ ml: 1, color: "#D80F0F" }}>*</Typography>
            </Box>

            <TextField
              disabled={votanteFound.find === "si" || votanteFound.find === ""}
              required
              label=""
              variant="filled"
              name="nombreVotante"
              id="nombreVotante"
              className={styles.textField}
              value={values.nombreVotante.toUpperCase()}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                handleChange(e);
              }}
              onBlur={handleBlur}
              onPaste={handleChangeD}
            ></TextField>
            <ErrorMessage
              name="nombreVotante"
              component={() => <ErrorField>{errors.nombreVotante}</ErrorField>}
            />
            <br />
            <br />

            <Box display={"flex"}>
              <Typography>PRIMER APELLIDO</Typography>
              <Typography sx={{ ml: 1, color: "#D80F0F" }}>*</Typography>
            </Box>
            <TextField
              required
              disabled={votanteFound.find === "si" || votanteFound.find === ""}
              label=""
              variant="filled"
              name="apellidoPVotante"
              id="apellidoPVotante"
              className={styles.textField}
              value={values.apellidoPVotante.toUpperCase()}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                handleChange(e);
              }}
              onBlur={handleBlur}
              onPaste={handleChangeD}
            ></TextField>
            <ErrorMessage
              name="apellidoPVotante"
              component={() => (
                <ErrorField>{errors.apellidoPVotante}</ErrorField>
              )}
            />
            <br />
            <br />
            <Box display={"flex"}>
              <Typography>SEGUNDO APELLIDO</Typography>
              <Typography sx={{ ml: 1, color: "#D80F0F" }}>*</Typography>
            </Box>

            <TextField
              disabled={votanteFound.find === "si" || votanteFound.find === ""}
              required
              label=""
              variant="filled"
              name="apellidoMVotante"
              id="apellidoMVotante"
              className={styles.textField}
              value={values.apellidoMVotante.toUpperCase()}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
                handleChange(e);
              }}
              onBlur={handleBlur}
              onPaste={handleChangeD}
            ></TextField>
            <ErrorMessage
              name="apellidoMVotante"
              component={() => (
                <ErrorField>{errors.apellidoMVotante}</ErrorField>
              )}
            />
            <br />
            <br />
            <Box
              justifyContent="space-between"
              display="flex"
              sx={{
                flexDirection: { sm: "row", xs: "column" },
                width: { lg: "100%", sm: "80%" },
              }}
            >
              <Box>
                <FechaNacimientoField name="fechaNacimiento" />
                {/* <Typography>FECHA NACIMIENTO</Typography>
                <DateField
                  name="fechaNacimiento"
                  value={values.fechaNacimiento}
                  onChange={handleChange}
                  
                  disabled={true}
                ></DateField> */}
              </Box>

              <ErrorMessage
                name="fechaNacimiento"
                component={() => (
                  <ErrorField>{errors.fechaNacimiento}</ErrorField>
                )}
              />
              <br />

              <Box
                display={"flex"}
                flexDirection="column"
                sx={{ pl: 5 }}
                width={"100%"}
              >
                <Box width={"100%"} display={"flex"}>
                  <Typography textAlign={"center"} sx={{ mb: 1, ml: "50px" }}>
                    GENERO
                  </Typography>
                  <Typography sx={{ ml: 1, color: "#D80F0F" }}>*</Typography>
                </Box>

                <FormControl
                  disabled={
                    votanteFound.find === "si" || votanteFound.find === ""
                  }
                >
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="genero"
                    value={values.genero}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="HOMBRE"
                      control={<Radio />}
                      label="HOMBRE"
                    />
                    <FormControlLabel
                      value="MUJER"
                      control={<Radio />}
                      label="MUJER"
                    />
                    <FormControlLabel
                      value="OTRO"
                      control={<Radio />}
                      label="OTRO"
                    />
                  </RadioGroup>
                </FormControl>
                <br />

                <ErrorMessage
                  name="genero"
                  component={() => <ErrorField>{errors.genero}</ErrorField>}
                />
              </Box>
            </Box>

            <br />

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
              }}
            >
              <Button
                endIcon={<NavigateNextSharpIcon />}
                type="submit"
                variant="contained"
                disabled={errors.edad}
              >
                Siguiente
              </Button>
            </Box>
            <br />
          </Box>
        </Form>
      )}
    </Formik>
  );
};
