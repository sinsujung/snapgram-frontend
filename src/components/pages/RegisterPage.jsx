import "./RegisterPage.css";
import Header from "../common/Header.jsx";
import Info from "../register/Info.jsx";
const RegisterPage = () => {

    return(
        <div className="out-container">
                <div className="register-container">
                    <Header />
                    <div className="info-container">
                        <Info />
                    </div>
                </div>
        </div>
    );
}

export default RegisterPage;
