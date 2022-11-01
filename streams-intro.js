import { Server } from 'http';
import { readFile } from 'fs';

const PORT = 4000;
const server = new Server();

const returnError = (res) => {
    res.statusCode = 500;
    res.end('Ooops');
};

server.on('request', (req, res) => {
    if (req.url === '/download-pdf') {
        readFile('./public/lorem-ipsum.pdf', (err, data) => {
            if (err) {
                returnError(res);

                return;
            }

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="lorem-ipsum.pdf');
            res.end(data);
        });

        return;
    }

    if (req.url === '/download-image') {
        readFile('./public/autumn-1280px.jpg', (err, data) => {
            if (err) {
                returnError(res);

                return;
            }

            res.setHeader('Content-Type', 'image/jpg');
            res.setHeader('Content-Disposition', 'attachment; filename="autumn.jpg');
            res.end(data);
        });

        return;
    }

    if (req.url === '/download-video') {
        readFile('./public/test-video.mp4', (err, data) => {
            if (err) {
                returnError(res);

                return;
            }

            res.setHeader('Content-Type', 'video/mp4');
            res.setHeader('Content-Disposition', 'attachment; filename="test-video.mp4');
            res.end(data);
        });

        return;
    }

    res.setHeader('Content-Type', 'text/html');
    res.end(`
        <div>
            <a href="/download-pdf" target="_blank">
                Download PDF
            </a>
        </div>

        <div>
            <a href="/download-image" target="_blank">
                Download Image
            </a>
        </div>

        <div>
            <a href="/download-video" target="_blank">
                Download Video
            </a>
        </div>
    `);
});

server.on('error', (err) => {
    console.log(`Error was occurred: ${err}`);
});

server.listen(PORT, () => {
    console.log(`Server launched on http://localhost:${PORT}`);
});
