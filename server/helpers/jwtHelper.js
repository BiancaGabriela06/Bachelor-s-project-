import jwt from 'jsonwebtoken'

const SECRET_KEY = "3rJ8sLpN7wQ2vT9x";  // Store this securely!

export const generateToken = (userid, useremail) => {
    return jwt.sign({ id: userid, email: useremail }, SECRET_KEY, {
        expiresIn: '1h'
    });
};
 export const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};
