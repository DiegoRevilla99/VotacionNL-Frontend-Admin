import {
  Box,
  Button,
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

const isFirstVocal=(name,vocalC)=>{
  const tam=name.length;
  let bandera=false;
  let vocal="";
  for (let i = 1; i < tam; i++) {
    const letra=name.charAt(i);
    const voacles="aAáÁeEéÉiIíÍoOóÓuUúÚ"
    if(!bandera){
      if(voacles.includes(letra)){
        bandera=true;
        vocal=letra;
      }
    }
  }

  if(bandera && vocal.toUpperCase()===vocalC){
    return true
  }else{
    return false
  }
  
}

const isSecondCons=(name,consonanteC)=>{
  // console.log("Curp:",consonanteC)
  const tam=name.length;
  const vowels = 'aeiou';
  let bandera=false;
  let consonante="";
  let consonantRegex = new RegExp(`(?![${vowels}])[a-z]`, 'gi');
  // let conta=0;
  for (let ic = 1; ic < tam; ic++) {
    
    const letra=name.charAt(ic);
      if(!bandera && consonantRegex.test(letra)){
        // conta=conta+1;
        // if(conta===2){
          bandera=true;
          consonante=letra;
        // }
        
      }
  }

  // console.log(bandera ? "bander: true":"bandera:false")
  // console.log("consonante:",consonante)
  if(bandera && consonante.toUpperCase()===consonanteC){
    return true
  }else{
    return false
  }
  
}

const isSecondApPCons=(name,consonanteC)=>{
  // console.log("isSecondApPCons")
  // console.log("-----------------APELLIDO:",name)
  // console.log("Curp:",consonanteC)
  const tam=name.length;
  const vowels = 'aeiouAEIOU';
  const consonantess = 'BCDFGHJKLMNPQRSTVWXYZ';
  let bandera=false;
  let consonante="";
  let consonantRegex = new RegExp(`(?![${vowels}])[a-z]`);
  
  for (let ic = 1; ic < tam; ic++) {
      
      const letra=name.charAt(ic);
      // console.log("letra en turno:",letra)
      if(consonantess.includes(letra.toUpperCase())){
        // console.log("entreeee:",letra)
        if(!bandera){    
          // console.log("cond2:")
          consonante=letra;
          bandera=true;
        }
      };

      
  }
  
  // console.log(bandera ? "bander: true":"bandera:false")
  // console.log("consonante:",consonante.toUpperCase())
  // console.log("consonante:",consonanteC)
  if(bandera && consonante.toUpperCase()===consonanteC){
    return true
  }else{
    return false
  }
  
}

const isSecondAMCons=(name,consonanteC)=>{
  // console.log("isSecondApPCons")
  // console.log("-----------------APELLIDO:",name)
  // console.log("Curp:",consonanteC)
  const tam=name.length;
  const vowels = 'aeiouAEIOU';
  const consonantess = 'BCDFGHJKLMNPQRSTVWXYZ';
  let bandera=false;
  let consonante="";
  let consonantRegex = new RegExp(`(?![${vowels}])[a-z]`);
  
  for (let ic = 1; ic < tam; ic++) {
      
      const letra=name.charAt(ic);
      // console.log("letra en turno:",letra)
      if(consonantess.includes(letra.toUpperCase())){
        // console.log("entreeee:",letra)
        if(!bandera){    
          // console.log("cond2:")
          consonante=letra;
          bandera=true;
        }
      };

      
  }
  
  // console.log(bandera ? "bander: true":"bandera:false")
  // console.log("consonante:",consonante.toUpperCase())
  // console.log("consonante:",consonanteC)
  if(bandera && consonante.toUpperCase()===consonanteC){
    return true
  }else{
    return false
  }
}

const valiMariaJose=(name)=>{
  const nombress=name.trim().split(" ")
  if(nombress.length>1){
    if(nombress[0]==="JOSÉ"|nombress[0]==="JOSE"|nombress[0]==="MARIA"|nombress[0]==="MARÍA"){
      return true
    }
  }
  return false
}

const errorNombreInitFuntion=(name,val1)=>{

  if(valiMariaJose(name)){
    const nombress=name.trim().split(" ")
    const name2=nombress[1]
    console.log(name2)
    if(name2.charAt(0)!==val1) return true
  }else{
    if(name.toUpperCase().charAt(0)!==val1) return true
  }
  return false
}

const errorNombreCFuntion=(name,val2)=>{
  if(valiMariaJose(name.toUpperCase())){
    const nombress=name.trim().split(" ")
    const name2=nombress[1]
    if(!isSecondCons(name2.toUpperCase(),val2)){
      return true
    }
    
  }else{
    if(!isSecondCons(name.toUpperCase(),val2)){
      return true
    }
   
  }
  return false
}

let validationCurp =
  /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;


const validando = (values, props) => {
  // console.log(values.curp);
  const errors = {};
  if (!validationCurp.test(values.curp.toUpperCase())) {
    errors.curp = "Esta curp no es valida";
  }

  return errors;
};


export const FormInfo = ({ onBuscar = () => {} }) => {
  const fecha = new Date();
  const styles = useStyles();
  const handleChangeD = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    
  }, []);

  return (
    <Formik
      initialValues={{
        curp:  "",
        
      }}
      validate={validando}
      validationSchema={schema}
      onSubmit={(valores) => {
        onBuscar({ votanteModel: info });
      }}
    >
      {({ touched, errors, handleBlur, handleChange, values }) => (
        //autoComplete="off"
        <Form   className={styles.fomi}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            
            <Box
              width="100%"
              height="50px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box width="100%">
                <Typography>CURP</Typography>
                <TextField
                  required
                  label=""
                  variant="filled"
                  name="curp"
                  id="curp"
                  className={styles.textField}
                  value={values.curp.toUpperCase()}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                    handleChange(e);
                  }}
                  //onPaste={handleChangeD}
                  onBlur={handleBlur}
                ></TextField>
              </Box>

              {/*  <Button sx={{ mt: 3 }} type="submit" variant="contained">
                Siguiente
              </Button> */}
            </Box>
            <br />
            <ErrorMessage
              name="curp"
              component={() => <ErrorField>{errors.curp}</ErrorField>}
            />
            <br />
            <Typography>NOMBRE DEL VOTANTE</Typography>
            <TextField
              required
              label=""
              variant="filled"
              name="nombreVotante"
              id="nombreVotante"
              className={styles.textField}
              value={values.nombreVotante.toUpperCase()}
              onChange={handleChange}
              onBlur={handleBlur}
              //onPaste={handleChangeD}
            ></TextField>
            <ErrorMessage
              name="nombreVotante"
              component={() => <ErrorField>{errors.nombreVotante}</ErrorField>}
            />
            <br />
            <br />
            <Typography>PRIMER APELLIDO</Typography>
            <TextField
              required
              label=""
              variant="filled"
              name="apellidoPVotante"
              id="apellidoPVotante"
              className={styles.textField}
              value={values.apellidoPVotante.toUpperCase()}
              onChange={handleChange}
              onBlur={handleBlur}
              //onPaste={handleChangeD}
            ></TextField>
            <ErrorMessage
              name="apellidoPVotante"
              component={() => (
                <ErrorField>{errors.apellidoPVotante}</ErrorField>
              )}
            />
            <br />
            <br />
            <Typography>SEGUNDO APELLIDO</Typography>
            <TextField
              required
              label=""
              variant="filled"
              name="apellidoMVotante"
              id="apellidoMVotante"
              className={styles.textField}
              value={values.apellidoMVotante.toUpperCase()}
              onChange={handleChange}
              onBlur={handleBlur}
              //onPaste={handleChangeD}
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
              width="50%"
              justifyContent="space-between"
              display="flex"
              sx={{
                flexDirection: { sm: "row", xs: "column" },
                width: { lg: "50%", sm: "80%" },
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

              <Box>
                <Typography sx={{ mb: 1 }}>GENERO</Typography>
                <GeneroField />
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
