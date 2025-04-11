class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    isEmpty() {
        return this.head === null;
    }

    insertAtHead(value) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    insertAtTail(value) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    deleteHead() {
        if (this.isEmpty()) {
            return null;
        }
        const removedValue = this.head.value;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = null;
        }
        return removedValue;
    }

    deleteTail() {
        if (this.isEmpty()) {
            return null;
        }
        if (this.head === this.tail) {
            const removedValue = this.head.value;
            this.head = this.tail = null;
            return removedValue;
        }

        let current = this.head;
        while (current.next !== this.tail) {
            current = current.next;
        }

        const removedValue = this.tail.value;
        current.next = null;
        this.tail = current;
        return removedValue;
    }

    getList() {
        let current = this.head;
        const result = [];
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }

    clear() {
        this.head = this.tail = null;
    }
}

export default LinkedList;