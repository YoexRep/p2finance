export const getPrecioCrypto = async ({ parametros }) => {
  try {
    const { coin, fiat, volumen } = parametros;

    const url = `https://criptoya.com/api/${coin}/${fiat}/${volumen}`;

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
