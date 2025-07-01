import "./BoardWritePage.css";
import BoardWrite from "../board/BoardWrite.jsx";

const BoardWritePage = () => {
    return(
        <div className ="board-write-out-container">
            <div className = "input-container">
                <BoardWrite/>
            </div>
        </div>
    );
};

export default BoardWritePage;