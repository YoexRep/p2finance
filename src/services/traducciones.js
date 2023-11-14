import { ApiUrl } from "../config";

export const getTraducciones = async () => {
  try {
    const url = ApiUrl(`getTraducciones`);

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
