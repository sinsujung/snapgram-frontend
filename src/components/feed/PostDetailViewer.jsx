import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultProfileImage from "../../assets/non-profile.svg";
import IsLiked from "../../assets/liked.svg";
import IsNotLiked from "../../assets/unliked.svg";
import CommentPopup from "./CommentPopup.jsx";
import LikeListPopup from "./LikeListPopup.jsx";

import "./PostDetailViewer.css";

const PostDetailViewer = ({ posts, initialPostId, onClose }) => {
    const [localPosts, setLocalPosts] = useState(posts);
    const [selectedPostId, setSelectedPostId] = useState(initialPostId);
    const token = localStorage.getItem("token");
    const userId = Number(localStorage.getItem("userId"));
    const navigate = useNavigate();
    const [popupType, setPopupType] = useState(null);

    const handleNickNameClick = (post) => {
        navigate(`/user-feed/${post.user.id}`);
    };

    const likeClickHandler = async (post) => {
        const post_id = post.id;
        const isCurrentlyLiked = post.is_like;

        try {
            const response = await axios.post(
                `http://192.168.0.7:8080/api/like`,
                { post_id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.code === 0) {
                setLocalPosts((prev) =>
                    prev.map((p) =>
                        p.id === post_id
                            ? { ...p, is_like: !isCurrentlyLiked, like_count: isCurrentlyLiked ? p.like_count - 1 : p.like_count + 1 }
                            : p
                    )
                );
            } else {
                alert("좋아요 처리 실패");
            }
        } catch (error) {
            console.error("좋아요 실패", error);
        }
    };

    const handleDeletePost = async (post_id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            const response = await axios.delete(`http://192.168.0.7:8080/api/post/${post_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.data.code === 0) {
                setLocalPosts((prev) => prev.filter((p) => p.id !== post_id));
            } else {
                alert("삭제 실패: " + response.data.message);
            }
        } catch (error) {
            console.error("삭제 실패", error);
            alert("삭제 중 오류 발생");
        }
    };

    const handleCommentPopup = (post) => {
        setSelectedPostId(post.id);
        setPopupType("comment");
    };

    const handleLikeListPopup = (post) => {
        setSelectedPostId(post.id);
        setPopupType("like");
    };

    const handleClosePopup = () => {
        setPopupType(null);
    };

    return (
         <>
            <div className="post-style">
                {localPosts.map((post) => (
                    <div key={post.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                        <div className="post-nickName" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <p style={{ color: "white", cursor: "pointer" }} onClick={() => handleNickNameClick(post)}>
                                <strong>@{post.user.username}</strong>
                            </p>
                            {post.user.id === userId && (
                                <div style={{ color: "red", cursor: "pointer" }} onClick={() => handleDeletePost(post.id)}>
                                    삭제
                                </div>
                            )}
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

                        <div style={{ color: "white", display: "flex", alignItems: "center", gap: "10px" }}>
                            <div onClick={() => likeClickHandler(post)} style={{ cursor: "pointer" }}>
                                <img
                                    src={post.is_like ? IsLiked : IsNotLiked}
                                    alt="like"
                                    className="isLiked"
                                />
                                {post.like_count}
                            </div>
                            <div style={{ cursor: "pointer" }} onClick={() => handleLikeListPopup(post)}>
                                좋아요 목록 보기
                            </div>
                        </div>

                        <div>
                            <p style={{ cursor: "pointer" }} onClick={() => handleCommentPopup(post)}>
                                💬 {post.comment_count} 댓글보기
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {popupType === "comment" && selectedPostId && (
                <CommentPopup post_id={selectedPostId} onClose={handleClosePopup} />
            )}

            {popupType === "like" && selectedPostId && (
                <LikeListPopup post_id={selectedPostId} onClose={handleClosePopup} />
            )}
        </>
    );
};

export default PostDetailViewer;