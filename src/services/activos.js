import { ApiUrl } from "../config";

export const getActivos = async ({ parametros }) => {
  try {
    const { id } = parametros;

    const url = ApiUrl(`getActivos/${id}`);

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
