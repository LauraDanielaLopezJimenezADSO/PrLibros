import { agregarCerrarSesion } from '../../../modules/cerrarSesion.js';
document.addEventListener("DOMContentLoaded", () => {

    // Llamar a la función para agregar el evento de cierre de sesión
    agregarCerrarSesion('btnCerrarSesion');

    document.getElementById("btnAgregar").addEventListener("click", () => {
        window.location.href = "../../html/agregar/agregarEditorial.html";
    });

    document.getElementById("btnConsultar").addEventListener("click", () => {
        window.location.href = "../../html/consultar/consultarEditorial.html";
    });

    document.getElementById("btnModificar").addEventListener("click", () => {
        window.location.href = "../../html/modificar/modificarEditorial.html";
    });

    document.getElementById("btnEliminar").addEventListener("click", () => {
        window.location.href = "../../html/eliminar/eliminarEditorial.html";
    });

});