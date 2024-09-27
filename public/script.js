document.getElementById('submit').addEventListener('click', async () => {
    const input = document.getElementById('input').value; // Obtiene la entrada del usuario
    const outputDiv = document.getElementById('output'); // Referencia al div donde se mostrará la respuesta

    // Muestra un mensaje de carga
    outputDiv.innerHTML = "Cargando...";

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

    // Limpia el contenido previo
    outputDiv.innerHTML = '';

    // Verifica si hay un mensaje de error o si la respuesta tiene la propiedad 'answer'
    if (data.answer) {
        // Separa las oraciones por saltos de línea
        const sentences = data.answer.split('.'); // Puedes ajustar el separador según sea necesario
        sentences.forEach(sentence => {
            // Crea un nuevo párrafo para cada oración
            const p = document.createElement('p');
            p.textContent = sentence.trim(); // Agrega el texto de la oración
            outputDiv.appendChild(p); // Añade el párrafo al div de salida
        });
    } else if (data.error) {
        const errorP = document.createElement('p');
        errorP.textContent = `Error: ${data.error}`; // Muestra el mensaje de error
        outputDiv.appendChild(errorP);
    } else {
        const genericErrorP = document.createElement('p');
        genericErrorP.textContent = "Error al obtener respuesta."; // Mensaje de error genérico
        outputDiv.appendChild(genericErrorP);
    }
});
