import http from 'http';

const server = new http.Server();
const PORT = 4000;

server.on('request', (req, res) => {
    if (req.url === '/error') {
        server.emit('error');
    }

    res.end('Hello, world');
});

server.on('error', () => {
    console.log('error was handled');
});

server.listen(PORT, () => {
    console.log(`server is running, http://localhost:${PORT}`);
});
