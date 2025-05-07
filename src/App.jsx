import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/pages/RegisterPage.jsx';
import TermsPage from './components/pages/TermsPage.jsx';
import LoginPage from "./components/pages/LoginPage.jsx";
import FindPasswordPage from "./components/pages/FindPasswordPage.jsx";
import MainFeedPage from "./components/pages/MainFeedPage.jsx";
import UserFeedPage from "./components/pages/UserFeedPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/find-password" element={<FindPasswordPage/>} />
                <Route path="/main-feed" element={<MainFeedPage />} />
                <Route path="/user-feed/:id" element={<UserFeedPage />}/>
            </Routes>
        </Router>
    );
}

export default App;
