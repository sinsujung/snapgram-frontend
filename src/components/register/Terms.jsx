import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckboxChecked from "../../assets/checked.svg";
import CheckboxUnChecked from "../../assets/unchecked.svg";
import Button from "../common/Button";
import axios from "axios";

const Terms = () => {
    const navigate = useNavigate();
    const [checkedItems, setCheckedItems] = useState({
        all: false,
        terms: false,
        data: false,
        location: false,
    });

    const [signupData, setSignupData] = useState(null);

    useEffect(() => {
        // 회원가입 정보 불러오기
        const savedData = JSON.parse(localStorage.getItem("signupData"));
        if (savedData) {
            setSignupData(savedData);
        }
    }, []);

    // 개별 체크박스 토글
    const toggleCheckbox = (key) => {
        const updatedCheckedItems = { ...checkedItems, [key]: !checkedItems[key] };
        updatedCheckedItems.all =
            updatedCheckedItems.terms && updatedCheckedItems.data && updatedCheckedItems.location;
        setCheckedItems(updatedCheckedItems);
    };

    // "전체 동의" 체크 시 모든 항목 선택
    const toggleAll = () => {
        const newState = !checkedItems.all;
        setCheckedItems({
            all: newState,
            terms: newState,
            data: newState,
            location: newState,
        });
    };

    // 회원가입 요청 함수
    const handleSignup = async () => {
        if (!signupData) {
            alert("회원가입 정보를 다시 입력해주세요.");
            navigate("/register");
            return;
        }

        const requestData = {
            ...signupData,
            is_agree: true,
        };

        try {
            // Mock API 사용 (jsonplaceholder)
            const response = await axios.post("https://jsonplaceholder.typicode.com/posts", requestData);

            if (response.status === 201) {
                alert("회원가입이 완료되었습니다! (Mock API)");
                navigate("/login"); // 메인 페이지로 이동
            } else {
                alert("회원가입에 실패했습니다. (Mock API 응답 오류)");
            }
        } catch (error) {
            alert("서버가 응답하지 않습니다. (Mock API 테스트)");
        }
    };

    // 오류 메시지 처리
    const handleError = (code, message) => {
        switch (code) {
            case 1001:
                alert("이미 사용 중인 이메일입니다.");
                break;
            case 1002:
                alert("이미 사용 중인 닉네임입니다.");
                break;
            case 1003:
                alert("잘못된 이메일 형식입니다.");
                break;
            case 1004:
                alert("비밀번호 형식을 확인해주세요.");
                break;
            case 1005:
                alert("이용약관에 동의해야 합니다.");
                break;
            case 2000:
                alert("예상치 못한 오류가 발생했습니다.");
                break;
            default:
                alert(message || "알 수 없는 오류가 발생했습니다.");
        }
    };

    // 다음 버튼 클릭 시 모든 필수 약관 체크 확인
    const nextButtonClick = () => {
        if (!checkedItems.terms || !checkedItems.data || !checkedItems.location) {
            alert("모든 필수 약관에 동의해야 합니다.");
            return;
        }
        handleSignup();
    };

    return (
        <div className="terms-container">
            <h3 className="terms-title">이용 약관에 동의</h3>
            <p className="terms-description">
                Snapgram은 회원님의 개인 정보를 안전하게 보호합니다.<br />
                새 계정을 만들려면 모든 약관에 동의하세요.
            </p>

            {/* 전체 동의 */}
            <div className="terms-agree" onClick={toggleAll}>
                <span>모든 약관에 동의</span>
                <img
                    src={checkedItems.all ? CheckboxChecked : CheckboxUnChecked}
                    alt="전체 동의 체크박스"
                    className="terms-checkbox"
                />
            </div>

            <hr className="terms-divider" />

            {/* 개별 약관 */}
            <div className="terms-list">
                <div className="terms-item" onClick={() => toggleCheckbox("terms")}>
                    <span>이용 약관 (필수)</span>
                    <img
                        src={checkedItems.terms ? CheckboxChecked : CheckboxUnChecked}
                        alt="이용 약관 체크박스"
                        className="terms-checkbox"
                    />
                </div>
                <div className="terms-item" onClick={() => toggleCheckbox("data")}>
                    <span>데이터 정책 (필수)</span>
                    <img
                        src={checkedItems.data ? CheckboxChecked : CheckboxUnChecked}
                        alt="데이터 정책 체크박스"
                        className="terms-checkbox"
                    />
                </div>
                <div className="terms-item" onClick={() => toggleCheckbox("location")}>
                    <span>위치 기반 기능 (필수)</span>
                    <img
                        src={checkedItems.location ? CheckboxChecked : CheckboxUnChecked}
                        alt="위치 기반 기능 체크박스"
                        className="terms-checkbox"
                    />
                </div>
            </div>

            <Button text="다음" onClick={nextButtonClick} />
        </div>
    );
};

export default Terms;
