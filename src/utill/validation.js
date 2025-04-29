export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const isValidPassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*()\-_=+[\]{};':"\\|,.<>/?]).{9,}$/;
    return regex.test(password);
};

export const isValidNickName = (nickname) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(nickname);
};

export const isValidPhone = (phone) => {
    const fullPhone = `${phone.first}${phone.middle}${phone.last}`;

    const isValidPrefix = ["010", "011", "016", "017", "018", "019"].includes(phone.first);

    const isValidLength = /^\d{10,11}$/.test(fullPhone);

    return isValidPrefix && isValidLength;
};