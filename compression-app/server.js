import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import multiparty from 'multiparty';

import { return500Err, return404Err } from './server-utils.js';

console.clear();

const PORT = 3000;
const server = new http.Server();

server.on('request', async (req, res) => {
    const { url, headers } = req;
    const formattedUrl = new URL(url, `http://${headers.host}`);
    let pathname = formattedUrl.pathname.slice(1);
    pathname = pathname || 'index.html';

    if (pathname === 'compress') {
        const formData = new multiparty.Form();

        formData.parse(req, (err, fields, files) => {
            if (err) {
                console.warn('Form data parsing error -', err.message);
                return500Err(res);
                return;
            }

            const {
                format: [format],
            } = fields;
            const {
                compressingFile: [compressingFile],
            } = files;

            console.log('format', format);
            console.log('compressingFile', compressingFile);

            res.end('File Compressing');
        });

        return;
    }

    const appReadStream = fs.createReadStream(path.resolve(`compression-app/${pathname}`));
    appReadStream.pipe(res);

    appReadStream.on('error', ({ message }) => {
        console.warn('Stream error -', message);

        if (message.startsWith('ENOENT: no such file or directory')) {
            return404Err(res);
        } else {
            return500Err(res);
        }

        return;
    });

    res.on('close', () => {
        appReadStream.destroy();
    });
});

server.on('error', (err) => {
    console.warn('Server error\n', err.message);
});

server.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
