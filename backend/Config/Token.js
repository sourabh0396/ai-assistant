import jwt from 'jsonwebtoken';
const getToken = async (userId) => {
    try {
        const Token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return Token

    } catch (error) {
        console.error(error);

    }
}
export default getToken;