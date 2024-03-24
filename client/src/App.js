
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom"
import HomePage from "./scenes/HomePagee";
import LoginPage from "./scenes/LoginPage";
import ProfilePage from "./scenes/ProfilePage";
import {useMemo} from "react"
import {useSelector} from "react-redux"
import {CssBaseline, ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles"
import { themeSettings } from "./theme";
import state from "./state";


function App() {
  // grabbing mode from state
  const mode=useSelector((state)=> state.mode)
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode])
  const isAuth = Boolean(useSelector((state)=>state.token))
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/"></Navigate> } />
        <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/"></Navigate>} />
      </Routes>
      </ThemeProvider>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
