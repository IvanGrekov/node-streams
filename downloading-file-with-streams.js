import { Server } from 'http';
import { readFile, createReadStream } from 'fs';

const PORT = 3000;
const server = new Server();

server.on('request', (req, res) => {
    if (req.url === '/download') {
        // readFile('./public/lviv.mp4', (err, data) => {
        //     if (err) {
        //         res.statusCode = 500;
        //         res.end('Server error');
        //     } else {
        //         res.setHeader('Content-Type', 'video/mp4');
        //         res.setHeader('Content-Disposition', 'attachment; filename=lviv.mp4');

        //         console.log(process.memoryUsage().external);

        //         res.end(data);
        //     }
        // });

        const fileStream = createReadStream('./public/lviv.mp4');

        fileStream.on('error', (err) => {
            console.log('Error occurred while reading stream', err);

            res.statusCode = 500;
            res.end('Server error');
        });

        fileStream.on('end', () => {
            console.log(process.memoryUsage().external);
        });

        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', 'attachment; filename=lviv.mp4');
        fileStream.pipe(res);
    } else {
        res.end(`
            <a href="/download" target="_blank">
                Download video
            </a>
        `);
    }
});

server.on('error', (err) => {
    console.log('Error occurred', err);
});

server.listen(PORT, () => {
    console.log(`Server launshed on http://localhost:${PORT}`);
});
