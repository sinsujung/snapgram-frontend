import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultProfileImage from "../../assets/non-profile.svg";
import IsLiked from "../../assets/liked.svg";
import IsNotLiked from "../../assets/unliked.svg";
import { useEffect, useState } from "react";
import CommentPopup from "./CommentPopup.jsx";
import LikeListPopup from "./LikeListPopup.jsx";

const MainFeedPost = () => {
    const [userData, setUserData ] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const loggedInUserId = localStorage.getItem("userId");

    const [selectedPostId, setSelectedPostId] = useState(null);
    const [popupType, setPopupType] = useState(null); // "comment" | "like" | null


    const handleCommentPopup = (post) => {
    setSelectedPostId(post.id);
    setPopupType("comment");
    };

    const handleLikeListPopup = (post) => {
    setSelectedPostId(post.id);
    setPopupType("like");
    };

    const handleClosePopup = () => {
    setSelectedPostId(null);
    setPopupType(null);
    };
    // 좋아요 갯수 상태
    // const [isLikedCount, setIsLikedCount] = useState(false);

    // 좋아요 상태
    // const [likedPosts, setLikedPosts] = useState({
    //     is_like: false,
    // });

    const handleNickNameClick = (posts) => {
        navigate(`/user-feed/${posts.user.id}`);
    };

    // real test
    const likeClickHandler = async(posts) => {
        const post_id = posts.id;
        const isCurrentlyLiked = posts.is_like;

        // if(!userData) return;

        try {
            if (isCurrentlyLiked) {
                // 좋아요 취소
                const response = await axios.post(`http://192.168.0.7:8080/api/like`,
                    {post_id: post_id},
                    {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
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

                } else {
                    alert("cancel liked failed!");
                }
            } else {
                // 좋아요
                console.log(post_id);
                const response = await axios.post(
                   `http://192.168.0.7:8080/api/like`,{
                    post_id: post_id},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
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
                } else {
                    alert("complete liked failed!");
                }
            }
        } catch (error) {
            console.error("좋아요 실패", error);
            alert("좋아요 실패!");
        }
    };
        // real test
        // 192.168.0.18:8080
    useEffect(() => {    
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://192.168.0.7:8080/api/post", {
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
        <>
            <div className="post-style">
                {posts.map((post) => (
                    <div key={post.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                        <div className="post-nickName">
                            <p
                                style={{ color: "white", cursor: "pointer" }}
                                onClick={() => handleNickNameClick(post)}
                            >
                                <strong>@{post.user.username}</strong>
                            </p>
                        </div>

                        <img
                            src={post.image_url ? post.image_url : DefaultProfileImage}
                            alt="post"
                            style={{
                                width: "300px",
                                height: "250px",
                                marginTop: "20px",
                                marginBottom: "20px"
                            }}
                        />

                        <p style={{ color: "white" }}>{post.content}</p>

                        <div style={{ color: "white", display: "flex"}}>
                            <div onClick={() => likeClickHandler(post)} style={{ cursor: "pointer" }}>
                                <img
                                    src={post.is_like ? IsLiked : IsNotLiked}
                                    alt="like"
                                    className="isLiked"
                                />
                                {post.like_count}
                            </div>
                            <div style={{ cursor: "pointer" ,  marginLeft: "8px"}} onClick={() => handleLikeListPopup(post)}>
                                좋아요 목록 보기
                            </div>
                            <div>
                                <p style={{ cursor: "pointer" }} onClick={() => handleCommentPopup(post)}>
                                    💬 {post.comment_count} 댓글보기
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {popupType === "comment" && selectedPostId && (
                <CommentPopup post_id={selectedPostId}
                    onClose={handleClosePopup}/>
            )}

            {popupType === "like" && selectedPostId && (
                <LikeListPopup post_id={selectedPostId}
                    onClose={handleClosePopup}/>
            )}
        </>
    );

};

export default MainFeedPost;
