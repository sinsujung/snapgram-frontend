import { useEffect, useState } from "react";
import axios from "axios";
import "./CommentPopup.css";

const CommentPopup = ({ post_id, onClose }) => {
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState("");
    const token = localStorage.getItem("token");

    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://192.168.0.11:8080/api/post/comment/${post_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (res.data.code === 0) {
                setComments(res.data.comments.content);
            }
        } catch (error) {
            console.error("댓글 불러오기 실패:", error);
        }
    };

    const handleSubmit = async () => {
        console.log("token:", token);
        console.log("입력 내용:", input);

        try {
            const res = await axios.post(
                `http://192.168.0.11:8080/api/comment/${post_id}`,
                { content: input },
                { headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
            if (res.data.code === 0) {
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
                `http://192.168.0.11:8080/api/comment/${comment_id}`,
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
                <button onClick={onClose}>x</button>
                <ul>
                    {comments.map((c) => (
                        <li key={c.id}>
                            <strong>{c.user.username}</strong>: {c.content}
                            <button onClick={() => handleDelete(c.id)}>삭제</button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="댓글 작성"
                />
                <button onClick={handleSubmit}>등록</button>
            </div>
        </div>
    );
};

export default CommentPopup;
