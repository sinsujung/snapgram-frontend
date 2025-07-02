import "./MainFeedPage.css";
import {useNavigate} from "react-router-dom";
import MainFeedSearch from "../feed/MainFeedSearch.jsx";
import MainFeedPost from "../feed/MainFeedPost.jsx";
import Header from "../common/Header.jsx";

const MainFeedPage = () => {
    const navigate = useNavigate();


    return (
        <div className="main-feed-page">
            <MainFeedSearch />
            <MainFeedPost />
        </div>
    );

}

export default MainFeedPage;