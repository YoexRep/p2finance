import { getApiUrl } from "../config";

export const getMicartera = async ({ parametros }) => {
  try {
    const { id } = parametros;

    const url = getApiUrl(`getMiCartera/${id}`);
 
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

export const setMicartera = async ({ values }) => {
  try {
    const url = getApiUrl(`setMiCartera`);
    console.log("Se ejecuta set "+values.precio_compra);
    const options = {
      method: "POST",
      body: new URLSearchParams({
        tipo: values.tipo,
        criptomoneda: values.criptomoneda,
        cantidad: values.cantidad,
        precio_compra: values.precio_compra,
        id_usuario: 2, // de momento lo dejamos fijo
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

export const updateMicartera = async ({ values }) => {
  try {
    const url = getApiUrl(`updateMiCartera`);

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
