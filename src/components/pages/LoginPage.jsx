import "./LoginPage.css";
import Header from "../common/Header.jsx";
import Login from "../login/Login.jsx";

const LoginPage = () => {

    return (
        <div className="login-out-container">
            <div className="login-container">
                <Header text="Snapgram" subText="친구들의 사진 동영상을 보려면 가입하세요."/>
                    <div className="input-container">
                        <Login/>
                    </div>
            </div>
        </div>
    );
}

export default LoginPage;
