import "./UserFeedPage.css";
import UserFeed from "../feed/UserFeed.jsx";

const UserFeedPage = () => {
    return(
        <div className="user-feed-out-container">
            <div className= "input-container">
                <UserFeed />
            </div>
        </div>
    );
};

export default UserFeedPage;