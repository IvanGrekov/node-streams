import { EventEmitter } from 'events';

console.clear();
console.log(new Date().toString());

class MyEventEmitter {
    constructor() {
        this._events = {};
        this._eventsCount = 0;
    }

    _checkHasOwnProperty(eventName) {
        return this._events.hasOwnProperty(eventName);
    }

    _removeListener(eventName, removingListener) {
        const updatedEventListenerList = this._events[eventName].filter(
            (listener) => listener !== removingListener,
        );

        if (updatedEventListenerList.length) {
            this._events[eventName] = updatedEventListenerList;
        } else {
            delete this._events[eventName];
            this._eventsCount--;
        }
    }

    _getOnceWrapper(eventName, listener) {
        function onceWrapper(...args) {
            listener.apply(this, args);
            this._removeListener(eventName, onceWrapper);
        }

        onceWrapper.onceWrapper = true;
        onceWrapper.listener = listener;

        return onceWrapper;
    }

    on(eventName, listener) {
        if (this._checkHasOwnProperty(eventName)) {
            this._events[eventName].push(listener);
        } else {
            this._events[eventName] = [listener];
            this._eventsCount++;
        }

        return this;
    }

    once(eventName, listener) {
        const listenerWrapper = this._getOnceWrapper(eventName, listener);

        if (this._checkHasOwnProperty(eventName)) {
            this._events[eventName].push(listenerWrapper);
        } else {
            this._events[eventName] = [listenerWrapper];
            this._eventsCount++;
        }

        return this;
    }

    off(eventName, removingListener) {
        const eventNameExists = this._checkHasOwnProperty(eventName);

        if (eventNameExists) {
            const listenerList = this._events[eventName];

            for (let i = listenerList.length - 1; i >= 0; i--) {
                let listener = listenerList[i];

                if (listener.onceWrapper) {
                    listener = listener.listener;
                }

                if (listener === removingListener) {
                    this._events[eventName].splice(i, 1);
                    break;
                }
            }

            if (!this._events[eventName].length) {
                delete this._events[eventName];
                this._eventsCount--;
            }
        }

        return this;
    }

    emit(eventName, ...args) {
        const eventHasListeners = this._checkHasOwnProperty(eventName);

        if (eventHasListeners) {
            this._events[eventName].forEach((eventListener) => {
                eventListener.apply(this, args);
            });
        }

        return eventHasListeners;
    }

    prependListener(eventName, listener) {
        if (this._checkHasOwnProperty(eventName)) {
            this._events[eventName].unshift(listener);
        } else {
            this._events[eventName] = [listener];
            this._eventsCount++;
        }

        return this;
    }

    prependOnceListener(eventName, listener) {
        const listenerWrapper = this._getOnceWrapper(eventName, listener);

        if (this._checkHasOwnProperty(eventName)) {
            this._events[eventName].unshift(listenerWrapper);
        } else {
            this._events[eventName] = [listenerWrapper];
            this._eventsCount++;
        }

        return this;
    }

    removeAllListeners(eventName) {
        if (eventName) {
            if (this._events.hasOwnProperty(eventName)) {
                this._eventsCount--;
            }

            delete this._events[eventName];
        } else {
            this._events = {};
            this._eventsCount = 0;
        }

        return this;
    }

    listenerCount(eventName) {
        return this._events[eventName]?.length || 0;
    }

    eventNames() {
        return Object.keys(this._events);
    }
}

const emitter = new EventEmitter();
const myEmitter = new MyEventEmitter();

//#region NOTE: check `on`
// const check = emitter.on('click', (...args) => {
//     console.log('1', args);
// });
// emitter.on('click', (...args) => {
//     console.log('2', args);
// });
// emitter.on('clickck', (...args) => {
//     console.log('1', args);
// });
// const myCheck = myEmitter.on('click', (...args) => {
//     console.log('1', args);
// });
// myEmitter.on('click', (...args) => {
//     console.log('2', args);
// });
// myEmitter.on('clickck', (...args) => {
//     console.log('1', args);
// });

// console.log(check);
// console.log(myCheck);
//#endregion

//#region NOTE: check `listenerCount`
// const check = emitter.on('click', (...args) => {
//     console.log('1', args);
// });
// emitter.on('click', (...args) => {
//     console.log('2', args);
// });
// emitter.on('clickck', (...args) => {
//     console.log('1', args);
// });
// const myCheck = myEmitter.on('click', (...args) => {
//     console.log('1', args);
// });
// myEmitter.on('click', (...args) => {
//     console.log('2', args);
// });
// myEmitter.on('clickck', (...args) => {
//     console.log('1', args);
// });

// console.log(emitter.listenerCount('click'));
// console.log(myEmitter.listenerCount('click'));

// console.log(emitter.listenerCount('clickck'));
// console.log(myEmitter.listenerCount('clickck'));
//#endregion

//#region NOTE: check `once`
// const check = emitter.once('click', () => {
//     console.log(1);
// });
// emitter.on('click', () => {
//     console.log(2);
// });
// const mycheck = myEmitter.once('click', () => {
//     console.log(1);
// });
// myEmitter.on('click', () => {
//     console.log(2);
// });

// emitter.emit('click');
// myEmitter.emit('click');

// console.log('check', check);
// console.log('mycheck', mycheck);

// emitter.emit('click');
// myEmitter.emit('click');
//#endregion

//#region NOTE: check `off`
// const listener = () => {
//     console.log(1);
// };
// emitter.on('click', listener);
// myEmitter.on('click', listener);
// emitter.once('click', listener);
// myEmitter.once('click', listener);
// emitter.once('click', listener);
// myEmitter.once('click', listener);

// emitter.off('click', listener);
// myEmitter.off('click', listener);

// console.log('emitter', emitter);
// console.log('myEmitter', myEmitter);
//#endregion

//#region NOTE: check `emit`
// const listener = (...args) => {
//     console.log(args);
// };
// emitter.on('click', listener);
// emitter.once('click', listener);
// myEmitter.on('click', listener);
// myEmitter.once('click', listener);

// const check = emitter.emit('click', 'emitter emit');
// const mycheck = myEmitter.emit('click', 'myEmitter emit');

// console.log('check', check);
// console.log('mycheck', mycheck);
// console.log('emitter', emitter);
// console.log('myEmitter', myEmitter);
//#endregion

//#region NOTE: check `prependListener`
// emitter.on('click', () => {
//     console.log('1');
// });
// emitter.prependListener('click', () => {
//     console.log('2');
// });
// myEmitter.on('click', () => {
//     console.log('1');
// });
// myEmitter.prependListener('click', () => {
//     console.log('2');
// });

// emitter.emit('click');
// myEmitter.emit('click');
//#endregion

//#region NOTE: check `prependOnceListener`
// emitter.once('click', () => {
//     console.log('1');
// });
// const check = emitter.prependOnceListener('click', () => {
//     console.log('2');
// });
// myEmitter.once('click', () => {
//     console.log('1');
// });
// const mycheck = myEmitter.prependOnceListener('click', () => {
//     console.log('2');
// });

// emitter.emit('click');
// myEmitter.emit('click');
// console.log('check', check);
// console.log('mycheck', mycheck);
//#endregion

//#region NOTE: check `removeAllListeners`
// emitter.on('click', () => {
//     console.log('1');
// });
// emitter.on('clickck', () => {
//     console.log('1');
// });

// myEmitter.on('click', () => {
//     console.log('1');
// });
// myEmitter.on('clickck', () => {
//     console.log('1');
// });

// const check = emitter.removeAllListeners('click');
// const mycheck = myEmitter.removeAllListeners('click');

// console.log('check', check);
// console.log('mycheck', mycheck);
//#endregion

//#region NOTE: check `eventNames`
// emitter.on('click', () => {
//     console.log('1');
// });
// emitter.on('clickck', () => {
//     console.log('1');
// });

// myEmitter.on('click', () => {
//     console.log('1');
// });
// myEmitter.on('clickck', () => {
//     console.log('1');
// });

// const check = emitter.eventNames();
// const mycheck = myEmitter.eventNames();

// console.log('check', check);
// console.log('mycheck', mycheck);
//#endregion
