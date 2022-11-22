import http from 'http';

// NOTE: server with help of http.createServer
// const server = http.createServer((req, res) => {
//     res.write('Hello, world!');
//     res.end();
// });

// NOTE: server with help of Server class
const server = new http.Server();

// NOTE: we can use .on method since
    // http.Server extends
        // net.Server extends
            // EventEmitter
server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('Hello, world!');
    res.end();
});

// NOTE: in browser we can use addEventListener for body since
    // HTMLBodyElement extends
        // HTMLElement extends
            // Element extends
                // Node extends
                    // EventTarget

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
