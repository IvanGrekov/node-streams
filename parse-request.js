import http from 'http';

const options = {
    host: 'localhost',
    port: 4000,
    path: '',
    method: 'POST',
};

const request = http.request(options, (res) => {
    // let result = '';
    // res.setEncoding('utf-8');
    // NOTE: can be an unexpted result if different bytes of the single word will be in different chunks
    // res.on('data', (chunk) => {
    //     result += chunk;
    // });

    // res.on('end', () => {
    //     console.log(result);
    // });

    const chunks = [];

    res.on('data', (chunk) => {
        chunks.push(chunk);
    });

    res.on('close', () => {
        const singleBuffer = Buffer.concat(chunks);
        if (['text/javascript', 'text/json'].includes(res.headers['content-type'])) {
            console.log(JSON.parse(singleBuffer));
        } else {
            console.log(singleBuffer.toString());
        }
    });
});

request.end(
    JSON.stringify({
        name: 'Misha',
    }),
);
