import http from 'http';

console.clear();

const data = {
    name: 'Ivan',
    surname: 'Grekov',
    age: 23,
};

const PORT = 4000;
const server = new http.Server();

server.on('request', async (req, res) => {
    const chunks = [];

    for await (const chunk of req) {
        chunks.push(chunk);
    }

    const singleBuffer = Buffer.concat(chunks);
    const sender = JSON.parse(singleBuffer)?.name || 'stranger';

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

server.listen(PORT);
