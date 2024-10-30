import { URL } from "../../../modules/config.js";
import { envia } from "../../../modules/ajax.js";
import { validarCorreo, validarNombreApellido, validarTelefono } from "../../../modules/validaciones.js";

document.addEventListener("DOMContentLoaded", async () => {
    const selectEdit = document.getElementById("selectEdit");
    const nombreditorial = document.getElementById("nombreditorial");
    const correoEditorial = document.getElementById("correoEditorial");
    const telefonoEditorial = document.getElementById("telefonoEditorial");
    const estadoEditorial = document.getElementById("estadoEditorial");
    const btnActualizar = document.getElementById("btnActualizar");
    const editorialDetails = document.getElementById("editorialDetails");

    // Cargar todos los editoriales al inicio
    await cargarEditoriales();

    async function cargarEditoriales() {
        const editoriales = await envia("editoriales");
        editoriales.forEach(editorial => {
            const option = document.createElement("option");
            option.value = editorial.id; 
            option.textContent = `${editorial.nombre}`;
            selectEdit.appendChild(option);
        });
    }

    // Manejar el cambio de selección
    selectEdit.addEventListener("change", async () => {
        const editorialEdit = selectEdit.value;

        if (editorialEdit) {
            const editoriales = await envia("editoriales");
            const editorialSeleccionado = editoriales.find(editorial => editorial.id === editorialEdit);
            if (editorialSeleccionado) {
                nombreditorial.value = editorialSeleccionado.nombre;
                correoEditorial.value = editorialSeleccionado.correo;
                telefonoEditorial.value = editorialSeleccionado.telefono;
                estadoEditorial.value = editorialSeleccionado.estado;
                editorialDetails.style.display = "block"; 
            }
        } else {
            editorialDetails.style.display = "none"; 
        }
    });

    // Manejar la actualización del editorial
    btnActualizar.addEventListener("click", async () => {
        const editorialEdit = selectEdit.value;

        if (!editorialEdit) {
            alert("Por favor, selecciona una editorial.");
            return;
        }
         // Verificar si los campos son válidos solo si están modificados o no cumplen los criterios de validación
        const nombreValido = validarNombreApellido(nombreditorial.value.trim());
        const correoValido = validarCorreo(correoEditorial.value.trim());
        const telefonoValido = validarTelefono(telefonoEditorial.value.trim());

        // Validaciones
        if (!nombreValido) {
            alert("El nombre de la editorial solo debe contener letras y caracteres especiales.");
            return;
        }

        if (!correoValido) {
            alert("El formato del correo electrónico es incorrecto.");
            return;
        }

        if (!telefonoValido) {
            alert("El formato del teléfono es incorrecto.");
            return;
        }

        const editorialActualizado = {
            id: editorialEdit,
            nombre: nombreditorial.value.trim(),
            correo: correoEditorial.value.trim(),
            telefono: telefonoEditorial.value.trim(),
            estado: estadoEditorial.value
        };

        try {
            const response = await fetch(`${URL}/editoriales/${editorialEdit}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editorialActualizado)
            });

            if (response.ok) {
                alert("Editorial actualizada con éxito.");
                await cargarEditoriales(); 
                editorialDetails.style.display = "none";
                selectEdit.value = ""; 
                nombreditorial.value = "";
                correoEditorial.value = "";
                telefonoEditorial.value = "";
                estadoEditorial.value = "activo"; 
            } else {
                alert("Error al actualizar el editorial.");
            }
        } catch (error) {
            console.error("Error:", error);
            console.log("Hubo un problema al actualizar el editorial.");
        }
    });
});
