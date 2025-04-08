import { useState } from "react";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import { useNavigate } from "react-router-dom";

const Info = () => {

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isValidPassword = (password) => {
        const regex = /^(?=.*[!@#$%^&*()\-_=+[\]{};':"\\|,.<>/?]).{9,}$/;
        return regex.test(password);
    };

    const isValidNickName = (nick) => {
        const regex = /^[A-Za-z]+$/;
        return regex.test(nick);
    };

    const h4Style = {
        fontSize: "0.8rem",
        margin: "18px",
        color: "#808080"
    };

    const [textItems, setTextItems] = useState({
        email: "",
        password: "",
        name: "",
        nickName: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTextItems((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleJoinClick = () => {
        const { email, password, name, nickName } = textItems;

        if (!email || !password || !name || !nickName) {
            alert("모든 정보를 입력해주세요!");
            return;
        }

        if (!isValidEmail(email)) {
            alert("유효한 이메일 형식이 아닙니다.");
            return;
        }

        if (!isValidPassword(password)) {
            alert("비밀번호는 특수문자를 포함해 9자 이상이어야 합니다.");
            return;
        }

        if (!isValidNickName(nickName)) {
            alert("사용자 이름은 영어 알파벳만 사용할 수 있습니다.");
            return;
        }
        localStorage.setItem("signupData", JSON.stringify(textItems));
        navigate("/terms");
    };

    const handleSubmit = () => {
        console.log("가입 정보:", textItems);
    };

    const handleButtonClick = () => {
        handleSubmit();
        handleJoinClick();
    };

    return (
        <div>
            <Input
                type="email"
                name="email"
                placeholder="이메일"
                value={textItems.email}
                onChange={handleChange}
            />

            <Input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={textItems.password}
                onChange={handleChange}
            />

            <Input
                type="text"
                name="name"
                placeholder="성명"
                value={textItems.name}
                onChange={handleChange}
            />

            <Input
                type="text"
                name="nickName"
                placeholder="사용자 이름"
                value={textItems.nickName}
                onChange={handleChange}
            />

            <h4 style={h4Style}>
                저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Snapgram에 업로드 했을 수 있습니다.
            </h4>

            <Button text="가입" onClick={handleButtonClick} />
        </div>
    );
};

export default Info;
