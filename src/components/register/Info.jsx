import { useState } from "react";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import { useNavigate } from "react-router-dom";

const Info = () => {
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
        if (!textItems.name || !textItems.email || !textItems.password || !textItems.nickName) {
            alert("모든 정보를 입력해주세요!");
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
