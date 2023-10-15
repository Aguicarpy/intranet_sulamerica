const { Client } = require('pg');
const { sequelize, Event} = require('../src/db'); 
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

const holidaysData = [
    {
        "start": "2023-01-01T03:00:00.000Z",
        "title": "Año Nuevo",
        },
        {
        "start": "2023-03-01T03:00:00.000Z",
        "title": "Dia de los héroes",
        },
        {
        "start": "2023-04-06T04:00:00.000Z",
        "title": "Jueves Santo",
        },
        {
        "start": "2023-04-07T04:00:00.000Z",
        "title": "Viernes Santo",
        },
        {
        "start": "2023-04-30T04:00:00.000Z",
        "title": "Día del Maestro",
        },
        {
        "start": "2023-05-01T04:00:00.000Z",
        "title": "Día del trabajador",
        },
        {
        "start": "2023-05-14T04:00:00.000Z",
        "title": "Día de la Independencia",
        },
        {
        "start": "2023-05-15T04:00:00.000Z",
        "title": "Día de la Independencia",
        },
        {
        "start": "2023-06-12T04:00:00.000Z",
        "title": "Día de la Paz del Chaco",
        },
        {
        "start": "2023-08-15T04:00:00.000Z",
        "title": "Asunción",
        },
        {
        "start": "2023-09-29T04:00:00.000Z",
        "title": "Victoria de Boquerón",
        },
        {
        "start": "2023-12-08T03:00:00.000Z",
        "title": "Virgen de Caacupé",
        },
        {
        "start": "2023-12-25T03:00:00.000Z",
        "title": "Navidad",
        },
        {
        "start": "2023-12-31T03:00:00.000Z",
        "title": "Fin del Año",
    }
]

async function seedHolidays() {
    const client = new Client(dbConfig);
  
    try {
      await client.connect();
  
      // Iterar sobre los datos y realizar inserciones
      for (const holiday of holidaysData) {
        const [newHoliday, created] = await Event.findOrCreate({
          where: { title: holiday.title, start: holiday.start },
          defaults:{
            title: holiday.title,
            start: holiday.start,
            department: 'Feriado'
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

seedHolidays();

//Ejecutar en la terminal el comando ===> node Server/seeder/holidaysCalendar_seed.js