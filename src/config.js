//URL DE API CON API KEY

//const API_KEY = process.env.REACT_APP_API_KEY;

//export const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;

//Funcion para obtener la url de la api, pasandole el path.

//export const getApiUrl = (path) =>
//  `https://dashfinance-api-production.up.railway.app/${path}`;

export const ApiUrl = (path) => `http://localhost:5000/${path}`;
