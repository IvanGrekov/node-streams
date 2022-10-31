import http from 'http';

const PORT = 4000;
export const SERVER_URL = `http://localhost:${PORT}`;

const server = new http.Server();

server.on('request', (req, res) => {
    res.statusCode = 200;
    res.write('Hello, world!');
    res.end();
});

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.write('Hello, world!');
//     res.end();
// });

export const launchServer = () => {
    server.listen(PORT, () => {
        console.log(`Server launched on ${SERVER_URL}`);
    });
};

export default server;
