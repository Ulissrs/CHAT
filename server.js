const express = require('express');

//Importar os módulos FRAMEWORKS
const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

//Rota para a página principal
app.get('/',  (req,res) => res.sendFile(__dirname + '/public/index.html'));

app.use(express.static('public'));

//Evento para quando o usuário conectar ao servidor
io.on('connection', (socket) => {
    console.log('Usuário conectado')

    //Evento para quando envia uma mensagem
    socket.on('chat message', (data) => io.emit('chat message', data));

    //Evento para quando o usuário desconectar
    socket.on('disconnect', () => console.log('Usuário desconectado'));
});

//Iniciar o servidor
http.listen(3000,() => {
    console.log(`Servidor rodando - Link http://localhost:3000`)
})
