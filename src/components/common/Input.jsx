const Input = ({type = "text", name, placeholder, value, onChange, maxLength, style}) => {
    return(
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            style={{
                boxSizing: "border-box",
                width: "100%",
                maxWidth: "300px",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                ...style
            }}
        />
    );
};
export default Input;
