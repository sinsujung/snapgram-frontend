import "./LoginPage.css";
import Header from "../common/Header.jsx";
import Login from "../login/Login.jsx";

const LoginPage = () => {

    return (
        <div className="out-container">
            <div className="login-container">
                <Header/>
                    <div className="input-container">
                        <Login/>
                    </div>
            </div>
        </div>
    );
}

export default LoginPage;
