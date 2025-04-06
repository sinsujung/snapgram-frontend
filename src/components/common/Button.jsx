const Button = ({text, onClick, style}) => {
    return (
        <button
            onClick={onClick}
            style={{
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                backgroundColor: "#007bff",
                color: "white",
                fontWeight: "bold",
                width: "100%",
                margin: "10px auto",
                textAlign: "center"
            }}
        >
            {text}
        </button>
    );
};

export default Button;
