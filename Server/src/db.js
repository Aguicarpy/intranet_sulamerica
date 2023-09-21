require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/intranet_sulamerica`, {
  logging: false, 
  native: false, 
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Officer, Position, Convocation, ApplyWork} = sequelize.models;

// Aca vendrian las relaciones
Officer.belongsToMany(Position, {through: 'officer_position', timestamps: false})
Position.hasMany(Convocation, {foreignKey: 'position_id', as: 'positionAdmin'})
Convocation.belongsTo(Position, {foreignKey: 'position_id', as: 'position'})
Officer.belongsToMany(Convocation, { through: ApplyWork, foreignKey: 'officer_id' });
Convocation.belongsToMany(Officer, { through: ApplyWork, foreignKey: 'convocation_id'});
// ApplyWork.hasOne(Officer, {as: 'officer'})

Position.belongsToMany(Officer, {through: 'officer_position'})

module.exports = {
  ...sequelize.models,
  connection: sequelize,     
};
