import http from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { checkIfPathIncludesExt } from './utils/url.utils.js';

dotenv.config();
console.clear();

const PORT = process.env.PORT || 3000;
const server = new http.Server();

server.on('request', (req, res) => {
    const {
        url,
        headers: { host },
    } = req;
    const { pathname } = new URL(url, `http://${host}`);
    let file = pathname.slice(1) || 'index.html';
    const filename = checkIfPathIncludesExt(file) ? file : `${file}.html`;

    const readFileStream = fs.createReadStream(path.resolve(`public/${filename}`));

    readFileStream.pipe(res);

    readFileStream.on('error', () => {
        fs.readFile(path.resolve('public/404.html'), (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');

                return;
            }

            res.statusCode = 404;
            res.end(data);
        });
    });

    res.on('close', () => {
        readFileStream.destroy();
    });
});

server.on('error', () => {
    console.log('Server error occurred');
});

server.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
