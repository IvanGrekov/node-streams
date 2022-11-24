import { Readable, Writable, Duplex, Transform } from 'stream';

// Buffer size - 64kb

// Readable stream (req)
new Readable();

// Writable stream (res)
new Writable();

// Duplex stream (can be written and read)
new Duplex();

// Transform stream (for compression)
new Transform();
