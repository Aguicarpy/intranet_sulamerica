const server = require('./src/app.js');
const { conection } = require('./src/db.js');
const port = process.env.PORT || 3015

// Syncing all the models at once.
conection.sync({ force: false }).then(() => {
    server.listen(port, () => {
      console.log(`Escuchando en el puerto ${port}`); // eslint-disable-line no-console
    });
  });