import { useState, useEffect } from "react";
import axios from "axios";
import "./LikeListPopup.css";
const LikeListPopup = ({ post_id, onClose }) => {
    const [likes, setLikes] = useState([]);
    const token = localStorage.getItem("token");
    const fetchLikes = async () => {
        try {
            const res = await axios.get(`http://192.168.0.7:8080/api/post/like/${post_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }

            });
                if (res.data.code === 0) {
                    setLikes(res.data.data.likes);

                }
        } catch (error) {
            console.error("좋아요 목록 불러오기 실패:", error);
        }
    };

    useEffect(() => {
        fetchLikes();
    }, [post_id]);

    return (
        <div  className="popup-overlay">
            <div className="popup-likeLists">
            <button className="close-btn" onClick={onClose}>x</button>
            <ul>
                 {likes.map((l) => (
                        <li className="likeLists-item">
                            <div className="likeLists-left">
                                <strong>{l.username}</strong>
                            </div>
                        </li>
                    ))}
            </ul>
            </div>
        </div>
    );
};

export default LikeListPopup;
