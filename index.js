var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

let messages = [];

io.on("connection", (socket) => {

    socket.on("login", () => {
        console.log(socket.id + " conectou");
    })

    socket.on("disconnect", () => {
        console.log(socket.id + " desconectou");
    })

    //Emite mensagens antigas para todos
    socket.emit("previousMessages", messages);

    //Recebe mensagem e emite para todos
    socket.on("msg", (data) => {
        messages.push(data);
        io.emit("showmsg", data);
    })

})

app.set("view engine","ejs");
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("chat");
})

//Não usar app.listen, o socket io exige que seja usado a lib http do node.js
http.listen(4000), () => {
    console.log("Server running");
}