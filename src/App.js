import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Cartera from "./scenes/micartera";
import Registrarse from "./scenes/registrarse";
import Activos from "./scenes/activos";
import RolYPermiso from "./scenes/rolespermisos";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./scenes/login";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";

i18next.init({
  iterpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: { global: global_es },
    en: { global: global_en },
  },
});

const App = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  //const isAuthenticated = !!localStorage.getItem("p2Token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("p2Token");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      //noteService.setToken(user.token)
    }
  }, []);

  return (
    <>
      <I18nextProvider i18n={i18next}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            {!user ? (
              <div className="loginApp">
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} isLogin={true} />
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/registrarse" element={<Registrarse />} />
                  </Routes>
                </main>
              </div>
            ) : (
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/micartera" element={<Cartera />} />
                    <Route path="/Activos" element={<Activos />} />
                    <Route path="/rolespermisos" element={<RolYPermiso />} />
                  </Routes>
                </main>
              </div>
            )}
          </ThemeProvider>
        </ColorModeContext.Provider>
      </I18nextProvider>
    </>
  );
};

export default App;
