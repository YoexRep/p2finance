
import { Box, Button, TextField, Paper, InputAdornment, Typography} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import {useEffect, useState} from 'react';
import { getMicartera, setMicartera} from "../../services/micartera";
import { getPrecioCrypto } from "../../services/cryptos";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Iconos
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Registrarse = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const actualizarDataGrid = async() =>{

    try{
      const data = await getMicartera({ parametros: { id: 2 } });


        
      // Obtener valores antes de asignarlos a mi datagrid
      const modifiedData = await Promise.all(data.map(async (item) => {
        try {
          const data = await getPrecioCrypto({ parametros: { coin: item.criptomoneda, fiat: 'USD', volumen: 0.1 } });
      
          // Verifica si la respuesta contiene la propiedad 'totalBid' antes de acceder a ella
        
          if (data) {


            

            var primerElemento = Object.values(data)[0]; // Obtiene el primer elemento del objeto
           
            let precioActual = 0;
            

          if (primerElemento && primerElemento.hasOwnProperty("totalBid")) {
                  precioActual = primerElemento.totalBid;
             
              } 

       

              
              //formatear el precio actual.
           //   precioActual = precioActual.toString().replace(/,/g, '.');

    

              const valorNumericoPrecioActual = parseFloat(precioActual).toFixed(2);

            
            const valorMercadoActual =parseFloat(item.cantidad * valorNumericoPrecioActual).toFixed(2) ;
            const valorCompraMasComision = parseFloat(item.cantidad * item.precio_compra + item.comision).toFixed(2) ;
      
            const ganancias_Perdidas = parseFloat(valorMercadoActual - valorCompraMasComision).toFixed(2) ;
      
            // Devuelve un nuevo objeto con el valor modificado
            return {
              ...item,
              precioActual: valorNumericoPrecioActual,
              valorMercado: valorMercadoActual,
              ganancias_perdidas: ganancias_Perdidas
            };
          } else {
            console.log(`Respuesta API incompleta o sin 'totalBid' para ${item.criptomoneda}`);
            // Puedes manejar el error de alguna manera si es necesario
            return item;
          }
        } catch (error) {
          console.log(`Error al obtener precio para ${item.criptomoneda}: ${error}`);
          // Puedes manejar el error de alguna manera si es necesario
          return item;
        }
      }));
      
  
  
  // Asigna los datos modificados a 'micarteraState'
  setMicarteraState(modifiedData);
  
      

    }catch(error){
      console.error(error);
    }
  
  }

  const handleFormSubmit = async (values) => {
     

    try{

      await setMicartera({ values}).then(async()=>{
       
        actualizarDataGrid();
      });

    }catch(error){
      console.error(error);
    }
  };

  const [micartera, setMicarteraState] = useState([]);

  useEffect(() => {
    actualizarDataGrid();
  }, []);



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
              name="Nombre"
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
              name="Usuario"
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
             // value={values.clave}
              name="clave"
              error={!!touched.clave && !!errors.clave}
              helperText={touched.clave && errors.clave}
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
              //value={values.clave}
              name="clave"
              error={!!touched.clave && !!errors.clave}
              helperText={touched.clave && errors.clave}
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
              name="Nombre"
              error={!!touched.correo && !!errors.correo}
              helperText={touched.correo && errors.nocorreombre}
              sx={{ gridColumn: "span 4" }}
              style={textFieldStyles}

              InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlinedIcon></EmailOutlinedIcon></InputAdornment>}}
            />

      <LocalizationProvider dateAdapter={AdapterDayjs} >
         <DatePicker  label="Fecha nacimiento"    sx={{
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


const checkoutSchema = yup.object().shape({
  criptomoneda: yup.string().required("required"),
  tipo: yup.string().required("required"),
  cantidad: yup.string().required("required"),
  precio_compra: yup.string().required("required"),
  comision: yup.string().required("required"),
  
});
const initialValues = {
  criptomoneda: "",
  tipo: "",
  cantidad: "",
  precio_compra: "",
  comision: "",
};

export default Registrarse;
