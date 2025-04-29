const Button = ({text, onClick, style}) => {
    return (
        <button
            onClick={onClick}
            style={{
                boxSizing: "border-box",
                width: "100%",
                maxWidth: "200px",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#3897f0",
                color: "white",
                cursor: "pointer",
                ...style
            }}
        >
            {text}
        </button>
    );
};

export default Button;
