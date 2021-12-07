//  ya podemos usar los sockets
const socket = io()

//  recibimos data del dservidor 
//  y se los mostramos al cliente
socket.on( 'notificacion', data => {
    console.log(data) 
    $("#chat").append(data + "<br>")
} )   

$("#msn").change(emit);
$("#btn").click(emit);

function emit(){
    let now = new Date().toLocaleTimeString()
    let msn = `[${now}]` + $("#msn")[0].value
    //  tambien podemos enviar mensaje al servidor 
    socket.emit('notificacion', msn)
    $("#msn")[0].value = " ";
}