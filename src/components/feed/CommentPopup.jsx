import { useEffect, useState } from "react";
import axios from "axios";
import "./CommentPopup.css";

const CommentPopup = ({ post_id, onClose }) => {
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState("");
    const token = localStorage.getItem("token");
    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://192.168.0.18:8080/api/comment/${post_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }

            });
            if (res.data.code === 0) {
                setComments(res.data.data.comments);

            }
        } catch (error) {
            console.error("댓글 불러오기 실패:", error);
        }
    };

    const handleSubmit = async () => {
        // const userId = localStorage.getItem("userId");
        console.log(post_id, input)
        const requestData = {
            post_id: post_id,
            content: input
        }

        try {
            const response = await axios.post(
                `http://192.168.0.18:8080/api/comment/${post_id}`, requestData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

            console.log("댓글등록");

            const { code } = response.data;
            if (code === 0) {
                setInput("");         // 입력창 비우기
                fetchComments();      // 댓글 다시 불러오기
            }
        } catch (error) {
            console.error("댓글 등록 실패:", error);
        }
    };


    const handleDelete = async (comment_id) => {
        try {
            const res = await axios.delete(
                `http://192.168.0.18:8080/api/comment/${comment_id}`,
                { headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
            if (res.data.code === 0) {
                fetchComments(); // 삭제 후 다시 불러오기
            }
        } catch (error) {
            console.error("댓글 삭제 실패:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [post_id]);

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={onClose}>x</button>
                <ul>
                    {comments.map((c) => (
                        <li className="comment-item">
                            <div className="comment-left">
                                <strong>{c.user.username}</strong>: {c.content}
                            </div>
                            <button className="delete-btn" onClick={() => handleDelete(c.id)}>삭제</button>
                        </li>
                    ))}
                </ul>

                <div className="comment-input-wrapper">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="댓글을 입력하세요"
                    />
                    <button onClick={handleSubmit}>등록</button>
                </div>
            </div>
        </div>
    );
};

export default CommentPopup;
