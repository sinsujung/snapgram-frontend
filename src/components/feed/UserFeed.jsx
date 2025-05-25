import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../common/Header.jsx";
import DefaultProfileImage from "../../assets/non-profile.svg";
import axios from "axios";
import Button from "../common/Button.jsx";

const UserFeed = () => {
    const { id } = useParams();
    const [userData, setUserData ] = useState(null);

    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState([]);
    const requestData = {
        user_id: userData?.id,
    }

    const handleFollow = async () => {
        try {
            const response = await axios.post("http://192.168.0.18:8080/api/follow", requestData,
                {
                    headers: {
                            Authorization: `Bearer ${token}`
                        }
                });
            const {code, data} = response.data;
            if (code === 0) {
                alert("follow success");
                setUserData(data.user);
            } else {
                alert("follow failed");
            }
        } catch (error) {
            console.error("팔로우 요청 실패", error);
        }
    };

    // 실제 서버 연결
    useEffect(() => {
        const handleUserFeed = async () => {
            try {
                const response = await axios.get(`http://192.168.0.18:8080/api/user/profile?user_id=${id}`);
                const {code, data} = response.data;

                if (code === 0) {
                    setUserData(data.user);
                    setPosts(data.user.posts || []);
                }
            } catch (error) {
                console.log("피드 로딩 실패", error);
            }
        };
        handleUserFeed();
    }, [id]);

    if (!userData) return <div style={{color: "white"}}>로딩 중..</div>;

    return(
        <div>
            <div style={{color: "white"}}>
                <img src={userData.profile_image_url} alt="프로필 이미지" width="100" />
                <Header text={userData.name + "의 피드"} subText={"@" + userData.nickname}/>
                <p>게시물 수: {userData.post_count}</p>
                <p>팔로잉: {userData.following_count}</p>
                <p>팔로워: {userData.follower_count}</p>
                <p>게시물: {userData.posts}</p>
                <Button onClick={handleFollow} text="follow" />
            </div>
            <div>
                <h3>게시물</h3>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <img key={post.id} src={post.image_url} alt={`게시물${post.id}`} width="200" />
                    ))
                ) : (
                    <p>게시물이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default UserFeed;