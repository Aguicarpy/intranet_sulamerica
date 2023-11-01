const httpServer = require('./src/handlers/handlerChat');
const { connection } = require('./src/db.js');
const port = process.env.PORT || 3015

// Syncing all the models at once.
connection.sync({ force: false }).then(() => {
  httpServer.listen(port, () => {
      console.log(`Escuchando en el puerto ${port}`); // eslint-disable-line no-console
    });
  });