import http from 'http';
import fs from 'fs';
import path from 'path';

console.clear();

const PORT = 3000;
const server = new http.Server();

server.on('request', (req, res) => {
    const readFileStream = fs.createReadStream(path.resolve('public/large-file.txt'));

    readFileStream.on('data', (chunk) => {
        const canProceed = res.write(chunk);

        if (!canProceed) {
            readFileStream.pause();

            res.once('drain', () => {
                readFileStream.resume();
            });
        }
    });

    readFileStream.on('end', () => {
        res.end();
    });

    res.on('close', () => {
        readFileStream.destroy();
    });

    readFileStream.on('error', () => {
        res.statusCode = 400;
        res.end('Error');
    });
});

server.on('error', () => {
    console.log('server error occurred');
});

server.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
