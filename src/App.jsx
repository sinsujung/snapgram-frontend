// App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/pages/RegisterPage.jsx';
import TermsPage from './components/pages/TermsPage.jsx';
import Login from "./components/pages/LoginPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} /> {/* 첫 화면 */}
                <Route path="/terms" element={<TermsPage />} /> {/* 약관 페이지 */}
            </Routes>
        </Router>
    );
}

export default App;
