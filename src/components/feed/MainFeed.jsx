import Search from "../common/Search.jsx";
import {useState} from "react";
import DefaultProfileImage from "../../assets/non-profile.svg";
import "../pages/MainFeedPage.css";
import {useNavigate} from "react-router-dom";

const MainFeed = () => {

    //예시 데이터
    const mockUsers = [
        {id:1, username: "suding", nickname: "김수댕", profile_image_url:DefaultProfileImage},
        {id:2, username: "jidang", nickname: "김지댕", profile_image_url:DefaultProfileImage},
    ]

    //실제 데이터
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const fetchSearchUsers = async(query) => {
        console.log("검색어:", query);

        if (!query) {
            setUsers([]);
            return;
        }

        //테스트
        const filtered = mockUsers.filter((user) =>
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.nickname.toLowerCase().includes(query.toLowerCase())
        );
        setUsers(filtered);
        console.log("검색 결과:", filtered);
        //실제 api 서버 연동
        // try {
        //     const response = await fetch(`/api/user/search?name=${encodeURIComponent(query)}`);
        //     const result = await response.json();
        //
        //     if (result.code === 0 && result.data?.users) {
        //         setUsers(result.data.users);
        //     } else {
        //         setUsers([]);
        //     }
        // } catch (error) {
        //     console.error("검색 오류: ", error);
        //     setUsers([]);
        // }
    };
    return(
        <div>
            <Search onSearch={fetchSearchUsers}/>
            <ul className="search-results">
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}
                        onClick={() => navigate(`/user-feed/${user.id}`)}>
                            <img
                                src={user.profile_image_url || DefaultProfileImage}
                                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                            />
                            <span>{user.username} ({user.nickname})</span>
                        </li>
                    ))
                ) : (
                    <li>검색 결과가 없습니다.</li>
                )}
            </ul>

        </div>
    );
}

export default MainFeed;