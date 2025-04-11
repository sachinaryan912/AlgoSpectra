
class Queue {
    constructor() {
        this.queue = [];
    }
    
    enqueue(element) {
        this.queue.push(element);
    }
    
    dequeue() {
        return this.queue.length > 0 ? this.queue.shift() : null;
    }
    
    getQueue() {
        return [...this.queue];
    }
    
    getQueueLength() {
        return this.queue.length;
    }
    
    clear() {
        this.queue = [];
    }
    
    isEmpty() {
        return this.queue.length === 0;
    }
}

export default Queue;
