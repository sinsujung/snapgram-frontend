import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../common/Header.jsx";
import DefaultProfileImage from "../../assets/non-profile.svg";

const UserFeed = () => {
    const { id } = useParams();
    const [userData, setUserData ] = useState(null);

    // 임시 서버 테스트
    useEffect(() => {
        const fetchUserFeed = async () => {
            try {
                // 임시 데이터 사용
                const mockData = {
                    code: 0,
                    data: {
                        user: {
                            id: 1,
                            name: "홍길동",
                            username: "hgdong",
                            email: "hgdong@example.com",
                            post_count: 5,
                            following_count: 10,
                            follower_count: 15,
                            profile_url: DefaultProfileImage
                        }
                    }
                };

                // 서버 없이 임시 데이터로 테스트
                if (mockData.code === 0) {
                    setUserData(mockData.data.user);
                }
            } catch (error) {
                console.log("피드 로딩 실패", error);
            }
        };
        fetchUserFeed();
    }, [id]);

    // 실제 서버 연결
    // useEffect(() => {
    //     const fetchUserFeed = async () => {
    //         try {
    //             const response = await fetch(`/api/user/profile?id=${id}`);
    //             const result = await response.json();
    //             if (result.code === 0) {
    //                 setUserData(result.data.user);
    //             }
    //         } catch (error) {
    //             console.log("피드 로딩 실패", error);
    //         }
    //     };
    //     fetchUserFeed();
    // }, [id]);

    if (!userData) return <div style={{color: "white"}}>로딩 중..</div>;

    return(
        <div style={{color: "white"}}>
            <img src={userData.profile_url} alt="프로필 이미지" width="100" />
            <Header text={userData.name + "의 피드"} subText={"@" + userData.username}/>
            <p>게시물 수: {userData.post_count}</p>
            <p>팔로잉: {userData.following_count}</p>
            <p>팔로워: {userData.follower_count}</p>
        </div>
    );
};

export default UserFeed;