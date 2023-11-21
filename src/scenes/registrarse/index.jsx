
import {Grid, Box, Link, TextField, Paper, InputAdornment, Typography, Snackbar, Alert} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
//import {useEffect, useState} from 'react';
import {  registrarUsuario, verificarSiExisteUsuario} from "../../services/usuarios";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as dayjs from 'dayjs'
import {  useState } from "react";
import { Link as RouterLink } from 'react-router-dom';

//Iconos
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SaveIcon from '@mui/icons-material/Save';

//Mui lab

import {LoadingButton} from '@mui/lab'

import {useTranslation} from "react-i18next"


const Registrarse = () => {

  const [texto, i18n] = useTranslation("global");

  const isNonMobile = useMediaQuery("(min-width:600px)");



  

  const handleFormSubmit = async (values, actions) => {

    setIsLoading(true);

    try{
 

      await registrarUsuario({ values}).then(async()=>{
        
        setOpenSnackBarAlert(true);
        actions.resetForm();
      });

    }catch(error){
      console.error(error);
    }

    setIsLoading(false);
  };





  const [openSnackBarAlert, setOpenSnackBarAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

 
  
  

  const handleCloseSnackBarAlert = (event, reason) =>{
      if(reason=='clickaway'){
          return
      }else{
        setOpenSnackBarAlert(false)
      }
  }




  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const paperStyle = {
    backgroundColor: "#f5f5f5", 
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)',
  };

  const textFieldStyles = {
    background: '#858585', // 
  };
  

  return (

    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="80vh"
  
  >
    <Paper elevation={0} p={0} style={paperStyle}>
      
  
    <Box mb="30px">
    <Typography
        variant="h2"
        color={colors.grey[900]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
       {texto("Register.TitleRegister")}
      </Typography>

      <Typography variant="h5" color={colors.greenAccent[700]}>
      {texto("Register.SubTitleRegister")}
      </Typography>
      </Box>

    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={checkoutSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >

      

            <TextField
              fullWidth
              variant="filled"
              type="text"
              label=  {texto("Register.TxtFullName")}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.nombre}
              name="nombre"
              error={!!touched.nombre && !!errors.nombre}
              helperText={touched.nombre && errors.nombre}
              sx={{ gridColumn: "span 4" }}
              style={textFieldStyles}

              InputProps={{ startAdornment: <InputAdornment position="start"><BadgeOutlinedIcon></BadgeOutlinedIcon></InputAdornment>}}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label= {texto("Register.TxtUser")}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.usuario}
              name="usuario"
              error={!!touched.usuario && !!errors.usuario}
              helperText={touched.usuario && errors.usuario}
              sx={{ gridColumn: "span 4" }}
              style={textFieldStyles}
              InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon></InputAdornment>}}
            />


            <TextField
              fullWidth
              variant="filled"
              type="password"
              label={texto("Register.TxtPassword")}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.clave}
              name="clave"
              error={!!touched.clave && !!errors.clave}
              //helperText={touched.clave && errors.clave}
              sx={{ gridColumn: "span 2" }}
              style={textFieldStyles}
              InputProps={{ startAdornment: <InputAdornment position="start"><HttpsOutlinedIcon></HttpsOutlinedIcon></InputAdornment>}}
            />
                <TextField
              fullWidth
              variant="filled"
              type="password"
              label={texto("Register.TxtConfirmPassword")}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.claveConfirmacion}
              name="claveConfirmacion"
              error={!!touched.claveConfirmacion && !!errors.claveConfirmacion}
             // helperText={touched.clave && errors.clave}
              sx={{ gridColumn: "span 2" }}
              style={textFieldStyles}
              InputProps={{ startAdornment: <InputAdornment position="start"><HttpsOutlinedIcon></HttpsOutlinedIcon></InputAdornment>}}
            />
         

            <TextField
              fullWidth
              variant="filled"
              type="email"
              label={texto("Register.TxtEmail")}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.correo}
              name="correo"
              error={!!touched.correo && !!errors.correo}
              helperText={touched.correo && errors.correo}
              sx={{ gridColumn: "span 4" }}
              style={textFieldStyles}

              InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon></EmailOutlinedIcon></InputAdornment>}}
            />

      <LocalizationProvider dateAdapter={AdapterDayjs} >
         <DatePicker    
      


         value={values.fecha}  
          label="Fecha nacimiento"
          onBlur={handleBlur}
          onChange={handleChange}
       
          name="fecha"
          sx={{
          bgcolor: '#858585',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          gridColumn: "span 2"
        }}/>
       </LocalizationProvider>


 

            <LoadingButton 
             loading={isLoading}
             variant="contained"
             type="submit"  
             loadingPosition="start"
            
             color="secondary"
            sx={{
      
              gridColumn: "span 2",
              fontWeight: 'bold' 
            }}
            startIcon={<SaveIcon/>}


            >
              {
                    texto("Register.BtnRegister")
              }

            </LoadingButton>
           

            <Grid item xs={12} style={{ textAlign: "center" ,  gridColumn: "span 4",}}>
            <Link component={RouterLink} to="/" color="primary">
            {texto("Register.LinkLogin")}
            </Link>
            
          </Grid>




      <Snackbar open={openSnackBarAlert} autoHideDuration={6000} onClose={handleCloseSnackBarAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <Alert onClose={handleCloseSnackBarAlert} severity="success" sx={{ width: '100%' }}>
          Registro completado
        </Alert>
      </Snackbar>


        
  

          </Box>

    
          
        </form>
      )}
    </Formik>
  
    </Paper>
 
  </Box>
 

  
  

    
  );
};

const validateUsername = async (username) => {
  try {
 

    const response = await verificarSiExisteUsuario(username);
  
    
    if (Array.isArray(response) && response.length > 0 && response[0].hasOwnProperty('f_usuario')) {
     //Usuario existe
      return false;
    } else {
    //Usuario no existe
      return true;
    }
  } catch (error) {
  throw new Error('Error al verificar el usuario');
  }
};

const claveRegExp =
/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:\'",<>\.\\?\/])(.{6,})$/;



const checkoutSchema = yup.object().shape({
  nombre: yup.string().required("required"),
  usuario: yup.string().required("required").test('username-exists', 'Este usuario ya existe', validateUsername),
  clave: yup
  .string()
  .matches(claveRegExp, "La contraseña debe de contener Mayúsculas, minúsculas, símbolos, y tener más de 5 caracteres.")
  .required("required"),
  claveConfirmacion: yup
  .string()
  .oneOf([yup.ref('clave')], 'Las contraseñas no coinciden') // Compara con la clave
  .required("required"),
  correo: yup.string().email("invalid email").required("required"),
});

const initialValues = {
  nombre: "",
  usuario: "",
  clave: "",
  claveConfirmacion: "",
  correo: "",
  fecha: dayjs()
  
};

export default Registrarse;
