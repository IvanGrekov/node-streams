import http from 'http';

const PORT = 4000;
const server = new http.Server();

server.on('request', (req, res) => {
    if (req.url === '/error') {
        server.emit('error', new Error(123));
    }

    res.end('Hello, world!');
});

server.on('error', (err) => {
    console.log(`Error was occures: ${err}`);
});

server.listen(PORT, () => {
    console.log(`Server was started on http://localhost:${PORT}`);
});
