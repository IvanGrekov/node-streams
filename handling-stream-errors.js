import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3000;
const server = new http.Server();

server.on('request', (req, res) => {
    const filename = req.url === '/' ? 'package.json' : 'wrong.jsons';
    const file = fs.createReadStream(path.resolve(filename));

    file.on('error', () => {
        console.log('file err');

        res.end('err');
    });

    file.pipe(res);
});

server.on('error', () => {
    console.log('server err');
});

server.listen(PORT, () => {
    console.log(`server is running, http://localhost:${PORT}`);
});
