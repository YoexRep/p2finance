
import { Box, Button, TextField, MenuItem, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import {useEffect, useState} from 'react';

import { registrarRolvsPermisos , LimpiarRolvsPermisos} from "../../services/rols_permissions";

import RecursiveTreeView from "../../components/RecursiveTreeView";

import {useTranslation} from "react-i18next"

const RolsPermission = () => {

  const [isLoading, setIsLoading] = useState(false)
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [texto, i18n] = useTranslation("global");

  const [selectedNodes, setSelectedNodes] = useState([]);

  const handleNodeSelect = (selected) => {
    setSelectedNodes(selected);
  };

  const handleFormSubmit = async (values, actions) => {
     




    setIsLoading(true);

    try{
     
      LimpiarRolvsPermisos({ values }).then(async()=>{
        
        selectedNodes.forEach((node) => {
       
          registrarRolvsPermisos({ values, node }).then(async()=>{
         
           setOpenSnackBarAlert(true);
           //actions.resetForm();
         });
 
       });


      });
     
     

  

    }catch(error){
      console.error(error);
    }

    setIsLoading(false);
  };



  const [openSnackBarAlert, setOpenSnackBarAlert] = useState(false)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleCloseSnackBarAlert = (event, reason) =>{
    if(reason=='clickaway'){
        return
    }else{
      setOpenSnackBarAlert(false)
    }
}





  const NodosPermisos = [
    {
      id: texto("MenuOpcion.CodMenuHome"),
      name: texto("MenuOpcion.MenuHome"),
      // children: [
      //   {
      //     id: 2,
      //     name: 'Node 1.1',
      //   }]
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
              value={values.rol}
              name="rol"
              error={!!touched.rol && !!errors.rol}
              helperText={touched.rol && errors.rol}
              sx={{ gridColumn: "span 4" }}
            
            
            >
              
              <MenuItem value={texto("Rols.CodRolAdministrator")}> {texto("Rols.RolAdministrator")}</MenuItem>
              <MenuItem value={texto("Rols.CodRolNormal")}> {texto("Rols.RolNormal")}</MenuItem>
              <MenuItem value={texto("Rols.CodRolPremium")}> {texto("Rols.RolPremium")}</MenuItem>
              
              
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

          <Snackbar open={openSnackBarAlert} autoHideDuration={6000} onClose={handleCloseSnackBarAlert} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
        <Alert onClose={handleCloseSnackBarAlert} severity="success" sx={{ width: '100%' }}>
        {texto("RolsPermission.AlertSnackBar")}
        </Alert>
      </Snackbar>
          
        </form>
      )}
    </Formik>
  </Box> 
  

  
  
  </>
    
  );
};


const checkoutSchema = yup.object().shape({
  rol: yup.string().required("required"),
  
});
const initialValues = {
  rol: "",
 
};

export default RolsPermission;
