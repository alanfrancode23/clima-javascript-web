//Declaracion de variables de la URL, La api key y la conversion de Kelvin a Celsius
let urlBase = 'https://api.openweathermap.org/data/2.5/weather';
//Agrega tu api key 
let api_key = '';
let difKelvin = 273.15;

//Manipulacion del DOM para obtener la ciudad ingresada
document.getElementById('botonBusqueda').addEventListener('click', () => {
  const ciudad = document.getElementById('ciudadEntrada').value;

  if (ciudad) {
    fetchDatosClima(ciudad);
  }
});

//Llamada a la API 
function fetchDatosClima(ciudad) {
  fetch(`${urlBase}?q=${ciudad}&appid=${api_key}&lang=es`)
    .then((response) => response.json())
    .then((data) => mostrarDatosClima(data));
}

//Mostrar los datos del clima e ingresarlos al div principal con el método appendChild.
function mostrarDatosClima(data) {
  const divDatosClima = document.getElementById('datosClima');
  divDatosClima.innerHTML = '';

  //Acceder a las propiedades de la API 
  const ciudadNombre = data.name;
  const paisNombre = data.sys.country;
  const temperatura = data.main.temp;
  const humedad = data.main.humidity;
  const icono = data.weather[0].icon
  const descripcion = data.weather[0].description;

  // Convertir la primera letra de la descripción en mayúscula
  const descripcionCapitalizada = descripcion.charAt(0).toUpperCase() + descripcion.slice(1);

  //Crear elementos para mostrarlos por pantalla
  const ciudadTitulo = document.createElement('h2');
  ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`;

  const temperaturaInfo = document.createElement('p');
  temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura - difKelvin)}°C`;

  const humedadInfo = document.createElement('p');
  humedadInfo.textContent = `La Humedad es: ${humedad}%`;

  const iconoInfo = document.createElement('img')
  iconoInfo.src= `https://openweathermap.org/img/wn/${icono}@2x.png`

  const descripcionInfo = document.createElement('p');
  descripcionInfo.textContent = `La descripción es: ${descripcionCapitalizada}`;

  //Insertar los elementos creados al div creado en HTML
  divDatosClima.appendChild(ciudadTitulo);
  divDatosClima.appendChild(temperaturaInfo);
  divDatosClima.appendChild(humedadInfo);
  divDatosClima.appendChild(iconoInfo);
  divDatosClima.appendChild(descripcionInfo);
}
