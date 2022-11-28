import http from 'http';

const options = {
    host: 'localhost',
    port: 4000,
    path: '/data',
    method: 'POST',
};

// http.get(options, (res) => {
//     res.setEncoding('utf-8');
//     res.on('data', (chunk) => {
//         console.log(chunk);
//     });
// });

const request = http.request(options, (res) => {
    // let result = '';

    // res.setEncoding('utf-8');
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

    res.on('end', () => {
        const singleBuffer = Buffer.concat(chunks);

        if (res.headers['content-type'] === 'text/javascript') {
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
