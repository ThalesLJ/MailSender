import app from "./src/app.js";

// Função para iniciar o servidor
async function start() {
    try {
        // Configuração do servidor
        const PORT = 3000;

        // Inicia o servidor de forma assíncrona
        await app.listen(PORT);

        console.log(`API running on ${PORT} port`);
    } catch (error) {
        console.error('Error :', error.message);
        process.exit(1); // Encerra o processo com código de erro
    }
}

// Chama a função para iniciar o servidor
start();