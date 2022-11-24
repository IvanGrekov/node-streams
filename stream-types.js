import { Readable, Writable, Duplex, Transform } from 'stream';
import fs from 'fs';

// Buffer size - 64kb

// Readable stream
new Readable();
fs.createReadStream('index.html');
process.stdin;
req;

// Writable stream
new Writable();
fs.createWriteStream('new-file.html');
process.stdout;
process.stderr;
res;

// Duplex stream (can be written and read)
new Duplex();

// Transform stream (for compression)
new Transform();
