const socket = new io.connect({ port: 8090, rememberTransport: false });

// function turnOn() {
//   socket.send('1');
//   console.log('Mensaje enviado para el socket io: 1');
// }

// function turnOff() {
//   socket.send('0');
//   console.log('Mensaje enviado para el socket io: 0');
// };

socket.on('message', function (obj) {
  console.log(obj.message);
});

socket.on('connect', function () {
  console.log('Cliente web conectado.');
});

socket.on('reconnect', function () {
  console.log('Cliente web reconectado.');
});

socket.on('disconnect', function () {
  console.log('Cliente web desconectado.');
});

// jQuery('document').ready(function(){
//   jQuery('#btnOn').click(function() { turnOn() });
//   jQuery('#btnOff').click(function() { turnOff() });
// })

let model, webcam, labelContainer, maxPredictions;

const iniciar = async () => {
  document.getElementById('comenzar').style.display = 'none';

  const modelURL = './modelo/model.json';
  const metadataURL = './modelo/metadata.json';

  document.getElementById('spinner').style.display = 'block';
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const flip = true;
  webcam = new tmImage.Webcam(400, 400, flip);

  await webcam.setup();
  await webcam.play();

  document.getElementById('spinner').style.display = 'none';
  window.requestAnimationFrame(loop);

  document.getElementById('webcam-container').appendChild(webcam.canvas);

  labelContainer = document.getElementById('label-container');

  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement('div'));
  }
};

const loop = async () => {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
};

const predict = async () => {
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const predictionRounded = prediction[i].probability.toFixed(2);

    const tag = prediction[i].className;

    labelContainer.childNodes[
      i
    ].innerHTML = `${tag} : ${predictionRounded}`;
// console.log(prediction)
    if (predictionRounded === "1.00" && tag === "Fresh Apple") {
      socket.send("Fresh-Apple");
      console.log("Fresh-Apple")
      await sleep(2000);
    }else if(predictionRounded === "1.00" && tag === "Rotten Apple"){
      socket.send("Rotten-Apple");
      console.log("Rotten-Apple")
      await sleep(2000);
    }else if(predictionRounded === "1.00" && tag === "Fresh Orange "){
      socket.send("Fresh-Orange");
      console.log("Fresh-Orange")
      await sleep(2000);
    }else if(predictionRounded === "1.00" && tag === "Rotten  Orange"){
      socket.send("Rotten-Orange");
      console.log("Rotten-Orange")
      await sleep(2000);
    }

  }
};


const sleep = (ms)=> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('comenzar').addEventListener('click', iniciar);
