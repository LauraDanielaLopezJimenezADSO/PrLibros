import { URL } from "../../../modules/config.js";
import { envia } from "../../../modules/ajax.js";
import { validarNombreApellido } from "../../../modules/validaciones.js";
document.addEventListener("DOMContentLoaded", async () => {
    const btnBuscar = document.getElementById("btnBuscar");
    const btnLimpiar = document.getElementById("btnLimpiar");
    const buscarAutor = document.getElementById("buscarAutor");
    const resultado = document.getElementById("resultado");

    // Cargar todos los autores al inicio
    await cargarAutores();

    btnBuscar.addEventListener("click", async () => {
        const query = buscarAutor.value.trim();

        if (query === "") {
            alert("Por favor, ingresa un nombre o apellido para buscar.");
            return;
        }

        // aalidar que el texto solo contenga letras y caracteres especiales
        if (!validarNombreApellido(query)) {
            alert("El nombre o apellido solo puede contener letras y caracteres especiales.");
            return;
        }

        // Buscar autores
        const autores = await envia("autores");
        const autoresFiltrados = autores.filter(autor =>
            autor.nombre.toLowerCase().includes(query.toLowerCase()) ||
            autor.apellido.toLowerCase().includes(query.toLowerCase()) ||
            autor.estado.toLowerCase() === query
        );

        mostrarResultados(autoresFiltrados);
    });

    btnLimpiar.addEventListener("click", async () => {
        buscarAutor.value = ""; // limpia el campo de búsqueda
        await cargarAutores(); //se cargar todos los autores
    });

    async function cargarAutores() {
        const autores = await envia("autores");
        mostrarResultados(autores);
    }

    function mostrarResultados(autores) {
        resultado.innerHTML = ""; // impiar resultados anteriores

        if (autores.length === 0) {
            resultado.innerHTML = "<p>No se encontraron autores.</p>";
            return;
        }

        // tabla para mostrar los resultados
        const tabla = document.createElement("table");
        tabla.className = "resultado__tabla";

        const encabezado = document.createElement("tr");
        encabezado.innerHTML = "<th>Nombre</th><th>Apellido</th><th>Estado</th>";
        tabla.appendChild(encabezado);

        autores.forEach(autor => {
            const fila = document.createElement("tr");
            fila.innerHTML = `<td>${autor.nombre}</td><td>${autor.apellido}</td><td>${autor.estado}</td>`;
            tabla.appendChild(fila);
        });

        resultado.appendChild(tabla); //sgregar tabla al resultado
    }
});
