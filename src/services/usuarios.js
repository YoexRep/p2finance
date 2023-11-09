import { ApiUrl } from "../config";

export const obtenerUsuario = async ({ parametros }) => {
  try {
    const { id } = parametros;

    const url = ApiUrl(`getUser/${id}`);

    const options = {
      method: "GET",
    };

    const response = await fetch(url, options);

    const result = await response.text();

    return JSON.parse(result);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const validarLogin = async ({ values }) => {
  try {
    const url = ApiUrl(`validarLogin`);

    const options = {
      method: "POST",
      body: new URLSearchParams({
        f_usuario: values.usuario,
        f_clave: values.clave,
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

export const verificarSiExisteUsuario = async (username) => {
  try {
    const url = ApiUrl(`verificarUser/${username}`);

    const options = {
      method: "GET",
    };

    const response = await fetch(url, options);

    const result = await response.text();

    return JSON.parse(result);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const registrarUsuario = async ({ values }) => {
  try {
    const url = ApiUrl(`createUser`);

    const options = {
      method: "POST",
      body: new URLSearchParams({
        f_usuario: values.usuario,
        f_clave: values.clave,
        f_correo: values.correo,
        f_nombre_completo: values.nombre,
        f_fecha_nacimiento: values.fecha,
        f_estado: "Activo",
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
