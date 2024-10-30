import { agregarCerrarSesion } from '../../../modules/cerrarSesion.js';
import { envia } from '../../../modules/ajax.js';

document.addEventListener("DOMContentLoaded", async () => {
    const autoresLista = document.getElementById("autoresLista");

    // Cargar todos los autores al cargar la página
    await cargarAutores();

    // Llamar a la función para agregar el evento de cierre de sesión
    agregarCerrarSesion('btnCerrarSesion');

    document.getElementById("btnAgregar").addEventListener("click", () => {
        window.location.href = "../../html/agregar/agregarAutor.html";
    });

    document.getElementById("btnConsultar").addEventListener("click", () => {
        window.location.href = "../../html/consultar/consultarAutor.html";
    });

    document.getElementById("btnModificar").addEventListener("click", () => {
        window.location.href = "../../html/modificar/modificarAutor.html";
    });

    document.getElementById("btnEliminar").addEventListener("click", () => {
        window.location.href = "../../html/eliminar/eliminarAutor.html";
    });

    async function cargarAutores() {
        const autores = await envia("autores"); // Obtener todos los autores
        mostrarResultados(autores);
    }

    function mostrarResultados(autores) {
        // Limpiar resultados anteriores
        autoresLista.innerHTML = "<h2 class='main-content__h2'>Autores</h2>"; // Mantener el encabezado

        if (autores.length === 0) {
            autoresLista.innerHTML += "<p>No hay autores disponibles.</p>";
            return;
        }

        // Crear una tabla para mostrar todos los autores
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

        autoresLista.appendChild(tabla); 
    }
});
