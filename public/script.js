document.getElementById('submit').addEventListener('click', async () => {
    const input = document.getElementById('input').value; // Obtiene la entrada del usuario
    const outputDiv = document.getElementById('output'); // Referencia al div donde se mostrará la respuesta

    // Llama a tu servidor Express
    const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Define el tipo de contenido
        },
        body: JSON.stringify({ question: input }) // Envía la pregunta como JSON
    });

    // Maneja la respuesta del servidor
    const data = await response.json();

    // Verifica si hay un mensaje de error o si la respuesta tiene la propiedad 'answer'
    if (data.answer) {
        outputDiv.innerHTML = data.answer; // Muestra la respuesta generada
    } else {
        outputDiv.innerHTML = "Error al obtener respuesta."; // Mensaje de error
    }
});
