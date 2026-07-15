import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchProfile } from "./features/auth/authSlice"

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
