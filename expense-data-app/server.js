import { Server } from 'http';
import fs from 'fs';
import path from 'path';
import multiparty from 'multiparty';

import { getFormattedFieldsFromFormData, getFileNameFromFormData } from './utils.js';

class MyServer extends Server {
    handleError() {
        this.on('error', (err) => {
            console.warn('Server error -', err.message);
        });
    }

    return400(res) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/html');
        res.end(
            '<h1 style="text-align: center; color: orange;">Pls, fill in the form firstly <a href="http://localhost:3000">here</a></h1>',
        );
    }

    return404(res) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1 style="text-align: center; color: orange;">There is no such page</h1>');
    }

    return500(res) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1 style="text-align: center; color: red;">Internal Server Error</h1>');
    }

    handleResClosing(res, readstream) {
        res.on('close', () => {
            readstream.destroy();
        });
    }

    returnFile(res, pathname) {
        const readFileStream = fs.createReadStream(path.resolve(`expense-data-app/${pathname}`));

        readFileStream.pipe(res);

        readFileStream.on('error', ({ message }) => {
            console.warn('ReadFileStream error -', message);

            if (message.startsWith('ENOENT: no such file or directory')) {
                this.return404(res);
            } else {
                this.return500(res);
            }
        });

        this.handleResClosing(res, readFileStream);
    }

    handleRequest() {
        this.handleError();

        this.on('request', (req, res) => {
            const { url, headers } = req;
            const urlParams = new URL(url, `http://${headers.host}`);
            const pathname = urlParams.pathname.slice(1) || 'index.html';

            if (pathname === 'expense') {
                const formData = new multiparty.Form();

                formData.parse(req, (err, fields) => {
                    if (err) {
                        this.return500(res);

                        return;
                    }

                    if (!fields) {
                        this.return400(res);

                        return;
                    }

                    const formattedFields = getFormattedFieldsFromFormData(fields);
                    const fileName = `expense-data-app/${getFileNameFromFormData(fields)}.json`;
                    const dataInJson = JSON.stringify(formattedFields, null, 4);

                    fs.writeFile(fileName, dataInJson, (err) => {
                        if (err) {
                            console.log('Error while writing file', fileName);
                        }
                    });
                    res.setHeader('Content-Type', 'text/json; charset=utf-8');
                    res.end(dataInJson);
                });

                return;
            }

            this.returnFile(res, pathname);
        });
    }

    listenPort() {
        const PORT = 3000;

        this.listen(PORT, () => {
            console.log(`Server is running, http://localhost:${PORT}`);
        });
    }
}

export const myServer = new MyServer();
