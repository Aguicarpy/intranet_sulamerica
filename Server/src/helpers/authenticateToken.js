const jwt = require('jsonwebtoken');
const { SECRET_KEY_AUTH } = process.env

const authenticateToken = (req, res, next) => {
    const authorization = req.get('authorization') //accede a la autorización
    let token = '';
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.split(' ')[1]
    }
    let decodedToken = {}
    if(!token && !decodedToken.id){
        return res.status(401).json({error: 'token inválido'})
      }
  try {
    decodedToken = jwt.verify(token, SECRET_KEY_AUTH)
    req.user = decodedToken; // Almacena los datos del usuario decodificados en req.user
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token de autorización inválido' });
  }
};

module.exports = authenticateToken;