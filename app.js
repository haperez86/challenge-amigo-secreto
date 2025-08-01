// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = [];

function agregarAmigo() {
    let amigo = document.querySelector("#amigo").value;

    if (amigo == ''){
        alert("Por favor, inserte un nombre")
    }else{
        amigos.push(amigo);
        document.querySelector("#amigo").value = "";
    }
    mostrarAmigos();
}

function mostrarAmigos() {
    let lista = document.querySelector("#listaAmigos");
    lista.innerHTML = "";

    if (amigos.length === 0) {
        lista.innerHTML = "<li>No hay amigos agregados.</li>";
    } else {
        amigos.forEach(function(amigo) {
            let li = document.createElement("li");
            li.textContent = amigo;
            lista.appendChild(li);
        });
    }
}

function sortearAmigo() {
    let resultado = document.querySelector("#resultado");
    
    if (amigos.length === 0) {
        alert("Agrega al menos un amigo antes de sortear.");
        return;
    }
    
    // Generar índice aleatorio
    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos[indiceAleatorio];
    
    // Mostrar el resultado en la página
    resultado.innerHTML = `<li>🎉 El amigo secreto sorteado es: <strong>${amigoSorteado}</strong></li>`;
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarAmigos();
});