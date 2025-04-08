const Input = ({type = "text", name, placeholder, value, onChange, style}) => {
    return(
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
                boxSizing: "border-box", // ✅ 추가
                width: "100%",
                maxWidth: "300px",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
            }}
        />
    );
};
export default Input;
