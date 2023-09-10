const crypto = require('crypto');

// Genera una clave secreta aleatoria
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Secret Key:', secretKey);