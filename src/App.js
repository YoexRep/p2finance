import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Cartera from "./scenes/micartera";

import Activos from "./scenes/activos";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Login from "./scenes/login";

const RenderApp = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/micartera" element={<Cartera />} />
                <Route path="/Activos" element={<Activos />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

const RenderLogin = () => {
  return (
    <>
      <Login></Login>
    </>
  );
};

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return <>{isAuthenticated ? RenderApp() : RenderLogin()}</>;
}

export default App;
