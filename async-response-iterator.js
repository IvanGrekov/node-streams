// import { createWriteStream } from 'fs';
import http from 'http';

console.clear();

const options = {
    method: 'POST',
};

const request = http.request('http://localhost:3000', options, async (res) => {
    // const writableStream = createWriteStream('reponse.txt');
    // res.pipe(writableStream);
    // writableStream.on('finish', () => {
    //     console.log('writed');
    // });

    const chunks = [];

    // res.on('data', (chunk) => {
    //     chunks.push(chunk);
    // });
    // res.on('end', () => {
    //     const result = Buffer.concat(chunks);

    //     console.log('result:', result.toString());
    // });

    for await (const chunk of res) {
        chunks.push(chunk);
    }
    const result = Buffer.concat(chunks);
    console.log('result:', result.toString());
});

request.end(
    JSON.stringify({
        name: 'Ivan',
        age: 23,
    }),
);
