const express = require("express");
const ffmpeg = require("fluent-ffmpeg");
const sharp = require("sharp");
const path = require("path");

const app = express();
const port = 5000;

// Ruta para redimensionar input.jpg a 300x300 y enviarla
app.get('/imagen', (req, res) => {
    const inputPath = './media/input.jpg';
    sharp(inputPath)
        .resize(300, 300)
        .toBuffer()
        .then(data => {
            res.type('jpg').send(data);
        })
        .catch(err => {
            console.error('Error al procesar la imagen:', err);
            res.status(500).send('Error al procesar la imagen');
        });
});

// Ruta para convertir input.mp3 a WAV y enviarlo
app.get('/audio', (req, res) => {
    const inputPath = './media/input.mp3';
    ffmpeg(inputPath)
        .toFormat('wav') // Corregido: usar toFormat en lugar de convert
        .pipe(res, { end: true });
});

// Ruta para transmitir input.mp4
app.get('/video', (req, res) => {
    const inputPath = './media/input.mp4';
    const fullPath = path.resolve(inputPath); // Obtener la ruta absoluta del archivo
    res.sendFile(fullPath); // Corregido: enviar el archivo usando sendFile con ruta absoluta
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor multimedia iniciado en http://localhost:${port}`);
});
