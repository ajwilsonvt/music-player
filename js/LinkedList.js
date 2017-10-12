class ListNode {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

/**
 * Singly-Linked List
 */
class LinkedList {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  /**
   * Fetch the node at index i
   */
  fetch(i) {
    if (i < 0 || i >= this.size) return;

    var current = this.root;
    for (let j = 0; j < i; j++) {
      current = current.next;
    }
    return current;
  }

  /**
   * Get the value of the node at index i
   */
  get(i) {
    var current = this.fetch(i);
    return current.data;
  }

  /**
   * Set the value of the node at index i
   */
  set(i, data) {
    var current = this.fetch(i);
    current.data = data;
  }

  /**
   * Insert at index i, and shift the rest to the right
   */
  insert(i, data) {
    // fetch node before index i
    var before = this.fetch(i - 1);
    var newNode = new ListNode(data, before.next);
    before.next = newNode;
    this.size++;
  }

  prepend(data) {
    var newNode = new ListNode(data, this.root);
    this.root = newNode;
    this.size++;
  }

  append(data) {
    if (this.size === 0) {
      this.prepend(data);
    } else {
      // fetch node before index i
      var before = this.fetch(this.size - 1);
      before.next = new ListNode(data, null);
      this.size++;
    }
  }

  /**
   * Remove the node at index i
   */
  remove(i) {
    if (i < 0 || i >= this.size || this.size <= 0) return;

    if (i === 0) {
      this.root = this.root.next;
    } else {
      // fetch node before index i
      var before = this.fetch(i - 1);
      before.next = before.next.next;
    }
    
    this.size--;
  }

  pop() {
    // fetch node before last
    var before = this.fetch(this.size - 2);
    var current = before.next;
    before.next = null;
    this.size--;
    return current;
  }

  empty() {
    this.root = null;
    this.size = 0;
  }

  contains(data) {
    var current = this.root;
    for (let i = 0; i < this.size; i++) {
      // console.log(current);
      if (current.data === data) return true;
      current = current.next;
    }
    return false;
  }

  equals(linkedList) {
    if (this.size !== linkedList.size) return false;

    var p1 = this.root;
    var p2 = linkedList.root;
    for (let i = 0; i < this.size; i++) {
      if (p1.data !== p2.data) return false;
      p1 = p1.next;
      p2 = p2.next;
    }
    return true;
  }
}

export default new LinkedList();
