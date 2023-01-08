import http from 'http';

console.clear();

const server = new http.Server();

server.on('request', (_, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('Hello, world!');
    res.end();
});

const nativeEmit = server.emit;
server.emit = (...args) => {
    console.log(args[0]);

    // nativeEmit.apply(server, args);
    http.Server.prototype.emit.apply(server, args);
};

// server.on('connection', (socket) => {
//     socket.setTimeout(10 * 1000);
// });
server.keepAliveTimeout = 10000;

server.listen(3000, () => {
    console.log('server is running, http://localhost:3000');
});

// console.log(server);
// console.log('eventNames', server.eventNames());
