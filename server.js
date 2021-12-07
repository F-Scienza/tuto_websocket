const express = require('express')
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//  indicamos el uso de archivos estaticos de public
app.use(express.static('./public'))
//  Cargamos el html en la raiz 
app.get('/', (req, res)=>{
    res.sendFile('index.html', {root: __dirname})
})

//  http server escuchando puerto 3000
httpServer.listen(process.env.PORT || 3000, ()=> console.log('server ON'))

// Esto se ejecuta solo la primera vez 
// que se abre una nueva conexión

io.on('connection', (socket)=>{
    console.log('---------------------')
    console.log('usuario conectado')
    //  .emit recibe dos parametros
    //  nombre del evento y informacion a transmitir
    socket.emit('notificacion', 'primer mensaje desde el servidor')
    socket.on("notificacion", data=>{
        console.log(data)
        io.sockets.emit("notificacion", data)
    })
})


//  envio de datos a todos los us conectados
/*
io.on('conection', (socket)=>{
    console.log('nuevo usuario conectado')
    //  envio los mensajes al cliente que se conectó
    socket.emit('mensaje', mensajes)

    //  escucho los mensajes enviados por el cliente 
    //  y se los mando a todos
    socket.on('mensaje', data => {
        mensajes.push({ socketid: socket.id, mensaje: data })
        // enviamos un mensaje global a todos los conectados
        io.sockets.emit('mensajes', mensajes )
    })
})*/