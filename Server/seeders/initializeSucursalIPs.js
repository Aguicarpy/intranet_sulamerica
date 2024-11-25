require('dotenv').config(); // Cargar variables de entorno

const { sequelize, SucursalIP } = require('../src/db');

// Datos de las sucursales
const sucursalesIPs = [
  { localId: 1, ip_publico: '186.15.30.45' }, // Casa Central - Santa Rita
  { localId: 2, ip_publico: '200.75.50.60' }, // Sucursal Nueva Toledo
  { localId: 3, ip_publico: '192.168.1.1' },  // Sucursal Nueva Esperanza
  { localId: 4, ip_publico: '45.179.152.68' }, // Mi IP
];

const seedSucursalIPs = async () => {
  try {
    console.log('Iniciando conexión a la base de datos...');
    await sequelize.authenticate(); // Verifica conexión
    console.log('Conexión a la base de datos exitosa.');

    // Inserta las sucursales
    await SucursalIP.bulkCreate(sucursalesIPs, { validate: true });
    console.log('Sucursales IPs inicializadas correctamente.');
  } catch (error) {
    console.error('Error durante el seeder:', error);
  } finally {
    await sequelize.close(); // Cierra conexión
    console.log('Conexión cerrada.');
  }
};

// Ejecutar el seeder
seedSucursalIPs();


// Ejecutar en la terminal el comando ===> node Server/seeder/sucursalIPs_seed.js
