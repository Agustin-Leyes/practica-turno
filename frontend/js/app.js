

const contenedor = document.getElementById("contenedor-profesionales");


async function verHorarios(profesionalId) {
    try {
        const respuesta = await fetch(`http://localhost:3000/profesionales/${profesionalId}/horarios`);
        const horarios = await respuesta.json();

        const panelHorarios = document.getElementById("panel-horarios");
        const listaHorarios = document.getElementById("lista-horarios");

        listaHorarios.innerHTML = "";

        if (horarios.length === 0) {
            const mensaje = document.createElement("li");
            mensaje.textContent = "Este profesional no tiene horarios cargados todavia";

            listaHorarios.appendChild(mensaje);
        } else {
            horarios.forEach(horario => {
                if (horario.activo) {
                    const item = document.createElement("li");

                    item.textContent = `${horario.dia.toUpperCase()} - de ${horario.horaInicio} a ${horario.horaFin} .`;

                    // Creamos un selector de fecha individual para cada horario disponible
                    const inputFecha = document.createElement("input");
                    inputFecha.type = "date";
                    inputFecha.style.margin = "0 10px";
                    // Fecha mínima: hoy
                    const hoy = new Date();
                    const fechaHoy = hoy.toISOString().split("T")[0];
                    inputFecha.min = fechaHoy;

                    const diaSemana = {
                        domingo: 0,
                        lunes: 1,
                        martes: 2,
                        miercoles: 3,
                        miércoles: 3,
                        jueves: 4,
                        viernes: 5,
                        sabado: 6,
                    };

                    const diaHorario = diaSemana[horario.dia.toLowerCase()];

                    inputFecha.addEventListener("change", () => {
                        const fechaSeleccionada = new Date(inputFecha.value + "T00:00:00");
                        const diaSeleccionado = fechaSeleccionada.getDay();

                        if (diaSeleccionado != diaHorario) {
                            Swal.fire({
                                icon: "warning",
                                title: "Día incorrecto",
                                text: `Este profesional atiende los días ${horario.dia}.`
                            });
                            inputFecha.value = "";
                        }
                    });
                    const btnReservar = document.createElement("button");
                    btnReservar.textContent = "Sacar Turno";
                    btnReservar.addEventListener("click", async () => {
                        const fechaSeleccionada = inputFecha.value;

                        if (!fechaSeleccionada) {
                            alert("Por favor , seleccione una fecha para el turno.");
                            return;
                        }
                        const token = localStorage.getItem("tokenClinica");
                        if (!token) {
                            alert("Debes inicar sesion para sacar un turno.");
                            window.location.href = "login.html";
                            return;
                        }

                        try {
                            const resTurno = await fetch("http://localhost:3000/turnos", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`,
                                },
                                body: JSON.stringify({
                                    profesionalId: profesionalId,
                                    horarioId: horario.id,
                                    fecha: fechaSeleccionada,
                                    observaciones: "Turno solicitado desde la web",

                                })
                            });

                            const datosTurno = await resTurno.json();

                            if (resTurno.ok) {
                                Swal.fire({
                                    icon: "success",
                                    title: "¡Turno reservado!",
                                    text: "Tu turno fue reservado correctamente.",
                                    confirmButtonText: "Aceptar"
                                });

                                panelHorarios.style.display = "none";

                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "No se pudo reservar",
                                    text: datosTurno.mensaje || datosTurno.message || "Ocurrió un error al reservar el turno.",
                                    confirmButtonText: "Entendido"
                                });
                            }

                        } catch (err) {
                            alert("Hubo un error al conectar con el servidor.");
                        }

                    });

                    item.append(inputFecha, btnReservar)
                    listaHorarios.appendChild(item);
                }
            });
        }
        panelHorarios.style.display = "block";

        document.getElementById("btn-cerrar-horarios").addEventListener("click", () => {
            panelHorarios.style.display = "none";
        })

    } catch (error) {
        console.error("Error al buscar los horarios:", error);
    }
}


async function cargarProfesionales() {
    const response = await fetch("http://localhost:3000/profesionales");
    const data = await response.json();


    contenedor.innerHTML = "";

    data.profesionales.forEach(profesional => {
        const tarjeta = document.createElement("div");

        tarjeta.classList.add("card-profesional");

        const img = document.createElement("img");

        img.src = `http://localhost:3000/imagenes/profesionales/${profesional.imagen}`;

        const title = document.createElement("h3");
        title.textContent = profesional.nombre;

        const especialidad = document.createElement("p");
        especialidad.textContent = `Especialidad : ${profesional.especialidad}`;

        const boton = document.createElement("button");
        boton.textContent = "Ver horarios";
        boton.addEventListener("click", () => {
            verHorarios(profesional.id);
        });
        tarjeta.append(img, title, especialidad, boton);

        contenedor.appendChild(tarjeta);
    });

}


cargarProfesionales();