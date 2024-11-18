// Función para cambiar el contenido de una fila con información de un personaje
function cambiarTodo(row, color, numPersona) {
    let url = `https://swapi.dev/api/people/${numPersona}`; // URL de la API para obtener información del personaje

    // Realiza una solicitud GET a la API
    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    })
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(result => {
            console.log(result); // Muestra el resultado en la consola
            // Agrega un nuevo div con la información del personaje a la fila especificada
            $(row).append(
                `<div class="col-12 col-md-6 col-lg-4 a">
                    <div class="single-timeline-content d-flex wow fadeInLeft 2021" data-wow-delay="0.3s"
                        style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                        <div class="timeline-icon" style="background-color:${color}"><i class="fa fa-address-card" aria-hidden="true"></i>
                        </div>
                        <div class="timeline-text"></div>
                        <h6>${result.name}</h6>
                        <p>Estatura:  ${result.height} cm. Peso: ${result.mass} Kg.</p>
                    </div>
                </div>`
            );
        })
        .catch(error => console.error('Error:', error)); // Manejo de errores
}

// Función que se ejecuta al cargar el documento
$(function() {
    // Generador que controla la cantidad de cambios en una fila
    function* generador(row, color, queryNum) {
        cambiarTodo(row, color, queryNum); // Cambia el contenido una vez
        yield; // Pausa el generador
        cambiarTodo(row, color, queryNum); // Cambia el contenido otra vez
        yield; // Pausa el generador
        cambiarTodo(row, color, queryNum); // Cambia el contenido una vez más
        yield; // Pausa el generador
        cambiarTodo(row, color, queryNum); // Cambia el contenido otra vez
        yield; // Pausa el generador
        cambiarTodo(row, color, queryNum); // Cambia el contenido una vez más
        yield; // Pausa el generador
        return 'terminado..'; // Indica que el generador ha terminado
    }

    var i = 0; // Contador para la primera sección
    // Evento mouseenter para la sección 1-5
    $('p:contains(1 - 5)').mouseenter(() => {
        i++; // Incrementa el contador
        if (i <= 5) { // Verifica si el contador es menor o igual a 5
            var gen1 = generador('.firstRow', 'salmon', i); // Crea el generador
            gen1.next(); // Ejecuta el generador
        } else {
            console.log('no más'); // Mensaje si se alcanzó el límite
        }
    });

    var j = 6; // Inicializa el contador para la sección 6-11 en 5
    // Evento mouseenter para la sección 6-11
    $('p:contains(6 - 11)').mouseenter(() => {
        if (j < 11) { // Verifica si j es menor que 11
            j++; // Incrementa el contador
            var gen2 = generador('.secondRow', 'lightgreen', j); // Crea el generador
            gen2.next(); // Ejecuta el generador
        } else {
            console.log('no más'); // Mensaje si se alcanzó el límite
        }
    });

    var k = 12; // Inicializa el contador para la sección 12-17 en 11
    // Evento mouseenter para la sección 12-17
    $('p:contains(12 - 17)').mouseenter(() => {
        if (k < 17) { // Verifica si k es menor que 17
            k++; // Incrementa el contador
            var gen3 = generador('.thirdRow', 'lightskyblue', k); // Crea el generador
            gen3.next(); // Ejecuta el generador
        } else {
            console.log('no más'); // Mensaje si se alcanzó el límite
        }
    });
});