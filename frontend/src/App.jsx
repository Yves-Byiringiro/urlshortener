import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page";

function App() {

  return (
    <Router>
      <main className="font-sans">
        <Routes>
          <Route path="" element={<Home />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
