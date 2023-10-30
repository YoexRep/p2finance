
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import {useEffect, useState} from 'react';
import { getMicartera, setMicartera} from "../../services/micartera";
import { getPrecioCrypto } from "../../services/cryptos";




const Micartera = () => {

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

  const columnVisibilityModel = {
    id: false,
  };


    const columns = [
{ field: "id", headerName: "ID", flex: 0.5 },

{ field: "criptomoneda", headerName: "Cripto moneda", flex: 1,    headerAlign: "center",
align: "center",},

    {
      field: "cantidad",
      headerName: "Cantidad",
      flex: 1, 
      headerAlign: "center",
      align: "center",

    },
    {
      field: "precio_compra",
      headerName: "Precio Compra",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1
    },
    {
      field: "precioActual",
      headerName: "Precio Actual",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1
    },
    {
      field: "valorMercado",
      headerName: "Valor Mercado",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1
    },
    ,
    {
      field: "ganancias_perdidas",
      headerName: "G/P Neto",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1
    },
  ];

  return (
    <> <Box m="20px">
    <Header title="Mi cartera" subtitle="Administración de posiciones" />
    
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

          <TextField label='Select cripto moneda'
              select
            fullWidth
            
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.criptomoneda}
              name="criptomoneda"
              error={!!touched.cripto && !!errors.cripto}
              helperText={touched.cripto && errors.cripto}
              sx={{ gridColumn: "span 2" }}
            
            
            >
              
              <MenuItem value="BTC">BTC</MenuItem>
              <MenuItem value="ETH">ETH</MenuItem>
              <MenuItem value="ADA">ADA</MenuItem>
              <MenuItem value="LINK">LINK</MenuItem>
            </TextField>
            <TextField label='Select tipo'
              select
            fullWidth
            
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.tipo}
              name="tipo"
              error={!!touched.tipo && !!errors.tipo}
              helperText={touched.tipo && errors.tipo}
              sx={{ gridColumn: "span 2" }}
            
            
            >
              <MenuItem value="COMPRA">COMPRA</MenuItem>
              <MenuItem value="VENTA">VENTA</MenuItem>
            </TextField>


            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Cantidad"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.cantidad}
              name="cantidad"
              error={!!touched.cantidad && !!errors.cantidad}
              helperText={touched.cantidad && errors.cantidad}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Precio"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.precio_compra}
              name="precio_compra"
              error={!!touched.precio_compra && !!errors.precio_compra}
              helperText={touched.precio_compra && errors.precio_compra}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Comisión"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.comision}
              name="comision"
              error={!!touched.comision && !!errors.comision}
              helperText={touched.comision && errors.comision}
              sx={{ gridColumn: "span 1" }}
            />
    <Button type="submit" color="secondary" variant="contained">
              Añadir posición
            </Button>
           

          </Box>

    
          
        </form>
      )}
    </Formik>
  </Box> 
  
  <Box m="20px">
  
    <Box
      m="40px 0 0 0"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      <DataGrid
       rows={micartera || []}
        columns={columns}
        autoSizeColumns
        columnVisibilityModel={columnVisibilityModel}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  </Box>
  
  
  </>
    
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

export default Micartera;
