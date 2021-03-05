var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", (socket) => {
    
    //console.log(socket);

    socket.on("login", () => {
        console.log(socket.id + " conectou");
    })

    socket.on("disconnect", () => {
        console.log(socket.id + " desconectou");
    })

    socket.on("msg", (data) => {
        io.emit("showmsg", data);
    })

})

app.set("view engine","ejs");

app.get("/", (req, res) => {
    res.render("chat");
})

//Não usar app.listen, o socket io exige que seja usado a lib http do node.js
http.listen(4000), () => {
    console.log("Server running");
}