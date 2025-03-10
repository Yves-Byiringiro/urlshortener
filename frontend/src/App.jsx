import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/home";
import Dashboard from "./screens/dashboard";
import Links from "./screens/links";
import Analytics from "./screens/analytics";
import Login from "./screens/login";
import Register from "./screens/register";

function App() {

  return (
    <Router>
      <main className="font-sans">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/links" element={<Links />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
