import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/home";
import Dashboard from "./screens/dashboard";
import Links from "./screens/links";
import Analytics from "./screens/analytics";

function App() {

  return (
    <Router>
      <main className="font-sans">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/links" element={<Links />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
