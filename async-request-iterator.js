import { Server } from 'http';

console.clear();

const server = new Server();

server.on('request', async (req, res) => {
    const chunks = [];

    // req.on('data', (chunk) => {
    //     chunks.push(chunk);
    // });
    // req.on('end', () => {
    //     const result = Buffer.concat(chunks);
    //     console.log('result', JSON.parse(result.toString()));
    // });

    for await (const chunk of req) {
        chunks.push(chunk);
    }
    const result = Buffer.concat(chunks);
    console.log('result', JSON.parse(result.toString()));

    res.write('Hello ');
    res.end('World!');
});

server.listen(3000, () => {
    console.log('Server launched');
});
