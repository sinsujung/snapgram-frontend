import Search from "../common/Search.jsx";
import {useState} from "react";
import DefaultProfileImage from "../../assets/non-profile.svg";
import "../pages/MainFeedPage.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "../common/Header.jsx";

const MainFeedSearch = () => {

    const token = localStorage.getItem("token");

    //실제 데이터
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const fetchSearchUsers = async(query) => {
        if (!query) {
            setUsers([]);
            return;
        }

        //실제 api 서버 연동
        try {
            const response = await axios.get(`http://192.168.0.18:8080/api/user/search`, {
                params: { query },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(token);
            const {code, data} = response.data;

            if (code === 0) {
                const uniqueUsers = Array.from(new Map(data.users.map(user => [user.id, user])).values());
                setUsers(uniqueUsers);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error("검색 오류: ", error);
            setUsers([]);
        }
    };
    return(
        <div>
            <Header text="Snapgram"/>
            <Search onSearch={fetchSearchUsers}/>
            <ul className="search-results">
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}
                        onClick={() => navigate(`/user-feed/${user.id}`)}>
                            <img
                                src={user.profile_image_url ? user.profile_image_url : DefaultProfileImage}
                                alt={`${user.name}의 프로필`}
                                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                            />
                            <span>{user.name} ({user.nickname})</span>
                        </li>
                    ))
                ) : (
                    <li>검색 결과가 없습니다.</li>
                )}
            </ul>

        </div>
    );
}

export default MainFeedSearch;