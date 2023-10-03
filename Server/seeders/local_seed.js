const { Client } = require('pg');
const { sequelize, Officer, Position, Local } = require('../src/db'); 
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

// Configuración de la conexión a la base de datos
const dbConfig = { /*USARÁN SUS VARIABLES CON LAS QUE SE CONECTAN A SU DB*/
  user: DB_USER, 
  host: DB_HOST,  
  database: 'intranet_sulamerica',
  password: DB_PASSWORD, 
  port: 5432         // Puerto por defecto de PostgreSQL
};

const localsData = [
    {
        "local": "Casa Central - Santa Rita"
      },
      {
        "local": "Sucursal Nueva Toledo"
      },
      {
        "local": "Sucursal Nueva Esperanza"
      },
      {
        "local": "Sucursal / Silo Naranjal"
      },
      {
        "local": "Sucursal Obligado"
      },
      {
        "local": "Sucursal / Silo San Pedro"
      },
      {
        "local": "Sucursal / Silo Carlos Antonio López"
      },
      {
        "local": "Sucursal / Silo DAPSA"
      },
      {
        "local": "Sucursal Juán Eulógio Estigarribia"
      }
]

async function seedLocals() {
    const client = new Client(dbConfig);
  
    try {
      await client.connect();
  
      // Iterar sobre los datos y realizar inserciones
      for (const localName of localsData) {
        const [newLocal, created] = await Local.findOrCreate({
          where: { local: localName.local },
          defaults:{
            local: localName.local
          }
        });
      }
  
      console.log('Seeding completado exitosamente.');
    } catch (error) {
      console.error('Error durante el seeder:', error);
    } finally {
      await client.end();
    }
  }

seedLocals();

//Ejecutar en la terminal el comando ===> node Server/seeder/local_seed.js