import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultProfileImage from "../../assets/non-profile.svg";
import { useEffect, useState } from "react";

const MainFeedPost = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
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

                // 🔧 임시 더미 데이터 설정
                // setPosts([
                //     {
                //         id: 1,
                //         user: { id: 10, username: "mock_user1" },
                //         content: "이건 임시 게시글입니다.",
                //         image_url: DefaultProfileImage,
                //         created_at: "2024-01-01T00:00:00Z",
                //         like_count: 3,
                //         comment_count: 1
                //     },
                //     {
                //         id: 2,
                //         user: { id: 11, username: "mock_user2" },
                //         content: "이미지가 없는 임시 게시글입니다.",
                //         image_url: DefaultProfileImage,
                //         created_at: "2024-01-02T00:00:00Z",
                //         like_count: 1,
                //         comment_count: 0
                //     }
                // ]);
            }
        };

        fetchPosts();
    }, [token]);

    return (
        <div className="post-style">
            {posts.map((post) => (
                <div key={post.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                    <div className="post-nickName">
                        <p style={{color: "white"}}><strong>@{post.user.username}</strong></p>
                    </div>
                    <img src={post.image_url ? post.image_url : DefaultProfileImage} alt="post" style={{ width: "300px", height: "250px", marginTop: "20px", marginBottom: "20px"}} />
                    <p style={{color: "white"}}>{post.content}</p>
                    <p style={{color: "white"}}>❤️ {post.like_count} · 💬 {post.comment_count}</p>
                </div>
            ))}
        </div>
    );
};

export default MainFeedPost;
