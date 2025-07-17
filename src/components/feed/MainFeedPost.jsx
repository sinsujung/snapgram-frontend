import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultProfileImage from "../../assets/non-profile.svg";
import IsLiked from "../../assets/liked.svg";
import IsNotLiked from "../../assets/unliked.svg";
import { useEffect, useState } from "react";

const MainFeedPost = () => {
    const [userData, setUserData ] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const loggedInUserId = localStorage.getItem("userId");

    // 좋아요 갯수 상태
    // const [isLikedCount, setIsLikedCount] = useState(false);

    // 좋아요 상태
    // const [likedPosts, setLikedPosts] = useState({
    //     is_like: false,
    // });

    const handleNickNameClick = (posts) => {
        navigate(`/user-feed/${posts.user.id}`);
    };

    const likeClickHandler = async(posts) => {
    const post_id = posts.id;
    const isCurrentlyLiked = posts.is_like;

    // if(!userData) return;

    try {
        if (isCurrentlyLiked) {
            console.log("likeClickHandler called", isCurrentlyLiked);
            // 좋아요 취소
            const response = await axios.delete(`http://192.168.0.18:8080/api/post/like/${post_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("좋아요 등록 응답:", response.data);
            if (response.data.code === 0) {
                alert("cancel liked!");
                 // 좋아요 수 감소 (실제)
                setPosts((prevPosts) =>
                    prevPosts.map((p) =>
                        p.id === post_id
                            ? { ...p, is_like: false, like_count: p.like_count - 1 }
                            : p
                    )
                );

                // 테스트용
                // setPosts((prevPosts) =>
                //         prevPosts.map((p) =>
                //             p.id === post_id
                //                 ? {
                //                     ...p,
                //                     is_like: !isCurrentlyLiked,
                //                     like_count: isCurrentlyLiked
                //                         ? p.like_count - 1
                //                         : p.like_count + 1,
                //                 }
                //                 : p
                //         )
                // );
            } else {
                alert("cancel liked failed!");
            }
        } else {
            // 좋아요
            const response = await axios.post(
               `http://192.168.0.18:8080/api/post/like/${post_id}`,{},
               {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
               }
            );

            if (response.data.code === 0) {
                alert("complete liked!");
                // 좋아요 수 증가
                setPosts((prevPosts) =>
                    prevPosts.map((p) =>
                        p.id === post_id
                            ? { ...p, is_like: true, like_count: p.like_count + 1 }
                            : p
                    )
                );
                // 👉 개발용: 좋아요 상태 반전 및 수 변경 (UI 테스트용)
                    // setPosts((prevPosts) =>
                    //     prevPosts.map((p) =>
                    //         p.id === post_id
                    //             ? {
                    //                 ...p,
                    //                 is_like: !isCurrentlyLiked,
                    //                 like_count: isCurrentlyLiked
                    //                     ? p.like_count - 1
                    //                     : p.like_count + 1,
                    //             }
                    //             : p
                    //     )
                    // );
            } else {
                alert("complete liked failed!");
            }
        }
    } catch (error) {
        console.error("좋아요 실패", error);
        alert("좋아요 실패!");
    }
};
    useEffect(() => {  

        setPosts([
            {
                id: 1,
                user: { id: 1, username: "summer_dev" },
                content: "오늘 날씨 너무 좋아요 🌞",
                image_url: DefaultProfileImage,
                created_at: "2025-07-01T12:34:56Z",
                like_count: 12,
                comment_count: 3,
                is_like: false,
            },
            {
                id: 2,
                user: { id: 2, username: "code_master" },
                content: "React로 만든 나만의 블로그 ✨",
                image_url: null,
                created_at: "2025-07-02T09:00:00Z",
                like_count: 8,
                comment_count: 1,
                is_like: false,
            },
            {
                id: 3,
                user: { id: 3, username: "daily_life" },
                content: "산책하다가 찍은 사진",
                image_url: DefaultProfileImage,
                created_at: "2025-07-03T18:10:00Z",
                like_count: 20,
                comment_count: 5,
                is_like: true,
            }
        ]);

        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://192.168.0.18:8080/api/post", {
                    params: { page: 1, size: 10 },
                    headers: {
                        Authorization: `Bearer ${token}` },
                });
                const { code, data } = response.data;

                if (code === 0) {
                    setPosts(data.posts || []);
                }

            } catch (error) {
                console.error("피드 불러오기 오류: ", error);
            }
        };

        fetchPosts();
    }, [token]);

    return (
        <div className="post-style">
            {posts.map((post) => (
                <div key={post.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                    <div className="post-nickName">
                        <p style={{color: "white", cursor: "pointer"}} onClick={() => handleNickNameClick(post)}><strong>@{post.user.username}</strong></p>
                    </div>
                    <img src={post.image_url ? post.image_url : DefaultProfileImage} alt="post" style={{ width: "300px", height: "250px", marginTop: "20px", marginBottom: "20px"}} />
                    <p style={{color: "white"}}>{post.content}</p>
                    <div style={{color: "white"}}>
                        <div onClick={() => likeClickHandler(post)}><img src={post.is_like ? IsLiked : IsNotLiked} alt="like" className="isLiked"/></div>
                        {post.like_count}· 💬 {post.comment_count}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MainFeedPost;
