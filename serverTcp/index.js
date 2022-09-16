const net = require("net");
const tcpServer = net.createServer((sock) => {
  listArduinos.length = 0;

  console.log(`${sock.remoteAddress}:${sock.remotePort} Conectado`);

  sock.on("close", function () {
    console.log(`${sock.remoteAddress}:${sock.remotePort} Se ha desconectado`);
  });

  sock.on("error", function (error) {
    console.error(
      `${sock.remoteAddress}:${sock.remotePort} Error de conexion ${error}`
    );
  });
});

// Arduino conecta a un socket.
tcpServer.on("connection", function (socket) {
  // Avisa a nodejs, que un arduino está conectado.
  tcpServer.getConnections(function (err, cantidad) {
    console.log(`Total de arduinos conectados: ${cantidad}`);
  });

  // Advierte a Arduino, que se ha conectado.
  socket.write("Arduino - Conectado a un socket.\r\n");

  // Agregue Arduino a la lista de Arduinos.
  listArduinos.push(socket);

  // Mensaje que recibe datos del arduino.
  socket.on("data", function (data) {
    console.log(`Dato recibido del Arduino: ${data.toString()}`);
  });
});

// Creacion del servidor socket
tcpServer.listen(1337, function () {
  console.log("Socket está en el puerto: 1337.");
});
