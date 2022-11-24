import http from 'http';
import fs from 'fs';
import path from 'path';

console.clear();

const PORT = 4000;
const server = new http.Server();

server.on('request', (req, res) => {
    if (req.url === '/download') {
        const readStream = fs.createReadStream(path.resolve('./public/lviv.mp4'));

        readStream.on('end', () => {
            console.log(process.memoryUsage().external / 1000000);
        });

        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', 'attachment; filename="lvivvvv.mp4"');
        readStream.pipe(res);

        readStream.on('error', () => {
            res.end("Can't download");
        });

        // fs.readFile(path.resolve('./public/lviv.mp4'), (err, data) => {
        //     if (err) {
        //         res.end("Can't download");

        //         return;
        //     }

        //     res.setHeader('Content-Type', 'video/mp4');
        //     res.setHeader('Content-Disposition', 'attachment; filename="lvivvvv.mp4"');
        //     res.end(data);

        //     console.log(process.memoryUsage().external / 1000000);
        // });

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
