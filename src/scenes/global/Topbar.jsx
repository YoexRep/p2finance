import { Box, IconButton, useTheme, TextField, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import {useTranslation} from "react-i18next"

const Topbar = ({ isLogin }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [idiomaSelect, setIdiomaSelect] = useState("en");

  const [texto, i18n] = useTranslation("global");



  const handleLanguageChange = (e) => {

    i18n.changeLanguage(e.target.value)


    setIdiomaSelect(e.target.value)
  };

  const handleLogout = () => {
    window.localStorage.removeItem("p2Token");
    window.location.href = "/";
  };

  return (
    <>
      {isLogin ? (
        <Box display="flex" justifyContent="flex-end" p={2}>
          {/* ICONS */}
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>

          <TextField
            select
            onChange={handleLanguageChange}
            value={idiomaSelect}
            name="IdiomaSelect"
            sx={{ gridColumn: "span 2" }}
          >
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </TextField>
        </Box>
      ) : (
        <Box display="flex" justifyContent="space-between" p={2}>
          {/* SEARCH BAR */}
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* ICONS */}
          <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleLogout}>
              <PersonOutlinedIcon />
            </IconButton>
            <TextField
            select
            onChange={handleLanguageChange}
            value={idiomaSelect}
            name="IdiomaSelect"
            sx={{ gridColumn: "span 2" }}
          >
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </TextField>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Topbar;
