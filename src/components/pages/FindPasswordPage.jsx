import FindPassword from "../find/FindPassword.jsx";
import "./FindPasswordPage.css";
import Button from "../common/Button.jsx";
import {useNavigate} from "react-router-dom";
import Header from "../common/Header.jsx";
const FindPasswordPage = () => {

    const navigate = useNavigate();

    const handleGotoLogin = () => {
        navigate("/login")
    }
    return (
        <div className="find-password-out-container">
            <div className= "find-password-container">
            <Header text="비밀번호 찾기" subText="비밀번호 초기화 시 비밀번호를 변경할 것을 권장" style={{fontSize: "1.5rem"}}/>
                <div className="input-container">
                    <FindPassword/>
                </div>
                    <Button onClick={handleGotoLogin} text={"확인"}></Button>
            </div>
        </div>
    );
};

export default FindPasswordPage;