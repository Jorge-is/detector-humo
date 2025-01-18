const humo = document.getElementById("humo");
const detector = document.querySelector(".detector");
const estado = document.getElementById("estado");
const alertaMensaje = document.getElementById("mensaje-alerta");
const distanciaTexto = document.getElementById("distancia-texto");
const lineaSVG = document.getElementById("linea-distancia");

//Posición del humo por defecto
humo.style.left = "70%";
humo.style.top = "30%";

//Drag and Drop del humo
humo.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", null); //Para habilitar el arrastre
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();

  //Obtener la posición del contenedor
  const contenedor = document.querySelector(".contenedor").getBoundingClientRect();
  
  //Calculo de las coordenadas relativas del humo
  const x = e.clientX - contenedor.left;
  const y = e.clientY - contenedor.top;

  //Actualizar la posición del humo
  humo.style.left = `${x - humo.offsetWidth / 2}px`;
  humo.style.top = `${y - humo.offsetHeight / 2}px`;

  actualizarEstado();
});

//Actualizar el estado y calcular la distancia
function actualizarEstado() {
  const contenedorRect = document.querySelector(".contenedor").getBoundingClientRect();  

  //Obtener las posiciones centrales relativas al contenedor
  const detectorRect = detector.getBoundingClientRect();
  const humoRect = humo.getBoundingClientRect();
  
  //Coordenadas centrales del detector
  const detectorX = detectorRect.left + detectorRect.width / 2 - contenedorRect.left;
  const detectorY = detectorRect.top + detectorRect.height / 2 - contenedorRect.top;
  
  //Coordenadas centrales del humo  
  const humoX = humoRect.left + humoRect.width / 2 - contenedorRect.left;
  const humoY = humoRect.top + humoRect.height / 2 - contenedorRect.top;
  
  //Calculo de la distancia entre el detector y el humo
  const distancia = Math.sqrt(
    Math.pow(humoX - detectorX, 2) + Math.pow(humoY - detectorY, 2)
  );

  //Actualizar el texto de la distancia
  distanciaTexto.textContent = `Distancia: ${Math.round(distancia)}px`;

  //Dibujar la linea discontinua
  lineaSVG.innerHTML = `
    <line 
      x1="${detectorX}" 
      y1="${detectorY}" 
      x2="${humoX}" 
      y2="${humoY}" 
      stroke="black" 
      stroke-width="2" 
      stroke-dasharray="5,5" 
    />
  `;
  
  //Cambiar estado
  if (distancia > 320) {
    estado.textContent = "Seguro";
    estado.className = "estado normal";
    alertaMensaje.style.display = "none";
  } else if (distancia > 150) {
    estado.textContent = "Cuidado";
    estado.className = "estado advertencia";
    alertaMensaje.style.display = "none";
  } else {
    estado.textContent = "Peligro";
    estado.className = "estado alerta";
    alertaMensaje.style.display = "block";
  }
}