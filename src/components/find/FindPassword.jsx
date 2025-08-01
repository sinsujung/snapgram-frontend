import Input from "../common/Input.jsx";
import {useState} from "react";
import {isValidEmail, isValidPhone} from "../../utill/validation.js";
import Button from "../common/Button.jsx";
import "../pages/FindPasswordPage.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const FindPassword = () => {
    const [passwordItem, setPasswordItem] = useState({
        email: "",
        phone: {
            first: "",
            middle: "",
            last: "",
        },
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes("phone")) {
            if (!/^\d*$/.test(value)) {
                return;
            }
            const [_, part] = name.split(".");
            setPasswordItem((prevState) => ({
                ...prevState,
                phone: {
                    ...prevState.phone,
                    [part]: value,
                },
            }));
            return;
        }

        setPasswordItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleFindPassword = async () => {
        const {email, phone} = passwordItem;
        const fullPhone = `${phone.first}${phone.middle}${phone.last}`;

        if (!isValidEmail(email)) {
            alert("올바른 이메일을 입력하세요.");
            return;
        }

        if (!isValidPhone(phone)) {
            alert("올바른 전화번호를 입력하세요.");
            return;
        }

        // 테스트용
        // const isMockMode = true;
        //
        // if (isMockMode) {
        //     const mockResponse = {
        //         code: 0,
        //         data: {
        //             temp_password: "mock1234"
        //         }
        //     };
        //     alert(`(Mock) 임시 비밀번호는: ${mockResponse.data.temp_password} 입니다.`);
        //     navigate("/main-feed");
        // }
        // 실제 서버 요청
        try {

            const response = await axios.post("http://192.168.0.11:8080/api/user/find_password", passwordItem);
            const {code, data} = response.data;

            if (code === 0) {
                alert(`임시 비밀번호는: ${data.temp_password} 입니다.`);
                navigate("/login");
            } else {
                alert("비밀번호 찾기에 실패했습니다.");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const {code, message} = error.response.data;
                alert(message || `오류 발생 (코드: ${code})`);
            } else {
                alert("서버가 응답하지 않습니다.")
            }
        }
    };

    return (
        <div>
            <Input
                type="text"
                name="email"
                placeholder="이메일"
                value={passwordItem.email}
                onChange={handleChange}
            />
            <div style={{ display: "flex", gap: "4px"}}>
                <Input
                    type="text"
                    name="phone.first"
                    placeholder="xxx"
                    value={passwordItem.phone.first}
                    onChange={handleChange}
                    maxLength={3}
                    style={{width: "60px"}}
                />
                -
                <Input
                    type="text"
                    name="phone.middle"
                    placeholder="xxxx"
                    value={passwordItem.phone.middle}
                    onChange={handleChange}
                    maxLength={4}
                    style={{width: "80px"}}
                />
                -
                <Input
                    type="text"
                    name="phone.last"
                    placeholder="xxxx"
                    vlaue={passwordItem.phone.last}
                    onChange={handleChange}
                    maxLength={4}
                    style={{width: "80px"}}
                />
            </div>
            <Button className="find-button" text="찾기" onClick={handleFindPassword} style={{marginTop: "20px"}}/>
        </div>
    );
}

export default FindPassword;