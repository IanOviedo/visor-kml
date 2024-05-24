// Inicializar el mapa
var map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Función para cargar y mostrar el archivo KML
function loadKmlFile(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var kmlText = event.target.result;
        var kmlLayer = omnivore.kml.parse(kmlText);
        kmlLayer.addTo(map);
        map.fitBounds(kmlLayer.getBounds());
    };
    reader.readAsText(file);
}

// Manejar la carga del archivo cuando se selecciona desde el botón
document.getElementById('upload-button').addEventListener('click', function() {
    document.getElementById('file-input').click();
});

// Manejar el evento de cambio de archivo
document.getElementById('file-input').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (file && file.name.endsWith('.kml')) {
        loadKmlFile(file);
    } else {
        alert('Por favor, selecciona un archivo KML válido.');
    }
});
