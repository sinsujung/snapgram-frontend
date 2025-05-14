import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const [loginItems, setLoginItems] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginItems((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLoginButtonClick = async () => {
        const { email, password } = loginItems;

        if (!email || !password) {
            alert("모든 정보를 입력해주세요!");
            return;
        }

        if (!isValidEmail(email)) {
            alert("이메일 형식으로 입력하세요!");
            return;
        }

        const requestData = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post("http://192.168.0.18:8080/api/user/login", requestData);
            const { code, data } = response.data;

            if (code === 0) {
                console.log(data);
                localStorage.setItem("token", data);

                alert("로그인에 성공했습니다!");
                navigate("/main-feed");
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
                value={loginItems.email}
                onChange={handleChange}
            />
            <Input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                value={loginItems.password}
                onChange={handleChange}
            />
            <div style={{ marginTop: "24px", width: "100%" }}>
                <Button text="로그인" onClick={handleLoginButtonClick} />
            </div>
            <Link to="/find-password" style={{ color: "white", cursor: "pointer" }}>
                비밀번호 찾기
            </Link>
        </div>
    );
};

export default Login;
