import http from 'http';

console.clear();

const data = {
    name: 'Ivan',
    surname: 'Grekov',
    age: 23,
};

const PORT = 4000;
const server = new http.Server();

server.on('request', (req, res) => {
    const chunks = [];

    req.on('data', (chunk) => {
        chunks.push(chunk);
    });

    req.on('end', () => {
        const sender = JSON.parse(Buffer.concat(chunks))?.name;

        if (req.url === '/data') {
            res.setHeader('Content-Type', 'text/javascript');
            res.end(
                JSON.stringify({
                    ...data,
                    sender,
                }),
            );

            return;
        } else {
            res.write('Hello');
            res.end(', world\n');
        }
    });
});

server.listen(PORT);
