import http from 'http';
console.clear();

const options = {
    method: 'POST',
};

const data = {
    name: 'Misha',
    age: 35,
};

// const request = http.request('http://localhost:3000', options, (res) => {
//     // console.log(res.statusCode);

//     // res.pipe(process.stdout);

//     const chunks = [];

//     res.on('data', (chunk) => {
//         chunks.push(chunk);
//     });

//     res.on('end', () => {
//         const result = Buffer.concat(chunks);

//         console.log(result.toString());
//     });
// });

// const request = http.request('http://localhost:3000/data', options, (res) => {
//     const chunks = [];

//     res.on('data', (chunk) => {
//         chunks.push(chunk);
//     });

//     res.on('end', () => {
//         const result = Buffer.concat(chunks);
//         const data = JSON.parse(result.toString());

//         console.log(data);
//     });
// });

const request = http.request('http://localhost:3000/data', options, (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
        chunks.push(chunk);
    });

    res.on('end', () => {
        const result = Buffer.concat(chunks);

        console.log(result.toString());
    });
});

request.end(JSON.stringify(data));
