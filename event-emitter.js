import { EventEmitter } from 'events';
import { Server } from 'http';

// NOTE: server with help of new Server()
// const server = new Server();

// server.on('request', (req, res) => {
//     // res.setHeader('Content-Type', 'text/html');
//     res.end('<h1 id="heading">Hello, world</h1>');
// });

// server.on('error', (err) => {
//     console.log('Server error:', err.message);
// });

// server.listen(3000, () => {
//     console.log('http://localhost:3000');
// });

console.clear();

const emitter = new EventEmitter();

emitter.on('click', (...args) => {
    console.log('1', args);
});

emitter.on('click', (...args) => {
    console.log('2', args);
});

emitter.prependListener('click', (...args) => {
    console.log('3', args);
});

emitter.once('click', (...args) => {
    console.log('4', args);
});

emitter.prependOnceListener('click', (...args) => {
    console.log('5', args);
});

console.log('eventNames', emitter.eventNames());
console.log('getMaxListeners', emitter.getMaxListeners());
console.log('listenerCount', emitter.listenerCount('click'));
console.log('listeners', emitter.listeners('click'));

console.log('------------');
emitter.emit('click', 111);
console.log('------------');
emitter.emit('click', 222);
console.log('------------');
emitter.emit('click', 333);
console.log('------------');

emitter.listeners('click')[0]?.(999);
emitter.removeAllListeners('click');
console.log('listenerCount', emitter.listenerCount('click'));

console.log('after');
