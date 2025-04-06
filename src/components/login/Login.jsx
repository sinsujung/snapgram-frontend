import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import {useState} from "react";

const Login = () => {
    const [textItems, setTextItems] = useState({
        email: "",
        password: "",
    });

    const handleForgotPasswordClick = () => {
        window.open("/forgot-password", "비밀번호 찾기",  "width=500,height=600");
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTextItems((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleButtonClick = () => {
        if(!textItems.email || !textItems.password) {
            alert("모든 정보를 입력해주세요!");
            return;
        }
        const requestData = {
            email: textItems.email,
            password: textItems.password,
        };

    }
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
            <Button text="로그인" onClick={handleButtonClick}/>

            <p onClick={handleForgotPasswordClick} style={{color: "blue", cursor: "pointer"}}>비밀번호 찾기</p>
        </div>
    );
};

export default Login;