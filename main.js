import { TareasService } from './todo-service.js'
// cazamos elementos de entrada
const form = document.querySelector(".entrada-datos");
const tarea = document.querySelector(".inputTarea");
const prioridad = document.querySelector(".inputPrioridad");
const btnAñadir = document.querySelector(".añadirInput");
const filtroTarea = document.querySelector(".mostrarPrioridad");
const filtroBuscar = document.querySelector(".filtroLetra");



// inicializamos el servicio de Tareas
const tareaService = new TareasService();


// mostramos en pantalla
tareaService.getTareas()
    .then(data => mostrarData(data))
    .catch(error => console.log(error))

const mostrarData = (todos) => {
    let body = ""
    todos.forEach(todo => {
        body += `<tr>
            <td class= "${obtenerEstiloPrioridad(todo.prioridad)}">${todo.titulo}</td>
            <td class="bg-light"><button id="${todo.id}" type="button" class="btn btn-outline-danger deleteBtn container-fluid">Eliminar</button></td>
            </tr>`
    });

    document.getElementById(`data`).innerHTML = body

    // cazamos los botones de elimnar

    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(button => button.onclick = () => deleteTarea(button.id))

    // asignamos un color a cada prioridad 

    function obtenerEstiloPrioridad(prioridad) {
        switch (prioridad) {
            case 'Normal':
                return 'bg-primary';
            case 'Intermedia':
                return 'bg-warning';
            case 'Urgente':
                return 'bg-danger';
            default:
                return '';
        }
    }
}


// escuchamos al btn añadir y guardamos los valores introducidos
btnAñadir.onclick = () => {
    const nuevaTarea = {
        titulo: `${tarea.value.trim()}`,
        prioridad: `${prioridad.value}`
    };

    if(nuevaTarea.titulo === ''){
        alert("No puedes dejar el campo vacío");
        return;
    }

    tareaService.addTarea(nuevaTarea)
        .then(() => tareaService.getTareas())
        .then(todos => mostrarData(todos))
        .catch(error => console.error('Ocurrió un error al añadir la tarea', error));
}

// eliminar tarea
function deleteTarea(id) {
    tareaService.deleteTarea(id)
        .then(() => tareaService.getTareas())
        .then(todos => mostrarData(todos))
        .catch(error => console.error('Ocurrió un error al eliminar la tarea', error));
}

// filtrar por prioridad
filtroTarea.onchange = () => {
    tareaService.getTareas(filtroTarea.value)
        .then(todos => mostrarData(todos))
        .catch(error => console.error('Ocurrió un error al filtrar por prioridad', error));
}
// filtramos por palabra

filtroBuscar.onkeyup = () => {
    tareaService.getTareas(filtroTarea.value)
        .then(todos => todos.filter(todo => todo.titulo.includes(filtroBuscar.value.trim())))
        .then(todos => mostrarData(todos))
        .catch(error => console.error('Ocurrió un error al filtrar palabra', error));
}





