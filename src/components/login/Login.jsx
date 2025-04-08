import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [textItems, setTextItems] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleForgotPasswordClick = () => {
        window.open("/forgot-password", "비밀번호 찾기", "width=500,height=600");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTextItems((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLoginButtonClick = async () => {
        const { email, password } = textItems;

        if (!email || !password) {
            alert("모든 정보를 입력해주세요!");
            return;
        }

        if (!isValidEmail(email)) {
            alert("이메일 형식으로 입력하세요!");
            return;
        }

        const requestData = {
            email,
            password,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/v1/user/login", requestData);
            const { code, data } = response.data;

            if (code === 0) {
                localStorage.setItem("token", data);
                alert("로그인에 성공했습니다!");
                navigate("/");
            } else {
                alert("로그인에 실패했습니다.");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const { code, message } = error.response.data;
                alert(message || `오류 발생 (코드: ${code})`);
            } else {
                alert("서버가 응답하지 않습니다.");
            }
        }
    };

    return (
        <div>
            <Input
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요."
                value={textItems.email}
                onChange={handleChange}
            />
            <Input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                value={textItems.password}
                onChange={handleChange}
            />
            <div style={{ marginTop: "24px", width: "100%" }}>
                <Button text="로그인" onClick={handleLoginButtonClick} />
            </div>
            <p onClick={handleForgotPasswordClick} style={{ color: "white", cursor: "pointer" }}>
                비밀번호 찾기
            </p>
        </div>
    );
};

export default Login;
