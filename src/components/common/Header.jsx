const Header = () => {

    const headerStyle = {
        color: "white",
        padding: "20px",
        textAlign: "center"
    };

    const h1Style = {
        fontSize: "2.5rem",
        margin: "0"
    };

    const h4Style = {
        fontSize: "0.8rem",
        margin: "18px",
        color: "#808080"
    };

    return (
        <header style={headerStyle}>
            <h1 style={h1Style}>Snapgram</h1>
            <h4 style={h4Style}>친구들의 사진 동영상을 보려면 가입하세요.</h4>
        </header>
    );
}

export default Header;
