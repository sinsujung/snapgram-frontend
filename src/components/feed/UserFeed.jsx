import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../common/Header.jsx";
import axios from "axios";
import Button from "../common/Button.jsx";
import DefaultProfileImage from "../../assets/non-profile.svg";

const UserFeed = () => {
    const { id } = useParams();
    const [userData, setUserData ] = useState(null);
    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    // const [isLike, setIsLike] = useState(false);
    const loggedInUserId = localStorage.getItem("userId");
    const navigate = useNavigate();
    // const requestData = {
    //     user_id: userData?.id,
    // }

    // 가상 데이터
//     const mockPosts = [
//   { id: 1, image_url: "https://via.placeholder.com/200?text=Post+1" },
//   { id: 2, image_url: "https://via.placeholder.com/200?text=Post+2" },
//   { id: 3, image_url: "https://via.placeholder.com/200?text=Post+3" },
// ];
//
//   const mockUser = {
//     id: 1,
//     profile_image_url: "https://via.placeholder.com/100",
//     name: "홍길동",
//     nickname: "hong",
//     post_count: 5,
//     following_count: 10,
//     follower_count: 15,
//     is_following: false,
//   };
//
//     useEffect(() => {
//     setUserData(mockUser);
//     setPosts(mockPosts);
//     setIsFollowing(mockUser.is_following);
//   }, [id]);
//
//
  // 위까지

    const handleFollow = async () => {
        if (!userData) return;

        try {
            if (isFollowing) {
                // 언팔
                const response = await axios.delete(`http://192.168.0.18:8080/api/follow?user_id=${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.code === 0) {
                    alert("언팔로우 완료");
                    setIsFollowing(false);
                } else {
                    alert("언팔로우 실패");
                }
            } else {
                // 팔로우
                const response = await axios.post(
                    "http://192.168.0.18:8080/api/follow",
                    { user_id: userData.id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.data.code === 0) {
                    alert("팔로우 완료");
                    setIsFollowing(true);
                } else {
                    alert("팔로우 실패");
                }
            }
        } catch (error) {
            console.error("요청 실패", error);
            alert("에러가 발생했습니다.");
        }
    };

    const handleWrite = () => {
        navigate("/post");
    }


    // 실제 서버 연결
    useEffect(() => {
        const handleUserFeed = async () => {
            try {
                const response = await axios.get(`http://192.168.0.18:8080/api/user/profile?user_id=${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`}
                        });
                const {code, data} = response.data;

                if (code === 0) {
                    setUserData(data.user);
                    setPosts(data.posts || []);
                    setIsFollowing(data.user.is_following); // following 상태 백엔드 서버에서 받을 수 있게 api 정보 바꾸기
                    // setIsLike(data.user.is_like);
                }
            } catch (error) {
                console.log("피드 로딩 실패", error);
            }
        };
        handleUserFeed();

    }, [id]);
    // console.log(loggedInUserId, userData.id);
    if (!userData) return <div style={{color: "white"}}>로딩 중..</div>;

    return(
        <div>
            <div style={{color: "white"}}>
                {userData.profile_image_url ? (
                    <img src={userData.profile_image_url} alt="프로필 이미지" width="100" />
                ) : (
                    <img src={DefaultProfileImage} alt="기본 이미지" width="100" />
                )};
                <Header text={userData.name + "의 피드"} subText={"@" + userData.nickname}/>
                <p>게시물 수: {userData.post_count}</p>
                <p>팔로잉: {userData.following_count}</p>
                <p>팔로워: {userData.follower_count}</p>
                <div style={{ display: "flex", gap: "10px", marginLeft: "33px"}}>
                    {loggedInUserId !== userData.id.toString() && <Button onClick= {handleFollow} text={isFollowing ? "unfollow" : "follow"} style={{width: "90px"}}/>}
                    {loggedInUserId === userData.id.toString() && <Button onClick= {handleWrite} text={"게시물 작성"} style={{width: "90px"}}/>}
                </div>
                <p>{userData.posts}</p>
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