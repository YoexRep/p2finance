import { Box, Grid, TextField, Button, Paper, Link,InputAdornment, Typography , Snackbar, Alert} from '@mui/material';
import { useState, useContext } from "react";
import { Link as RouterLink } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Formik } from "formik";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {  validarLogin} from "../../services/usuarios";
import * as yup from "yup";
import {useTranslation} from "react-i18next"

import {LoadingButton} from '@mui/lab'

const Login = () => {
 
    const [texto, i18n] = useTranslation("global");

  const isNonMobile = useMediaQuery("(min-width:600px)");



  const handleFormSubmit = async (values, actions) => {

    setIsLoading(true);

    try {

  
      const response = await validarLogin({ values});


      //Convertimos las respues en un json
     const p2Token = JSON.stringify(response);
    
     
      if (JSON.parse(p2Token).token !== undefined) {
       //Usuario existe
  
        localStorage.setItem('p2Token', p2Token);
        window.location.href = '/';


      } else {
        setOpenSnackBarAlert(true);
        
      }
    } catch (error) {
    throw new Error('Error al verificar el usuario');
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
    width: '500px', // Aumentar el ancho del Paper
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
    <Paper elevation={0} p={0} style={paperStyle} >
      
  
    <Box mb="5px"  display="flex"   justifyContent="center">
    <Typography
        variant="h3"
        color={colors.greenAccent[600]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        P2FINANCE
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
              label={texto("Login.TxtUser")}
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
              label= {texto("Login.TxtPassword")}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.clave}
              name="clave"
              error={!!touched.clave && !!errors.clave}
              sx={{ gridColumn: "span 4" }}
              style={textFieldStyles}
              InputProps={{ startAdornment: <InputAdornment position="start"><HttpsOutlinedIcon></HttpsOutlinedIcon></InputAdornment>}}
            />
  


            <LoadingButton 
             loading={isLoading}
             variant="contained"
             type="submit"  
             loadingPosition="start"
            
             color="secondary"
            sx={{
      
              gridColumn: "span 4",
              fontWeight: 'bold' 
            }}
            startIcon={<LoginOutlinedIcon/>}

       
            >
     
              {    texto("Login.BtnLogin")  }

           
            </LoadingButton>
           

         
            <Grid item xs={12} style={{ textAlign: "right", gridColumn: "span 4" }}>
            <Link component={RouterLink} to="/registrarse" color="primary">
            {texto("Login.LinkRegister")}
            </Link>
          </Grid>



      <Snackbar open={openSnackBarAlert} autoHideDuration={6000} onClose={handleCloseSnackBarAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <Alert onClose={handleCloseSnackBarAlert} severity="error" sx={{ width: '100%' }}>
        {texto("Login.MsgError")}
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
const checkoutSchema = yup.object().shape({
  usuario: yup.string().required("required"),
  clave: yup.string().required("required"),


});

const initialValues = {
  usuario: "",
  clave: ""
  
};
export default Login;
