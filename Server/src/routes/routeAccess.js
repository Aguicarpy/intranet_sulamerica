const { Router } = require('express');
const {Officer, Position, Local} = require('../db')
const authAccess = Router();
const authenticateToken = require('../helpers/authenticateToken');
const { SECRET_KEY_AUTH} = process.env
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Ruta de inicio de sesión para obtener el token
authAccess.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Officer.findOne({ where:{ email }, include: [{ model: Position }, { model: Local }] });
      if (!user) {
        return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrecta' });
      }
      
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrecta' });
      }
      const departments = user.Positions.map(position => position.id);
      const userToken = { id: user.id, email: user.email, department: departments,};
      
      const token = jwt.sign(userToken,  SECRET_KEY_AUTH);
      return res.json({ id: userToken.id, email:userToken.email, department: userToken.department, token });
    } catch (error) {
      return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  });


  // Ruta protegida para obtener los datos del usuario
  authAccess.get('/protected', authenticateToken, async (req, res) => {
    const userId = req.user.id;
  
    try {
      const user = await Officer.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      res.json({ message: 'Acceso autorizado', user: req.user });
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los datos del usuario' });
    }
  });

module.exports = authAccess;
