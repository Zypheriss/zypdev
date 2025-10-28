class ArrayUtils {
  static shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  static unique(array) {
    return [...new Set(array)];
  }

  static chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  static flatten(array, depth = 1) {
    if (depth < 1) return array.slice();
    return array.reduce((acc, val) => 
      acc.concat(Array.isArray(val) ? this.flatten(val, depth - 1) : val), []);
  }

  static compact(array) {
    return array.filter(Boolean);
  }

  static difference(array1, array2) {
    return array1.filter(item => !array2.includes(item));
  }

  static intersection(array1, array2) {
    return array1.filter(item => array2.includes(item));
  }

  static union(...arrays) {
    return this.unique(arrays.flat());
  }

  static partition(array, predicate) {
    const truthy = [];
    const falsy = [];
    array.forEach(item => {
      if (predicate(item)) {
        truthy.push(item);
      } else {
        falsy.push(item);
      }
    });
    return [truthy, falsy];
  }

  static groupBy(array, key) {
    return array.reduce((result, item) => {
      const groupKey = typeof key === 'function' ? key(item) : item[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {});
  }

  static countBy(array, key) {
    return array.reduce((result, item) => {
      const groupKey = typeof key === 'function' ? key(item) : item[key];
      result[groupKey] = (result[groupKey] || 0) + 1;
      return result;
    }, {});
  }

  static sortBy(array, key, order = 'asc') {
    return [...array].sort((a, b) => {
      const aVal = typeof key === 'function' ? key(a) : a[key];
      const bVal = typeof key === 'function' ? key(b) : b[key];
      
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  static sample(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static sampleSize(array, n) {
    const shuffled = this.shuffle(array);
    return shuffled.slice(0, Math.min(n, array.length));
  }

  static take(array, n = 1) {
    return array.slice(0, n);
  }

  static takeLast(array, n = 1) {
    return array.slice(-n);
  }

  static sum(array) {
    return array.reduce((sum, num) => sum + num, 0);
  }

  static average(array) {
    if (array.length === 0) return 0;
    return this.sum(array) / array.length;
  }

  static min(array) {
    return Math.min(...array);
  }

  static max(array) {
    return Math.max(...array);
  }
}

module.exports = { ArrayUtils };
