import http from 'http';
import multiparty from 'multiparty';

import { return500Err, return400Err, returnFile, returnCompressedFile } from './server-utils.js';

console.clear();

const PORT = 3000;
const server = new http.Server();

server.on('request', (req, res) => {
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

            if (!fields.format || !files.compressingFile) {
                return400Err(res);
                return;
            }

            const {
                format: [compressionFormat],
            } = fields;
            const {
                compressingFile: [compressingFile],
            } = files;

            returnCompressedFile({ res, compressionFormat, compressingFile });
        });

        return;
    }

    returnFile(res, pathname);
});

server.on('error', (err) => {
    console.warn('Server error\n', err.message);
});

server.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
});
