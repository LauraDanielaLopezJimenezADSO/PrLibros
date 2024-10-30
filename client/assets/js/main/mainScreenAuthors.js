import { agregarCerrarSesion } from '../../../modules/cerrarSesion.js';
document.addEventListener("DOMContentLoaded", () => {
        
    // Llamar a la función para agregar el evento de cierre de sesión
    agregarCerrarSesion('btnCerrarSesion');

    document.getElementById("btnAgregar").addEventListener("click", () => {
        // dirigir a la sección de agregar Autores 
        console.log("Botón Agregar presionado");
        window.location.href = "../../html/agregar/agregarAutor.html";
    });

    document.getElementById("btnConsultar").addEventListener("click", () => {
        // dirigir a la sección de consultar Autores 
        window.location.href = "../../html/consultar/consultarAutor.html";
    });

    document.getElementById("btnModificar").addEventListener("click", () => {
        // dirigir a la sección de modificar Autores 
        window.location.href = "../../html/modificar/modificarAutor.html";
    });

    document.getElementById("btnEliminar").addEventListener("click", () => {
        // dirigir a la sección de eliminar Autores 
        window.location.href = "../../html/eliminar/eliminarAutor.html";
    });
});
