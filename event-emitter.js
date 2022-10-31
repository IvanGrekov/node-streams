import EventEmitter from 'events';

console.clear();

// ------------------

const EVENT_NAME = 'request';
const emitter = new EventEmitter();

emitter.on(EVENT_NAME, (...args) => {
    console.log('args1', args);
});

emitter.on(EVENT_NAME, (...args) => {
    console.log('args2', args);
});

emitter.prependListener(EVENT_NAME, (...args) => {
    console.log('args0', args);
});

emitter.once(EVENT_NAME, (...args) => {
    console.log('args3', args);
});

export const dispatchEmitter = (...args) => {
    emitter.emit(EVENT_NAME, ...args);
};

// ------------------

console.log('Before');
dispatchEmitter(1, 2, 3);
dispatchEmitter(123);
console.log('After');

// ------------------

console.log('eventNames', emitter.eventNames());
console.log('listeners', emitter.listeners('request'));
console.log('listenerCount', emitter.listenerCount('request'));

emitter.removeAllListeners('request');
console.log('updated listenerCount', emitter.listenerCount('request'));
