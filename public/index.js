//  ya podemos usar los sockets
const socket = io()

//  recibimos data del dservidor 
//  y se los mostramos al cliente
socket.on( 'notificacion', data => {
    console.log(data) 
} )   

//  tambien podemos enviar mensaje al servidor 
socket.emit('notificacion', 'mensaje enviado con exito')