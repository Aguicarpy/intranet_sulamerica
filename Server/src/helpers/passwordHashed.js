const bcrypt = require('bcrypt');

const saltRounds = 10;

//Función para hashear la contraseña
const hashPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(saltRounds);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	} catch (error) {
		throw new Error('Error al hashear la contraseña');
	}
};

//Función que verifica la contraseña para los login
const comparePassword = async (password, hashedPassword) => {
	try {
		const match = await bcrypt.compare(password, hashedPassword);
		return match;
	} catch (error) {
		throw new Error('Error al verificar la contraseña');
	}
};

module.exports = {
	hashPassword,
	comparePassword,
}