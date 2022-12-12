import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream';

export const return500Err = (res) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('Internal Server Error');
};

export const return404Err = (res) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('No Such File');
};

export const return400Err = (res) => {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/html');
    res.end(
        '<p>Pls, fill in all the fields firstly <a href="http://localhost:3000/">on this page</a></p>',
    );
};

export const returnFile = (res, pathname) => {
    const fileReadStream = fs.createReadStream(path.resolve(`compression-app/${pathname}`));

    fileReadStream.pipe(res);

    fileReadStream.on('error', ({ message }) => {
        console.warn('Stream error -', message);

        if (message.startsWith('ENOENT: no such file or directory')) {
            return404Err(res);
        } else {
            return500Err(res);
        }

        return;
    });

    res.on('close', () => {
        fileReadStream.destroy();
    });
};

export const createTransformStream = (compressionFormat) => {
    switch (compressionFormat) {
        case 'br':
            return zlib.createBrotliCompress();

        case 'deflate':
            return zlib.createDeflate();

        default:
            return zlib.createGzip();
    }
};

export const getFileExt = (compressionFormat) => {
    switch (compressionFormat) {
        case 'br':
            return 'br';

        case 'deflate':
            return 'dfl';

        default:
            return 'gz';
    }
};

export const returnCompressedFile = ({ res, compressionFormat, compressingFile }) => {
    const { path: compressingFilePath, originalFilename: compressingFileName } = compressingFile;

    const transformStream = createTransformStream(compressionFormat);
    const fileReadStream = fs.createReadStream(compressingFilePath);

    res.setHeader('Content-Encoding', compressionFormat);
    res.setHeader(
        'Content-Disposition',
        `attachment; filename="${compressingFileName}.${getFileExt(compressionFormat)}`,
    );

    pipeline(fileReadStream, transformStream, res, (err) => {
        if (err) {
            console.warn('Pipeline error -', err.message);
        }
    });
};
