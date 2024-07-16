
import SignupPage from "./components/SignupPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  )
}

export default App;
