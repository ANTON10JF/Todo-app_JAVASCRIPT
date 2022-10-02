export class TareasService {
    #url = 'http://localhost:3000/tareas';

    constructor() { }

    getTareas(prioridad) {
        if (prioridad) {
            return fetch(`${this.#url}?prioridad=${prioridad}`)
                .then(res => res.json())
        }

        return fetch(this.#url)
            .then(res => res.json())
    }

    addTarea(todo) {
        return fetch(this.#url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
    };

    deleteTarea(id) {
        return fetch(`${this.#url}/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
    }
}