import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchProfile } from "./features/auth/authSlice"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import User from "./pages/User"

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  },[dispatch]);

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
