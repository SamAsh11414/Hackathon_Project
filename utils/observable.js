export function Subscriber(func) {
    this.func = func;
}

Subscriber.prototype.run = function (...args) { this.func.apply(this, args) };

export function Observable(func) {
    this._subscribers = new Map();

    this.subscribe = (func) => {
        const subscriber = new Subscriber(func);
        subscriber.unsubscribe = this._subscribers.delete(subscriber);
        this._subscribers.set(subscriber, options);
        func?.call(this, subscriber, options);
        return subscriber;
    }

    return [
        this,
        value => {
            for (const [subscriber, options] of this._subscribers) {
                subscriber.run(value, options);
            }
        }
    ];
}