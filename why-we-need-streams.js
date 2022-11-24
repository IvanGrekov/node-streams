import http from 'http';
import fs from 'fs';
import path from 'path';

console.clear();

const PORT = 4000;
const server = new http.Server();

server.on('request', (req, res) => {
    if (req.url === '/download') {
        fs.readFile(path.resolve('./public/lviv.mp4'), (err, data) => {
            if (err) {
                res.end("Can't download");

                return;
            }

            res.setHeader('Content-Type', 'video/mp4');
            res.setHeader('Content-Disposition', 'attachment; filename="lvivvvv.mp4"');
            res.end(data);
        });

        return;
    }

    res.end('Hello, world');
});

server.on('error', (err) => {
    console.log('error occurred', err.message);
});

server.listen(PORT, () => {
    console.log(`server is running, http://localhost:${PORT}`);
});
