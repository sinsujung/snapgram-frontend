import "./RegisterPage.css";
import Header from "../common/Header.jsx";
import Info from "../register/Info.jsx";
const RegisterPage = () => {

    return(
        <div className="out-container">
                <div className="register-container">
                    <Header text="Snapgram" subText="친구들의 사진 동영상을 보려면 가입하세요."/>
                    <div className="info-container">
                        <Info />
                    </div>
                </div>
        </div>
    );
}

export default RegisterPage;
