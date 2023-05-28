import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import LoginPage from "./components/Auth/LoginPage"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/superadmin/login-page" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
