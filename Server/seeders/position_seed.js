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

const positionsData = [
    {
        "department":"Área Gerencial",
        "position":"Gerente de Recursos Humanos",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Gerencial",
        "position":"Gerente de Ventas",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Gerencial",
        "position":"Gerente de Marketing",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Administrativa",
        "position":"Asistente Administrativo",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Administrativa",
        "position":"Analista de Finanzas",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Administrativa",
        "position":"Especialista en Compras",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Administrativa",
        "position":"Coordinador de Logística",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Administrativa",
        "position":"Contador",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Administrativa",
        "position":"Analista de Proyectos",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Técnica",
        "position":"Encargado de Silos",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Técnica",
        "position":"Operador de Maquinaria Agrícola",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Técnica",
        "position":"Técnico en Almacenamiento de Granos",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Técnica",
        "position":"Supervisor de Almacén",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Técnica",
        "position":"Técnico en Mantenimiento de Silos",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Técnica",
        "position":"Ingeniero de Automatización",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Técnica",
        "position":"Operador de Secadoras de Granos",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Técnica",
        "position":"Inspector de Calidad de Granos",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Técnica",
        "position":"Técnico en Procesamiento de Granos",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Técnica",
        "position":"Gerente de Almacenamiento",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
    {
        "department":"Área Técnica",
        "position":"Técnico Electromecánico",
        "salary":3500000.00,
        "shedule":"06:30:00",
        "locals":["Casa Central - Santa Rita", "Sucursal Nueva Toledo","Sucursal Nueva Esperanza",
        "Sucursal / Silo Naranjal", "Sucursal Obligado","Sucursal / Silo San Pedro",
        "Sucursal / Silo Carlos Antonio López","Sucursal / Silo DAPSA","Sucursal Juán Eulógio Estigarribia"]
    },
]

async function seedPositions() {
    const client = new Client(dbConfig);
  
    try {
      await client.connect();
  
      // Iterar sobre los datos y realizar inserciones
      for (const position of positionsData) {
        const [newPosition, created] = await Position.findOrCreate({
          where: { department: position.department, position: position.position },
          defaults:{
            department: position.department,
            position: position.position,
            salary: position.salary,
            shedule: position.shedule,
            // locals: position.locals
          }
        });
        for (const localName of localsData) {
            let localInstance = await Local.findOne({
              where: { local: localName.local },
            });
            if(localInstance){
                await newPosition.addLocal(localInstance)
            }
        }

    }
    console.log('Seeding completado exitosamente.');
    } catch (error) {
      console.error('Error durante el seeder:', error);
    } finally {
      await client.end();
    }
  }

  seedPositions();

//Ejecutar en la terminal el comando ===> node Server/seeder/position_seed.js