import { Box } from "@mui/material";
import { useState } from "react";
//import Header from "../../components/Header";
//import PieChart from "../../components/PieChart";

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    const userToken = 'userToken';
    localStorage.setItem('token', userToken);

  };


  return (
    <Box m="20px">


      <Box height="75vh">

      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
   


      </Box>
    </Box>
  );
};

export default Login;
