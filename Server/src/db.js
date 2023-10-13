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
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Officer, Position, Local, Convocation, ApplyWork, Event} = sequelize.models;

// Aca vendrian las relaciones
Officer.belongsToMany(Position, {through: 'officer_position', timestamps: false})
Position.belongsToMany(Officer, {through: 'officer_position'})
Officer.belongsToMany(Local, { through: 'officer_local' }); 
Local.belongsToMany(Officer, {through:'officer_local'})

Position.hasMany(Convocation, {foreignKey: 'position_id', as: 'positionAdmin'})
Convocation.belongsTo(Position, {foreignKey: 'position_id', as: 'position'})
Local.hasMany(Convocation, {foreignKey: 'local_id', as: 'localAdmin'} )
Convocation.belongsTo(Local, {foreignKey:'local_id', as:'local'})

Position.belongsToMany(Local, { through: 'position_local' });
Local.belongsToMany(Position, { through: 'position_local' });

ApplyWork.belongsTo(Officer, { foreignKey: 'officer_id' });
ApplyWork.belongsTo(Convocation, { foreignKey: 'convocation_id' });

Officer.hasMany(Event, {foreignKey: 'officer_id'})
Event.belongsTo(Officer, {foreignKey: 'officer_id'})
Event.belongsTo(Position, { foreignKey: 'position_id'});
Position.hasMany(Event, { foreignKey: 'position_id' });

module.exports = {
  ...sequelize.models,
  connection: sequelize,     
};
