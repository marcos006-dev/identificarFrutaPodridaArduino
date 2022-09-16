const express = require("express");
const cors = require("cors");
const socket = require("socket.io");

const app = express();
const http = require("http").Server(app);
const io = socket.listen(http);
app.set("port", process.env.PORT || 8090);
app.use(cors());
app.use(express.urlencoded());

app.use(express.json());
app.use(express.static("public"));

// Cliente web se conecta a un socket.
io.on("connection", function (client) {
  // Avisa a los clientes web, que ahi  un nuevo cliente web conectado.
  client.broadcast.send({ message: client.id + " conectado." });

  // Evento de recibimiento de un mensaje de un cliente web con un socket.
  client.on("message", function (message) {
    // Avisa a los clientes web, que ahi un nuevo mensaje enviado.
    client.broadcast.send({ message: [client.id, message] });

    // for (a in listArduinos) {
    //   listArduinos[a].write(message);
    // }
    // console.log()

    if(message === "Fresh-Apple"){

    }else if(message === "Rotten-Apple"){

    }
  });

  client.on("disconnect", function () {
    // Avisa a los clientes web, que un cliente web está desconectado.
    client.broadcast.send({ message: client.id + " desconectado." });
  });
});
// Creacion del servido web
http.listen(app.get("port"), function () {
  console.log("NodeJS está corriendo en el puerto: " + app.get("port") + ".");
});
