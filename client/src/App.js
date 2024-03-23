
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom"
import HomePage from "./scenes/HomePagee";
import LoginPage from "./scenes/LoginPage";
import ProfilePage from "./scenes/ProfilePage";
import {useMemo} from "react"
import {useSelector} from "react-redux"
import {CssBaseline, ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles"
import { themeSettings } from "./theme";
function App() {
  const mode=useSelector((state)=> state.mode)
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
