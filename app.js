// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

//array para almacenar los amigos
let amigos = [];
// Array para llevar registro de los amigos ya sorteados
let amigosSorteados = [];

function agregarAmigo() {
    // Obtener el valor del input y agregarlo al array de amigos
    let amigo = document.querySelector("#amigo").value;
    // Validar que el campo no esté vacío
    if (amigo == ''){
        alert("Por favor, inserte un nombre")
    }else{
        amigos.push(amigo);
        document.querySelector("#amigo").value = "";
    }
    // Actualizar la lista de amigos
    mostrarAmigos();
}

function mostrarAmigos() {
    // Seleccionar el elemento de la lista y limpiar su contenido
    let lista = document.querySelector("#listaAmigos");
    // Limpiar la lista antes de mostrar los amigos
    lista.innerHTML = "";
    
    // Filtrar amigos que NO han sido sorteados
    let amigosDisponibles = amigos.filter(amigo => !amigosSorteados.includes(amigo));
    
    // Verificar si hay amigos disponibles en el array
    if (amigos.length === 0) {
        lista.innerHTML = "<li>No hay amigos agregados.</li>";
    } else if (amigosDisponibles.length === 0) {
        lista.innerHTML = "<li>Todos los amigos fueron sorteados.</li>";
    } else {
        // Recorrer solo los amigos disponibles y crear un elemento <li> para cada uno
        amigosDisponibles.forEach(function(amigo) {
            // Crear un nuevo elemento <li> y establecer su contenido
            let li = document.createElement("li");
            // Establecer el texto del elemento <li> como el nombre del amigo
            li.textContent = amigo;
            // Agregar el elemento <li> a la lista
            lista.appendChild(li);
        });
        
        // Mostrar también los amigos ya sorteados con estilo diferente
        if (amigosSorteados.length > 0) {
            let tituloSorteados = document.createElement("li");
            tituloSorteados.innerHTML = "<br><strong>✅ Ya sorteados:</strong>";
            tituloSorteados.style.color = "#666";
            lista.appendChild(tituloSorteados);
            
            amigosSorteados.forEach(function(amigo) {
                let li = document.createElement("li");
                li.textContent = "• " + amigo;
                li.style.color = "#999";
                li.style.textDecoration = "line-through";
                lista.appendChild(li);
            });
        }
    }
}

function generarAmigoSecreto() {
    // Verificar si todos los amigos ya fueron sorteados ANTES de generar
    if (amigosSorteados.length >= amigos.length) {
        return null; // Indicar que no hay más amigos por sortear
    }
    
    // Generar índice aleatorio
    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let amigoGenerado = amigos[indiceAleatorio];

    // Si el amigo ya fue sorteado, generar otro recursivamente
    if (amigosSorteados.includes(amigoGenerado)) {
        return generarAmigoSecreto();
    } else {
        // Agregar el amigo a la lista de sorteados y retornarlo
        amigosSorteados.push(amigoGenerado);
        return amigoGenerado;
    }
}

function sortearAmigo() {
    let resultado = document.querySelector("#resultado");
    
    if (amigos.length === 0) {
        alert("Agrega al menos un amigo antes de sortear.");
        return;
    }
    
    // Debug: mostrar el estado actual
    console.log("Amigos:", amigos);
    console.log("Amigos sorteados:", amigosSorteados);
    console.log("Longitud amigos:", amigos.length);
    console.log("Longitud sorteados:", amigosSorteados.length);
    
    // Usar la función que evita repeticiones
    let amigoSorteado = generarAmigoSecreto();
    
    console.log("Amigo sorteado:", amigoSorteado);
    
    if (amigoSorteado === null) {
        // Todos los amigos ya fueron sorteados
        resultado.innerHTML = `<li>🚫 Ya se sortearon todos los amigos.</li>`;
        alert("¡Todos los amigos ya fueron sorteados!");
        
        // Cuando todos fueron sorteados: deshabilitar "Reiniciar sorteos", habilitar solo "Nuevo juego"
        document.querySelector("#reiniciarSorteos").disabled = true;
        document.querySelector("#reiniciar").disabled = false;
    } else {
        // Mostrar el resultado en la página
        resultado.innerHTML = `<li>🎉 El amigo secreto sorteado es: <strong>${amigoSorteado}</strong></li>`;
        
        // Mostrar cuántos amigos quedan por sortear
        let amigosRestantes = amigos.length - amigosSorteados.length;
        if (amigosRestantes > 0) {
            resultado.innerHTML += `<li>📊 Quedan ${amigosRestantes} amigo(s) por sortear</li>`;
            
            // Mientras haya amigos disponibles: habilitar "Reiniciar sorteos", habilitar "Nuevo juego"
            document.querySelector("#reiniciarSorteos").disabled = false;
            document.querySelector("#reiniciar").disabled = false;
        } else {
            resultado.innerHTML += `<li>🎊 ¡Todos los amigos fueron sorteados!</li>`;
            
            // Cuando se completa: deshabilitar "Reiniciar sorteos", habilitar solo "Nuevo juego"
            document.querySelector("#reiniciarSorteos").disabled = true;
            document.querySelector("#reiniciar").disabled = false;
        }
    }
    
    // Actualizar la lista visual después de cada sorteo
    mostrarAmigos();
}

function reiniciarSorteos() {
    // Limpiar el array de amigos sorteados
    amigosSorteados = [];
    
    // Limpiar el resultado del sorteo
    document.querySelector("#resultado").innerHTML = "";
    
    // Restaurar la lista completa de amigos
    mostrarAmigos();
    
    // Deshabilitar el botón de reiniciar sorteos hasta el próximo sorteo
    document.querySelector("#reiniciarSorteos").disabled = true;
    
    // Mensaje de confirmación
    alert("¡Sorteos reiniciados! Todos los amigos pueden ser sorteados nuevamente.");
}

function reiniciarJuego() {
    // Limpiar el array de amigos
    amigos = [];
    
    // Limpiar el array de amigos sorteados
    amigosSorteados = [];
    
    // Limpiar el campo de entrada
    document.querySelector("#amigo").value = "";
    
    // Limpiar el resultado del sorteo
    document.querySelector("#resultado").innerHTML = "";
    
    // Deshabilitar ambos botones
    document.querySelector("#reiniciar").disabled = true;
    document.querySelector("#reiniciarSorteos").disabled = true;
    
    // Actualizar la lista de amigos
    mostrarAmigos();
    
    // Mensaje de confirmación
    alert("¡Juego reiniciado! Puedes agregar nuevos amigos.");
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarAmigos();
});