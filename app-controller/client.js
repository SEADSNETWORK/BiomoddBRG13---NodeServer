class Client{

  #socket
  #socketManager

  constructor(socketManager, socket, data, status = "connected") {
    this.#socketManager = socketManager;
    this.#socket = socket;
    this.socketId = socket.id;
    this.clientName = data.espId;
    this.clientVersion = data.version
    this.status = status;
    this.sensorData = [];

    this.#socketListeners(socket);
  };

  #socketListeners(socket){

    // actions van de webclient
    socket.on('web_action', (data) => {
      switch(data.type){
        case 'locate':
          this.#socketManager.getConnected()[data.socketId].emit('event', 'locate');
          break;
        default:
          console.log("error: unknown command", data.type);
          break;
      }
    });

    // actions van de ESP
    socket.on('sensor_data', (data) => {
      console.log(this.clientName, data);
      this.sensorData.push(data);
      this.#socketManager.sendClientInfo();
    });

    // disconnected
    socket.on('disconnect', () => {
      console.log(socket.id, 'client has disconnected.');
      this.status = "disconnected";
    });
  }

  emit(protocol, data){
    return this.#socket.emit(protocol, data);
  }

}

module.exports = Client;