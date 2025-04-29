const Header = ({ text, subText, style }) => {

    const headerStyle = {
        color: "white",
        padding: "20px",
        textAlign: "center",
        ...style
    };

    const h1Style = {
        fontSize: "2.5rem",
        margin: "0",
        ...style
    };

    const h4Style = {
        fontSize: "0.8rem",
        margin: "18px",
        color: "#808080"
    };

    return (
        <header style={headerStyle}>
            <h1 style={h1Style}>{text}</h1>
            {subText && <h4 style={h4Style}>{subText}</h4>} {/* subText가 있으면 h4를 출력 */}
        </header>
    );
};

export default Header;
