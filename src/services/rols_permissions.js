import { ApiUrl } from "../config";


export const registrarRolvsPermisos = async ({ values, node }) => {
  try {
    const url = ApiUrl(`create_Rol_vs_Permiso`);

    const options = {
      method: "POST",
      body: new URLSearchParams({
        f_codigof_rol: values.rol,
        f_codigof_permiso: node
    
      }),
    };

    const response = await fetch(url, options);

    const result = await response.text();

    return JSON.parse(result);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateMicartera = async ({ values }) => {
  try {
    const url = ApiUrl(`updateUser`);

    const options = {
      method: "POST",
      body: new URLSearchParams({
        id: values.id,
        tipo: values.tipo,
        cripto: values.cripto,
        cantidad: values.cantidad,
        precio_compra: values.precio_compra,
        comision: values.comision,
      }),
    };

    const response = await fetch(url, options);

    const result = await response.text();

    return JSON.parse(result);
  } catch (error) {
    console.error(error);
    return [];
  }
};
