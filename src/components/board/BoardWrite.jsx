import Input from "../common/Input";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import "../pages/BoardWritePage.css";
import PlusImage from "../../assets/plus-image.svg";
import UploadBoard from "../../assets/upload.svg";
import { useState, useRef } from "react";
import axios from "axios";

const BoardWrite = () => {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [content, setContent] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        const img = e.target.files[0];
        console.log(img);
        if(!img) return;
        setImageFile(img);

        const previewUrl = URL.createObjectURL(img);
        setPreview(previewUrl);
    };

    const getImageURL = async() => {
        console.log("사진이름" + imageFile);

        const formData = new FormData();
        formData.append("file", imageFile); // 실제 이미지 파일
        formData.append("upload_preset", "snapgram");

        let secure_url = "";
        try {
            const response= await axios.post("https://api.cloudinary.com/v1_1/dppmwsvyg/image/upload", formData);
            return response.data.secure_url;
        } catch(error) {
            console.log(error);
            return null;
        }
    }
    const handleUpload = async () => {
        console.log("content : " + content);

        const url = await getImageURL();

        console.log("image_url : " + url);
        const requestData = {
            content: content,
            image_url: url,
        };

        console.log("2");
        // formData.append("content", content);
        // if (imageFile) {
        //     formData.append("image_url", imageFile.name);
        // }
        // console.log(formData);

        // 192.168.0.18:8080
        try {
            console.log("3")
            const response = await axios.post("http://192.168.0.18:8080/api/post", requestData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            console.log("게시물 작성");
            
            const { code, message } = response.data;

            console.log("code : " + code);
            if (code === 0) {
                alert("게시글 업로드 완료!");
                navigate("/main-feed");
            } else {
                handleError(code, message);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                const { code, message } = error.response.data;
                handleError(code, message);
            } else {
                alert("서버가 응답하지 않습니다.");
            }
        }
    }


    const handleError = (code, message) => {
        alert(message || "알 수 없는 오류가 발생했습니다.");
    };
    
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    }

    return (
        <div className ="input-tag-outline">
            <div className="input-tag">
                {preview && <img src={preview} alt="미리보기" width="200" />}
                <div onClick={triggerFileSelect} style={{cursor: "pointer"}}>
                    <img src={PlusImage} alt='이미지 추가하기' id='input-image'/>
                </div>

                <input type="file" 
                    accept='image/*'
                    style={{display: "none"}}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <Input placeholder={"게시글 입력란"} value={content} onChange={(e) => setContent(e.target.value)}/>
                    <Button style={{width: "50px"}} onClick={handleUpload}>
                        <img src={UploadBoard} alt="업로드 아이콘"/>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BoardWrite;

