// src/utils/LinkedList.js

export default class LinkedList {
    constructor() {
      this.head = null;
    }
  
    insertAtHead(node) {
      const newNode = { ...node, next: this.head };
      this.head = newNode;
    }
  
    insertAtTail(node) {
      const newNode = { ...node, next: null };
      if (!this.head) {
        this.head = newNode;
        return;
      }
  
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  
    deleteHead() {
      if (!this.head) return null;
      const deleted = this.head;
      this.head = this.head.next;
      return deleted;
    }
  
    deleteTail() {
      if (!this.head) return null;
      if (!this.head.next) {
        const deleted = this.head;
        this.head = null;
        return deleted;
      }
  
      let current = this.head;
      while (current.next.next) {
        current = current.next;
      }
      const deleted = current.next;
      current.next = null;
      return deleted;
    }
  
    clear() {
      this.head = null;
    }
  
    getList() {
      const elements = [];
      let current = this.head;
      while (current) {
        elements.push({ id: current.id, value: current.value });
        current = current.next;
      }
      return elements;  // returns head-to-tail (LEFT to RIGHT visual order)
    }
  
    isEmpty() {
      return !this.head;
    }
  }
  