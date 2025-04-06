const Input = ({type = "text", name, placeholder, value, onChange}) => {
    return(
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "100%",
                marginBottom: "10px",
            }}
        />
    );
};
export default Input;
