
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
import RecursiveTreeView from "../../components/RecursiveTreeView";

import {useTranslation} from "react-i18next"

const RolsPermission = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [texto, i18n] = useTranslation("global");



  const handleFormSubmit = async (values) => {
     

    try{

   

    }catch(error){
      console.error(error);
    }
  };




  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const NodosPermisos = [
    {
      id: texto("MenuOpcion.CodMenuHome"),
      name: texto("MenuOpcion.MenuHome")
    },
    {
      id: texto("MenuOpcion.CodMenuMyWallet"),
      name: texto("MenuOpcion.MenuMyWallet")
    },
    {
      id: texto("MenuOpcion.CodMenuAssets"),
      name: texto("MenuOpcion.MenuAssets")
    },
    {
      id: texto("MenuOpcion.CodMenuRolPermissions"),
      name: texto("MenuOpcion.MenuRolPermissions")
    },

  ];


  const [selectedNodes, setSelectedNodes] = useState([]);

  const handleNodeSelect = (selected) => {
    setSelectedNodes(selected);
  };

  return (
    <> <Box m="20px">
    <Header title={texto("RolsPermission.Title")} subtitle={texto("RolsPermission.SubTitle")}/>
    

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

          <TextField label={texto("RolsPermission.CbRol")}
              select
            fullWidth
            
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.criptomoneda}
              name="criptomoneda"
              error={!!touched.cripto && !!errors.cripto}
              helperText={touched.cripto && errors.cripto}
              sx={{ gridColumn: "span 4" }}
            
            
            >
              
              <MenuItem value={texto("MenuOpcion.CodMenuHome")}> {texto("MenuOpcion.MenuHome")}</MenuItem>
              <MenuItem value={texto("MenuOpcion.CodMenuMyWallet")}> {texto("MenuOpcion.MenuMyWallet")}</MenuItem>
              <MenuItem value={texto("MenuOpcion.CodMenuAssets")}> {texto("MenuOpcion.MenuAssets")}</MenuItem>
              <MenuItem value={texto("MenuOpcion.CodMenuRolPermissions")}> {texto("MenuOpcion.MenuRolPermissions")}</MenuItem>
              
            </TextField>

            <RecursiveTreeView
        nodes={NodosPermisos}
        parentChecked={false}
        onNodeSelect={(selected) => handleNodeSelect(selected)}
        sx={{ gridColumn: "span 4" }}
       
       
      />


         
    <Button type="submit" color="secondary" variant="contained"  sx={{ gridColumn: "span 4" }}>
    {texto("RolsPermission.BtnAssignPermissions")}  
            </Button>
           

          </Box>

    
          
        </form>
      )}
    </Formik>
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

export default RolsPermission;
