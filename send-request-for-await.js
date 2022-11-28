import http from 'http';

const options = {
    host: 'localhost',
    port: 4000,
    path: '/data',
    method: 'POST',
};

const request = http.request(options, async (res) => {
    const chunks = [];

    for await (const chunk of res) {
        chunks.push(chunk);
    }

    const singleBuffer = Buffer.concat(chunks);

    if (res.headers['content-type'] === 'text/javascript') {
        console.log(JSON.parse(singleBuffer));
    } else {
        console.log(singleBuffer.toString());
    }
});

request.end(
    JSON.stringify({
        name: 'Misha',
    }),
);
