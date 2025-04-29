import { useState } from "react";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";
import { useNavigate } from "react-router-dom";
import {isValidPhone, isValidPassword, isValidEmail, isValidNickName} from "../../utill/validation.js";

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
        nickname: "",
        phone: {
            first: "",
            middle: "",
            last: "",
        },
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

            if (name.includes("phone")) {
                if (!/^\d*$/.test(value)) {
                    return;
                }
            const [_, part] = name.split(".");
            setTextItems((prevState) => ({
                ...prevState,
                phone: {
                    ...prevState.phone,
                    [part]: value,
                },
            }));
            return;
        }


    setTextItems((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};

    const handleJoinClick = () => {
        const { email, password, name, nickname, phone } = textItems;

        if (!email || !password || !name || !nickname || !phone.first || !phone.middle || !phone.last) {
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

        if (!isValidNickName(nickname)) {
            alert("사용자 이름은 영어 알파벳만 사용할 수 있습니다.");
            return;
        }

        if (!isValidPhone(phone)) {
            alert("유효한 휴대폰 번호를 입력해주세요.");
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
                name="nickname"
                placeholder="사용자 이름"
                value={textItems.nickname}
                onChange={handleChange}
            />

            <div style={{display: 'flex', justifyContent: 'center', alignItem: 'center', gap: '5px'}}>
                <Input
                    type="text"
                    name="phone.first"
                    placeholder="xxx"
                    value={textItems.phone.first}
                    onChange={handleChange}
                    maxLength={3}
                    style={{width: '60px'}}
                />
                <span>-</span>
                <Input
                    type="text"
                    name="phone.middle"
                    placeholder="xxxx"
                    value={textItems.phone.middle}
                    onChange={handleChange}
                    maxLength={4}
                    style={{width: '80px'}}
                />
                <span>-</span>
                <Input
                    type="text"
                    name="phone.last"
                    placeholder="xxxx"
                    value={textItems.phone.last}
                    onChange={handleChange}
                    maxLength={4}
                    style={{width: '80px'}}
                />
            </div>
            <h4 style={h4Style}>
                저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Snapgram에 업로드 했을 수 있습니다.
            </h4>

            <Button text="가입" onClick={handleButtonClick} />
        </div>
    );
};

export default Info;
