import { Box, Grid, TextField, Button, Paper, Link,InputAdornment } from '@mui/material';
import { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const userToken = 'userToken';
    localStorage.setItem('token', userToken);
  };

  const paperStyle = {
    backgroundColor: "#f5f5f5", 
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)',
  };

  const textFieldStyles = {
    background: '#858585', // 
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    
    >
      <Paper elevation={0} p={0} style={paperStyle}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              type="text"
              label="Nombre de usuario"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              style={textFieldStyles}
              InputProps={{ endAdornment: <InputAdornment position="end"><PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon></InputAdornment>}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Contraseña"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              style={textFieldStyles}
              InputProps={{ endAdornment: <InputAdornment position="end"><HttpsOutlinedIcon></HttpsOutlinedIcon></InputAdornment>}}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" onClick={handleLogin} sx={{
      fontWeight: 'bold' 
    }} fullWidth>
              Iniciar sesión
            </Button>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "right" }}>
            <Link component={RouterLink} to="/registrarse" color="primary">
              Registrarse
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
