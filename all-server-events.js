import EventEmitter from 'events';
import server, { launchServer } from './server.js';

// server.on('listening', (...args) => {
//     console.log('listening', args);
// });

// server.on('connection', (...args) => {
//     console.log('connection', args);
// });

// server.on('request', (...args) => {
//     console.log('request', args);
// });

const originalEmit = server.emit;
server.emit = (eventName, ...args) => {
    // EventEmitter.prototype.emit.call(server, eventName, ...args);
    originalEmit.call(server, eventName, ...args);

    console.log(eventName);
};

launchServer();

console.log('server.eventNames', server.eventNames());
