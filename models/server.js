const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;;
        this.authPath = '/api/auth';
        this.historyPath = '/api/history';
     

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        //URL encoder
        this.app.use(express.urlencoded( { extended:false } ) )
    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth.routes'));
        this.app.use( this.historyPath, require('../routes/history.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;