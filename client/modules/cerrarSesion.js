export function agregarCerrarSesion(btnCerrarSesionId) {
    const btnCerrarSesion = document.getElementById(btnCerrarSesionId);
    
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");
            if (confirmar) {
                // Redirigir a la página de login
                window.location.href = "/client/login.html";
            }
        });
    }
}
