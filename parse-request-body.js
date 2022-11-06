import { Server } from 'http';
console.clear();

const server = new Server();

const serverData = {
    name: 'Ivan',
    age: 23,
};

server.on('request', (req, res) => {
    if (req.url === '/data') {
        const chunks = [];

        req.on('data', (chunk) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            const result = Buffer.concat(chunks);
            const resData = JSON.parse(result.toString());
            console.log('resData', resData);

            res.end(`${serverData.name} is saying hello to ${resData.name}`);
        });
    } else {
        res.write('Hello, world!');
        res.end("It's NODEJS");
    }
});

server.listen(3000);
