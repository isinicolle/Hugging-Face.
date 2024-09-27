const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Asegúrate de que tus archivos HTML, CSS y JS estén en la carpeta 'public'

app.post('/api/ask', async (req, res) => {
    const { question } = req.body;

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: question,
                parameters: {   max_length: 100,  // Longitud máxima de la respuesta
                    temperature: 0.7,  // Aleatoriedad
                    top_k: 50,         // Limitar las opciones de palabras
                    top_p: 0.9         // Nucleus sampling
                }  // Define el tipo de contenido
             }) // Envía la pregunta como JSON
        });

        const data = await response.json();
        console.log('Respuesta de Hugging Face:', data); // Para depuración

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ error: errorData });
        }

        // Asegúrate de que 'generated_text' existe en la respuesta
        const generatedText = data[0]?.generated_text; 
        if (generatedText) {
            return res.json({ answer: generatedText }); // Responde con 'answer'
        } else {
            return res.status(500).json({ error: "Error al procesar la respuesta." });
        }
    } catch (error) {
        console.error("Error al hacer la solicitud a la API:", error);
        return res.status(500).send("Error interno del servidor.");
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
