import Input from "../common/Input.jsx";
import {useState} from "react";
import {isValidEmail, isValidPhone} from "../../utill/validation.js";
import Button from "../common/Button.jsx";
import "../pages/FindPasswordPage.css";
const FindPassword = () => {
    const [passwordItem, setPasswordItem] = useState({
        email: "",
        phone: {
            first: "",
            middle: "",
            last: "",
        },
    });

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
        const isMockMode = true;

        if (isMockMode) {
            const mockResponse = {
                code: 0,
                data: {
                    temp_password: "mock1234"
                }
            };

            alert(`(Mock) 임시 비밀번호는: ${mockResponse.data.temp_password} 입니다.`);
            return;
        }
        // 실제 서버 요청
        // try {
        //     const response = await fetch("/api/user/find_password", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             email,
        //             phone: fullPhone,
        //         }),
        //     });
        //
        //     const result = await response.json();
        //
        //     if (result.code === 0 && result.data?.temp_password) {
        //         alert(`임시 비밀번호는: ${result.data.temp_password} 입니다.`);
        //     } else {
        //         alert("비밀번호 찾기에 실패했습니다.");
        //     }
        // } catch (error) {
        //     console.error(error);
        //     alert("서버에 오류가 발생했습니다.");
        // }
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