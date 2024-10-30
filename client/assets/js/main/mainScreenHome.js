import { agregarCerrarSesion } from '../../../modules/cerrarSesion.js';
document.addEventListener("DOMContentLoaded", () => {

    // Llamar a la función para agregar el evento de cierre de sesión
    agregarCerrarSesion('btnCerrarSesion');

    // document.getElementById("btnHome").addEventListener("click", () => {
    //     // dirigir a la sección HOME
    //     window.location.href = "mainScreenHome.html"; 
    // });

    document.getElementById("btnAutores").addEventListener("click", () => {
        // dirigir a la sección de Autores
        window.location.href = "mainScreenAuthors.html";
    
    });

    document.getElementById("btnEditoriales").addEventListener("click", () => {
        // dirigir a la sección de Editoriales
        window.location.href = "mainScreenEditoriales.html"; 
    });

    document.getElementById("btnCategorias").addEventListener("click", () => {
        // dirigir a la sección de Categorías
        window.location.href = "mainScreenCategories.html"; 
    });

    document.getElementById("btnLibros").addEventListener("click", () => {
        // dirigir a la sección de Libro
        window.location.href = "mainScreenLibros.html"; 
    });
});
