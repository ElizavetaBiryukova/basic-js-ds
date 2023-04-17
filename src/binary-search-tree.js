const {
  NotImplementedError
} = require('../extensions/index.js');

const {
  Node
} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null
  }

  root() {
    return this._root;
  }

  add(data) {
    const addItem = (node) => {

      if (!node) {
        return new Node(data);
      }
      if (data !== node.data) {
        node[data < node.data ? 'left' : 'right'] = addItem(node[data < node.data ? 'left' : 'right']);
      }
      return node;
    }
    this._root = addItem(this._root);
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    const findItem = (node) => {
      if (!node) {
        return null
      }
      if (data === node.data) {
        return node;
      }
      if (node.data > data) {
        return findItem(node.left)
      } else {
        return findItem(node.right)
      }
    }
    return findItem(this._root);
  }

  remove(data) {
    const removeItem = (node, data) => {
      if (!node) {
        return null
      }

      if (data < node.data) {
        node.left = removeItem(node.left, data);
        return node;
      }

      if (data > node.data) {
        node.right = removeItem(node.right, data);
        return node;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }
      let minLeft = node.left
      while (minLeft.right) {
        minLeft = minLeft.right
      }
      node.data = minLeft.data;
      node.right = removeItem(node.right, minLeft.data);

      return node;
    }

    this._root = removeItem(this._root, data);
  }

  min() {
    const getMin = (node) => {
      if (!node) {
        return null
      }

      if (!node.left) {
        return node.data
      } else {
        return getMin(node.left)
      }
    }

    return getMin(this._root)
  }

  max() {
    const getMax = (node) => {
      if (!node) {
        return null
      }

      if (!node.right) {
        return node.data
      } else {
        return getMax(node.right)
      }
    }

    return getMax(this._root)
  }
}

module.exports = {
  BinarySearchTree
};