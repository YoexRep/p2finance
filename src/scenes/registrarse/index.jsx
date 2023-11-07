
import { Box, Button, TextField, Paper, InputAdornment, Typography} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
//import {useEffect, useState} from 'react';
import {  registrarUsuario} from "../../services/usuarios";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as dayjs from 'dayjs'

//Iconos
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Registrarse = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");



  const handleFormSubmit = async (values) => {
  


    try{

      await registrarUsuario({ values}).then(async()=>{
       
        alert('Usuario registrado');
      });

    }catch(error){
      console.error(error);
    }
  };

  // const [micartera, setMicarteraState] = useState([]);

  // useEffect(() => {
  
  // }, []);



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
    height="100vh"
  
  >
    <Paper elevation={0} p={0} style={paperStyle}>
      
  
    <Box mb="30px">
    <Typography
        variant="h2"
        color={colors.grey[900]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        Registrarse
      </Typography>

      <Typography variant="h5" color={colors.greenAccent[700]}>
      Información del usuario
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
              label="Nombre completo"
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
              label="Usuario"
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
              label="Contraseña"
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
              label="Confirmar contraseña"
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
              label="Correo"
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


    <Button type="submit" color="secondary" variant="contained" sx={{
      
          gridColumn: "span 2",
          fontWeight: 'bold' 
        }}>
              Registrarse
            </Button>
           

          </Box>

    
          
        </form>
      )}
    </Formik>
      
    </Paper>
  </Box>
 

  
  

    
  );
};

const claveRegExp =
/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:\'",<>\.\\?\/])(.{6,})$/;



const checkoutSchema = yup.object().shape({
  nombre: yup.string().required("required"),
  usuario: yup.string().required("required"),
  clave: yup
  .string()
  .matches(claveRegExp, "La contraseña debe de contener Mayúsculas, minúsculas, símbolos, y tener más de 5 caracteres.")
  .required("required"),
  claveConfirmacion: yup
  .string()
  .oneOf([yup.ref('clave')], 'Las contraseñas no coinciden') // Compara con la clave
  .required("required"),
  correo: yup.string().email("invalid email").required("required"),
  //fecha: yup.date().required("Fecha requerida"),
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
