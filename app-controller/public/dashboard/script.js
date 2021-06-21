console.log("ready");

var socket = io.connect("10.0.0.1:2200");

socket.on('event', data => {
  switch(data){
    case 'get_name':
      socket.emit("identifier", "web_client");
      break;
    default:
      console.log("Error", "Unknown command", data);
      break;
  }
});

socket.on('web_event', data => {
  switch(data.type){
    case 'client_info':
      generateClientList(data.data);
      break;
    default:
      console.log("Error", "Unknown command", data.type);
      break;
  }
});



// generators

function generateClientList(clientData){
  let htmlStream = "";

  clientData.esp_clients.map((client) => {

    let lastSensorData = client.sensorData[client.sensorData.length - 1];

    if(client.status == "disconnected"){
      client.status = `<span class="red">${client.status}</span>`
    }

    htmlStream += `
      <tr>
        <td>${client.socketId}</td><td>${client.clientName}</td><td>${client.clientVersion}</td><td>${client.status}</td><td>${JSON.stringify(lastSensorData)}</td><td><button id="${client.socketId}" class="locate-button">Locate</button></td>
      </tr>
    `;
  });

  document.querySelector('#data').innerHTML = htmlStream;


  // action event listeners

  document.querySelectorAll('.locate-button').forEach((button) => {
    button.addEventListener("click", function (e) {

      socket.emit('web_action', {
        "type": "locate",
        "socketId": button.id
      });

    });
  });

}




