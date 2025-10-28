const { ArrayUtils } = require('../file/export');

console.log('=== Utils Examples zypp ===\n');

const numbers = [1, 2, 3, 4, 5];
const duplicates = [1, 2, 2, 3, 3, 4, 5, 5];
const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];

console.log('Shuffle:', ArrayUtils.shuffle(numbers));
console.log('Unique:', ArrayUtils.unique(duplicates));
console.log('Chunk (size 2):', ArrayUtils.chunk(numbers, 2));
console.log('Flatten:', ArrayUtils.flatten([[1, 2], [3, 4], [5]]));
console.log('Compact:', ArrayUtils.compact([0, 1, false, 2, '', 3, null, undefined, 4]));
console.log('Difference:', ArrayUtils.difference(array1, array2));
console.log('Intersection:', ArrayUtils.intersection(array1, array2));
console.log('Union:', ArrayUtils.union(array1, array2));
console.log('Sample:', ArrayUtils.sample(numbers));
console.log('Sample Size (3):', ArrayUtils.sampleSize(numbers, 3));
console.log('Take (3):', ArrayUtils.take(numbers, 3));
console.log('Take Last (2):', ArrayUtils.takeLast(numbers, 2));
console.log('Sum:', ArrayUtils.sum(numbers));
console.log('Average:', ArrayUtils.average(numbers));
console.log('Min:', ArrayUtils.min(numbers));
console.log('Max:', ArrayUtils.max(numbers));

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];

console.log('\nGroup By Age:', ArrayUtils.groupBy(users, 'age'));
console.log('Count By Age:', ArrayUtils.countBy(users, 'age'));
console.log('Sort By Age:', ArrayUtils.sortBy(users, 'age'));
