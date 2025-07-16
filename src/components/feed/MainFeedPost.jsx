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
    // 좋아요 상태
    // const [isLiked, setIsLiked] = useState(false);

    // 좋아요 상태
    const [likedPosts, setLikedPosts] = useState({});

    const handleNickNameClick = (userId) => {
        navigate(`/user-feed/${userId}`);
    };

const likeClickHandler = async(post) => {
    const post_id = post.id;

    if(!userData) return;

    const isCurrentlyLiked = likedPosts[post_id] || false;

    try {
        if (isCurrentlyLiked) {
            // 좋아요 취소
            const response = await axios.delete(`http://192.168.0.18:8080/api/post/like/${post_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.code === 0) {
                alert("cancel liked!");
                setLikedPosts((prev) => ({ ...prev, [post_id]: false }));
            } else {
                alert("cancel liked failed!");
            }
        } else {
            // 좋아요
            const response = await axios.post(
               `http://192.168.0.18:8080/api/post/like/${post_id}`,
               { post_id: post.id},
               {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
               }
            );

            if (response.data.code === 0) {
                alert("complete liked!");
                setLikedPosts((prev) => ({ ...prev, [post_id]: true }));
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
                user: { id: 101, username: "summer_dev" },
                content: "오늘 날씨 너무 좋아요 🌞",
                image_url: "https://via.placeholder.com/300x250.png?text=Summer+Vibes",
                created_at: "2025-07-01T12:34:56Z",
                like_count: 12,
                comment_count: 3
            },
            {
                id: 2,
                user: { id: 102, username: "code_master" },
                content: "React로 만든 나만의 블로그 ✨",
                image_url: null,
                created_at: "2025-07-02T09:00:00Z",
                like_count: 8,
                comment_count: 1
            },
            {
                id: 3,
                user: { id: 103, username: "daily_life" },
                content: "산책하다가 찍은 사진 🏞️",
                image_url: "https://via.placeholder.com/300x250.png?text=Nature+Walk",
                created_at: "2025-07-03T18:10:00Z",
                like_count: 20,
                comment_count: 5
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
                        <p style={{color: "white", cursor: "pointer"}} onClick={() => handleNickNameClick(post.user.id)}><strong>@{post.user.username}</strong></p>
                    </div>
                    <img src={post.image_url ? post.image_url : DefaultProfileImage} alt="post" style={{ width: "300px", height: "250px", marginTop: "20px", marginBottom: "20px"}} />
                    <p style={{color: "white"}}>{post.content}</p>
                    <p style={{color: "white"}}>
                        <button onClick={() => likeClickHandler(post)}><img src={likedPosts[post.id] ? IsLiked : IsNotLiked} alt="like" className="isLiked"/></button>
                        {post.like_count}· 💬 {post.comment_count}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default MainFeedPost;
