import { jwtDecode } from 'jwt-decode';
// var jwt = require("jsonwebtoken");

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.user_id
  } catch (error) {
    console.error("Erro ao decodificar o token:", error.message);
    return null;
  }
};

export default getUserIdFromToken;