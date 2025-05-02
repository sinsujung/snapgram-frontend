import "./MainFeedPage.css";
import {useNavigate} from "react-router-dom";
import MainFeed from "../feed/MainFeed.jsx";

const MainFeedPage = () => {
    const navigate = useNavigate();


    return (
        <div className="main-feed-page">
            <MainFeed />
        </div>
    );

}

export default MainFeedPage;